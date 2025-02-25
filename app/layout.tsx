import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { dark } from "@clerk/themes";

export const metadata = {
  title: "Todo By Loay",
  description: "A simple Todo web app.",
  creator: "Loay Idwan",
  openGraph: {
    title: "Todo By Loay",
    siteName: "Todo By Loay",
    description: "A simple Todo web app.",
    url: "https://todo.loayidwan.com",
    type: "website",
    images: [
      {
        url: "https://todo.loayidwan.com/todo.png",
        width: 1200,
        height: 630,
        alt: "Website for A simple Todo web app.",
      },
    ],
  },
  canonical: "https://todo.loayidwan.com",
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
            <header className="flex justify-between items-center p-4 md:p-8 h-20">
              <Link href="/">
                <p className="text-xl font-black">Todo by Loay</p>
              </Link>
              <div className="flex justify-end items-center gap-2 md:gap-4">
                <ModeToggle />
                <SignedOut>
                  <Button variant="outline" asChild>
                    <SignInButton forceRedirectUrl={"/dashboard"} />
                  </Button>
                  <Button variant="outline" asChild>
                    <SignUpButton forceRedirectUrl={"/dashboard"} />
                  </Button>
                </SignedOut>
                <SignedIn>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard" className="font-bold">
                      Dashboard
                    </Link>
                  </Button>
                  <UserButton appearance={{ baseTheme: dark }} />
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
