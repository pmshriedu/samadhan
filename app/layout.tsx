import type { Metadata } from "next";
import "./globals.css";
import SamadhanNavbar from "@/components/samadhan-navbar";
import SamadhanFooter from "@/components/samadhan-footer";

export const metadata: Metadata = {
     title: "SAMADHAN - Citizen Portal",
     description: "Submit and track your queries with SAMADHAN",
};

export default function SamadhanLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en">
               <body>
                    <div className="flex flex-col min-h-screen">
                         <SamadhanNavbar />
                         <main className="flex-1">{children}</main>
                         <SamadhanFooter />
                    </div>
               </body>
          </html>
     );
}
