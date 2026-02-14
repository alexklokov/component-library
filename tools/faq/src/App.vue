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

  const langConfig = {
    'html': '',
    'js': `
document.addEventListener('DOMContentLoaded', _ => {
  document.querySelectorAll('.questions').forEach(questionBlock => {
    [...questionBlock.querySelectorAll('.question')]

    .map(el => {
      const title = el.querySelector('.question__title')
      const answer = el.querySelector('.question__answer')
      const height = answer.scrollHeight

      return {
        el,
        title,
        answer,
        height,
        isOpened: false,
      }

    })

    .forEach((q, _, questions) => {


      q.title.addEventListener('click', _ => {

        const wasOpened = q.isOpened

        questions.forEach(q => {
          q.el.classList.remove('opened')
          q.answer.style.height = "0px"
          q.isOpened = false
        })

        if(!wasOpened) {
          q.el.classList.add('opened')
          q.answer.style.height = q.height + 'px'
          q.isOpened = true
        }

      })

    })
  })
})
    `,
'css': `
  .questions {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .question {
    border: 1px solid #D8D8D8;
    border-radius: 5px;
    box-sizing: border-box;
  }      

  .question__title {
    cursor: pointer;
    display: flex;
    min-height: 70px;
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
    background-color: #f5f5f5;
    padding: 10px 10px 10px 20px;
    font-size: var(--faq-header-font-size, 14px);
    font-weight: 700;
    color: #45494e;
    transition: background-color 0.2s;
    box-sizing: inherit;
  }

  .question__title::after {
    content: '\\002B';
    display: flex;
    flex: none;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: #e76e76;
    border-radius: 50px;
    font-size: 24px;
    font-weight: 400;
    color: #fff;
    transition: 0.2s ease-in-out;
    transition-property: color, background-color;
  }

  .question.opened .question__title::after {
    content: '\\2212';
  }

  .question__answer {
    font-size: 14px;
    line-height: 1.4;
    transition: .3s height ease;
    overflow: hidden;
    box-sizing: inherit;
  }
  .question__answer-text {
    padding: 20px;
  }
`,
    'php': '',
  }

</script>

<template>
  <div class="page-layout">
    <Form @add-question="addQuestion"/>
    <Faq1 :questions="questions" :num="1" :langConfig='langConfig'/>
  </div>
</template>

<style scoped>
</style>
