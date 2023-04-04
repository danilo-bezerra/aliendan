export const colors = [
  "#f7cac9",
  "#e9afa3",
  "#d5a6bd",
  "#d5d5d5",
  "#b4d7a4",
  "#9ac48a",
  "#81c7d4",
  "#a5dee5",
  "#99c5b5",
  "#de9ed6",
  "#e4c1f9",
  "#d3a6d4",
  "#f3c3e4",
  "#f6d9d6",
  "#f3edd2",
  "#e6f2d3",
  "#d1f1e8",
  "#d3f0f7",
  "#c8d8e4",
  "#bbded6",
];

export function getRandomColor() {
  const pos = Math.floor(Math.random() * colors.length);

  return colors[pos];
}
