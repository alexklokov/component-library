<script lang="ts">
  import FaqItem from "./FaqItem.svelte";
  import EditButton from "../../editButton/EditButton.svelte";
  import Form from "../../../pages/faq/Form.svelte";
  import { type FaqComponentProps } from "../../../interfaces/Faq";

  let { onEdit, questions }: FaqComponentProps = $props();
</script>

<EditButton
  onclick={(_: Event) => {
    onEdit(Form);
  }}
/>
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
  }
</style>
