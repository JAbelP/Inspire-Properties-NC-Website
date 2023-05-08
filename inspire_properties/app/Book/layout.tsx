import Myfooter from "../component/Footer";
import MyHeader from "../component/Header";




export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <>
        <MyHeader/>
        <main className='flex-grow'>
        {children}
        </main >
        <footer>
          <Myfooter />
        </footer >
      </>        
  )
}