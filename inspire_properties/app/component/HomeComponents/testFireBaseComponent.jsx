"use client"
import React, { useEffect } from 'react';
import { getDatabase, ref, onValue, off} from "firebase/database";
import app from '../../firebaseConfig'

function TestFireBaseComponent() {
    useEffect(() => {
        const db = getDatabase();
        const clientRef = ref(db, '/');
        onValue(clientRef, (snapshot) => {
            const data = snapshot.val();
            console.log('Data:', data);
            // You can access the data from the snapshot object and do whatever you want with it
        });

        // Clean up the listener when component unmounts
        return () => {
            off(clientRef);
        };
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>TestFireBaseComponent</div>
    );
}

export default TestFireBaseComponent;
