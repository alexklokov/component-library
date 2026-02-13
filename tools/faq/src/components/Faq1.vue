<script setup>
  import FaqItem from './FaqItem.vue'

  const props = defineProps({
    questions: Array,
    num: Number
  })

  
</script>

<template>

  <div class="page-title">{{num}}. Вопрос-ответ в одну колонку</div>
  
  <div class="questions">
    <FaqItem v-if="questions.length > 0" v-for="q in questions" :question="q.question" :answer="q.answer"/>
    <FaqItem v-else :question="'Вопрос'" :answer="'Ответ'" />
  </div>

</template>


<style scoped>
</style>
