export type FirestoreDocumentId = string | null;

export type Snapshot = firebase.default.firestore.QueryDocumentSnapshot;

export interface FirestoreData<T> {
    id: FirestoreDocumentId;
    toFirestore: (value: T) => any;
    fromFirestore: (snapshot: Snapshot) => T;
}
