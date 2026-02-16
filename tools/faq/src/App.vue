<script setup>

  import { ref, computed } from 'vue'
  import Form from './components/Form.vue'
  import Faq1 from './components/Faq1.vue'

  const questions = ref([]);
  const className = ref("question")

  const addQuestion = (question, answer) => {
    if (question && answer)
      questions.value.push({
        question,
        answer
      })
  }

    const langConfig = computed(() => {
      return {
        'html': '',
        'js': `
    document.addEventListener('DOMContentLoaded', _ => {
      document.querySelectorAll('.${className.value}-items').forEach(questionBlock => {
        [...questionBlock.querySelectorAll('.question')]

        .map(el => {
          const title = el.querySelector('.${className.value}__title')
          const answer = el.querySelector('.${className.value}__answer')
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
    'css': {
      [`.${className.value}-items`]: {
        'display': 'flex',
        'flex-direction': 'column',
        'gap': '20px',
      },

      [`.${className.value}`]: {
        'border': '1px solid #D8D8D8',
        'border-radius': '5px',
        'box-sizing': 'border-box',
      },

      [`.${className.value}__title`]: {
        'cursor': 'ointer',
        'display': 'lex',
        'min-height': '0px',
        'align-items': 'enter',
        'justify-content': 'pace-between',
        'column-gap': '0px',
        'background-color': '#f5f5f5',
        'padding': '0px 10px 10px 20px',
        'font-size': 'ar(--faq-header-font-size, 14px)',
        'font-weight': '00',
        'color': '#45494e',
        'transition': 'ackground-color 0.2s',
        'box-sizing': 'nherit',
      },

      [`.${className.value}__title::after`] : {
        'content': "'\\002B'",
        'display': "flex",
        'flex': "none",
        'width': "40px",
        'height': "40px",
        'align-items': "center",
        'justify-content': "center",
        'background-color': "#e76e76",
        'border-radius': "50px",
        'font-size': "24px",
        'font-weight': "400",
        'color': "#fff",
        'transition': "0.2s ease-in-out",
        'transition-property': "color, background-color",
      },

      [`.${className.value}.opened .${className.value}__title::after`] : {
        'content': "'\\2212'",
      },

      [`.${className.value}__answer`] : {
        'font-size': '14px',
        'line-height': '1.4',
        'transition': '.3s height ease',
        'overflow': 'hidden',
        'box-sizing': 'inherit',
      },
      [`.${className.value}__answer-text`] : {
        'padding': '20px'
      }
    },
      'php': '',
    }
  })

</script>

<template>
  <div class="page-layout">
    <label>CSS-класс</label>
    <input v-model="className">
    <div class="page-title text-center">Добавить вопрос</div>
    <Form @add-question="addQuestion"/>
    <Faq1 :questions="questions" :num="1" :langConfig='langConfig' :className="className"/>
  </div>
</template>

<style scoped>
</style>
