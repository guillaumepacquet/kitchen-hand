<template>
    <v-dialog
        v-model="ingredientForm"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-toolbar
            dark
            color="primary"
        >
            <v-btn
                icon
                dark
                @click="ingredientForm = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
                <v-btn
                    dark
                    text
                    @click="onSave"
                >
                    Add
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card
            flat
            tile
        >
            <v-card-text>
                <v-list>
                    <v-list-item-group
                        color="primary"
                    >
                        <template v-for="(recipe, i) in recipes">
                            <v-list-item
                                :key="i"
                            >
                                <v-list-item-action>
                                    <v-checkbox
                                        multiple
                                        v-model="selected"
                                        :value="recipe.id"
                                    />
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title v-text="recipe.name" />
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-card-text>
        </v-card>
    </v-dialog>     
</template>

<script lang="ts">
import Vue from 'vue';
import * as fb from '@/firebase';
import { mapGetters } from 'vuex';
import ShoppingItem from '@/core/model/shopping-item';

export default Vue.extend({
    name: 'RecipeDialog',
    props: {
        value: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            ingredientForm: this.value,
            selected: [] as string[],
        }
    },
    watch: {
        value(newValue) {
            this.ingredientForm = newValue;
        },
        ingredientForm(newValue) {
            this.$emit('input', newValue);

            if (newValue === false) {
                this.selected = [];
            }
        }
    },
    computed: {
        ...mapGetters('recipe', ['recipes'])
    },
    methods: {
        onAddIngredients() {
            this.ingredientForm = true;
        },
        async onSave() {
            this.selected.forEach(async recipeId => {
                const snapshot = await fb.ingredients(this.$store.getters['user/userId'], recipeId).get();

                snapshot.forEach(item => {

                    this.$store.dispatch('shoppingList/add', new ShoppingItem(
                        null,
                        item.data().name,
                        parseInt(item.data().quantity),
                        item.data().unit
                    ));
                });
            })
            this.ingredientForm = false;
        }
    }
});
</script>
