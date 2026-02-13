<script setup>

  import { ref } from 'vue'
  import Form from './components/Form.vue'
  import Faq1 from './components/Faq1.vue'

  const questions = ref([]);

  const addQuestion = (question, answer) => {
    questions.value.push({
      question,
      answer
    })
  }

</script>

<template>
  <Form @add-question="addQuestion"/>


  <Faq1 :questions="questions"/>
  
</template>

<style scoped>
</style>
