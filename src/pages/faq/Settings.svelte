<script lang="ts">
  import {
    HeaderTags,
    type FaqSettings,
    type HeaderTag,
  } from "../../interfaces/Faq";

  type Props = {
    settings: FaqSettings;
    onChange: (arg0: Partial<FaqSettings>) => void;
  };

  let { settings, onChange }: Props = $props();
  const update = (event: Event, field: string) => {
    const value = (event.target as HTMLInputElement).value;
    onChange({ [field]: value });
  };
</script>

<div class="form-group">
  <div class="input">
    <label for="block-header">Заголовок блока: </label>
    <input
      id="block-header"
      type="text"
      placeholder="Заголовок"
      value={settings.faqHeader}
      oninput={(e) => {
        update(e, "faqHeader");
      }}
    />
  </div>

  <div class="input">
    <label for="block-tag">Тег заголовка: </label>
    <select
      id="block-tag"
      placeholder="Тег заголовка"
      onchange={(e) => {
        update(e, "headerTag");
      }}
    >
      {#each HeaderTags as tag}
        <option value={tag} selected={tag === settings.headerTag}>{tag}</option>
      {/each}
    </select>
  </div>

  <div class="input">
    <label for="class-name">Класс:</label>
    <input
      id="class-name"
      type="text"
      value={settings.className}
      placeholder="CSS класс"
      oninput={(e) => update(e, "className")}
    />
  </div>

  <div class="flex items-center g-10">
    <label for="wrap">Добавить обертку?</label>
    <input
      type="checkbox"
      id="wrap"
      checked={settings.isWrap}
      onchange={(e) => {
        const checked = (e.target as HTMLInputElement).checked;
        onChange({
          isWrap: checked,
        });
      }}
    />
  </div>

  {#if settings.isWrap}
    <div class="input">
      <label for="wrapper-class-name">Класс для обертки:</label>
      <input
        id="wrapper-class-name"
        type="text"
        value={settings.wrapperClass}
        placeholder="CSS класс"
        oninput={(e) => update(e, "wrapperClass")}
      />
    </div>
  {/if}
</div>

<style lang="scss" scoped>
  .form-group {
    .input {
      display: grid;
      grid-template-columns: 200px auto;
    }
  }
</style>
