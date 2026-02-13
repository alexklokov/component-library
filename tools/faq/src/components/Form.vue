<script setup>
  import { ref } from 'vue'


  const emit = defineEmits(['add-question'])

  const question = ref('')
  const answer = ref('')
  
  
</script>


<template>
  <div class="form">
    <input type="text" placeholder="Вопрос" v-model="question">
    <textarea placeholder="Ответ" v-model="answer"></textarea>
    <button @click="emit('add-question', question, answer)">Добавить</button>
  </div>
</template>


<style scoped>

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 20px;
}

</style>
