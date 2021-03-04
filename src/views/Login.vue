<template>
    <v-container
        fluid
        fill-height
    >
        <v-row>
            <v-col class="text-right">
                <v-text-field
                    v-model="email"
                    dense
                    outlined
                    label="Email"
                    prepend-icon="mdi-account"
                    :rules="[rules.required]"
                    type="text"
                />
                <v-text-field
                    v-model="password"
                    dense
                    outlined
                    label="Password"
                    :rules="[rules.required]"
                    prepend-icon="mdi-key-variant"
                    type="password"
                />
                <v-btn
                    @click="login"
                    class="ml-auto"
                >
                    Login
                </v-btn>
                <v-btn
                    to="/register"
                    color="primary"
                    small
                    text
                >
                    Register?
                </v-btn>
            </v-col>
        </v-row>
    </v-container> 
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Login',
    data () {
        return {
            email: '',
            password: '',
            rules: {
                required: (value: string) => !!value || 'Required.'
            },
        }
    },
    methods: {
        async login() {
            await this.$store.dispatch('user/login', {email: this.email, password: this.password});
        }
    }
});
</script>
