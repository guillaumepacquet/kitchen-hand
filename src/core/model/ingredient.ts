type NullableString = string | null;

export default class Ingredient {
    private _id: NullableString;
    private _name: string;
    private _quantity: string;
    private _unit: string;

    constructor(id: NullableString, name: string, quantity: string, unit: string) {
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
}

type snapshot = firebase.default.firestore.QueryDocumentSnapshot;

export const ingredientConverter = {
    toFirestore: function (ingredient: Ingredient) {
        return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
        };
    },
    fromFirestore: function (snapshot: snapshot) {
        const data = snapshot.data();

        return new Ingredient(snapshot.id, data.name, data.quantity, data.unit);
    }
};
