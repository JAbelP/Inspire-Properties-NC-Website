import {getFireStore, collection, getDocs, addDoc,doc, setDoc} from "firebase/firestore";
import db from "../../firebaseConfig";

export async function POST(req){
    const body = await req.text();
    const {employeeName,payType,employeePayRate} = JSON.parse(body);

    try{
    const temp = collection(db,'Employees');
    const docRef = await addDoc(temp,{
        employeeName,
        payType,
        employeePayRate
    });
    return new Response(JSON.stringify(docRef), {
        status: 200
      });
    
    } catch(error){
        return new Response (`Failed to add to document error: ${error}`,{
            status:500
        })
    }
}

export async function GET(){

    try{
    // const temp = collection(db,'Employee');
    // const employeeSnapshot = await getDocs(temp);
    // const employeelist = employeeSnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))

    employeelist = {
                    id:1234,
                        data:{
                            PayType:"Hourly",
                            employeeName:"Abel",
                            employeePayRate:17

                            }}

    return new Response(JSON.stringify(employeelist),{
        status:200
    })
    }
    catch(error){
        return new Response (`Failed to add to document error: ${error}`,{
            status:500
        })
    }
}

export async function PUT(req){
    const body = await req.text();
    try{

        temp = collection(db,'Employee');
        const employeeRef = doc(temp,body.id);
        await setDoc(employeeRef, {data:body.updatedData});
        return new Response (`${body.id} has been updated with ${body.updatedData}`,{status:200})        
    }
    catch(error){
        return new Response(`Failed to update document - error: ${error}`), {
            status:500
        }
    }

}
