<template>
    <div>
        <h1>HomeBComponent</h1>
        1: <input v-model="ui.aValue">
        2: <input v-model="ui.bValue">
        <button @click="tFunc">+ 부모 컴포넌트 전달</button>
        <button @click="fFunc">- 부모 컴포넌트 전달</button>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "HomeBComponent",
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
    computed: {},
    methods: {
        getValue() {
            return 10;
        },
        tFunc() {
            console.log('aFunc');
            this.$emit('parentAFunc', ((v1, v2) => {
                return (v1 * 1) + (v2 * 1);
            })(this.ui.aValue, this.ui.bValue));
        },
        fFunc() {
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