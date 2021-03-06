<template>
    <v-container fluid>
        <v-text-field
            v-model="name"
            class="mt-3"
            dense
            label="Name"
            outlined
            append-outer-icon="mdi-plus"
            @click:append-outer="addRecipe"
        />
        <v-row dense>
            <v-col>
                <v-subheader>
                    Recipes
                </v-subheader>

                <v-list>
                    <v-list-item-group
                        color="primary"
                    >
                        <template v-for="(recipe, i) in recipes">
                            <v-divider
                                :key="'d' + i"
                            />
                            <v-list-item
                                :key="i"
                            >
                                <v-list-item-content @click="onRecipeClick(recipe.id)">
                                    <v-list-item-title v-text="recipe.name" />
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
    </v-container>       
</template>

<script lang="ts">
import Vue from 'vue';
import Recipe from '@/core/model/recipe';
import { mapGetters } from 'vuex';

export default Vue.extend({
    name: 'Home',
    components: {
    },
    data(){
        return {
            name: '',
        }
    },
    created () {
        this.$store.dispatch('recipe/listen');
    },
    beforeDestroy () {
        this.$store.dispatch('recipe/stopListening');
    },
    computed: {
        ...mapGetters('recipe', ['recipes'])
    },
    methods: {
        async addRecipe() {
            const recipe = new Recipe(null, this.name);

            await this.$store.dispatch('recipe/add', recipe);

            this.name = '';
        },
        onRecipeClick(recipeId: string) {
            this.$router.push('/recipe/' + recipeId);
        }
    }
});
</script>
