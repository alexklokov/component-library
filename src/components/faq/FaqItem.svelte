<script lang="ts">
  interface Props {
    title: string;
    text: string;
    opened: boolean;
    additionalClasses?: string[];
    onToggle: () => void;
  }

  let {
    title,
    text,
    opened,
    onToggle,
    additionalClasses = [],
  }: Props = $props();
</script>

<div class={["faq-item", { opened }, ...additionalClasses]}>
  <div class="faq-item__title" onclick={(_) => onToggle()}>
    {title}
  </div>
  <div class="faq-item__answer">
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
    height: auto;
    break-inside: avoid;
    display: inline-block;
    width: 100%;

    &.mb-20 {
      margin-bottom: 20px;
    }

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
      display: grid;
      grid-template-rows: 0fr;
      transition-duration: 0.2s;
      overflow: hidden;
    }

    &__text {
      padding: 20px;
      overflow: hidden;
    }

    &.opened .faq-item__answer {
      grid-template-rows: 1fr;
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
