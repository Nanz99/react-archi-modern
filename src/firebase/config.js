import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

var firebaseConfig = {
   apiKey: "AIzaSyCj8auigZTCKMSTZXd6XIeQGqDOduS28TU",
   authDomain: "archi-modern.firebaseapp.com",
   projectId: "archi-modern",
   storageBucket: "archi-modern.appspot.com",
   messagingSenderId: "580026102058",
   appId: "1:580026102058:web:5bc48a7fc7816ebecc2e53",
   measurementId: "G-V4LE7J21XD"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

export { db, auth }
export default firebase
