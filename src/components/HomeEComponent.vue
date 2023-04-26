<template>
    <div>
        <h1>HomeEComponent</h1>
        1: <input v-model="ui.aValue">
        2: <input v-model="ui.bValue">
        <button class="button" @click="aFunc">+ 부모 컴포넌트 전달</button>
        <button class="button" @click="bFunc">- 부모 컴포넌트 전달</button>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "HomeEComponent",
    props: {
        name: String,
        value: String,
    },
    data() {
        return {
            ui: {
                aValue: 0,
                bValue: 0,
            },
        }
    },
    computed: {
    },
    methods: {
        getValue() {
            return 10;
        },
        aFunc() {
            console.log('aFunc');
            this.$emit('parentAFunc', ((v1, v2) => {
                return (v1 * 1) + (v2 * 1);
            })(this.ui.aValue, this.ui.bValue));
        },
        bFunc() {
            console.log('bFunc');
            this.$emit('parentBFunc', ((v1, v2) => {
                return (v1 * 1) - (v2 * 1);
            })(this.ui.aValue, this.ui.bValue));
        },
    },
    mounted() {
    }
}
</script>

<style scoped>
</style>