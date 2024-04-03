import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA5AAPYVhi75wl2Ik-O8jTnzWZbZy78grk",
    authDomain: "maggieslanches-f9288.firebaseapp.com",
    projectId: "maggieslanches-f9288",
    storageBucket: "maggieslanches-f9288.appspot.com",
    messagingSenderId: "649801172384",
    appId: "1:649801172384:web:aee8260b22e72b745850c5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };