"use client"
import React, { useEffect, useState} from 'react'
import { servicesWeOffer } from '../../../data/services-data';
import PhoneInput from './PhoneEntryBooking';
import EmailInput from './EmailEntryBooking';
import NameInput from './NameEntryBooking';
import AddressInput from './AddressEntryBooking';
import DropdownMenu from './DropDownForBookings';
import DateInput from './DateEntryBooking';
import { getDatabase, ref, onValue, off, set } from 'firebase/database';
import app from '../../firebaseConfig'
import { useRouter } from 'next/navigation';
import HCaptchaComponent from './HCaptcha';


function SubmissionPage() {
    const [ clientEmail , setClientEmail ] = useState('');
    const [ clientPhone , setClientPhone ] = useState('');
    const [ clientAddress, setClientAddress ] = useState('');
    const [ clientName, setClientName ] = useState('');
    const [ clientDate, setClientDate ] = useState(new Date());
    const [ , setClientServicesAmount ] = useState(['-----Please Select a Service-----']);
    const [ clientNewServiceAmount,setClientNewServiceAmount ] = useState([{Service:'-----Please Select a Service-----',AdditionalInfo:""}])
    const [dataBasedata, setDataBasedata] = useState([]);
    const [isHuman, setIsHuman] = useState(false);
    const [ successfulButtonSubmit, setSuccessfulButtonSubmit] = useState(true);
    const router = useRouter();

    let db = null

   

    /**
     * token to verify if human
     * @param {token} token 
     */
    const handleHcaptchaVerify  = async (token) => {
      const send = {token:token}
      const response = await fetch('/api/humanVerify',{
        method:'POST',
        body:JSON.stringify(send)
      })
      if(response.ok){
        
        setIsHuman(true);
        return;
      }
      else{
        return;
      }
      
    }

    /**
     * passed into the email input, this
     * is the client's email
     * @param {string} clientEmailResponse 
     */
    const handleClientEmail = (clientEmailResponse) => {
        setClientEmail(clientEmailResponse);
    }
    
    /**
     * this is the client's phone number
     * @param {string} clientPhoneResponse 
     */
    const handleClientPhone = (clientPhoneResponse) => {
        setClientPhone(clientPhoneResponse);
    }

    /**
     * Client's address
     * @param {string} clientAddressResponse 
     */
    const handleClientAddress = (clientAddressResponse) => {
        setClientAddress(clientAddressResponse);
    }

    /**
     * client's name
     * @param {string} clientNameResponse 
     */
    const handleClientName = (clientNameResponse) => {
      setClientName(clientNameResponse);
    }
    
    /**
     * prefered date to begin project
     * @param {date} clientDateResponse 
     */
    const handleClientDate = (clientDateResponse) => {
      setClientDate(clientDateResponse);
    }
    /**
     * add a service component
     */
    const addServiceButton = () => {
        let tempService = clientNewServiceAmount
        tempService = [...tempService,{Service:'-----Please Select a Service-----',AdditionalInfo:""}]
        setClientNewServiceAmount(tempService);
    }

    /**
     * array passed up from the child component
     * replaces the service at the index
     * @param {array} temp 
     */
    const changeServiceAtIndex = (index,temp) =>{
      let tempList = [...clientNewServiceAmount]
      tempList[index] = temp
      setClientNewServiceAmount(tempList)
    }

    /**
     * deletes service at the index
     * @param {int} index 
     */
    const deleteServiceButton = (index) => {
        // Make a copy of the current services array in state
        const updatedServices = [...clientNewServiceAmount];
        updatedServices.splice(index,1)
        setClientNewServiceAmount(updatedServices)
    }

    const canSubmitBeClicked = () =>{
      //it should be clickable if humanVerify is true and 
      if(isHuman && successfulButtonSubmit){
        setSuccessfulButtonSubmit(false);
        return true;
      }
      return false;
    }
    /**
     * validates if all inputs where filled in.
     * @returns null
     */
    const handleSubmit = () =>{
      
        if(!clientPhone || !clientEmail || !clientAddress || !isHuman){
            let warning = 'please provide: '
            if( !clientName){
              warning = warning.concat(" ", "Your Name")
            }
            if( !clientPhone){
                warning = warning.concat(" ", "phone")
            }
            if ( !clientEmail){

                warning = warning.concat(" ", "email")

            }
            if ( !clientAddress){
                warning = warning.concat(" ", "address")
            }
            if( !isHuman){
              warning = warning.concat(" ","fufill captcha")
            }
            if(!clientPhone && !clientEmail && !clientAddress && !isHuman){
                warning = "Please provide your name, a phone number, email, address, and captcha"
            }
            alert(warning)
            return;
        }
        //This needs to be fixed to take in the name and date.
        if(clientDate === undefined){

        writeData(clientName,clientEmail,clientPhone,clientAddress,clientNewServiceAmount);
        sendEmail(clientName,clientEmail,clientPhone,clientAddress, clientNewServiceAmount)
      }
      else{
        writeData(clientName,clientEmail,clientPhone,clientAddress,clientNewServiceAmount,clientDate);
        sendEmail(clientName,clientEmail,clientPhone,clientAddress, clientNewServiceAmount,clientDate)
      }
        return (
            
            router.push('/Book/Success')
          );


    }

    /**
     * method controls sending data to email
     * @param {string} email 
     * @param {string} phone 
     * @param {string} address 
     * @param {[string]} services 
     */
    const sendEmail = async (name,email, phone, address, services,dateAndTime = new Date()) => {
      if (typeof dateAndTime === 'string') {
        dateAndTime = new Date(dateAndTime);
      };
      //formatting date and all that jazz
      const year = dateAndTime.getFullYear();
      const month = dateAndTime.getMonth();
      const day = dateAndTime.getDate();
      const hours = dateAndTime.getHours();
      const minutes = dateAndTime.getMinutes();

      const formattedDateAndTime = new Date(year, month, day, hours, minutes).toString();

        const emailBody = {
          name:name,
          email:email,
          phone:phone,    
          address:address,
          dateAndTime:formattedDateAndTime,
          services:services
        };
        
        try {
          const response = await fetch('/api/jobEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailBody)
          });
      
          if (response.ok) {
            console.log('Email sent successfully');
          } else {
            console.error('Failed to send email');
          }
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };



     /**
     *  Write to real time firebase database.
     * 
     * @param {string} name 
     * @param {string} email 
     * @param {string} phone 
     * @param {string} address 
     * @param {[string]} services 
     * @param {dateTime} dateAndtime 
     * 
     * 
     **/
    const writeData = async (name, email, phone, address, services, dateAndTime = new Date()) => {
      // If dateAndTime is a string, convert it to a Date object
      if (typeof dateAndTime === 'string') {
        dateAndTime = new Date(dateAndTime);
      }
    
      // Get year, month, day, hours, and minutes from the dateAndTime object
      const year = dateAndTime.getFullYear();
      const month = dateAndTime.getMonth();
      const day = dateAndTime.getDate();
      const hours = dateAndTime.getHours();
      const minutes = dateAndTime.getMinutes();
    
      // Create a new Date object with the desired format
      const formattedDateAndTime = new Date(year, month, day, hours, minutes).toString();
    
        const submit ={
          name,
          email,
          phone,
          address,
          services,
          dateAndTime
        }
        try{
          const response = await fetch('/api/databaseClient',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(submit)
          });

          if (response.ok){
            console.log('Wrote to Database Successfully');
          } else{
            console.error('Failed writing to Database');
          }
        } catch(error) {
          console.error('Error writing to Database: ', error);
        }

    
    };
    
    
    
    
    
    
    
      
      

    return (
        <div>
            <div className="w-full h-full bg-gray-600 text-black  overflow-hidden p-4">
            <div className="w-full h-full bg-gray-600 text-black  overflow-hidden p-4">
              <div className="flex flex-col items-center">
                <NameInput handleName={handleClientName} />
                <PhoneInput handlePhone={handleClientPhone} />
                <EmailInput handleEmail={handleClientEmail} />
                <AddressInput handleAddress={handleClientAddress} />
                <DateInput handleDate={handleClientDate} />
              </div>
                </div>
                {clientNewServiceAmount?.map((serviceAndAdd, index) => (
                    <div key={`service-${index} `}>
                    <div className='flex flex-col items-center'>
                        <DropdownMenu clientNewServiceAmount={clientNewServiceAmount} selectedServiceAndAdd={serviceAndAdd} services={servicesWeOffer} index={index}  changeServiceAtIndex={(temp)=>changeServiceAtIndex(index,temp)} />
                    </div>                        
                        <div className='flex'>
                            {index === (clientNewServiceAmount.length - 1) && (
                                <button className='bg-greenLogo p-3' onClick={addServiceButton}> Add a service </button>
                            )}
                            {   index !== 0 &&
                                    <div className='ml-auto'>
                                        <button className='bg-red-600 p-3' onClick={() => deleteServiceButton(index)}>
                                            Delete      
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                ))}

            <HCaptchaComponent onVerify={handleHcaptchaVerify} />
            <button className='bg-greenLogo p-4 m-4' onClick={handleSubmit} disabled={(canSubmitBeClicked?(false):(true))}> submit </button>
            </div>
        </div>
    )
}

export default SubmissionPage;
