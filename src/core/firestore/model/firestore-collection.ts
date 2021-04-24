import { FirestoreDocumentId, Snapshot } from '@/core/firestore/type';

export default class FirestoreDocument<T> {
    protected _id: FirestoreDocumentId;

    constructor() {
        this._id = null;
    }

    static collectionName() {
        throw 'You need to override this function';
    }

    toFirestore(model: T) {
        throw 'You need to override this function';
    }

    fromFirestore(snapshot: Snapshot) {
        throw 'You need to override this function';
    }

    get id() {
        return this._id;
    }

    set id(id: FirestoreDocumentId) {
        this._id = id;
    }
}
