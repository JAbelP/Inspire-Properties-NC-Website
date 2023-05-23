import { collection,getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
export async function GET(req, res) {
    try {
        const data = await getDocs(collection(db, "Users"));
        const users = data.docs.map(doc => doc.data());

        return new Response(JSON.stringify(users), {
            status: 200
        });

        
    } catch (error) {
        return new Response(JSON.stringify({message: error.message}), {
            status: 500
        });
    }
}

// Next we need to create a post function based on the previous function

export async function POST(req, res) {

    const body = await req.text();
    console.log("Body: ",body);
    const {email, uid} = JSON.parse(body);

    console.log("in database Users ")
    //we need to post this information to the database (users)
    try{
        const data = await addDoc(collection(db, "Users"), {
            email,
            uid,
            authenticated: false
        });
        return new Response(JSON.stringify(data), {
            status: 200
          });

    } catch(error){ 
        return new Response(JSON.stringify({message: error.message}), {
            status: 500
          });
    }



}