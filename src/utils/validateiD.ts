export async function validateID(dni: string): Promise<boolean> {
  if (dni.length !== 10) {
    return false;
  }

  const provincia = parseInt(dni.substring(0, 2), 10);
  if (provincia < 1 || provincia > 24) {
    return false;
  }

  const digits = dni.split('').map((char) => parseInt(char, 10));
  const lastDigit = digits.pop();

  let total = 0;
  digits.forEach((digit, index) => {
    let value = index % 2 === 0 ? digit * 2 : digit;
    value = value > 9 ? value - 9 : value;
    total += value;
  });

  const checkDigit = total % 10 === 0 ? 0 : 10 - (total % 10);

  return checkDigit === lastDigit;
}
