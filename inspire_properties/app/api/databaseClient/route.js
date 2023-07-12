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