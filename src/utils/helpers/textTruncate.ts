export const textTruncate = (input: string, length: number) => {
  if (input.length <= length) return input;
  if (length < 3) return input.substring(0, length);
  return input.substring(0, length - 3) + "...";
}
