import './globals.css'






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
      <body>
        {children}
      </body>
    </html>
  )
}
