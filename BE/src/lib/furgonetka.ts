import dotenv from "dotenv";

dotenv.config();

const FURGONETKA_API_URL = "https://api.furgonetka.pl";
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

  const response = await fetch(`${FURGONETKA_API_URL}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: FURGONETKA_EMAIL,
      password: FURGONETKA_PASSWORD,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Furgonetka Auth Error:", errorData);
    throw new Error("Failed to authenticate with Furgonetka");
  }

  const data = await response.json();
  accessToken = data.access_token;
  // Token usually expires in 1 hour (3600s), setting it to 50 mins for safety
  tokenExpiresAt = Date.now() + 50 * 60 * 1000;

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

    const payload: any = {
      service: serviceMap[order.shippingMethod] || "dpd",
      receiver: {
        name: `${order.customerFirstName} ${order.customerLastName}`,
        street: streetAddress,
        postcode: order.customerPostalCode,
        city: order.customerCity,
        phone: order.customerPhone,
        email: order.customerEmail,
        country: "PL",
      },
      // Sender data should probably be in ENV or a config
      sender: {
        name: process.env.FURGONETKA_SENDER_NAME || "On-Up",
        street: process.env.FURGONETKA_SENDER_STREET || "Testowa 1",
        postcode: process.env.FURGONETKA_SENDER_POSTCODE || "00-001",
        city: process.env.FURGONETKA_SENDER_CITY || "Warszawa",
        phone: process.env.FURGONETKA_SENDER_PHONE || "123456789",
      },
      parcels: [
        {
          width: 20,
          height: 15,
          depth: 10,
          weight: 1.0, // Default 1kg
          description: `Zamówienie #${order.orderNumber}: ${order.items.map((i: any) => i.book.title).join(", ")}`,
        },
      ],
      pickup: {
        type: "courier",
      },
      label_type: "pdf",
      user_reference: order.orderNumber,
    };

    if (order.shippingPoint) {
      payload.point = order.shippingPoint;
    }

    const response = await fetch(`${FURGONETKA_API_URL}/v2/packages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Furgonetka Package Creation Error:", data);
      return { success: false, error: data };
    }

    console.log(
      `✅ Furgonetka package created for order ${order.orderNumber}:`,
      data.package_id,
    );
    return { success: true, packageId: data.package_id };
  } catch (error) {
    console.error("Furgonetka Integration Error:", error);
    return { success: false, error: error };
  }
}
