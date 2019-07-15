import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyAxzOvOcrTbpQi2pNZ1_4ZYn8coZ8hRYGU",
authDomain: "explor-fecbc.firebaseapp.com",
databaseURL: "https://explor-fecbc.firebaseio.com",
projectId: "explor-fecbc",
storageBucket: "explor-fecbc.appspot.com",
messagingSenderId: "737921679726",
appId: "1:737921679726:web:53ff3a7c4e61ce03"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;