"use strict"

function createToolbar(...args) {
   let buttons = args
   return {
      generateHTML() {
         buttons.forEach((element, index) => {
            element.init(index)
            element.generateHTML()
         })
      },
      addButton(button) {
         buttons.push(button)
      }
   }
}
