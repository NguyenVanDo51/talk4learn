// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { NextResponse } from 'next/server'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBKk1sRmYvgQM8MT2hMUAzbE62Wz6qb6JY',
  authDomain: 'ranga-f82c6.firebaseapp.com',
  projectId: 'ranga-f82c6',
  storageBucket: 'ranga-f82c6.appspot.com',
  messagingSenderId: '883604626685',
  appId: '1:883604626685:web:bc4ab3c23820490ed8f294',
  measurementId: 'G-069RCXW2E9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export async function POST() {
  try {
    const db: any = getFirestore(app)
    const res = await db.collection('cities').doc('LA').set({ data: 'a' })
    return NextResponse.json(res)
  } catch (e) {
    console.log('e', e)
    return NextResponse.json(e)
  }
}
