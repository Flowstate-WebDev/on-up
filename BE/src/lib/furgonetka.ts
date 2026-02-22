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

    const slugMap: Record<string, number> = {
      inpost: 11328062, // inpost
      orlen: 11328063, // orlen
      kurier: 11328057, // dpd
      poczta: 11328061, // poczta
    };

    const targetServiceId = slugMap[order.shippingMethod as string] || 11328057;

    let shipmentType: string;
    if (order.shippingPoint) {
      shipmentType = targetServiceId === 11328062 ? "point_apm" : "point"; // InPost ma point_apm
    } else {
      shipmentType = "door";
    }

    const senderEmail = process.env.FURGONETKA_EMAIL;
    const senderPhoneRaw = process.env.FURGONETKA_SENDER_PHONE;

    const senderName = process.env.FURGONETKA_SENDER_NAME;
    const senderStreet = process.env.FURGONETKA_SENDER_STREET;
    const senderPostcode = process.env.FURGONETKA_SENDER_POSTCODE;
    const senderCity = process.env.FURGONETKA_SENDER_CITY;

    const payload: any = {
      service_id: targetServiceId,
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
      pickup: {
        type: shipmentType === "door" ? "courier" : "point",
        name: senderName,
        company: senderName,
        street: senderStreet,
        postcode: senderPostcode,
        city: senderCity,
        phone: senderPhoneRaw,
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

    const response = await fetch(`${FURGONETKA_API_URL}/packages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.furgonetka.v2+json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : {};

    if (!response.ok) {
      return { success: false, error: data, status: response.status };
    }

    return { success: true, packageId: data.package_id };
  } catch (error: any) {
    return { success: false, error: error.message || error };
  }
}
