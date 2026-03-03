import { FaqSettings } from "../../../interfaces/Faq";

export const js = (settings: FaqSettings): string => {
  let { className, isWrap, wrapperClass } = settings 

  if (isWrap && wrapperClass.trim()) {
    wrapperClass = `.${wrapperClass} `
  } else {
    wrapperClass = ''
  }
  
  return `
  document.querySelectorAll('${wrapperClass}.${className}-items').forEach(faqWrapper => {
    faqWrapper.querySelectorAll('.${className}').forEach(faqItem => {

      const answer = faqItem.querySelector('.${className}__answer')
      const title = faqItem.querySelector('.${className}__title')
      const height = answer.scrollHeight
      let isOpened = false
      
      title.addEventListener('click', () => {
        faqItem.classList.toggle('opened')
        isOpened = !isOpened
        if(isOpened) {
          answer.style.height = height + 'px'
        } else {
          answer.style.height = 0
        }
      })
     })
  })
`
}
