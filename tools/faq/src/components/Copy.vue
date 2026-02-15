<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    text: String,
    successDuration: {
      type: Number,
      default: 1000,
    }
  })

  const emit = defineEmits(['copy', 'success', 'error'])
  const copied = ref(false)

  const handleCopy = async () => {
    emit('copy', props.text)
    try {
      await copyToClipboard(props.text)
      copied.value = true
      emit('success', props.text)
    
      setTimeout(() => {
        copied.value = false
      }, props.successDuration)
    } catch (err) {
      emit('error', err)
    }
  }

  const copyToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
  }

</script>


<template>
  <div class="copy" @click="handleCopy">
    <svg v-if="!copied" width="20px" height="20px" viewBox="0 -2 36 36" id="Lager_112" data-name="Lager 112" xmlns="http://www.w3.org/2000/svg" fill="#000000">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path id="Path_113" data-name="Path 113" d="M34,0H14a2,2,0,0,0-2,2V8H2a2,2,0,0,0-2,2V30a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V24H34a2,2,0,0,0,2-2V2A2,2,0,0,0,34,0ZM20,14V27a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13a1,1,0,0,1,1-1H19a1,1,0,0,1,1,1ZM32,6V19a1,1,0,0,1-1,1H24V10a2,2,0,0,0-2-2H16V5a1,1,0,0,1,1-1H31a1,1,0,0,1,1,1Z" fill="#161615"></path>
        </g>
    </svg>

    
    <svg v-else width="20px" height="20px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="okIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <polyline points="4 13 9 18 20 7"></polyline>
      </g>
    </svg>

  </div>

</template>


<style scoped>
  .copy {
    cursor: pointer;
    font-size: 14px;
    height: 20px;
  }
</style>
