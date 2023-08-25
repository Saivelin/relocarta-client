export const numStr = (number: number, textForms: string[]): string => {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return textForms[2];

  if (n1 > 1 && n1 < 5) return textForms[1];

  if (n1 === 1) return textForms[0];

  return textForms[2];
};
