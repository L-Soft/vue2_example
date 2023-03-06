<template>
  <div>
    {{ name }} and <input v-model="proxyValue">
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "HomeCComponent",
  date: {
  },
  props: {
    name: String,
    value: String,
  },
  computed: {
    proxyValue: {
      get() {
        console.log('get', this.value);
        return this.value;
      },
      set(newValue) {
        console.log('set', newValue);
        this.$emit('input', newValue);
      },
    }
  },
  methods: {
    getValue() {
      return 30;
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>