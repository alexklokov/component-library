<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import type { TabsCtx } from "./Tabs.svelte";

  interface Props {
    title: string;
    children?: Snippet;
  }

  const ctx: TabsCtx = getContext("tabs");

  let { title, children }: Props = $props();

  // svelte-ignore state_referenced_locally
  let result = ctx.registerTab(title);

  let isActive = $derived(result.isActive());
</script>

{#if isActive}
  {@render children?.()}
{/if}

<style lang="scss" scoped></style>
