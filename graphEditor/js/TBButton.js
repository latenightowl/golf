'use strict'

class TBButton {

   constructor(node) {
      console.log("Hello world! I am a button with a " + node);
      this.width = 50
      this.height = 50
      this.node = node
      this.node.translate(this.width / 4, this.height / 4)
   }
   init(index) {
      this.index = index
   }
   generateHTML() {
      let canvas = document.createElement("canvas")

      canvas.id = "button" + this.index
      canvas.class = "tBButton"
      canvas.width = this.width
      canvas.height = this.height

      console.log("Created canvas " + canvas.id + " " + canvas.class)
      let container = document.getElementById('toolbar-container')
      console.log(container)
      container.appendChild(canvas)
      //document.getElementsByTagName("body")[0].appendChild(canvas)
      
      let ctx = canvas.getContext("2d");
      // ctx.beginPath()
      // ctx.rect(0, 0, canvas.width, canvas.height)
      // ctx.fillStyle = 'yellow'
      // ctx.fill()

      console.log(this.node.x)
      this.node.draw(ctx)
   }
}