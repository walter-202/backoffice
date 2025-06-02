import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-console": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",

      // Deshabilitar la regla 'no-unused-vars' de ESLint base (para warnings)
      "no-unused-vars": "off",

      // Deshabilitar la regla 'no-unused-vars' de TypeScript (para errores)
      "@typescript-eslint/no-unused-vars": "off",

      // Deshabilitar la regla 'no-explicit-any' para permitir el uso de 'any'
      "@typescript-eslint/no-explicit-any": "off",

      // Deshabilitar la regla de dependencias exhaustivas de React Hooks 
      "react-hooks/exhaustive-deps": "off",

      // Deshabilitar la regla 'no-unused-expressions'
      "@typescript-eslint/no-unused-expressions": "off",

      // Deshabilitar la regla de tipos de objetos vacíos
      "@typescript-eslint/no-empty-object-type": "off",

      // Deshabilitar React que se importe y no se use
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      "no-undef": "off", // Ocultar problemas reales de variables no definidas
      "import/no-unresolved": "off", // Si ESLint no encuentra módulos importados, puede que necesites esto
      "import/named": "off", // Similar al anterior
      "import/namespace": "off", // Similar al anterior
      "import/default": "off", // Similar al anterior
      "import/no-named-as-default-member": "off", // Similar al anterior
      "import/no-named-as-default": "off", // Similar al anterior
    },
  },
];

export default eslintConfig;