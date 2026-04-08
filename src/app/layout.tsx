import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Fira_Code } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shirin Shaikh — Web Developer Intern",
  description:
    "Aspiring Web Developer focused on building modern, responsive web applications using React, Next.js, JavaScript, and WordPress. Passionate about learning new technologies and creating practical projects.",
  keywords: [
    "Web Developer",
    "WordPress",
    "React",
    "Next.js",
    "JavaScript",
    "Portfolio",
    "Frontend Development",
    "Internship",
  ],
  authors: [{ name: "Shirin Shaikh" }],
  openGraph: {
    title: "Shirin Shaikh — Web Developer Intern",
    description:
      "Building modern, responsive web applications with React, Next.js, JavaScript, and WordPress.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} ${firaCode.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
