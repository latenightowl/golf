"use strict"

class TBButton {
   constructor(node) {
      console.log("Hello world! I am a button with a " + node)
      this.width = 50
      this.height = 50
      this.node = node
      this.node.translate(this.width / 4, this.height / 4)
   }

   init(index) {
      this.index = index
   }

   generateHTML() {
      let div = document.createElement("div")

      div.id = "button" + this.index
      div.className = "tBButton"
      div.onclick = setCircle()

      let canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      div.appendChild(canvas)

      console.log("Created canvas " + canvas.id + " " + canvas.class)
      let container = document.getElementById("toolbar-container")
      console.log(container)
      container.appendChild(div)
      //document.getElementsByTagName("body")[0].appendChild(canvas)

      let ctx = canvas.getContext("2d")

      console.log(this.node.x)
      this.node.draw(ctx)
   }
}
