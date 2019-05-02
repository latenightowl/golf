'use strict'

class Toolbar {

   constructor(...args) {
      this.buttons = args;
      console.log(this.buttons);
      this.nodes = []
      this.edges = []
   }
   generateHTML() {
      this.buttons.forEach((element, index) => {
         element.init(index)
         element.generateHTML()
      })
   }
}