<script lang="ts">
  import FaqItem from "./FaqItem.svelte";
  import { type FaqComponentProps } from "../../../interfaces/Faq";
  import { js } from "./js";
  import { css } from "./css";
  import { html } from "./html";
  import { onMount } from "svelte";

  let { questions, onInit }: FaqComponentProps = $props();

  onMount(() => {
    onInit({
      css,
      js,
      html,
    });
  });
</script>

<div class="faq">
  {#if questions && questions.length > 0}
    {#each questions as q}
      <FaqItem title={q.question} text={q.answer} />
    {/each}
  {:else}
    <FaqItem title="Вопрос" text="Ответ" />
  {/if}
</div>

<style scoped lang="scss">
  .faq {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
  }
</style>
