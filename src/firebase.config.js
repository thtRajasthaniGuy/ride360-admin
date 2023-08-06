import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAobYl86Q8rd5n7AbWUuatPC54FLmwNgr8',
  authDomain: 'ride360-20e74.firebaseapp.com',
  projectId: 'ride360-20e74',
  storageBucket: 'ride360-20e74.appspot.com',
  messagingSenderId: '508999715892',
  appId: '1:508999715892:web:2e9a24e5459365d7b64e61',
  measurementId: 'G-KTZ4CTWE19',
}

const app = initializeApp(firebaseConfig)
//export default app
export const auth = getAuth(app)
