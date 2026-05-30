import { type FaqSettings } from "../../interfaces/Faq";

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
      
      title.addEventListener('click', () => {
        faqItem.classList.toggle('opened')
      })
     })
  })
`
}
