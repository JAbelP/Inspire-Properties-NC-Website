
import { Inter } from 'next/font/google';
import { servicesWeOffer } from '../../data/services-data';
import DropdownMenu from '../component/DropDownForBookings';
import EmailInput from '../component/BookingComponents/EmailEntryBooking';
import PhoneInput from '../component/BookingComponents/PhoneEntryBooking';
import AddressInput from '../component/BookingComponents/AddressEntryBooking';

export default function Book() {


  return (
    <div>
      <div className="w-full h-full bg-gray-600 text-black  overflow-hidden p-4">
        <PhoneInput />
        <EmailInput/>
        <AddressInput/>
        <DropdownMenu services={servicesWeOffer}/>
          <div className="flex justify-center">
            <button className='bg-greenLogo text-2xl p-5'>
              Press me
            </button>
        </div>
      </div>

    </div>
 

    )
}
