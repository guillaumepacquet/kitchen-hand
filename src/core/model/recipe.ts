type NullableString = string | null;

export default class Recipe {
    private _id: NullableString;
    private _name: string;

    constructor(id: NullableString, name: string) {
        this._id = id;
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }
}

type snapshot = firebase.default.firestore.QueryDocumentSnapshot;


export const recipeConverter = {
    toFirestore: function (recipe: Recipe) {
        return {
            name: recipe.name,
        };
    },
    fromFirestore: function (snapshot: snapshot) {
        const data = snapshot.data();

        return new Recipe(snapshot.id, data.name);
    }
};
