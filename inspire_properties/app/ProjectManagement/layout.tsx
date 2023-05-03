export const metadata = {
    title: 'Project Management',
    description: 'Inspire Properties',
  }
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className='bg-slate-500 min-h-screen'>
          <main className='flex-grow'>
          {children}
          </main >
          <footer>
        </footer >        
        </body>
      </html>
    )
  }