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

  <div class="faq__cols">
    {#each questions as q, i}
      <FaqItem
        title={q.question}
        text={q.answer}
        opened={openedQuestions[i]}
        additionalClasses={["mb-20"]}
        onToggle={() => {
          toggleQuestion(i);
        }}
      />
    {/each}
  </div>
</div>

<style scoped lang="scss">
  .faq {
    position: relative;

    &__cols {
      gap: 20px;
      column-gap: 20px;
      column-count: 2;
    }

    &__header {
      font-size: 32px;
      margin-bottom: 30px;
      margin-top: 0;
    }
  }
</style>
