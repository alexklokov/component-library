<script lang="ts">
  import type { Snippet } from "svelte";
  import Link from "../../components/link/Link.svelte";

  type Props = {
    title: string;
    children?: Snippet;
    url: string;
    className?: string;
  };

  let { title, children, url, className = "" }: Props = $props();
</script>

<div class={["component-section", { className }]}>
  <div class="component-section__title">{title}</div>
  <div class="component-section__description">{@render children?.()}</div>
  <Link href={url}>
    <div class="button">Смотреть</div>
  </Link>
</div>

<style lang="scss">
  .component-section {
    &__title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
</style>
