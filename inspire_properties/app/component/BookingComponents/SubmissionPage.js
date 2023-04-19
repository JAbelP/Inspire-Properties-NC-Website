"use client"
import React, { useEffect, useState} from 'react'
import { servicesWeOffer } from '../../../data/services-data';
import PhoneInput from './PhoneEntryBooking';
import EmailInput from './EmailEntryBooking';
import AddressInput from './AddressEntryBooking';
import DropdownMenu from './DropDownForBookings';
import { getDatabase, ref, onValue, off, set } from 'firebase/database';
import app from '../../firebaseConfig'
import { useRouter } from 'next/navigation';




function SubmissionPage() {

    const [ clientEmail , setClientEmail ] = useState('');
    const [ clientPhone , setClientPhone ] = useState('');
    const [ clientAddress, setClientAddress ] = useState('');
    const [ clientServicesAmount, setClientServicesAmount ] = useState(['-----Please Select a Service-----']);
    const [dataBasedata, setDataBasedata] = useState([]);
    const router = useRouter();

    let db = null
    //getting database information
    useEffect(() => {
        db = getDatabase();
        const clientRef = ref(db, '/Clients');
        onValue(clientRef, (snapshot) => {
            const DataBasedata = snapshot.val();
            setDataBasedata(DataBasedata);  
            // You can access the data from the snapshot object and do whatever you want with it
            
        });
        // Clean up the listener when component unmounts
        return () => {
            off(clientRef);
        };

    }, []);

    useEffect(() => {
        console.log("Database Boy1: ", dataBasedata);
    }, [dataBasedata]);

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
     * add a service component
     */
    const addServiceButton = () => {
        let tempService = clientServicesAmount
        tempService = [...tempService,"-----Please Select a Service-----"]
        setClientServicesAmount(tempService);
    }

    /**
     * array passed up from the child component
     * replaces the service at the index
     * @param {array} temp 
     */
    const changeServiceAtIndex = (temp) =>{
        setClientServicesAmount(temp)
    }

    /**
     * deletes service at the index
     * @param {int} index 
     */
    const deleteServiceButton = (index) => {
        // Make a copy of the current services array in state
        const updatedServices = [...clientServicesAmount];
        console.log(clientServicesAmount)
        updatedServices.splice(index,1)
        setClientServicesAmount(updatedServices)
    }

    /**
     * validates if all inputs where filled in.
     * @returns null
     */
    const handleSubmit = () =>{

        if(!clientPhone || !clientEmail || !clientAddress){
            let warning = 'please provide: '
            if( !clientPhone){
                warning = warning.concat(" ", "phone")
            }
            if ( !clientEmail){

                warning = warning.concat(" ", "email")

            }
            if ( !clientAddress){
                warning = warning.concat(" ", "address")

            }
            if(!clientPhone && !clientEmail && !clientAddress){
                warning = "Please provide a phone number, email, and address"
            }
            alert(warning)
            return;
        }

        writeData(clientEmail,clientPhone,clientAddress,clientServicesAmount);
        return (
            console.log("yolo"),
            router.push('/Book/Success')
          );
        

    }

    /**
     * 
     * @param {string} email 
     * @param {string} phone 
     * @param {string}} address 
     * @param {[]} services 
     */
    const writeData = (email, phone, address, services) => {
        
        console.log("DataBase 141:" , dataBasedata)
        if (dataBasedata !== null) {
            console.log("not equal to null")
          const index = dataBasedata.findIndex(
              (item) =>
                (item?.clientEmail === email && item?.clientPhone === phone) ||
                (item?.clientEmail === email && item?.clientAddress === address) ||
                (item?.clientPhone === phone && item?.clientAddress === address),
              );
          console.log("index: ", index)
          const db = getDatabase();
          let clientID = dataBasedata.length;
          const clientRef = ref(db, '/Clients');
      
          if (index !== -1) {
            console.log("it exists")
            // If data exists, update it
            const newData = [...dataBasedata];
            newData[index] = {
              ...newData[index],
              clientEmail: email,
              clientPhone: phone,
              clientAddress: address,
              services: services,
              clientID: index + 1,
            };
            const filteredData = newData.filter((item) => item !== undefined);
            setDataBasedata(newData);
            if (filteredData.length > 0) {
              set(clientRef, newData); // Update data in the database
            } else {
              console.error("Data is undefined, cannot update in the database.");
            }
          } else {
            // If data doesn't exist, add it
            setDataBasedata((prevData) => [
              ...prevData,
              {
                clientEmail: email,
                clientPhone: phone,
                clientAddress: address,
                services: services,
                clientID: clientID + 1,
              },
            ]);
            set(
              clientRef,
              [
                ...dataBasedata,
                {
                  clientEmail: email,
                  clientPhone: phone,
                  clientAddress: address,
                  services: services,
                  clientID: clientID + 1,
                },
              ].filter((item) => item !== undefined)
            ); // Update data in the database
          }
        }
        else{
            let clientID = 0;
            const db = getDatabase();
            const clientRef = ref(db, '/Clients');
            set(
              clientRef,
              [
                {
                  clientEmail: email,
                  clientPhone: phone,
                  clientAddress: address,
                  services: services,
                  clientID: clientID + 1,
                },
              ]
            ); // Update data in the database
            setDataBasedata([
                {
                    clientEmail: email,
                    clientPhone: phone,
                    clientAddress: address,
                    services: services,
                    clientID: clientID + 1,
                }
            ]);
        }
    };
    
    
    
    
    
    
    
      
      

    return (
        <div>
            <div className="w-full h-full bg-gray-600 text-black  overflow-hidden p-4">
                <PhoneInput handlePhone={handleClientPhone} />
                <EmailInput handleEmail={handleClientEmail} />
                <AddressInput handleAddress={handleClientAddress} />
                {clientServicesAmount.map((service, index) => (
                    <div key={`service-${index}`}>                        
                        <DropdownMenu selectedService={service} services={servicesWeOffer} index={index} clientServicesAmount={clientServicesAmount} changeServiceAtIndex={changeServiceAtIndex} />
                        <div className='flex'>
                            {index === (clientServicesAmount.length - 1) && (
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
            <button className='bg-greenLogo p-4 m-4' onClick={handleSubmit}> submit </button>
            </div>
        </div>
    )
}

export default SubmissionPage;
