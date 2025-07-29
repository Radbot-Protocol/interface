import { heroui } from "@heroui/react";

export const content = [
  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const darkMode = "class";
export const plugins = [
  heroui({
    defaultTheme: "dark",
  }),
];
