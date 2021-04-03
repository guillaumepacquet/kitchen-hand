import Vue from 'vue';
import Vuex from 'vuex';

import user, { UserState } from '@/store/user';
import recipe, { RecipeState } from '@/store/recipe';
import shoppingList, { ShoppingListState } from '@/store/shopping-list';

export interface RootState {
    user: UserState;
    recipe: RecipeState;
    shoppingList: ShoppingListState;
}

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
    modules: {
        user,
        recipe,
        shoppingList
    }
});

export default store;
