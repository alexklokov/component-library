<script lang="ts">
  import { type Question } from "../../interfaces/Faq";

  interface Props {
    questions?: Question[];
    onAddQuestion: (arg0: Question) => void;
    onChangeQuestion: (arg0: Question, arg1: number) => void;
    onRemoveQuestion: (arg0: number) => void;
  }

  const EDIT_STATES = {
    ADDING: 0,
    CHANGING: 1,
  };

  interface State {
    question: string;
    answer: string;
    editState?: (typeof EDIT_STATES)[keyof typeof EDIT_STATES];
    editQuestionIndex?: number;
  }

  let { questions, onAddQuestion, onChangeQuestion, onRemoveQuestion }: Props =
    $props();

  let { question, answer, editState, editQuestionIndex }: State = $state({
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

    const newQ = { question, answer };

    question = "";
    answer = "";

    onAddQuestion(newQ);
  };

  const removeQuestion = (index: number) => {
    onRemoveQuestion(index);
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

    onChangeQuestion({ question, answer }, editQuestionIndex);

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
      <button class="button button--primary" onclick={addQuestion}>
        Добавить вопрос
      </button>
    {:else if editState === EDIT_STATES.CHANGING}
      <button class="button button--warning" onclick={saveChangedQuestion}>
        Изменить вопрос
      </button>
    {/if}
  </div>

  <div class="flex flex-column gap-10">
    {#each questions as q, i}
      <div class="faq-item">
        <h4>{q.question}</h4>
        <p>{q.answer}</p>
        <div class="faq-item__controls">
          <button
            class="button button--danger"
            onclick={() => removeQuestion(i)}
          >
            Удалить
          </button>
          <button
            class="button button--warning"
            onclick={() => changeQuestion(i)}
          >
            Изменить
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style scoped lang="scss">
  .faq-item {
    border-bottom: solid 1px #ccc;
    width: 100%;
    position: relative;

    h4, p {
      margin: 10px 0;
    }

    &__controls {
      position: absolute;
      top: 0px;
      right: -100px;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 5px;
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
