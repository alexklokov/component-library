<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    questions: Array
  })
</script>

<template>

  <div class="questions">
    <div class="question" v-for="question in questions">
      <div class="question-title"> {{ question.question }} </div>
      <div class="question-text"> {{ question.answer }} </div>
    </div>
  </div>

</template>


<style scoped>
</style>
