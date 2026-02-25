<script lang="ts">
  import type { Component } from "svelte";
  import NotFound from "../../pages/notfound/NotFound.svelte";
  import { onMount } from "svelte";

  interface Props {
    router: { [key: string]: Component };
  }

  let { router }: Props = $props();

  let path = $state("");

  let CurrentComponent = $derived(router[path] || NotFound);

  const updateHash = () => {
    path = window.location.hash.replace("#", "") || "index";
  };

  onMount(() => {
    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  });
</script>

{#if CurrentComponent}
  <CurrentComponent />
{:else}
  Путь не найден
{/if}

<style scoped></style>
