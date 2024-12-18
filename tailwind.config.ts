import { nextui } from '@nextui-org/react';
import type { Config } from "tailwindcss";
import resolveConfig from 'tailwindcss/resolveConfig';
import { PluginAPI, RecursiveKeyValuePair, ResolvableTo } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }
    },
  },
  plugins: [
    nextui(),
    (args: PluginAPI) => {
      const clampUtilities = Array.from({ length: 10 },(_,i) => i + 1).reduce((acc,number) => {
        acc[`.${args.e(`truncate-multi-line-${number}`)}`]= {
          display: '-webkit-box',
          '-webkit-line-clamp': `${number}`,
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        };
        return acc;
      }, {} as Record<string, any>);

      args.addUtilities(clampUtilities);
    },
  ],
};

export default config;

export const resolvedConfig = resolveConfig(config)
