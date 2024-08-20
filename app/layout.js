import "./globals.css";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: { default : "Rate Your Professor", template: "%s - Rate Your Professor"},
  description:
    "Welcome to RateYourProfessor, the platform where students have the power to share their valuable insights and experiences with professors anonymously, without the need for login or signup. We understand the significance of a supportive learning environment, and our mission is to empower students by providing a space to express their opinions on the educators who play a crucial role in their academic journey.",
};

export default function RootLayout({ children }) {
  return (
    <html className={`${poppins.variable}`}>
      <body suppressHydrationWarning={true}>{children}</body>
      <GoogleAnalytics gaId="G-VB68FXNM9S" />
    </html>
  );
}
