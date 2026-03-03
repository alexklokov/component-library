import { FaqSettings } from "../../../interfaces/Faq"

export const css = (settings: FaqSettings): string => {
  let {className, isWrap, wrapperClass } = settings

  if (isWrap && wrapperClass.trim()) {
    wrapperClass = `.${wrapperClass} `
  } else {
    wrapperClass = ''
  }
   
  return `
  ${wrapperClass}.${className}-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  ${wrapperClass}.${className}__header {
    font-size: 32px;
    margin-bottom: 30px;
    margin-top: 0;
  }

  ${wrapperClass}.${className} {
    border-radius: 20px;
    border: solid 1px #e9e9e9;
    overflow: hidden;
  }

  ${wrapperClass}.${className}__title {
    min-height: 70px;
    padding: 10px 20px;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    background: #f5f5f5;
    cursor: pointer;
  }

   ${wrapperClass}.${className}__title::after {
    content: "\\002B";
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

  ${wrapperClass}.${className}__answer {
    height: 0;
    transition-duration: 0.2s;
    overflow: hidden;
  }

  ${wrapperClass}.${className}__text {
    padding: 20px;
  }

  ${wrapperClass}.${className}.opened .${className}__title::after {
    content: "\\2212";
  }
`
}

export default css
