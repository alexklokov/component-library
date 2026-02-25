<script lang="ts">
  import type { Component } from "svelte";
  import Faq1 from "../../components/faq_1/Faq.svelte";
  import Sidebar from "../../components/sidebar/Sidebar.svelte";
  import { type Question } from "../../interfaces/Faq";

  interface State {
    EditForm: Component | null;
    showSidebar: boolean;
    componentIdx: number;
  }

  let { EditForm, showSidebar, componentIdx }: State = $state({
    EditForm: null,
    showSidebar: false,
    componentIdx: -1,
  });

  let componentsQuestions = $state([]);
  const components = [Faq1, Faq1];
</script>

<div class="container">
  <Sidebar
    show={showSidebar}
    toggle={(state: boolean) => {
      showSidebar = state;
    }}
  >
    {#if EditForm && componentIdx !== -1}
      {#key componentIdx}
        <EditForm
          initQuestions={componentsQuestions[componentIdx]}
          onSave={(questions: Question[]) => {
            componentsQuestions[componentIdx] = questions;
            componentIdx = -1;
            showSidebar = false;
          }}
        />
      {/key}
    {:else}
      No form
    {/if}
  </Sidebar>

  {#each components as ComponentItem, i}
    <div class="section">
      <ComponentItem
        questions={componentsQuestions[i]}
        onEdit={(form: Component) => {
          console.log(form, i, componentsQuestions[i]);
          EditForm = form;
          showSidebar = true;
          componentIdx = i;
        }}
      />
    </div>
  {/each}
</div>

<style>
</style>
