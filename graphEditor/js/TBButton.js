"use strict"

function createTBButton(myType) {
   let width = 50
   let height = 50
   let type = myType
   let index = -1

   return {
      init(i) {
         index = i
      },

      generateHTML() {
         let div = document.createElement("div")

         div.id = "button" + index
         div.className = "tBButton"
         div.title = myType
         div.addEventListener("click", function() {
            setTool(type)
         })

         let canvas = document.createElement("canvas")
         canvas.width = width
         canvas.height = height
         div.appendChild(canvas)

         let container = document.getElementById("toolbar-container")
         container.appendChild(div)

         let ctx = canvas.getContext("2d")
         ctx.fillStyle = "black"
         ctx.strokeRect(0, 0, width, height)

         let typeName = type
         typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)

         if (type != "select") {
            let obj = window["create" + typeName]()
            if (obj.translate) {
               obj.scale(0.5)
               obj.translate(width / 2 - obj.getBounds().width / 2, height / 2 - obj.getBounds().height / 2)
               obj.draw(ctx)
            } else {
               obj.connect({ x: width - 10, y: 10 }, { x: 10, y: height - 10 })
               obj.draw(ctx)
            }
         } else {
            drawGrabber(ctx, {
               x: width / 4,
               y: height / 4,
               width: width / 2,
               height: height / 2
            })
         }
      }
   }
}
