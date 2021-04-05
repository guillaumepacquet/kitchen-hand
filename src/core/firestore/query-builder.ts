import * as fb from '@/firebase';
import { FirestoreData } from '@/core/firestore/type';

export class QueryBuilder<Type> {
    private firestoreClass: FirestoreData<Type>;
    private relations: FirestoreData<any>[];

    constructor(firestoreClass: FirestoreData<Type>) {
        this.firestoreClass = firestoreClass;
        this.relations = [];
    }

    async getQuery() {
        let db = fb.db as firebase.default.firestore.Firestore | firebase.default.firestore.DocumentReference;

        for (let i = 0; i < this.relations.length; i++) {
            const item = this.relations[i];
            db = await db.collection(this.getCollectionName(item)).doc(item.id as string);
        }

        return await db.collection(this.getCollectionName(this.firestoreClass)).withConverter(this.firestoreClass);
    }

    fromDocument(firestoreClass: FirestoreData<any>) {
        if (firestoreClass.id === null) {
            throw 'Document doesn\'t exist';
        }

        this.relations.push(firestoreClass);

        return this;
    }

    getCollectionName(firestoreClass: FirestoreData<any>): string {
        return (firestoreClass.constructor.name + 's').toLowerCase();
    }
}

