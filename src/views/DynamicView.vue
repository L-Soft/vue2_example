<template>
<div>
  <select :value="ui.selected" @change="setSelect">
    <option v-for="(item, index) in dataList.selectList" :key="index" :value="item.value">{{ item.name }}</option>
  </select>
  <keep-alive style="margin-top: 10px">
    <component v-if="ui.currentComponent !== null" :is="ui.currentComponent" @parentAFunc="parentAFunc1" @parentBFunc="parentBFunc1">
      <div><h1>{{ ui.componentsItems }}</h1></div>
    </component>
  </keep-alive>
  <h1 v-if="ui.currentValue !== null">{{ ui.currentValue }}</h1>
</div>
</template>

<script>
export default {
  name: "DynamicView",
  components: {
    AComponent: () => import('../components/HomeAComponent.vue'),
    BComponent: () => import('../components/HomeBComponent.vue'),
    CComponent: () => import('../components/HomeCComponent.vue'),
    DComponent: () => import('../components/HomeDComponent.vue'),
    EComponent: () => import('../components/HomeEComponent.vue'),
    FComponent: () => import('../components/HomeFComponent.vue'),
    GComponent: () => import('../components/HomeGComponent.vue'),
    HComponent: () => import('../components/HomeHComponent.vue'),
    IComponent: () => import('../components/HomeIComponent.vue'),
  },
  data() {
    return {
        ui: {
          selected: '',
          componentsItems: '',
          currentComponent: null,
          currentValue: null,
        },
        dataList: {
            selectList: [
              { name: '선택해주세요.', value: '' },
              { name: 'A 컴포넌트', value: 'A'},
              { name: 'B 컴포넌트', value: 'B'},
              { name: 'C 컴포넌트', value: 'C'},
              { name: 'D 컴포넌트', value: 'D'},
              { name: 'E 컴포넌트', value: 'E'},
              { name: 'F 컴포넌트', value: 'F'},
              { name: 'G 컴포넌트', value: 'G'},
              { name: 'H 컴포넌트', value: 'H'},
              { name: 'I 컴포넌트', value: 'I'},
            ],
        }
    }
  },
  methods: {
      setSelect(event) {
        console.log('this.ui.selected', event.target.value);
        const value = event?.target?.value;
        if (value === undefined || value === null) {
            return;
        }

        this.ui.currentComponent = [value, 'Component'].join('');
        this.ui.currentValue = null;
      },
      parentAFunc1(v) {
        console.log('부모 컴포넌트 parentAFunc1', v);
        this.ui.currentValue = typeof v === 'number' ? v : v.value;
      },
      parentBFunc1(v) {
        console.log('부모 컴포넌트 parentBFunc1', v);
        this.ui.currentValue = typeof v === 'number' ? v : v.value;
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