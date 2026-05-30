<script lang="ts">
  import FaqItem from "../FaqItem.svelte";
  import { type FaqComponentProps } from "../../../interfaces/Faq";
  import { js } from "../default_many_open_js";
  import { css } from "./css";
  import { html } from "./html";
  import { onMount } from "svelte";

  let {
    questions,
    onInit,
    header = "Заголовок",
    tag = "h2",
  }: FaqComponentProps = $props();

  onMount(() => {
    console.log(header);
    onInit([
      {
        lang: "js",
        generator: js,
      },
      {
        lang: "css",
        generator: css,
      },
      {
        lang: "html",
        generator: html,
      },
    ]);
  });

  let openedQuestions: boolean[] = $state([]);

  const toggleQuestion = (i: number) => {
    openedQuestions[i] = !openedQuestions[i];
  };

  $effect(() => {
    while (openedQuestions.length < questions.length) {
      openedQuestions.push(false);
    }
    openedQuestions.length = questions.length;
  });
</script>

<div class="faq">
  <svelte:element this={String(tag)} class="faq__header"
    >{header}</svelte:element
  >
  <div class="faq__questions">
    {#each questions as q, i}
      <FaqItem
        title={q.question}
        text={q.answer}
        opened={openedQuestions[i]}
        onToggle={() => {
          toggleQuestion(i);
        }}
      />
    {/each}
  </div>
</div>

<style scoped lang="scss">
  .faq {
    display: flex;
    gap: 20px;
    position: relative;

    &__header {
      font-size: 32px;
      margin-bottom: 0;
      margin-top: 0;
      width: calc(33.333% - 10px);
    }

    &__questions {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
</style>
