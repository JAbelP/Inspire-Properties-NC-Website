import app from '../../firebaseConfig';
import { getDatabase, ref, onValue } from 'firebase/database';

export async function GET() {
  const db = getDatabase();
  const clientRef = ref(db, '/Clients');

  const databaseDataPromise = new Promise((resolve, reject) => {
    onValue(clientRef, (snapshot) => {
      const databaseData = snapshot.val();
      if (databaseData) {
        resolve(databaseData);
      } else {
        reject(new Error('Database query returned no data.'));
      }
    }, {
      onlyOnce: true
    });
  });

  try {
    const databaseData = await databaseDataPromise; 
    return new Response(JSON.stringify(databaseData), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response('Error fetching database data', {
      status: 500
    });
  }
}

export async function POST(request){

    const body = await request.json();
    try {
        const databaseDataResponse = await GET();
        const databaseData = await databaseDataResponse.json();
        
        // Access the databaseData object here and do what you need to do with it
        console.log(databaseData, "   This is from Fire base");
        console.log(body, " this is from the body");


        if (databaseData !== null) {
          const index = databaseData.findIndex(
              (item) =>
                (item?.clientEmail === body.email && item?.clientPhone === body.phone)     ||
                (item?.clientEmail === body.email && item?.clientAddress === body.address) ||
                (item?.clientEmail === body.email && item?.clientName === body.name)       ||
                (item?.clientPhone === body.phone && item?.name === body.name)             ||
                (item?.clientName === body.name && item?.address === body.address )        ||
                (item?.clientPhone === body.phone && item?.address === body.address)
              );
          const db = getDatabase();
          let clientID = databaseData.length;
          const clientRef = ref(db, '/Clients');
            
          if (index !== -1) {
            // If data exists, update it
            const newData = [...databaseData];
            newData[index] = {
              ...newData[index],
              clientName: body.name,
              clientEmail: body.email,
              clientPhone: body.phone,
              clientAddress: body.address,
              clientDate: body.dateAndTime,
              services: [...newData[index].services, ...services]
            //   clientID: index + 1,
            };
            const filteredData = newData.filter((item) => item !== undefined);
            if (filteredData.length > 0) {
              set(clientRef, newData); // Update data in the database
            } else {
              console.error("Data is undefined, cannot update in the database.");
            }
          } else {
            // If data doesn't exist, add it
            set(
              clientRef,
              [
                ...databaseData,
                {
                  clientName: body.name,
                  clientEmail: body.email,
                  clientPhone: body.phone,
                  clientAddress: body.address,
                  services: body.services,
                  clientDate: body.dateAndTime,
                  clientID: clientID + 1,
                },
              ].filter((item) => item !== undefined)
            ); // Update data in the database
          }
        }
        else
        {
            let clientID = 0;
            const db = getDatabase();
            const clientRef = ref(db, '/Clients');
            set(
              clientRef,
              [
                {
                  clientName : body.name,
                  clientEmail: body.email,
                  clientPhone: body.phone,
                  clientAddress: body.address,
                  services: body.services,
                  clientDate: body.dateAndTime,
                  clientID: clientID + 1,
                },
              ]
            ); // Update data in the database
        }


        //Check this later
        const send ={
          database:databaseData,
          body:body
        }


        return new Response(JSON.stringify(send), {
          status: 200
        });
      } catch (error) {
        console.error(error);
        return new Response('Error processing POST request', {
          status: 500
        });
      }


}