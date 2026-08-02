/**
 * Normalizes a phone number by stripping spaces and dashes.
 * 
 * @param phone - The raw phone number string to normalize.
 * @returns The normalized phone number string without spaces or dashes.
 */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s-]/g, "");
}

/**
 * Validates that a phone number includes a country code and is 11-13 digits long.
 * 
 * @param phone - The raw phone number string to validate.
 * @returns True if the phone number matches the strict country code format, otherwise false.
 */
export function isValidPhone(phone: string): boolean {
  return /^\+\d{11,13}$/.test(normalizePhone(phone));
}

/**
 * Builds a WhatsApp click-to-chat link from a stored contact number.
 *
 * Profile numbers are captured with a country code (e.g. "+91 9876543210"),
 * but wa.me wants digits only ("919876543210"). Returns null when the number
 * fails strict validation so callers can hide the action instead of rendering a broken link.
 * 
 * @param contactNo - The stored contact number string, or null/undefined.
 * @returns The formatted wa.me URL, or null if the input is invalid or missing.
 */
export function whatsAppLink(contactNo?: string | null): string | null {
  if (!contactNo) return null;
  const normalized = normalizePhone(contactNo);
  if (!isValidPhone(normalized)) return null;
  return `https://wa.me/${normalized.slice(1)}`;
}