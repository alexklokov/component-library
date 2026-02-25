<script lang="ts">
  import { newQuestion } from "../../interfaces/Faq";
  import { type Question } from "../../interfaces/Faq";

  interface Props {
    onSave?: (data: any) => void;
  }

  const EDIT_STATES = {
    ADDING: 0,
    CHANGING: 1,
  };

  interface State {
    questions: Question[];
    question: string;
    answer: string;
    editState?: (typeof EDIT_STATES)[keyof typeof EDIT_STATES];
    editQuestionIndex?: number;
  }

  let { onSave }: Props = $props();

  let { questions, question, answer, editState, editQuestionIndex }: State =
    $state({
      questions: [],
      question: "",
      answer: "",
      editState: EDIT_STATES.ADDING,
      editQuestionIndex: -1,
    });

  const addQuestion = () => {
    if (question.trim() === "" || answer.trim() === "") {
      alert("Пожалуйста, заполните оба поля: вопрос и ответ.");
      return;
    }

    const newQ = newQuestion(question, answer);

    questions = [...questions, newQ];
    question = "";
    answer = "";
  };

  const removeQuestion = (index: number) => {
    questions = questions.filter((_, i) => i !== index);
  };

  const changeQuestion = (index: number) => {
    const q = questions[index];
    question = q.question;
    answer = q.answer;
    editState = EDIT_STATES.CHANGING;
    editQuestionIndex = index;
  };

  const saveChangedQuestion = () => {
    if (question.trim() === "" || answer.trim() === "") {
      alert("Пожалуйста, заполните оба поля: вопрос и ответ.");
      return;
    }

    questions[editQuestionIndex] = { question, answer };
    question = "";
    answer = "";
    editState = EDIT_STATES.ADDING;
    editQuestionIndex = -1;
  };
</script>

<div class="form-group">
  <input type="text" placeholder="Вопрос" bind:value={question} />
  <textarea placeholder="Ответ" bind:value={answer}></textarea>
  <div class="flex g-10 justify-center">
    {#if editState === EDIT_STATES.ADDING}
      <div class="button button--primary" onclick={addQuestion}>
        Добавить вопрос
      </div>
    {:else if editState === EDIT_STATES.CHANGING}
      <div class="button button--warning" onclick={saveChangedQuestion}>
        Изменить вопрос
      </div>
    {/if}
    <div
      class="button button--success"
      onclick={() => {
        onSave?.({ questions });
      }}
    >
      Сохранить
    </div>
  </div>

  <div class="flex flex-column gap-10">
    {#each questions as q, i}
      <div class="faq-item">
        <h3>{q.question}</h3>
        <p>{q.answer}</p>
        <div class="faq-item__controls">
          <div class="button button--danger" onclick={() => removeQuestion(i)}>
            Удалить
          </div>
          <div class="button button--warning" onclick={() => changeQuestion(i)}>
            Изменить
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style scoped lang="scss">
  .faq-item {
    border-bottom: solid 1px #ccc;
    padding: 20px 0;
    width: 100%;
    position: relative;

    &__controls {
      position: absolute;
      top: 20px;
      right: -100px;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
      transition-duration: 0.3s;

      .button {
        width: 100%;
      }
    }

    &:hover {
      .faq-item__controls {
        right: 10px;
        opacity: 1;
      }
    }
  }
</style>
