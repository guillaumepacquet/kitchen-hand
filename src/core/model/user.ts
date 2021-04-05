import { FirestoreData, FirestoreDocumentId, Snapshot } from '@/core/firestore/type';

export default class User implements FirestoreData<User> {
    _id: FirestoreDocumentId;
    private _email: string;

    constructor(id: FirestoreDocumentId, email: string) {
        this._id = id;
        this._email = email;
    }

    get id() {
        return this._id;
    }

    get email() {
        return this._email;
    }

    toFirestore(user: User) {
        return {
            email: user.email,
        };
    }

    fromFirestore(snapshot: Snapshot) {
        const data = snapshot.data();

        return new User(snapshot.id, data.email);
    }
}
