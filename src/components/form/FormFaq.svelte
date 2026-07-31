<script lang="ts">
  import { type Question } from "../../interfaces/Faq";

  interface Props {
    questions: Question[];
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
    editQuestionIndex: number;
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
        <p>{@html q.answer}</p>
        <div class="faq-item__controls">
          <button
            class="button button--danger"
            onclick={() => removeQuestion(i)}
          >
            <svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
            </svg>
          </button>
          <button
            class="button button--warning"
            onclick={() => changeQuestion(i)}
          >
              <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 494.936 494.936" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"></path> <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"></path> </g> </g> </g></svg>
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

    h4,
    p {
      margin: 10px 0;
    }

    &__controls {
      position: absolute;
      top: 0px;
      right: 10px;
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
  }
</style>
