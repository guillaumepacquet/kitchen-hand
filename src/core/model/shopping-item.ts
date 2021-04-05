import { FirestoreData, FirestoreDocumentId, Snapshot } from '@/core/firestore/type';

export default class ShoppingItem implements FirestoreData<ShoppingItem> {
    private _id: FirestoreDocumentId;
    private _name: string;
    private _quantity: number;
    private _unit: string;
    private _done: boolean;

    constructor(id: FirestoreDocumentId, name: string, quantity: number, unit: string, isDone = false) {
        this._id = id;
        this._name = name;
        this._quantity = quantity;
        this._unit = unit;
        this._done = isDone;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get quantity() {
        return this._quantity;
    }

    set addQuantity(quantity: number) {
        this._quantity = this._quantity + quantity;
    }

    get unit() {
        return this._unit;
    }

    get isDone() {
        return this._done;
    }

    set isDone(isDone: boolean) {
        this._done = isDone;
    }

    toFirestore(ingredient: ShoppingItem) {
        return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            isDone: ingredient.isDone,
        };
    }

    fromFirestore(snapshot: Snapshot) {
        const data = snapshot.data();

        return new ShoppingItem(snapshot.id, data.name, data.quantity, data.unit, data.isDone);
    }
}
