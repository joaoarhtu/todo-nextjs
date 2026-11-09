import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const fonte = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--fonte",
});

export const metadata = {
  title: "Tarefas",
  description: "Lista de tarefas feita com Next.js: adicione, conclua, filtre e exclua.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={fonte.variable}>
      <body>{children}</body>
    </html>
  );
}
