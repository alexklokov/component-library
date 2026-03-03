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

  onMount(() => {
    onInit(
[
        {
          lang: "js",
          generator: js
        },
        {
          lang: "css",
          generator: css,
        },
        {
          lang: "html",
          generator: html
        }
      ]
    );
  });
</script>

<div class="faq">
  <svelte:element this={String(tag)} class="faq__header"
    >{header}</svelte:element
  >

  <div class="faq__cols">
    {#if questions && questions.length > 0}
      {#each questions as q}
        <FaqItem title={q.question} text={q.answer} />
      {/each}
    {:else}
      <FaqItem title="Вопрос" text="Ответ" />
      <FaqItem title="Вопрос" text="Ответ" />
    {/if}
  </div>
</div>

<style scoped lang="scss">
  .faq {
    position: relative;

    &__cols {
      column-count: 2;
      column-gap: 20px;
      margin-top: -20px;
    }

    &__header {
      font-size: 32px;
      margin-bottom: 30px;
      margin-top: 0;
    }
  }
</style>
