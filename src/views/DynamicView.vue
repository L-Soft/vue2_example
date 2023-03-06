<template>
<div>
  <button class="button" @click="fnSelectComponent('A')">A 컴포넌트</button>
  <button class="button" @click="fnSelectComponent('B')">B 컴포넌트</button>
  <button class="button" @click="fnSelectComponent('C')">C 컴포넌트</button>
  <keep-alive>
    <component :is="currentComponent" v-model="items" :name="name">
      <div><h1>{{items}}</h1></div>
    </component>
  </keep-alive>
</div>
</template>

<script>
export default {
  name: "DynamicView",
  components: {
    AComponent: () => import('../components/HomeAComponent.vue'),
    BComponent: () => import('../components/HomeBComponent.vue'),
    CComponent: () => import('../components/HomeCComponent.vue'),
  },
  data() {
    return {
      currentComponent: 'AComponent',
      items: '',
      name: 'A',
    }
  },
  methods: {
    fnSelectComponent(type) {
      if (type === 'A') {
        this.name = 'A';
        this.items = '';
        this.currentComponent = 'AComponent';
      } else  if (type === 'B') {
        this.name = 'B';
        this.items = '';
        this.currentComponent = 'BComponent';
      } else if  (type === 'C') {
        this.name = 'C';
        this.items = '';
        this.currentComponent = 'CComponent';
      }
      console.log('fnSelectComponent, type:', type, this.items);
    }
  },
}
</script>

<style scoped>
.button {
  background-color: #c2c2c2; /* Green */
  border: none;
  color: #000000;
  padding: 11px 11px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin-right: 5px;
  margin-bottom: 3px;
}
.container {
  display: flex;
  flex-direction: row;
}
</style>