<script setup>
  import { computed } from 'vue'
  import FaqItem from './FaqItem.vue'
  import Tabs from './Tabs/Tabs.vue'
  import Copy from './Copy.vue'
  import 'prismjs'
  import 'prismjs/themes/prism.css'
  import Prism from 'vue-prism-component'
  import 'prismjs/components/prism-markup-templating'
  import 'prismjs/components/prism-php'
  import { objectToCss } from '../../../../internal/utils/css.js'
  

  const props = defineProps({
    className: String,
    questions: {
      type: Array,
      default: []
    },
    num: Number,
    langConfig: {
      type: Object,
      default: {},
    },
  })


  const htmlCode = computed(() => {
    if (props.langConfig.html) return props.html

    const questions = props.questions.length > 0 ? props.questions : [{question: "Вопрос", answer: "Ответ"}]
    const questionsHtml = questions.map(q => {
      return `<div class="${props.className}" itemscope itemprop="mainEntiry" itemtype="https://schema.org/Question">
    <div class="${props.className}__title" itemprop="name">${q.question}</div>
      <div class="${props.className}__answer" style="height: 0px; padding-top: 0px; padding-bottom: 0px;" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
        <div class="${props.className}__answer-text" itemprop="text">${q.answer}</div>
      </div>
    </div>`
    }).join('\n')

    return `
<div class="${props.className}-items" itemscope itemtype="https://schema.org/FAQPage">
  ${questionsHtml}
</div>
    `
    
  })

  const tabHeaders = ["Вывод", ...Object.keys(props.langConfig)]


   </script>

<template>

  <div class="page-title">{{num}}. Вопрос-ответ в одну колонку</div>
  
  <Tabs :headers="tabHeaders">

    <template #tab-0>
      <div class="question-items">
        <FaqItem v-if="questions.length > 0" v-for="q in questions" :question="q.question" :answer="q.answer"/>
        <FaqItem v-else :question="'Вопрос'" :answer="'Ответ'" />
      </div>
    </template>

    <template #tab-1>
      <Copy :text="htmlCode" @error="console.log"/>
      <Prism language="html">
          {{ htmlCode }}
      </Prism>
    </template>

    <template #tab-2>
      <Copy :text="props.langConfig.js" />
      <Prism language="javascript">
        {{ props.langConfig.js }}
      </Prism>
    </template>

    <template #tab-3>
      <Copy :text="props.langConfig.css" />
      <Prism language="css">
        {{ objectToCss(props.langConfig.css) }}
      </Prism>
    </template>

    <template #tab-4>
      <Copy :text="props.langConfig.php" />
      <Prism language="php">
        {{ props.langConfig.php }}
      </Prism>
    </template>
    
  </Tabs>

</template>


<style scoped>
  .question-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
