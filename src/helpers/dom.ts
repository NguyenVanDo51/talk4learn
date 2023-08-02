export const scrollToBottom = (selector: string) => {
  var objDiv = document.querySelector(selector)
  if (objDiv) objDiv.scrollTop = objDiv.scrollHeight
}
