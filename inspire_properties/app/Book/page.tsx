import SubmissionPage from '../component/BookingComponents/SubmissionPage';
import MyHeader from '../component/Header'
import Myfooter from '../component/Footer';

export default function Book() {
  

  return (
    <div  className='bg-gray-600 min-h-screen flex flex-col'>
      <MyHeader/>
      <main className='flex-grow'>
        <div>
          <SubmissionPage/>
        </div>
      </main>
      <footer>
        <Myfooter/>
      </footer>
      </div>
    )
}
