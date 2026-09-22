import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};


export const metadata: Metadata = {
  metadataBase: new URL("https://akashaiqbal.vercel.app"),
  title: "Akasha Iqbal | English Educator & Literary Researcher",
  description:
    "Akasha Iqbal is an English educator, literature graduate, and literary researcher based in Wah Cantt, Pakistan.",
  keywords: [
    "Akasha Iqbal",
    "Akasha Iqbal English educator",
    "Akasha Iqbal literary researcher",
    "English teacher Wah Cantt",
    "English Literature graduate Pakistan",
    "Gender Deconstruction Before She Sleeps",
    "Bina Shah feminist analysis",
    "University of the Punjab English",
  ],
  authors: [{ name: "Akasha Iqbal", url: "https://akashaiqbal.vercel.app" }],
  creator: "Akasha Iqbal",
  category: "education",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  verification: { google: "GoVY514zhiJbKBcxB-NMo2-mgX-oQYUOYdIzoPCRTIw" },
  openGraph: {
    title: "Akasha Iqbal | English Educator & Literary Researcher",
    description:
      "The professional portfolio of Akasha Iqbal, English educator and literary researcher.",
    url: "https://akashaiqbal.vercel.app",
    siteName: "Akasha Iqbal",
    type: "profile",
    firstName: "Akasha",
    lastName: "Iqbal",
    locale: "en_PK",
    images: [
      {
        url: "/my%20pic.jpg",
        width: 768,
        height: 1365,
        alt: "Akasha Iqbal — English Educator & Literary Researcher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akasha Iqbal | English Educator & Literary Researcher",
    description:
      "English educator, literature graduate, and literary researcher based in Wah Cantt, Pakistan.",
    creator: "@akashaiqbal",
    images: ["/my%20pic.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Akasha Iqbal",
              url: "https://akashaiqbal.vercel.app",
              image: "https://akashaiqbal.vercel.app/my%20pic.jpg",
              jobTitle: "English Educator and Literary Researcher",
              description:
                "English educator, literature graduate, and literary researcher based in Wah Cantt, Pakistan.",
              email: "mailto:Akashaiqbal45@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Wah Cantt",
                addressCountry: "PK",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of the Punjab",
              },
              worksFor: {
                "@type": "Organization",
                name: "Sir Syed School",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Wah Cantt",
                  addressCountry: "PK",
                },
              },
              knowsAbout: [
                "English Literature",
                "Literary Research",
                "Linguistics",
                "Teaching",
                "Feminist Literary Criticism",
                "Gender Studies",
              ],
              sameAs: ["https://github.com/Alishan45"],
            }),
          }}
        />
      </body>
    </html>
  );
}

