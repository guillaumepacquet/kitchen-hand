import FirestoreRepository from '@/core/firestore/repository/firestore-repository';
import Recipe from '../model/recipe';
import User from '../model/user';

class RecipeRepository extends FirestoreRepository<Recipe> {
    constructor() {
        super(new Recipe(null, ''));
    }

    async saveForUser(userId: string, recipe: Recipe) {
        const query = await this.getQueryBuilder()
            .fromDocument(new User(userId, ''))
            .getQuery();

        await query.doc().set(recipe).catch(err => {
            console.log(err);
        });
    }

    async deleteForUser(userId: string, recipeId: string) {
        const query = await this.getQueryBuilder()
            .fromDocument(new User(userId, ''))
            .getQuery();

        await query.doc(recipeId).delete();
    }

    async getAllFromUser(userId: string) {
        const query = await this.getQueryBuilder()
            .fromDocument(new User(userId, ''))
            .getQuery();

        return await query.get();
    }

    async listenAllForUser(userId: string, callback: (snapshot: firebase.default.firestore.QuerySnapshot<Recipe>) => void) {
        const query = await this.getQueryBuilder()
            .fromDocument(new User(userId, ''))
            .getQuery();

        return query.onSnapshot(callback);
    }
}

export default new RecipeRepository();
