import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { GlobalProvider } from "./_redux/provider";

const font = localFont({
  src: "../public/fonts/HiraginoKakuGothicProN.otf",
  weight: "600",
});

export const metadata: Metadata = {
  title: "プラスケア スーパーリアル AI",
  description: "プラスケア スーパーリアル AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager">
          {`
            (function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != "dataLayer" ? "&l=" + l : "";
  j.async = true;
  j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-WRR9LGHN");
            `}
        </Script>
        <body className={font.className}>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WRR9LGHN"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <main className="tw-min-h-screen">
            <GlobalProvider>{children}</GlobalProvider>
          </main>
        </body>
      </head>
    </html>
  );
}
