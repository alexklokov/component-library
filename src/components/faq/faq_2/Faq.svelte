<script lang="ts">
  import FaqItem from "../FaqItem.svelte";
  import { type FaqComponentProps } from "../../../interfaces/Faq";
  import { js } from "../default_one_open_js";
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
    if (openedQuestions[i]) {
      openedQuestions[i] = false;
    } else {
      openedQuestions.forEach((_, j) => {
        openedQuestions[j] = false;
      });

      openedQuestions[i] = true;
    }
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
    flex-direction: column;
    gap: 20px;
    position: relative;

    &__header {
      font-size: 32px;
      margin-bottom: 0;
      margin-top: 0;
    }

    &__questions {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
</style>
