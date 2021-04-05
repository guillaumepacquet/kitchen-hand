<template>
    <v-container fluid>
        <v-card
            v-if="recipe !== null"
            flat
        >
            <v-card-title>
                {{ recipe.name }}
                <v-spacer />
                <v-btn
                    icon
                    @click="onEdit"
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-subheader class="px-0">
                    Ingredients
                    <v-spacer />
                    <v-btn
                        icon
                        @click="onAddIngredients"
                    >
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-subheader>
                <v-list>
                    <template v-for="(ingredient, i) in ingredients">
                        <v-divider
                            :key="'d' + i"
                        />
                        <v-list-item
                            :key="i"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{ ingredient.name }}</v-list-item-title>
                                <v-list-item-subtitle class="text-right">
                                    {{ ingredient.quantity }} {{ ingredient.unit }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list>
            </v-card-text>
        </v-card>
        <ingredient-dialog
            v-model="ingredientForm"
            :recipe-id="id"
        />
    </v-container>       
</template>

<script lang="ts">
import Vue from 'vue';
import Recipe from '@/core/model/recipe';
import User from '@/core/model/user';
import {QueryBuilder} from '@/core/firestore/query-builder';
import ingredientDialog from '@/components/ingredient-dialog.vue';
import Ingredient from '@/core/model/ingredient';

export default Vue.extend({
    components: { ingredientDialog },
    name: 'Recipe',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            recipe: null as Recipe | null,
            ingredients: [] as Array<Ingredient>, 
            editionMode: false,
            ingredientForm: false,
            listerners: [] as Array<() => void>
        }
    },
    async created () {
        const reciepQuery = await (new QueryBuilder(new Recipe(null, ''))).fromDocument(new User(this.$store.getters['user/userId'], ''))
            .getQuery();

        const recipeListener = reciepQuery
            .doc(this.id)
            .onSnapshot(this.updateRecipe)
        ;
            
        this.listerners.push(recipeListener);

        const ingredientQuery = await (new QueryBuilder(new Ingredient(null, '', '', '')))
            .fromDocument(new User(this.$store.getters['user/userId'], ''))
            .fromDocument(new Recipe(this.id, ''))
            .getQuery();

        const ingredientListener = ingredientQuery
            .onSnapshot(this.updateIngredients);

        this.listerners.push(ingredientListener);
    },
    beforeDestroy() {
        this.listerners.forEach(unsubscribe => {
            unsubscribe();
        });
    },
    methods: {
        updateRecipe(recipeSnapshot: firebase.default.firestore.DocumentSnapshot<Recipe>) {
            if (recipeSnapshot) {
                const recipe = recipeSnapshot.data();
                if (!recipe) {
                    throw 'error';
                }

                this.recipe = recipe;
            }
        },
        updateIngredients(ingredientsSnapshot: firebase.default.firestore.QuerySnapshot<Ingredient>) {
            if (ingredientsSnapshot) {
                const ingredients: Ingredient[] = [];
                ingredientsSnapshot.forEach(ingredient => {
                    ingredients.push(ingredient.data());
                });

                this.ingredients = ingredients;
            }
        },
        onRecipeClick() {
            this.$router.push('/recipe');
        },
        onEdit() {
            this.editionMode = true;
        },
        onAddIngredients() {
            this.ingredientForm = true;
        }
    }
});
</script>
