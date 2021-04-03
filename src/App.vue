<template>
    <v-app>
        <v-app-bar
            app
            color="primary"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <span class="mr-2">KitchenHand</span>
            <v-spacer />
            <v-btn
                @click="logout"
                icon
            >
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            absolute
            bottom
            temporary
        >
            <v-list
                nav
                dense
            >
                <v-list-item
                    link
                    to="/"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-chef-hat</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Recipes</v-list-item-title>
                </v-list-item>
                <v-list-item
                    link
                    to="/shopping-list"
                >
                    <v-list-item-icon>
                        <v-icon>mdi-cart</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Shopping list</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-ferris-wheel</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Random wheel</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'App',
    data() {
        return {
            drawer: false,
        };
    },
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout');
        }
    }
});
</script>
