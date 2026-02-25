<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    show: boolean;
    toggle: (arg0: boolean) => void;
  }

  let { children, show, toggle }: Props = $props();
</script>

<div class={["sidebar", { show }]}>
  <div class="sidebar__toner" onclick={(_) => toggle(!show)}></div>
  <div class="sidebar__content">
    {@render children?.()}
  </div>
</div>

<style scoped lang="scss">
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    visibility: hidden;
    transition: visibility 0.1s;
    z-index: 10;

    &__toner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &__content {
      position: relative;
      z-index: 2;
      background: #fff;
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 50%;
      height: 100%;
      margin-left: -100%;
      transition-duration: 0.3s;
      overflow: hidden;
      padding: 20px;
    }

    &.show {
      visibility: visible;

      .sidebar__content {
        margin-left: 0;
      }
    }
  }
</style>
