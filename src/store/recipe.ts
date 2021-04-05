import Recipe from '@/core/model/recipe';
import User from '@/core/model/user';
import { QueryBuilder } from '@/core/firestore/query-builder';
import { Module } from 'vuex';
import { RootState } from '.';


export interface RecipeState {
    recipes: Recipe[];
    unsubscribe: () => void;
    listener: number;
}

const user: Module<RecipeState, RootState> = {
    namespaced: true,
    state: {
        recipes: [],
        unsubscribe: () => {
            //avoid eslint error
        },
        listener: 0
    },
    getters: {
        recipes: state => state.recipes
    },
    actions: {
        async add(store, recipe: Recipe) {
            const userId = store.rootGetters['user/userId'];

            const query = await (new QueryBuilder(new Recipe(null, '')))
                .fromDocument(new User(userId, ''))
                .getQuery();

            await query.doc().set(recipe);
        },
        async delete(store, recipe: string) {
            const userId = store.rootGetters['user/userId'];


            const query = await (new QueryBuilder(new Recipe(null, '')))
                .fromDocument(new User(userId, ''))
                .getQuery();

            await query.doc(recipe).delete();
        },
        async get({ commit, rootGetters }) {
            const userId = rootGetters['user/userId'];

            const query = await (new QueryBuilder(new Recipe(null, '')))
                .fromDocument(new User(userId, ''))
                .getQuery();

            const snapshot = await query.get();


            snapshot.forEach(doc => {
                commit('ADD', doc.data());
            });
        },
        async listen({ commit, rootGetters, state }) {
            if (state.listener > 0) {
                commit('INCREMENT_LISTENER');
                return;
            }

            const query = await (new QueryBuilder(new Recipe(null, '')))
                .fromDocument(new User(rootGetters['user/userId'], ''))
                .getQuery();

            const unsubscribe = query.onSnapshot((recipesSnapshot) => {
                if (recipesSnapshot) {
                    const recipes: Recipe[] = [];
                    recipesSnapshot.forEach(recipe => {
                        recipes.push(recipe.data());
                    });

                    commit('UPDATE_RECIPES', recipes);
                }
            });

            commit('INCREMENT_LISTENER');
            commit('SET_UNSUBSCRIBE', unsubscribe);
        },
        stopListening({ commit, state }) {
            if (state.listener === 1) {
                commit('UNSUBSCRIBE');
            }

            commit('DECREMENT_LISTENER');
        }
    },
    mutations: {
        ['SET_UNSUBSCRIBE'](state, unsubscribe) {
            state.unsubscribe = unsubscribe;
        },
        ['INCREMENT_LISTENER'](state) {
            state.listener = state.listener + 1;
        },
        ['DECREMENT_LISTENER'](state) {
            state.listener = state.listener - 1;
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
