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
         //div.onclick = setCircle()
         div.addEventListener("click", function() {
            console.log(width)
            setTool(type)
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
         ctx.fillStyle = "gray"
         ctx.fillRect(0, 0, width, height)

         console.log(ctx)

         let typeName = type
         typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
         console.log("create" + typeName)

         if (type != "select") {
            let obj = window["create" + typeName]()
            if (obj.translate) {
               obj.translate(width / 4, height / 4)
               obj.draw(ctx)
            } else {
               ctx.beginPath()
               ctx.moveTo(width, 0)
               ctx.lineTo(0, height)
               ctx.stroke()
            }
            
         } else {
            console.log(type + " no icon")
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
