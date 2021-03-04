<template>
    <v-app>
        <v-app-bar
            app
            color="primary"
            dark
        >
            <span class="mr-2">Project 0</span>
            <v-spacer />
            <v-btn
                @click="logout"
                icon
            >
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'App',
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout');
        }
    }
});
</script>
