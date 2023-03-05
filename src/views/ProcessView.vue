<template>
  <div class="about">
    <ProcessComponent :items="items" />
  </div>
</template>
<script>
/* eslint-disable */

import ProcessComponent from "@/components/ProcessComponent.vue";
import {onMounted, reactive, ref, toRefs} from "vue";

export default {
  name: 'AboutView',
  components: {
    ProcessComponent
  },
  props: {

  },
  setup(props, context) {
    const items = ref([]);

    onMounted(() => {
      items.value = [{text: '1'}, {text: '2'}, {text: '3'}, {text: '4', active: true,}, {text: '5'}];
    })

    return {
      items,
    }
  },
}
</script>