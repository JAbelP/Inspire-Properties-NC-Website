import {getFireStore, collection, getDocs, addDoc,doc, setDoc} from "firebase/firestore";
import {db} from "../../firebaseConfig";


export async function POST(req) {
    const body = await req.text();
   const { projectId, extraExpense  } = JSON.parse(body);

    try {
      const temp = collection(db, `projects/${projectId}/extraExpenses`);
      const docRef = await addDoc(temp, {
        extraExpense
      });
  
      return new Response(JSON.stringify(docRef), {
        status: 200
      });
    } catch (error) {
      return new Response(`failed to add extra expense: ${error}`, {
        status: 500
      });
    }
  }
  