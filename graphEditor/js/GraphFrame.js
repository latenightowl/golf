let option = "select"

function setTool(newTool) {
   option = newTool
   console.log(option)
}

function drawGrabber(ctx, bounds) {
   drawGrabberCorner(ctx, bounds.x, bounds.y)
   drawGrabberCorner(ctx, bounds.x + bounds.width, bounds.y)
   drawGrabberCorner(ctx, bounds.x, bounds.y + bounds.height)
   drawGrabberCorner(ctx, bounds.x + bounds.width, bounds.y + bounds.height)
}

function drawGrabberCorner(ctx, x, y) {
   const size = 4
   ctx.beginPath()
   ctx.rect(x - size / 2, y - size / 2, size, size)
   ctx.fillStyle = "black"
   ctx.fill()
}

document.addEventListener("DOMContentLoaded", function() {
   const toolbar = createToolbar(
      createTBButton("select"),
      createTBButton("nodeCircle"),
      createTBButton("nodeDiamond"),
      createTBButton("edgeLine")
   )
   toolbar.generateHTML()
   const propBar = createProperty()
   propBar.generateHTML()

   const input = document.getElementById("color")
   input.addEventListener("input", event => {
      console.log('sucesss')
      if(propBar.isColor(input.value)) {
         selected.setColor(input.value)
         repaint()
      }
   })


   // let all = document.getElementsByClassName("tBButton")
   // console.log(all.length)

   // for (let i = 0, max = all.length; i < max; i++) {
   //    console.log("found")
   // }

   // toolCircle()

   const graph = new Graph()
   const canvas = document.getElementById("graphpanel")
   let dragStartPoint = undefined
   let dragStartBounds = undefined
   let selected = undefined

   function repaint() {
      canvas.innerHTML = ""
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      graph.draw()

      if (selected !== undefined) {
         const bounds = selected.getBounds()
         const ctx = canvas.getContext("2d")
         drawGrabber(ctx, bounds)

      }
   }

   function mouseLocation(event) {
      var rect = canvas.getBoundingClientRect()
      return {
         x: event.clientX - rect.left,
         y: event.clientY - rect.top
      }
   }

   canvas.addEventListener("mousedown", event => {
      let mousePoint = mouseLocation(event)
      dragStartPoint = mousePoint
      selected = graph.findNode(mousePoint)
      if(selected !== undefined) {
         propBar.getColor(selected.getColor())
      }

      if (option === "select" && selected) {
         dragStartBounds = selected.getBounds()
      }

      if (option === "nodeCircle") {
         let newCircle = createNodeCircle()
         newCircle.setColor("green")
         newCircle.translate(mousePoint.x, mousePoint.y)
         graph.add(newCircle)
      }

      if (option === "nodeDiamond") {
         let newDiamond = createNodeDiamond()
         newDiamond.setColor("blue")
         newDiamond.translate(mousePoint.x, mousePoint.y)
         graph.add(newDiamond)
      }

      repaint()
   })

   canvas.addEventListener("mouseup", event => {
      let mousePoint = mouseLocation(event)
      if (option === "edgeLine" && dragStartPoint != undefined) {
         const e = createEdgeLine()
         graph.connect(e, dragStartPoint, mousePoint)
      }
      dragStartPoint = undefined
      dragStartBounds = null
      repaint()
   })

   canvas.addEventListener("mousemove", event => {
      let mousePoint = mouseLocation(event)
      if (dragStartBounds != null) {
         const bounds = selected.getBounds()
         selected.translate(
            dragStartBounds.x - bounds.x + mousePoint.x - dragStartPoint.x,
            dragStartBounds.y - bounds.y + mousePoint.y - dragStartPoint.y
         )
      }
      repaint()
   })
})
