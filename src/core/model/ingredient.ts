import { FirestoreData, FirestoreDocumentId, Snapshot } from '@/core/firestore/type';

export default class Ingredient implements FirestoreData<Ingredient> {
    private _id: FirestoreDocumentId;
    private _name: string;
    private _quantity: string;
    private _unit: string;

    constructor(id: FirestoreDocumentId, name: string, quantity: string, unit: string) {
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._unit = unit;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get quantity() {
        return this._quantity;
    }

    get unit() {
        return this._unit;
    }

    toFirestore(ingredient: Ingredient) {
        return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
        };
    }

    fromFirestore(snapshot: Snapshot) {
        const data = snapshot.data();

        return new Ingredient(snapshot.id, data.name, data.quantity, data.unit);
    }
}
