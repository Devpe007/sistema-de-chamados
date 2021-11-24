import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDGDxi9nh3kwif_Aw9P4LUSljYY7Z4Ailw",
    authDomain: "sistema-de-chamados-6c90c.firebaseapp.com",
    projectId: "sistema-de-chamados-6c90c",
    storageBucket: "sistema-de-chamados-6c90c.appspot.com",
    messagingSenderId: "38059402607",
    appId: "1:38059402607:web:ae25f2c33afb230429749a",
    measurementId: "G-60CC41BGN7"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};

export default firebase;