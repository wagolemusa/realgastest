import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '../components/layouts/Footer'
import { GlobalProvider } from './GlobalProvider'
import Header6 from "../components/layouts/Header6"
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  manifest: "/manifest.json",
  title: 'Gas, Banners, Grills',
  description: 'Gas Banners, Grill',
}

export const viewport = {
  themeColor: "#3367D6",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <Header6 />
        {children}
        <Footer />
        </GlobalProvider>
      </body>
    </html>
  )
}
