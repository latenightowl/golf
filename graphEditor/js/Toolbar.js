/**
 * Declaration of a toolbar 
 * @function
 * @return properties
 */
function createToolbar(...args) {
   let buttons = args
   return {
      /**
       * generates html for each button
       */
      generateHTML() {
         buttons.forEach((element, index) => {
            element.init(index)
            element.generateHTML()
         })
      },
      /**
       * adds a button to the toolbar
       * @param {object} button the button
       */
      addButton(button) {
         buttons.push(button)
      }
   }
}
