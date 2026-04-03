<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    opened?: boolean;
    onToggle: (arg0: boolean) => void;
    title: string;
    text: string;
  }

  let { title, text, opened = false, onToggle }: Props = $props();

  let textElement: HTMLElement | null = null;
  let scrollHeight: number = 0;
  let elementHeight: number = $state(0);

  onMount(() => {
    textElement && (scrollHeight = textElement.scrollHeight);
  });

  const toggleOpen = () => {
    onToggle(!opened)
  };

  $effect(() => {
    elementHeight = opened ? scrollHeight : 0;
  })
  
</script>

<div class={["faq-item", { opened }]}>
  <div class="faq-item__title" onclick={toggleOpen}>
    {title}
  </div>
  <div
    bind:this={textElement}
    class="faq-item__answer"
    style:height={elementHeight + "px"}
  >
    <div class="faq-item__text">
      {text}
    </div>
  </div>
</div>

<style scoped lang="scss">
  .faq-item {
    border-radius: 20px;
    border: solid 1px #e9e9e9;
    overflow: hidden;
    height: max-content;
    margin-top: 20px;
    break-inside: avoid;
    display: inline-block;
    width: 100%;

    &__title {
      min-height: 70px;
      padding: 10px 20px;
      display: flex;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      background: #f5f5f5;
      cursor: pointer;

      &::after {
        content: "\002B";
        display: flex;
        flex: none;
        width: 40px;
        height: 40px;
        align-items: center;
        justify-content: center;
        background-color: #e76e76;
        border-radius: 50px;
        font-size: 24px;
        font-weight: 400;
        color: #fff;
        transition: 0.2s ease-in-out;
        transition-property: color, background-color;
        line-height: 1;
      }
    }

    &__answer {
      height: 0;
      transition-duration: 0.2s;
      overflow: hidden;
    }

    &__text {
      padding: 20px;
    }

    &.opened .faq-item {
      &__title {
        &::after {
          content: "\2212";
        }
      }
    }
  }
</style>
