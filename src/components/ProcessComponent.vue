<template>
  <div class="div_container">
    <div :class="{'div_container': true, 'div_margin': index !== 0 }" v-for="(item, index) in items" :key="index">
      <div :class="{'div_pre_end': isEmpty(item.active), 'div_post_end': !isEmpty(item.active)}"></div>
      <div :class="{'div_pre_content': isEmpty(item.active), 'div_post_content': !isEmpty(item.active)}"><h4>{{ item?.text ?? '' }}</h4></div>
      <div :class="{'div_pre_start': isEmpty(item.active), 'div_post_start': !isEmpty(item.active)}"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "ProcessComponent",
  props: {
    items: Array
  },
  setup(props, context) {
    const isClass = (v) => {
      return v === undefined || v === null;
    };

    return {
      isEmpty: isClass,
    }
  }
}
</script>

<style scoped>
.div_container {
  display: flex;
  flex-direction: row;
  height: 36px;
}
.div_margin {
  margin-left: -30px;
}
.div_pre_start {
  display: inline-block;
  border: 18px solid transparent;
  border-left-color: #e9ecef;
}
.div_pre_content {
  width: 150px;
  height: 36px;
  background: #e9ecef;
  box-shadow: 0 1px #d3d3d3;
  vertical-align: middle;
}
.div_pre_end {
  border-right: 18px solid #e9ecef;
  border-top: 18px solid #e9ecef;
  border-left: 18px solid transparent;
  border-bottom: 18px solid #e9ecef;
  box-shadow: 0 1px #d3d3d3;
}
.div_post_start {
  display: inline-block;
  border: 18px solid transparent;
  border-left-color: #00c200;
}
.div_post_content {
  width: 150px;
  height: 36px;
  background: #00c200;
  box-shadow: 0 1px #00ac00;
  vertical-align: middle;
}
.div_post_end {
  border-right: 18px solid #00c200;
  border-top: 18px solid #00c200;
  border-left: 18px solid transparent;
  border-bottom: 18px solid #00c200;
  box-shadow: 0 1px #00ac00;
}
</style>