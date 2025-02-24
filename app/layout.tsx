import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Todo by Loay",
  description: "A todo web app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            <header className="flex justify-between items-center p-8 h-20">
              <Link href="/" className="font-black">
                Todo by Loay
              </Link>
              <div className="flex justify-end items-center gap-4">
                <ModeToggle />
                <SignedOut>
                  <Button variant="outline" asChild>
                    <SignInButton />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard" className="font-bold">
                      Dashboard
                    </Link>
                  </Button>
                  <UserButton />
                </SignedIn>
              </div>
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
