import {getFireStore, collection, getDocs, addDoc,doc, setDoc} from "firebase/firestore";
import db from "../../firebaseConfig";

export async function POST(req){
    const body = await req.text();
    const {projectName,projectLocation,expectedHours,expectedBudget} = JSON.parse(body);

    try{
    const temp = collection(db,'Projects');
    const docRef = await addDoc(temp,{
        projectName,
        projectLocation,
        expectedHours,
        expectedBudget
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
    // const temp = collection(db,'Projects');
    // const projectsSnapshot = await getDocs(temp);
    // const projectslist = projectsSnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))

    const projectlist = {
                    id:1234,
                        data:{
                            projectName: "Project one",
                            projectLocation: "Home",
                            expectedHours: 10,
                            expectedBudget:60
                            }}

    return new Response(JSON.stringify(projectlist),{
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

        temp = collection(db,'Projects');
        const projectRef = doc(temp,body.id);
        await setDoc(projectRef, {data:body.updatedData});
        return new Response (`${body.id} has been updated with ${body.updatedData}`,{status:200})        
    }
    catch(error){
        return new Response(`Failed to update document - error: ${error}`), {
            status:500
        }
    }

}
