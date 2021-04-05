import ShoppingItem from '@/core/model/shopping-item';
import User from '@/core/model/user';
import { QueryBuilder } from '@/core/firestore/query-builder';
import { Module } from 'vuex';
import { RootState } from '.';

type itemShop = {
    name: string;
    quantity: number;
    unit: string;
    isDone: boolean;
};

export interface ShoppingListState {
    shoppingItems: ShoppingItem[];
    ids: string[];
    unsubscribe: () => void;
}

const user: Module<ShoppingListState, RootState> = {
    namespaced: true,
    state: {
        shoppingItems: [],
        ids: [],
        unsubscribe: () => {
            //avoid eslint error
        }
    },
    getters: {
        shoppingItems: state => {
            const result = [] as itemShop[];
            state.shoppingItems.forEach(item => {
                const index = result.findIndex(a => a.name === item.name);
                if (-1 === index) {
                    result.push({ name: item.name, quantity: item.quantity, unit: item.unit, isDone: item.isDone });
                } else {
                    result[index].quantity = result[index].quantity + item.quantity;
                }
            });

            return result;
        }
    },
    actions: {
        async add(store, item: ShoppingItem) {
            const userId = store.rootGetters['user/userId'];
            const query = await (new QueryBuilder(new ShoppingItem(null, '', 0, '')))
                .fromDocument(new User(userId, ''))
                .getQuery();


            const docRef = await query.add(item);
            item.id = docRef.id;
        },
        delete(store, itemName: string) {
            const userId = store.rootGetters['user/userId'];

            store.state.shoppingItems.forEach(async item => {
                if (itemName === item.name && item.id !== null) {

                    const query = await (new QueryBuilder(new ShoppingItem(null, '', 0, '')))
                        .fromDocument(new User(userId, ''))
                        .getQuery();
                    await query.doc(item.id).delete();
                }
            });
        },
        updateDoneStatus(store, shoppingItem: itemShop) {
            const userId = store.rootGetters['user/userId'];

            store.state.shoppingItems.forEach(async item => {
                if (shoppingItem.name === item.name && item.id !== null) {
                    const query = await (new QueryBuilder(new ShoppingItem(null, '', 0, '')))
                        .fromDocument(new User(userId, ''))
                        .getQuery();
                    await query.doc(item.id).update({ isDone: shoppingItem.isDone });
                }
            });
        },
        async listen({ commit, rootGetters }) {
            const query = await (new QueryBuilder(new ShoppingItem(null, '', 0, '')))
                .fromDocument(new User(rootGetters['user/userId'], ''))
                .getQuery();

            const unsubscribe = query.onSnapshot((shoppingItemsSnapshot) => {
                if (shoppingItemsSnapshot) {
                    const shoppingItems: ShoppingItem[] = [];
                    shoppingItemsSnapshot.forEach(shoppingItem => {
                        shoppingItems.push(shoppingItem.data());
                    });

                    commit('UPDATE', shoppingItems);
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
        ['UPDATE'](state, shoppingItems: ShoppingItem[]) {
            state.shoppingItems = shoppingItems;
        }
    }
};

export default user;
