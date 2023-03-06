<template>
  <div>
    {{ name }} and <input v-model="proxyValue">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HomeAComponent",
  props: {
    name: String,
    value: String,
  },
  date: {
    name: '',
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
      return 10;
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>