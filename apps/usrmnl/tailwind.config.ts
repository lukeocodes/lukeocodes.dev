import { type Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

export default {
  darkMode: "selector",
  content: ["./{src,mdx}/**/*.{js,mjs,jsx,ts,tsx,mdx}"],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
} satisfies Config;
