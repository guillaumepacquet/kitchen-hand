import User from '@/core/model/user';
import { QueryBuilder } from '@/core/firestore/query-builder';
import * as fb from '@/firebase';
import router from '@/router/index';
import { Module } from 'vuex';
import { RootState } from '.';

interface Credentials {
    email: string;
    password: string;
}

export interface UserState {
    userProfile: {} | null;
}

const user: Module<UserState, RootState> = {
    namespaced: true,
    state: {
        userProfile: null
    },
    getters: {
        userId: function (): string {
            if (!fb.auth.currentUser) {
                throw 'empty user';
            }

            return fb.auth.currentUser.uid;
        }
    },
    actions: {
        async signup({ dispatch }, credentials: Credentials) {
            const { user } = await fb.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);

            if (!user) {
                throw 'empty user';
            }

            const usermodel = new User(null, credentials.email);
            const query = await (new QueryBuilder(usermodel)).getQuery();
            await query.doc(user.uid).set(usermodel);

            dispatch('fetchUserProfile', user);

            router.push('/');
        },
        async logout({ commit }) {
            await fb.auth.signOut();

            commit('USER_LOGGED', {});

            router.push('/login');
        },
        async login({ dispatch }, credentials: Credentials) {
            const { user } = await fb.auth.signInWithEmailAndPassword(credentials.email, credentials.password);

            if (!user) {
                throw 'error in login';
            }

            dispatch('fetchUserProfile', user);

            router.push('/');
        },
        async fetchUserProfile({ commit }, user) {
            const query = await (new QueryBuilder(new User(null, ''))).getQuery();
            const userProfile = await query.doc(user.uid).get();

            commit('USER_LOGGED', userProfile.data());
        }
    },
    mutations: {
        ['USER_LOGGED'](state, userProfile) {
            state.userProfile = userProfile;
        }
    }
};

export default user;
