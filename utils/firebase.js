import { getApp, getApps, initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBTzFF3_Kv1qv_ySwdfpYisg0pDRY8Rq_g',
  authDomain: 'flipr-build.firebaseapp.com',
  projectId: 'flipr-build',
  storageBucket: 'flipr-build.appspot.com',
  messagingSenderId: '69840719952',
  appId: '1:69840719952:web:cff7341e00f36e78398155',
  measurementId: 'G-T7Q6KWRPJV',
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const storage = getStorage()

export { app, storage }
