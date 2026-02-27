<script lang="ts">
  import Faq1 from "../../components/faq/faq_1/Faq.svelte";
  import Faq2 from "../../components/faq/faq_2/Faq.svelte";
  import Faq3 from "../../components/faq/faq_3/Faq.svelte";
  import Tab from "../../components/tabs/tabs_1/Tab.svelte";
  import Tabs from "../../components/tabs/tabs_1/Tabs.svelte";
  import { Highlight } from "svelte-highlight";
  import css from "svelte-highlight/languages/css";
  import js from "svelte-highlight/languages/javascript";
  import { github } from "svelte-highlight/styles";

  import {
    HeaderTags,
    type HeaderTag,
    type LangGenerator,
    type Question,
  } from "../../interfaces/Faq";
  import Form from "./Form.svelte";

  let questions = $state<Question[]>([{ question: "Вопрос", answer: "Ответ" }]);
  let className = $state<string>("faq");
  let generators = $state<LangGenerator[]>([]);
  let header = $state<string>("");
  let headerTag = $state<HeaderTag>("h2");

  const components = [
    {
      component: Faq1,
      header: "Вопросы и ответы",
    },
    {
      component: Faq2,
      header: "Вопросы и ответы (две колонки)",
    },
    {
      component: Faq3,
      header: "Вопросы и ответы (заголовок сбоку)",
    },
  ];

  const onAddQuestion = (question: Question) => {
    questions = [...questions, question];
  };
  const onRemoveQuestion = (idx: number) => {
    questions = questions.filter((_, i) => i !== idx);
  };
  const onChangeQuestion = (question: Question, idx: number) => {
    questions[idx] = question;
  };
</script>

<svelte:head>
  {@html github}
</svelte:head>

<div class="container">
  <a href="/">Главная</a>
  <div class="form-container">
    <div class="form-group">
      <input type="text" placeholder="Заголовок" bind:value={header} />
      <select placeholder="Тег заголовка" bind:value={headerTag}>
        {#each HeaderTags as tag}
          <option value={tag}>{tag}</option>
        {/each}
      </select>
      <input type="text" placeholder="CSS класс" bind:value={className} />
    </div>
  </div>

  <div class="form-container">
    <h3>Новый вопрос</h3>
    <Form {questions} {onAddQuestion} {onRemoveQuestion} {onChangeQuestion} />
  </div>
  <div class="flex flex-column g-40">
    {#each components as component, i}
      <div class="section">
        <Tabs>
          <Tab title="Внешний вид">
            <component.component
              {questions}
              header={component.header}
              tag={headerTag}
              onInit={(generator: LangGenerator) => {
                generators = [...generators, generator];
              }}
            />
          </Tab>
          {#if generators[i]}
            {#if generators[i].html}
              <Tab title="HTML">
                {@const htmlCode = generators[i].html(
                  className,
                  component.header,
                  "h2",
                  questions,
                )}
                <Highlight language={js} code={htmlCode} />
              </Tab>
            {/if}
            {#if generators[i].css}
              <Tab title="CSS">
                {@const cssCode = generators[i].css(className)}
                <Highlight language={css} code={cssCode} />
              </Tab>
            {/if}
            {#if generators[i].js}
              <Tab title="JavaScript">
                {@const jsCode = generators[i].js(className)}
                <Highlight language={js} code={jsCode} />
              </Tab>
            {/if}
            {#if generators[i].php}
              <Tab title="PHP">
                {@const phpCode = generators[i].php(className)}
                <Highlight language={js} code={phpCode} />
              </Tab>
            {/if}
          {/if}
        </Tabs>
      </div>
    {/each}
  </div>
</div>

<style>
  .form-container {
    max-width: 640px;
    margin: 0 auto;
  }
</style>
