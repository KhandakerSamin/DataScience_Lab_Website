import "./globals.css"
import { Poppins, Outfit } from "next/font/google"
import LayoutWrapper from "@/components/LayoutWrapper"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata = {
  title: "DIU | Data Science Lab",
  description: "Official site for the Data Science Lab of DIU",
}

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${poppins.variable} ${outfit.variable} font-poppins antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
