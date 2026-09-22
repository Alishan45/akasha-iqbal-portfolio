import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  ],
  authors: [{ name: "Akasha Iqbal" }],
  creator: "Akasha Iqbal",
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Akasha Iqbal | English Educator & Literary Researcher",
    description: "The professional portfolio of Akasha Iqbal, English educator and literary researcher.",
    type: "profile",
    firstName: "Akasha",
    lastName: "Iqbal",
    locale: "en_PK",
  },
  twitter: {
    card: "summary",
    title: "Akasha Iqbal | English Educator & Literary Researcher",
    description: "English educator, literature graduate, and literary researcher based in Wah Cantt, Pakistan.",
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
              jobTitle: "English Educator and Literary Researcher",
              description: "English educator, literature graduate, and literary researcher based in Wah Cantt, Pakistan.",
              email: "mailto:Akashaiqbal45@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Wah Cantt", addressCountry: "PK" },
              alumniOf: { "@type": "CollegeOrUniversity", name: "University of the Punjab" },
              knowsAbout: ["English Literature", "Literary Research", "Linguistics", "Teaching", "Feminist Literary Criticism"],
            }),
          }}
        />
      </body>
    </html>
  );
}
