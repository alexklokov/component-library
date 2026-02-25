<script lang="ts">
  import type { Component } from "svelte";
  import FaqItem from "./FaqItem.svelte";
  import EditButton from "../editButton/EditButton.svelte";
  import Form from "./Form.svelte";
  import type { Question } from "../../interfaces/Faq";
  import { newQuestion } from "../../interfaces/Faq";

  interface Props {
    data?: {
      questions: Question[];
    };
    onGetLangConfig: ([LangConfig]) => void;
    onEdit: (arg0: Component) => void;
  }

  interface LangConfig {
    langName: string;
    langContent: string;
  }

  let {
    onEdit,
    data = { questions: [newQuestion("Вопрос1", "Ответ1")] },
  }: Props = $props();
</script>

<EditButton
  onclick={(_: Event) => {
    onEdit(Form);
  }}
/>
<div class="faq">
  {#each data.questions as q}
    <FaqItem title={q.question} text={q.answer} />
  {/each}
</div>

<style scoped lang="scss">
  .faq {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
