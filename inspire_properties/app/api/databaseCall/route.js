import { getDatabase, onValue } from 'firebase/database'
import app from '../../firebaseConfig'

export async function GET(){
    db = getDatabase();
    const clientRef = ref(db,'/clients')

    onValue(clientRef, (snapshot) =>{
        const Databasedata = snapshot.val();
    })
    

    return 


}