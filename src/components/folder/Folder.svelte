<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet,
    title?: string
  }

  interface State {
    opened: boolean
  }

  let {
    children,
    title,
  }: Props = $props();

  let {
    opened
  }: State = $state({ opened: false });

</script>


<div class="folder">
    <div class="folder__title">{title}</div>
    <div class={["folder__content", {opened}]}>
        {@render children()}
    </div>
    <div class="folder__button button" onclick={() => opened = !opened}>{opened ? 'Скрыть' : 'Показать'}</div>
</div>


<style lang="scss">
    .folder {
        margin: 20px 0;
        &__content {
            display: none;

            &.opened {
                display: block;
            }
        }

        &__title {
            font-weight: 700;
            margin-bottom: 5px;
        }
    }
</style>
