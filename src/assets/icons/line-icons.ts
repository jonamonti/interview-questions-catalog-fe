// Line icons from the design: 24x24 viewBox, drawn as a 1.7px round stroke in
// currentColor. `topic` (a hash) is the fallback for tags without an icon.
export const lineIcons = {
  security: {
    label: "Security",
    path: "M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3zM9 12l2 2 4-4",
  },
  api: {
    label: "API",
    path: "M8 4c-2 0-3 1-3 3v2c0 1-.8 2.2-2 3 1.2.8 2 2 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1 .8 2.2 2 3-1.2.8-2 2-2 3v2c0 2-1 3-3 3",
  },
  networking: {
    label: "Networking",
    path: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3.5 9h17M3.5 15h17M12 3c-2.4 2.6-3.6 5.6-3.6 9s1.2 6.4 3.6 9M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9",
  },
  topic: {
    label: "Topic",
    path: "M9.5 4L8 20M16 4l-1.5 16M4.5 9h15M4 15h15",
  },
} as const;
