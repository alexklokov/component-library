<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";

  type Props = {
    children: Snippet;
  };

  type State = {
    tabsCount: number;
    tabTitles: string[];
    activeIdx: number;
  };

  export type TabsCtx = {
    registerTab: (arg0: string) => { index: number; isActive: () => boolean };
    activate: (arg0: number) => void;
  };

  let { tabsCount, tabTitles, activeIdx }: State = $state({
    tabsCount: 0,
    tabTitles: [],
    activeIdx: 0,
  });

  let { children }: Props = $props();

  const tabsCtx: TabsCtx = {
    registerTab: (title: string) => {
      tabTitles = [...tabTitles, title];
      const index = tabsCount;
      tabsCount++;
      return {
        index,
        isActive: () => index === activeIdx,
      };
    },
    activate: (idx: number) => {
      activeIdx = idx;
    },
  };

  setContext("tabs", tabsCtx);
</script>

<div class="tabs">
  <div class="tabs__titles">
    {#each tabTitles as title, i}
      <button
        class={["tabs__title", i === activeIdx ? "active" : ""]}
        onclick={() => {
          tabsCtx.activate(i);
        }}
      >
        {title}
      </button>
    {/each}
  </div>
  <div class="tabs__content">
    {@render children()}
  </div>
</div>

<style lang="scss" scoped>
  .tabs {
    &__titles {
      display: flex;
      overflow: hidden;
      width: max-content;
      margin-bottom: -1px;
    }

    &__title {
      background: #fff;
      padding: 10px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      font-size: 14px;
      border: none;
      cursor: pointer;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      transition-duration: 0.2s;
      border: solid 1px transparent;
      border-bottom-color: #ccc;

      &.active {
        border: solid 1px #ccc;
        border-bottom-color: #fff;
      }
    }

    &__content {
      padding: 20px;
      border: solid 1px #ccc;
    }
  }
</style>
