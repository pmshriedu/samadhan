import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import SamadhanNavbar from "@/components/samadhan-navbar";
import SamadhanFooter from "@/components/samadhan-footer";

export const metadata: Metadata = {
  title: "SAMADHAN - Citizen Grievance Portal | DAC Gangtok",
  description:
    "Submit and track feedback and grievances for District Administrative Centre, Gangtok services.",
  keywords: [
    "samadhan",
    "grievance",
    "feedback",
    "citizen",
    "DAC",
    "Gangtok",
    "government",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#16a34a",
};

export default function SamadhanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col">
          <SamadhanNavbar />
          <main className="flex-1">{children}</main>
          <SamadhanFooter />
          <Toaster richColors position="top-center" />
        </div>
      </body>
    </html>
  );
}
