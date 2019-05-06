/**
 * Declaration of a toolbar button
 * @function
 * @return properties
 */
function createTBButton(myType) {
   let width = 50
   let height = 50
   let type = myType
   let index = 1

   return {
      /**
       * initializes
       * @param {number} i the index 
       */
      init(i) {
         index = i
      },
      /**
       * generates the html tags
       */
      generateHTML() {
         let div = document.createElement("button")

         div.className = "tBButton"
         div.addEventListener("click", function() {
            setTool(type)
         })

         let canvas = document.createElement("canvas")
         canvas.id = "button" + index
         index++
         canvas.width = width
         canvas.height = height
         div.appendChild(canvas)

         let container = document.getElementById("toolbar-container")
         container.appendChild(div)
         let ctx = canvas.getContext("2d")
         ctx.strokeRect(0, 0, width, height)

         if (index > 3){
            ctx.fillStyle = "blue";
            ctx.fillText(type.slice(4), 5, 25)
         }

         let typeName = type
         typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)

         if (type !== "select") {
            let obj = window["create" + typeName]()
            // creating nodes
            if (obj.translate) {
               obj.scale(0.05)
               obj.toolBarDraw()
            } else {
               obj.connect({ x: 10, y: height - 10 }, { x: width - 10, y: 10 })
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
