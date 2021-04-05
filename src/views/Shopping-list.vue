<template>
    <v-container fluid>
        <v-text-field
            v-model="name"
            class="mt-3"
            dense
            label="Name"
            outlined
            append-outer-icon="mdi-plus"
            @click:append-outer="addItem"
        />
        <v-row dense>
            <v-col>
                <v-subheader>
                    My items
                </v-subheader>

                <v-list>
                    <v-list-item-group
                        color="primary"
                    >
                        <template v-for="(item, i) in shoppingItems">
                            <v-divider
                                :key="'d' + i"
                            />
                            <v-list-item
                                :key="i"
                            >
                                <v-list-item-action>
                                    <v-checkbox 
                                        v-model="item.isDone"
                                        @change="itemDoneUpdate(item.name)"
                                    />
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.name" />
                                    <v-list-item-subtitle v-text="getQuantity(item)" />
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn
                                        icon
                                        @click="onDelete(item.name)"
                                    >
                                        <v-icon color="grey lighten-1">
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
        <v-row dense>
            <v-col class="text-center">
                <v-btn @click="recipeDialog = true">
                    Add from recipe
                </v-btn>
            </v-col>
        </v-row>
        <recipe-dialog v-model="recipeDialog" />
    </v-container>     
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import ShoppingItem from '@/core/model/shopping-item';
import RecipeDialog from '@/components/recipe-dialog.vue';

export default Vue.extend({
    name: 'ShoppingList',
    components: {
        RecipeDialog
    },
    data(){
        return {
            name: '',
            recipeDialog: false,
        }
    },
    created () {
        this.$store.dispatch('shoppingList/listen');
    },
    beforeDestroy () {
        this.$store.dispatch('shoppingList/stopListening');
    },
    computed: {
        ...mapGetters('shoppingList', ['shoppingItems']),
    },
    methods: {
        getQuantity(item: ShoppingItem) {
            return item.quantity + ' ' + item.unit;
        },
        async addItem() {
            const shoppingItem = new ShoppingItem(null, this.name, 0, 'none');

            await this.$store.dispatch('shoppingList/add', shoppingItem);

            this.name = '';
        },
        async onDelete(shoppingItemName: string) {
            await this.$store.dispatch('shoppingList/delete', shoppingItemName);
        },
        async itemDoneUpdate(shoppingItemName: string) {
            const itemFound = this.shoppingItems.find((item: ShoppingItem) => item.name === shoppingItemName);

            await this.$store.dispatch('shoppingList/updateDoneStatus', itemFound);
        }
    }
});
</script>
