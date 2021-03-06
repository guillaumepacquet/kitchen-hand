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
                    Save
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card
            flat
            tile
        >
            <v-card-text>
                <v-text-field
                    v-model="name"
                    class="mt-3"
                    dense
                    label="Name"
                    outlined
                />
                <v-text-field
                    v-model="quantity"
                    class="mt-3"
                    dense
                    label="Quantity"
                    outlined
                />
                <v-select
                    v-model="unit"
                    :items="units"
                    label="Unit"
                    dense
                    outlined
                />
            </v-card-text>
        </v-card>
    </v-dialog>     
</template>

<script lang="ts">
import Vue from 'vue';
import * as fb from '@/firebase';
import Ingredient from '@/core/model/ingredient';

export default Vue.extend({
    name: 'IngredientDialog',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        recipeId: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            unit: '',
            name: '',
            quantity: '',
            ingredientForm: this.value,
            units: [
                'g',
                'l',
                'cl',
                'ml',
                'kg',
                'cup',
                'tsp',
                'tbs',
                'fl oz',
                'oz',
                'lb',
                'none',

            ]
        }
    },
    watch: {
        value(newValue) {
            this.ingredientForm = newValue;
        },
        ingredientForm(newValue) {
            this.$emit('input', newValue);

            if (newValue === false) {
                this.name = '';
                this.quantity = '';
                this.unit = '';
            }
        }
    },
    methods: {
        onAddIngredients() {
            this.ingredientForm = true;
        },
        async onSave() {
            const ingredient = new Ingredient(null, this.name, this.quantity, this.unit);

            await fb.ingredients(this.$store.getters['user/userId'], this.recipeId).doc().set(ingredient);

            this.ingredientForm = false;
        }
    }
});
</script>
