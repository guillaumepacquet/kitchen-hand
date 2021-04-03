type NullableString = string | null;

export default class ShoppingItem {
    private _id: NullableString;
    private _name: string;
    private _quantity: number;
    private _unit: string;
    private _done: boolean;

    constructor(id: NullableString, name: string, quantity: number, unit: string, isDone = false) {
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
}

type snapshot = firebase.default.firestore.QueryDocumentSnapshot;

export const shoppingItemConverter = {
    toFirestore: function (ingredient: ShoppingItem) {
        return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            isDone: ingredient.isDone,
        };
    },
    fromFirestore: function (snapshot: snapshot) {
        const data = snapshot.data();

        return new ShoppingItem(snapshot.id, data.name, data.quantity, data.unit, data.isDone);
    }
};
