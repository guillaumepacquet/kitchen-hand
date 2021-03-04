
export default class Recipe {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
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

        return new Recipe(data.name);
    }
};
