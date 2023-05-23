// import app from '../../firebaseConfig';
// import { getDatabase, ref, onValue, set  } from 'firebase/database';

// export async function GET() {
//   const db = getDatabase();
//   const clientRef = ref(db, '/Clients');

//   const databaseDataPromise = new Promise((resolve, reject) => {
//     onValue(clientRef, (snapshot) => {
//       const databaseData = snapshot.val();
//       if (databaseData) {
//         resolve(databaseData);
//       } else {
//         console.log('Database query returned no data.');
//         resolve([]);
//       }
//     }, {
//       onlyOnce: true
//     });
//   });

//   try {
//     const databaseData = await databaseDataPromise; 
//     return new Response(JSON.stringify(databaseData), {
//       headers: { 'Content-Type': 'application/json' },
//       status: 200
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response('Error fetching database data', {
//       status: 500
//     });
//   }
// }

// export async function POST(request){

//     const body = await request.json();
//     try {
//         const databaseDataResponse = await GET();
//         const databaseData = await databaseDataResponse.json();
        
//         // Access the databaseData object here and do what you need to do with it
//         console.log(databaseData, "   This is from Fire base");


//         if (databaseData !== null) {
//           const index = databaseData.findIndex(
//               (item) =>
//                 (item?.clientEmail === body.email && item?.clientPhone === body.phone)     ||
//                 (item?.clientEmail === body.email && item?.clientAddress === body.address) ||
//                 (item?.clientEmail === body.email && item?.clientName === body.name)       ||
//                 (item?.clientPhone === body.phone && item?.name === body.name)             ||
//                 (item?.clientName === body.name && item?.address === body.address )        ||
//                 (item?.clientPhone === body.phone && item?.address === body.address)
//               );
//           const db = getDatabase();
//           let clientID = databaseData.length;
//           const clientRef = ref(db, '/Clients');
            
//           if (index !== -1) {
//             // If data exists, update it
//             const newData = [...databaseData];
//             newData[index] = {
//               ...newData[index],
//               clientName: body.name,
//               clientEmail: body.email,
//               clientPhone: body.phone,
//               clientAddress: body.address,
//               clientDate: body.dateAndTime,
//               services: [...newData[index].services, ...services]
//             //   clientID: index + 1,
//             };
//             const filteredData = newData.filter((item) => item !== undefined);
//             if (filteredData.length > 0) {
//               set(clientRef, newData); // Update data in the database
//             } else {
//               console.error("Data is undefined, cannot update in the database.");
//             }
//           } else {
//             // If data doesn't exist, add it
//             set(
//               clientRef,
//               [
//                 ...databaseData,
//                 {
//                   clientName: body.name,
//                   clientEmail: body.email,
//                   clientPhone: body.phone,
//                   clientAddress: body.address,
//                   services: body.services,
//                   clientDate: body.dateAndTime,
//                   clientID: clientID + 1,
//                 },
//               ].filter((item) => item !== undefined)
//             ); // Update data in the database
//           }
//         }
//         else
//         {
//             let clientID = 0;
//             const db = getDatabase();
//             const clientRef = ref(db, '/Clients');
//             set(
//               clientRef,
//               [
//                 {
//                   clientName : body.name,
//                   clientEmail: body.email,
//                   clientPhone: body.phone,
//                   clientAddress: body.address,
//                   services: body.services,
//                   clientDate: body.dateAndTime,
//                   clientID: clientID + 1,
//                 },
//               ]
//             ); // Update data in the database
//         }


//         //Check this later
//         const send ={
//           database:databaseData,
//           body:body
//         }


//         return new Response(JSON.stringify(send), {
//           status: 200
//         });
//       } catch (error) {
//         console.error(error);
//         return new Response('Error processing POST request', {
//           status: 500
//         });
//       }


// }

import {getFireStore, collection, getDocs, addDoc,doc,setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig"


export async function POST(req, res) {
  const body = await req.text();
  const { name, email, phone, address, dateAndTime, services } = JSON.parse(body);
  const databaseDataResponse = await GET();
  const databaseData = await databaseDataResponse.json();
  const isItAPut = databaseData.filter((databaseEntry) =>(
       databaseEntry.data?.email === email && databaseEntry.data.phone === phone ||
        databaseEntry.data?.email === email && databaseEntry.data.address === address ||
        databaseEntry.data?.address === address && databaseEntry.data.phone === phone
  ));
  
  if (isItAPut.length > 0) {
    const existingCustomer = isItAPut[0];
    const updatedData = {
      ...existingCustomer.data,
      ...JSON.parse(body),
      services: [...existingCustomer.data.services, ...JSON.parse(body).services]
    };
    await PUT(existingCustomer.id, updatedData);
    return new Response(updatedData,{
      status:200
    })
  }

  try {
    const temp = collection(db,'Clients');
    const docRef = await addDoc(temp, {
      name,
      email,
      phone,
      address,
      dateAndTime,
      services
    });
    return new Response(JSON.stringify(docRef), {
      status: 200
    });
  } catch (error) {
    return new Response(`Failed to add document ${error}`,{
      status:500
    });
  }  
}


export async function PUT(id, updatedData) {
  try {
    const temp = collection(db, 'Clients');
    const clientRef = doc(temp, id);
    await setDoc(clientRef, { data: updatedData });
    return;
  } catch (error) {
    console.log('Error updating document: ', error);
    return;
  }
}

export async function GET(req,res){


  // const databaseDataResponse = await GET();
  //const databaseData = await databaseDataResponse.json();
          
  const temp = collection(db,'Clients');
  const clientSnapshot = await getDocs(temp);
  const clientList = clientSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));

  return new Response(JSON.stringify(clientList), {
            status: 200
          })

}