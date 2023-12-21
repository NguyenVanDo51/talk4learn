import "./globals.css"
import "../styles/index.scss"
import "../../public/fontawesome/css/all.css"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { APP_NAME } from "@/types/constants"
import Script from "next/script"
import { Hanken_Grotesk } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import StyledComponentsRegistry from "../libs/AntdStyledComponentsRegistry"
import { ProModal } from "@/components/template/pro-modal"
import { ConfigProvider } from "antd"

const inter = Hanken_Grotesk({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
})
const title = `${APP_NAME} - Practice English with AI Chatbot`
const description = `Practice English, improve grammar, and enhance your skills with talk4learn.com, the AI-powered chatbot.`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6366f1",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
          <Script
            strategy="beforeInteractive"
            src="https://code.responsivevoice.org/responsivevoice.js?key=nU8Tvi5J"
          ></Script>

          <StyledComponentsRegistry>
            <ConfigProvider theme={{ token: { colorPrimary: "#6366f1" } }}>
              {children}
            </ConfigProvider>
          </StyledComponentsRegistry>
          <Analytics />
          <ProModal />
        </body>
      </html>
    </ClerkProvider>
  )
}

export const metadata: Metadata = {
  title,
  description,
  generator: "andy510@gmail.com",
  applicationName: "andy510@gmail.com",
  referrer: "origin-when-cross-origin",
  keywords: [
    "talk4learn",
    "talk4learn ai",
    "talk4learn chatbot",
    "learn english",
    "english chating",
    "practice english with ai",
    "ai chat",
    "practice with ai",
    "chatgpt",
    "learning english",
  ],
  authors: [{ name: "Andy" }, { name: "Andy", url: "https://andydev.com" }],
  creator: "Andy",
  publisher: "Andy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  metadataBase: new URL("https://talk4learn.com/"),
  openGraph: {
    title,
    description,
    url: "https://talk4learn.com/",
    siteName: APP_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/mac-perview.png",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    title,
    description,
    siteId: "1467726470533754880",
    creator: "@Andy",
    creatorId: "1467726470533754880",
    images: [
      {
        url: "/mac-perview.png",
        width: 800,
        height: 600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo125.png",
    shortcut: "/logo125.png",
    apple: "/logo125.png",
    other: {
      rel: "/logo125.png",
      url: "/logo125.png",
    },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
  },
  category: "education",
  other: {
    "shortcut icon": "/images/favicon.ico",
  },
}
