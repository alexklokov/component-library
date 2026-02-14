<script setup>

  import { ref } from 'vue'

  const props = defineProps({
    headers: Array[String]
  })

  const activeTab = ref(0)

</script>


<template>

  <div class="tabs">

    <div class="tabs__headers">
      <div class="tabs__header" :class="{active: activeTab === idx}" v-for="(header, idx) in headers" @click="() => { activeTab = idx }">
        {{ header }}
      </div>
    </div>

    <div class="tabs__body">
      <slot :name="'tab-' + activeTab"></slot>
    </div>
    
  </div>

</template>


<style scoped lang="scss">

  .tabs {

    &__headers {
      display: flex;
    }

    &__header {
      padding: 10px 20px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border: solid 1px transparent;
      cursor: pointer;
      transition-duration: .2s;

      &.active {
        border-color: #ccc;
        background: #fcfcfc;
        border-bottom: solid 1px #fcfcfc;
        position: relative;
        z-index: 1;
      }
    }

    &__body {
      border: solid 1px #ccc;
      padding: 20px;
      margin-top: -1px;
      background: #fcfcfc;
    }
  }


</style>
