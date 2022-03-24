import React from 'react'
import {  ref, child, get } from "firebase/database";
import { getDatabase } from "firebase/database";

export default function Report() {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `posts/`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  return (
    <div>
        
        Report page
    </div>
  )
}
