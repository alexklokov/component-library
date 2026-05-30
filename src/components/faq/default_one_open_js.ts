import type { FaqSettings } from "../../interfaces/Faq";

export const js = (settings: FaqSettings): string => {
  let { className, isWrap, wrapperClass } = settings

  if (isWrap && wrapperClass.trim()) {
    wrapperClass = `.${wrapperClass} `
  } else {
    wrapperClass = ''
  }

  return `
  document.querySelectorAll('${wrapperClass}.${className}-items').forEach(faqWrapper => {
    faqWrapper.querySelectorAll('.${className}').forEach((faqItem, _, faqItems) => {

      const answer = faqItem.querySelector('.${className}__answer')
      const title = faqItem.querySelector('.${className}__title')
      
      title.addEventListener('click', () => {
        if(faqItem.classList.contains('opened')) {
          faqItem.classList.remove('opened')
        } else {
          faqItems.forEach(item => item.classList.remove('opened')) 
          faqItem.classList.add('opened')
        }
      })
     })
  })
`
}
