<script lang="ts">
  import Faq1 from "../../components/faq/faq_1/Faq.svelte";
  import Faq2 from "../../components/faq/faq_2/Faq.svelte";
  import Faq3 from "../../components/faq/faq_3/Faq.svelte";
  import Tab from "../../components/tabs/tabs_1/Tab.svelte";
  import Tabs from "../../components/tabs/tabs_1/Tabs.svelte";
  import { HighlightAuto } from "svelte-highlight";
  import { atomOneDark } from "svelte-highlight/styles";

  import {
    type FaqSettings,
    type LangGenerator,
    type Question,
  } from "../../interfaces/Faq";
  import Form from "./Form.svelte";
  import CopyButton from "../../components/copyButton/CopyButton.svelte";
  import Settings from "./Settings.svelte";

  let questions = $state<Question[]>([{ question: "Вопрос", answer: "Ответ" }]);
  let generators = $state<LangGenerator[][]>([]);

  let settings = $state<FaqSettings>({
    className: "faq",
    faqHeader: "Вопросы и ответы",
    headerTag: "h2",
    isWrap: false,
    wrapperClass: "",
  });

  const components = [
    {
      component: Faq1,
      label: "Вопросы и ответы",
    },
    {
      component: Faq2,
      label: "Вопросы и ответы (две колонки)",
    },
    {
      component: Faq3,
      label: "Вопросы и ответы (заголовок сбоку)",
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

  const updateSettings = (newSettings: Partial<FaqSettings>) => {
    settings = { ...settings, ...newSettings };
  };
</script>

<svelte:head>
  {@html atomOneDark}
</svelte:head>

<div class="container">
  <a href="/">Главная</a>

  <div class="form-container">
    <Settings {settings} onChange={updateSettings} />
  </div>

  <div class="form-container">
    <h3>Добавить вопрос</h3>
    <Form {questions} {onAddQuestion} {onRemoveQuestion} {onChangeQuestion} />
  </div>
  <div class="flex flex-column g-40">
    {#each components as component, i}
      <div class="section">
        <h2>{component.label}</h2>
        <Tabs>
          <Tab title="Внешний вид">
            <component.component
              {questions}
              header={settings.faqHeader}
              tag={settings.headerTag}
              onInit={(newGenerators: LangGenerator[]) => {
                generators = [...generators, newGenerators];
              }}
            />
          </Tab>
          {#if generators[i]}
            {#each generators[i] as g}
              <Tab title={g.title ?? g.lang}>
                {@const code = g.generator(settings, questions)}
                <CopyButton text={code} />
                <HighlightAuto languageNames={[g.lang]} code={code} />
              </Tab>
            {/each}
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
