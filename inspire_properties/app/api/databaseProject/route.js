import {getFireStore, collection, getDocs, addDoc,doc, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";

/**
 * 
 * @param {*} req 
 * @returns 
 */
export async function POST(req){
    const body = await req.text();
    const {projectName,projectLocation,expectedHours,expectedBudget} = JSON.parse(body);
    try{
    const temp = collection(db,'Projects');
    const docRef = await addDoc(temp,{
        projectName,
        projectLocation,
        expectedHours,
        expectedBudget,
        extraExpenses:[]
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
    const temp = collection(db,'Projects');
    const projectsSnapshot = await getDocs(temp);
    const projectlist = projectsSnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}))
    

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
/**
 * 
 * @param {body} req - This should have just the updated data  
 * @returns response
 */
export async function PUT(req){
    const body = await req.text();
    const {id,data} = JSON.parse(body);
    console.log("BODY=---------",body,"--------------");
    console.log("id",id,"data",data);
    try{

        const temp = collection(db,'Projects');
        const projectRef = doc(temp,id);
        await setDoc(projectRef, data);
        return new Response (`${body.id} has been updated with ${body.updatedData}`,{status:200})        
    }
    catch(error){
        return new Response(`Failed to update document - error: ${error}`), {
            status:500
        }
    }

}
