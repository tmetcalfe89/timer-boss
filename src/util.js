const fixTime = (value) => Number(value).toString().padStart(2, "0");
const clamp = (value, { min = value, max = value }) =>
  Math.max(Math.min(value, max), min);

export { fixTime, clamp };
