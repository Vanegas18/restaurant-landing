export const WHATSAPP_NUMBER = "573001234567"; // cambia por tu número

export const DEFAULT_MESSAGE = "Hola, quiero hacer un pedido 🍔";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(name: string, price: string): string {
  return `Hola, quiero pedir: ${name} (${price}) 🍔`;
}
