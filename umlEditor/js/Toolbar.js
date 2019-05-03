"use strict"

function createToolbar(...args) {
   let buttons = args
   console.log(buttons)
   return {
      generateHTML() {
         buttons.forEach(element, index) => {
            element.init(index)
            element.generateHTML()
         })
      },
      addButton(button) {
         buttons.push(button)
      }
   }
}
