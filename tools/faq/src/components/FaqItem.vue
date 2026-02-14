<script setup>

  import { ref, onMounted, useTemplateRef, reactive } from 'vue'

  const props = defineProps({
    question: String,
    answer: String,
  })

  let initialHeight = 0

  const isOpened = ref(false)
  const answerStyle = reactive({
    height: 0,
  })

  const answerEl = useTemplateRef('answerEl')

  const toggleOpened = _ => {
    isOpened.value = !isOpened.value

    if(isOpened.value) {
        answerStyle.height = initialHeight + 'px'
    } else {
        answerStyle.height = 0
    }
  }

  onMounted(() => {
    initialHeight = answerEl.value.scrollHeight
  })
  

</script>


<template>
  <div class="question" :class="{opened: isOpened}">
    <div class="question__title" @click="toggleOpened()"> {{ props.question }} </div>
    <div class="question__answer" ref="answerEl" :style="answerStyle">
      <div class="question__answer-text">{{ props.answer }}</div>
    </div>
  </div>
</template>


<style scoped lang="scss">

  .question {

    border: 1px solid #D8D8D8;
    border-radius: 5px;

    &__title {

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
    

      &::after {
        content: '\002B';
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
    }

    
    &.opened {

      .question__title::after {
          content: '\2212';
      }
    
    }

    &__answer {
      font-size: 14px;
      line-height: 1.4;
      transition: .3s height ease;
      overflow: hidden;

      &-text {
        padding: 20px;
      }
    }

  }



</style>
