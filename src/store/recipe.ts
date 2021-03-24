import Recipe from '@/core/model/recipe';
import * as fb from '@/firebase';
import { Module } from 'vuex';
import { RootState } from '.';


export interface RecipeState {
    recipes: Recipe[];
    unsubscribe: () => void;
}

const user: Module<RecipeState, RootState> = {
    namespaced: true,
    state: {
        recipes: [],
        unsubscribe: () => {
            //avoid eslint error
        }
    },
    getters: {
        recipes: state => state.recipes
    },
    actions: {
        async add(store, recipe: Recipe) {
            const userId = store.rootGetters['user/userId'];

            await fb.recipes(userId)
                .doc()
                .set(recipe);
        },
        async delete(store, recipe: string) {
            const userId = store.rootGetters['user/userId'];

            await fb.recipes(userId).doc(recipe).delete();
        },
        async get({ commit, rootGetters }) {
            const userId = rootGetters['user/userId'];

            const snapshot = await fb.recipes(userId).get();

            snapshot.forEach(doc => {
                commit('ADD', doc.data());
            });
        },
        listen({ commit, rootGetters }) {
            const unsubscribe = fb.recipes(rootGetters['user/userId']).onSnapshot((recipesSnapshot) => {
                if (recipesSnapshot) {
                    const recipes: Recipe[] = [];
                    recipesSnapshot.forEach(recipe => {
                        recipes.push(recipe.data());
                    });

                    commit('UPDATE_RECIPES', recipes);
                }
            });

            commit('SET_UNSUBSCRIBE', unsubscribe);
        },
        stopListening({ commit }) {
            commit('UNSUBSCRIBE');
        }
    },
    mutations: {
        ['SET_UNSUBSCRIBE'](state, unsubscribe) {
            state.unsubscribe = unsubscribe;
        },
        ['UNSUBSCRIBE'](state) {
            state.unsubscribe();
            state.unsubscribe = () => {
                //avoid eslint error
            };
        },
        ['ADD'](state, recipe: Recipe) {
            state.recipes.push(recipe);
        },
        ['UPDATE_RECIPES'](state, recipes: Recipe[]) {
            state.recipes = recipes;
        }
    }
};

export default user;
