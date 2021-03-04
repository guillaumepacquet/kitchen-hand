import Vue from 'vue';
import Vuex from 'vuex';

import user, { UserState } from '@/store/user';
import recipe, { RecipeState } from '@/store/recipe';

export interface RootState {
    user: UserState;
    recipe: RecipeState;
}

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
    modules: {
        user,
        recipe
    }
});

export default store;
