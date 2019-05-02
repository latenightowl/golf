"use strict"

function TBButton(myNode) {
   console.log("Hello world! I am a button with a " + myNode)
   let width = 50
   let height = 50
   let node = myNode
   node.translate(width / 4, height / 4)
   let index = -1

   return {
      init(i) {
         index = i
      },

      generateHTML() {
         let div = document.createElement("div")

         div.id = "button" + index
         div.className = "tBButton"
         //div.onclick = setCircle()
         div.addEventListener("click", function() {
            console.log(width)
            let typeName = node.getType()
            typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
            setTool(node.getType())
         })

         let canvas = document.createElement("canvas")
         canvas.width = width
         canvas.height = height
         div.appendChild(canvas)

         console.log("Created canvas " + canvas.id + " " + canvas.class)
         let container = document.getElementById("toolbar-container")
         console.log(container)
         container.appendChild(div)
         //document.getElementsByTagName("body")[0].appendChild(canvas)

         let ctx = canvas.getContext("2d")

         console.log(ctx)
         node.draw(ctx)
      }
   }
}
