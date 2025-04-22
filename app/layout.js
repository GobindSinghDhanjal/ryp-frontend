import "./globals.css";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import DrawerAppBar from "./components/DrawerAppBar/DrawerAppBar";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Rate Your Professor",
    template: "%s - Rate Your Professor",
  },
  description:
    "Welcome to RateYourProfessor, the platform where students have the power to share their valuable insights and experiences with professors anonymously, without the need for login or signup.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <DrawerAppBar />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-VB68FXNM9S" />
      </body>
    </html>
  );
}
