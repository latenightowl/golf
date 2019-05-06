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
               obj.translate(width / 4, height / 4)
               obj.draw(ctx)
            } else {
               ctx.beginPath()
               ctx.moveTo(width-10, 10)
               ctx.lineTo(10, height-10)
               ctx.stroke()
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
