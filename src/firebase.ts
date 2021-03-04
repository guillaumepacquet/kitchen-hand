import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { recipeConverter } from './core/model/recipe';

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection('users');

const users = function () {
    return db.collection('users');
};

const recipes = function (user: string) {
    return db.collection('users')
        .doc(user)
        .collection('recipes')
        .withConverter(recipeConverter);
};

// export utils/refs
export {
    db,
    auth,
    users,
    recipes,
    usersCollection
};
