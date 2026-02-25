<script lang="ts">
  import type { Component } from "svelte";
  import Faq1 from "../../components/faq_1/Faq.svelte";
  import Sidebar from "../../components/sidebar/Sidebar.svelte";

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
  const components = [Faq1];
</script>

<div class="container">
  <Sidebar
    show={showSidebar}
    toggle={(state: boolean) => {
      showSidebar = state;
    }}
  >
    {#if EditForm}
      <EditForm
        questions={componentsQuestions[componentIdx]}
        onSave={(data: any) => {
          componentsQuestions[componentIdx] = data;
          componentIdx = -1;
          showSidebar = false;
        }}
      />
    {:else}
      No form
    {/if}
  </Sidebar>

  {#each components as ComponentItem, i}
    <div class="section">
      <ComponentItem
        data={componentsQuestions[i]}
        onGetLangConfig={() => {}}
        onEdit={(form: Component) => {
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
