import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { recipeConverter } from '@/core/model/recipe';
import { ingredientConverter } from '@/core/model/ingredient';
import { shoppingItemConverter } from './core/model/shopping-item';

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

const user = function (user: string) {
    return users().doc(user);
};

const recipes = function (userId: string) {
    return user(userId)
        .collection('recipes')
        .withConverter(recipeConverter);
};

const shoppingItem = function (userId: string) {
    return user(userId)
        .collection('shoppingItems')
        .withConverter(shoppingItemConverter);
};

const ingredients = function (user: string, recipe: string) {
    return db.collection('users')
        .doc(user)
        .collection('recipes')
        .doc(recipe)
        .collection('ingredients')
        .withConverter(ingredientConverter);
};

// export utils/refs
export {
    db,
    auth,
    users,
    recipes,
    shoppingItem,
    ingredients,
    usersCollection
};
