import { mapGetters } from 'vuex';
import Vue from 'vue';

export default Vue.extend({
    created() {
        this.$store.dispatch('recipe/listen');
    },
    beforeDestroy() {
        this.$store.dispatch('recipe/stopListening');
    },
    computed: {
        ...mapGetters('recipe', ['recipes'])
    },
});
