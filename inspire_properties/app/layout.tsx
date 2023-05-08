import './globals.css'
import Myfooter from "./component/Footer";
import MyHeader from "./component/Header";




export const metadata = {
  title: 'Inspire Properties',
  description: 'Your Property Our Investment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        {children}
    </html>
  )
}
