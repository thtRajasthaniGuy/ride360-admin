import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDmtcCTwkDuJ6qATTExs9d-UZ_uxDwVUiA',
  authDomain: 'ride360-admin-panel.firebaseapp.com',
  projectId: 'ride360-admin-panel',
  storageBucket: 'ride360-admin-panel.appspot.com',
  messagingSenderId: '929352993782',
  appId: '1:929352993782:web:d0431e59a36f27d47bd5d7',
  measurementId: 'G-YKQZ01K4BG',
}

const app = initializeApp(firebaseConfig)
//export default app
export const auth = getAuth(app)
