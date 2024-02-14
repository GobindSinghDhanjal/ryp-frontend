import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: 'RateYourProfessor',
  description: 'Rate Your Professor anonymously',
  icons: {
    icon: '/images/ryp-04.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html className={`${poppins.variable}`}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  )
}