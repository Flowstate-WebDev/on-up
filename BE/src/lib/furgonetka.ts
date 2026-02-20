import dotenv from "dotenv";

dotenv.config();

const FURGONETKA_API_URL =
  process.env.FURGONETKA_ENV === "production"
    ? "https://api.furgonetka.pl"
    : "https://api.sandbox.furgonetka.pl";

const FURGONETKA_EMAIL = process.env.FURGONETKA_EMAIL;
const FURGONETKA_PASSWORD = process.env.FURGONETKA_PASSWORD;

let accessToken: string | null = null;
let tokenExpiresAt: number | null = null;

async function authenticate() {
  if (accessToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  if (!FURGONETKA_EMAIL || !FURGONETKA_PASSWORD) {
    throw new Error("Missing Furgonetka credentials in environment variables.");
  }

  // Furgonetka REST v2 OAuth2 - Password Grant z nagłówkiem Authorization
  const clientId = process.env.FURGONETKA_CLIENT_ID || "";
  const clientSecret = process.env.FURGONETKA_CLIENT_SECRET || "";
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  console.log(
    `DEBUG: Authenticating with Furgonetka at ${FURGONETKA_API_URL} using email: ${FURGONETKA_EMAIL}`,
  );

  const response = await fetch(`${FURGONETKA_API_URL}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authHeader}`,
    },
    body: `grant_type=password&scope=api&username=${encodeURIComponent(FURGONETKA_EMAIL || "")}&password=${encodeURIComponent(FURGONETKA_PASSWORD || "")}`,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Furgonetka Auth Error:", errorText);
    throw new Error(
      `Failed to authenticate with Furgonetka: ${response.statusText}`,
    );
  }

  const data = await response.json();
  accessToken = data.access_token;
  // Token zazwyczaj ważny 30 dni (86400 * 30), ale ustawiamy bezpieczny zapas
  tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000 - 60000;

  return accessToken;
}

export async function createFurgonetkaPackage(order: any) {
  try {
    const token = await authenticate();

    const streetAddress = order.customerApartment
      ? `${order.customerStreet} ${order.customerBuilding}/${order.customerApartment}`
      : `${order.customerStreet} ${order.customerBuilding}`;

    const serviceMap: Record<string, string> = {
      inpost: "inpost",
      orlen: "orlen",
      kurier: "dpd",
      poczta: "poczta",
    };

    const slug = serviceMap[order.shippingMethod as string] || "dpd";
    let shipmentType = "door";
    if (order.shippingPoint) {
      shipmentType = slug === "inpost" ? "point_apm" : "point";
    }

    const senderEmail = process.env.FURGONETKA_EMAIL || "sklep@on-up.pl";
    let senderPhoneRaw = process.env.FURGONETKA_SENDER_PHONE || "500600700";
    const senderPhone = senderPhoneRaw.replace(/\D/g, "").slice(-9);

    const payload: any = {
      service: slug,
      shipment_type: shipmentType,
      receiver: {
        name: `${order.customerFirstName} ${order.customerLastName}`,
        street: streetAddress,
        postcode: order.customerPostalCode,
        city: order.customerCity,
        phone: order.customerPhone.replace(/\D/g, "").slice(-9),
        email: order.customerEmail,
        country: "PL",
      },
      sender: {
        name: process.env.FURGONETKA_SENDER_NAME || "Patryk Jarosz",
        company: process.env.FURGONETKA_SENDER_NAME || "Patryk Jarosz",
        street: process.env.FURGONETKA_SENDER_STREET || "ul. Marcowa 5 m 1",
        postcode: process.env.FURGONETKA_SENDER_POSTCODE || "00-001",
        city: process.env.FURGONETKA_SENDER_CITY || "Warszawa",
        phone: senderPhone,
        email: senderEmail,
      },
      pickup: {
        type: shipmentType === "door" ? "courier" : "point",
        name: process.env.FURGONETKA_SENDER_NAME || "Patryk Jarosz",
        company: process.env.FURGONETKA_SENDER_NAME || "Patryk Jarosz",
        street: process.env.FURGONETKA_SENDER_STREET || "ul. Marcowa 5 m 1",
        postcode: process.env.FURGONETKA_SENDER_POSTCODE || "00-001",
        city: process.env.FURGONETKA_SENDER_CITY || "Warszawa",
        phone: senderPhone,
        email: senderEmail,
      },
      parcels: [
        {
          width: 20,
          height: 15,
          depth: 10,
          weight: 1.0,
          type: "package",
          description: `Zamówienie #${order.orderNumber}`,
        },
      ],
      label_type: "pdf",
      user_reference: order.orderNumber,
    };

    if (order.shippingPoint) {
      payload.point = order.shippingPoint;
    }

    console.log(
      `DEBUG: Próba utworzenia przesyłki (slug: ${slug}, type: ${shipmentType})...`,
    );
    let response = await fetch(`${FURGONETKA_API_URL}/packages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.furgonetka.v2+json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    let responseText = await response.text();
    let data;
    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
      console.error(
        "Furgonetka Error: Could not parse response as JSON",
        responseText,
      );
      return {
        success: false,
        error: "Invalid JSON response",
        raw: responseText,
      };
    }

    // AUTO-RETRY Z WYBOREM OFERTY
    if (!response.ok && data.offers && data.offers.length > 0) {
      const firstOffer = data.offers[0];
      console.log(
        `DEBUG: Wykryto błąd 'Proszę wybrać ofertę'. Automatycznie wybieram service_id: ${firstOffer.service_id} (${firstOffer.name})...`,
      );

      delete payload.service;
      payload.service_id = firstOffer.service_id;

      response = await fetch(`${FURGONETKA_API_URL}/packages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.furgonetka.v2+json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      responseText = await response.text();
      data = responseText ? JSON.parse(responseText) : {};
    }

    if (!response.ok) {
      console.error(
        `Furgonetka Package Creation Error (Status ${response.status}):`,
        data,
      );
      return { success: false, error: data, status: response.status };
    }

    console.log(
      `✅ Furgonetka package created for order ${order.orderNumber}:`,
      data.package_id,
    );
    return { success: true, packageId: data.package_id };
  } catch (error: any) {
    console.error("Furgonetka Integration Error:", error);
    return { success: false, error: error.message || error };
  }
}
