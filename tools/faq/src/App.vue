<script setup>

  import { ref } from 'vue'
  import Form from './components/Form.vue'
  import Faq1 from './components/Faq1.vue'

  const questions = ref([]);

  const addQuestion = (question, answer) => {
    if (question && answer)
      questions.value.push({
        question,
        answer
      })
  }

</script>

<template>
  <div class="page-layout">
    <Form @add-question="addQuestion"/>
    <Faq1 :num="1" :questions="questions"/>
  </div>
</template>

<style scoped>
</style>
