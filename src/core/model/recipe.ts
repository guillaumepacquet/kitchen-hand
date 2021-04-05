import { FirestoreData, FirestoreDocumentId, Snapshot } from '@/core/firestore/type';

export default class Recipe implements FirestoreData<Recipe> {
    _id: FirestoreDocumentId;
    private _name: string;

    constructor(id: FirestoreDocumentId, name: string) {
        this._id = id;
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    toFirestore(recipe: Recipe) {
        return {
            name: recipe.name,
        };
    }

    fromFirestore(snapshot: Snapshot) {
        const data = snapshot.data();

        return new Recipe(snapshot.id, data.name);
    }
}
