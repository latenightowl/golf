class Toolbar {

   constructor(...args) {
      this.buttons = args;
      console.log(this.buttons);
      this.height = 30
      this.width = 250
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