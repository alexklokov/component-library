import type { FaqSettings, Question } from '../../../interfaces/Faq'

export const html = (settings: FaqSettings, questions: Question[]): string => {

  const { className, faqHeader, headerTag, isWrap, wrapperClass } = settings


  let result = `<div class="${className}-items" itemscope itemtype="https://schema.org/FAQPage">
  <${headerTag} class="${className}__header">${faqHeader}</${headerTag}>
  <div class="${className}__questions">`


  const items = questions.map(question => {
    return `
    <div class="${className}" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <div class="${className}__title" itemprop="name">
        ${question.question}
      </div>
      <div class="${className}__answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <div class="${className}__text" itemprop="text">
          ${question.answer}
        </div>
      </div>
    </div>`
  })

  result += items.join("") + `
  </div>
</div>`


  if (isWrap && wrapperClass.trim()) {
    result = `<div class="${wrapperClass}">\n${result}\n</div>`
  }

  return result
}
