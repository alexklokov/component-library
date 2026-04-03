<script lang="ts">
  import FaqItem from "./FaqItem.svelte";
  import { type FaqComponentProps } from "../../../interfaces/Faq";
  import { js } from "./js";
  import { css } from "./css";
  import { html } from "./html";
  import { onMount } from "svelte";

  let {
    questions,
    onInit,
    header = "Заголовок",
    tag = "h2",
  }: FaqComponentProps = $props();

  let questionsOpenStates = $state([]);

  $effect(() => {
    questionsOpenStates = new Array(questions.length).fill(false);
  });

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
</script>

<div class="faq">
  <svelte:element this={String(tag)} class="faq__header"
    >{header}</svelte:element
  >
  {#if questions && questions.length > 0}
    {#each questions as q, i}
      <FaqItem
        title={q.question}
        text={q.answer}
        opened={questionsOpenStates[i]}
        onToggle={(state) => {
          const newQuestionsOpenStates = questionsOpenStates.map((_, j) => {
            if (i === j) {
              return state;
            }
            return false;
          });

          console.log(newQuestionsOpenStates);

          questionsOpenStates = newQuestionsOpenStates;
        }}
      />
    {/each}
  {/if}
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
  }
</style>
