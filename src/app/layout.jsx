import "@/styles/global.css";

import { ViewTransitions } from "next-view-transitions";

const APP_NAME = "Poetry LA";
const APP_DEFAULT_TITLE = "Poetry LA";
const APP_TITLE_TEMPLATE = "%s | Poetry LA";
const APP_DESCRIPTION = "A Video Gallery of Poets in Southern California";
const APP_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://poetry.la";

export const metadata = {
  metadataBase: APP_BASE_URL,
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: APP_BASE_URL,
    images: [
      {
        url: "/images/png/og-image.png",
        width: 1200,
        height: 630,
        alt: APP_DEFAULT_TITLE,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    images: ["/images/png/og-image.png"],
    description: APP_DESCRIPTION,
  },
  authors: [{ name: "Studio Brunch", url: "https://brunch.work" }],
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className="grid">
          {children}
          {/* <LayoutInner>{children}</LayoutInner> */}
        </body>
      </html>
    </ViewTransitions>
  );
}
