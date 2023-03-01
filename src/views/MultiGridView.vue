<template>
  <div>
    <MultiGridComponent :items="items" v-if="isModalVisible"/>
  </div>
</template>
<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: 'MultiGridView',
  components: {
    MultiGridComponent: () => import('../components/MultiGridComponent.vue'),
  },
  data() {
    return {
      items: [],
      isModalVisible: false,
    }
  },
  async mounted() {
    await axios.post('/api/selectUsers1', {}).then(res => {
      let array = []
      for (let iCnt = 20; iCnt >= 0; iCnt--) {
        array.push({
          name: `사업장 ${iCnt}`,
          list: res?.data?.userList,
        })
      }

      this.items = array;
      this.isModalVisible = true;
    }).catch(e => console.error(e));
  },
}
</script>