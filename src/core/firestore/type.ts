export type FirestoreDocumentId = string | null;

export type Snapshot = firebase.default.firestore.QueryDocumentSnapshot;

export interface FirestoreDataClass<T> {
    new(): FirestoreData<T>;
}

export interface FirestoreData<T> {
    id: FirestoreDocumentId;
    toFirestore: (value: T) => any;
    fromFirestore: (snapshot: Snapshot) => T;
}

export type CollectionRelation = {
    class: FirestoreDataClass<any>;
    id: string;
};
