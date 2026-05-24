export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
  return phoneRegex.test(phone.trim());
}

export function isValidMexicanRFC(rfc: string): boolean {
  const clean = rfc.trim().toUpperCase();
  const personaFisica = /^[A-Z]{4}[0-9]{6}[A-Z0-9]{3}$/;
  const personaMoral = /^[A-Z]{3}[0-9]{6}[A-Z0-9]{3}$/;
  return personaFisica.test(clean) || personaMoral.test(clean);
}

export function normalizeRFC(rfc: string): string {
  return rfc.trim().toUpperCase();
}
