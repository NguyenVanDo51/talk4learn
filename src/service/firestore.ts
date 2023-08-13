import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBKk1sRmYvgQM8MT2hMUAzbE62Wz6qb6JY',
  authDomain: 'ranga-f82c6.firebaseapp.com',
  projectId: 'ranga-f82c6',
  storageBucket: 'ranga-f82c6.appspot.com',
  messagingSenderId: '883604626685',
  appId: '1:883604626685:web:bc4ab3c23820490ed8f294',
  measurementId: 'G-069RCXW2E9',
}

const app = initializeApp(firebaseConfig)
export const firestore: any = getFirestore(app)