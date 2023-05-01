"use client"
import React from 'react'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


function page() {
    const router = useRouter();

    useEffect(() => {
      router.replace('https://linktr.ee/inspirepropertiesnc');
    }, []);
  
    return <div>Redirecting to Linktree...</div>;
}

export default page