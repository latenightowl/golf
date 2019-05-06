// Enum generation code from TypeScript transpilation
var TOOL_TYPE
;(function(TOOL_TYPE) {
   TOOL_TYPE[(TOOL_TYPE["select"] = 0)] = "select"
   TOOL_TYPE[(TOOL_TYPE["nodeCircle"] = 1)] = "nodeCircle"
   TOOL_TYPE[(TOOL_TYPE["nodeDiamond"] = 2)] = "nodeDiamond"
   TOOL_TYPE[(TOOL_TYPE["edgeLine"] = 3)] = "edgeLine"
   TOOL_TYPE[(TOOL_TYPE["edgeLineDot"] = 4)] = "edgeLineDot"
   TOOL_TYPE[(TOOL_TYPE["edgeH"] = 5)] = "edgeH"
   TOOL_TYPE[(TOOL_TYPE["edgeHDot"] = 6)] = "edgeHDot"
   TOOL_TYPE[(TOOL_TYPE["edgeV"] = 7)] = "edgeV"
   TOOL_TYPE[(TOOL_TYPE["edgeVDot"] = 8)] = "edgeVDot"
})(TOOL_TYPE || (TOOL_TYPE = {}))

let currentTool = TOOL_TYPE.select

function usingEdge() {
   if (typeof currentTool === "string") {
      return (
         currentTool === TOOL_TYPE[TOOL_TYPE.edgeLine] ||
         currentTool === TOOL_TYPE[TOOL_TYPE.edgeLineDot] ||
         currentTool === TOOL_TYPE[TOOL_TYPE.edgeH] ||
         currentTool === TOOL_TYPE[TOOL_TYPE.edgeV] ||
         currentTool === TOOL_TYPE[TOOL_TYPE.edgeHDot] ||
         currentTool === TOOL_TYPE[TOOL_TYPE.edgeVDot]
      )
   } else {
      return (
         currentTool === TOOL_TYPE.edgeLine ||
         currentTool === TOOL_TYPE.edgeLineDot ||
         currentTool === TOOL_TYPE.edgeH ||
         currentTool === TOOL_TYPE.edgeV ||
         currentTool === TOOL_TYPE.edgeHDot ||
         currentTool === TOOL_TYPE.edgeVDot
      )
   }
}

function setTool(newTool) {
   currentTool = newTool
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
      createTBButton(TOOL_TYPE[TOOL_TYPE.select]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.nodeCircle]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.nodeDiamond]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.edgeLine]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.edgeLineDot]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.edgeH]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.edgeHDot]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.edgeV]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.edgeVDot])
   )
   toolbar.generateHTML()
   const propBar = createProperty()
   propBar.generateHTML()

   const input = document.getElementById("color")
   input.addEventListener("input", (event) => {
      if (propBar.isColor(input.value)) {
         selected.setColor(input.value)
         repaint()
      }
   })

   const graph = new Graph()
   const canvas = document.getElementById("graphpanel")
   let dragStartPoint = undefined
   let dragStartBounds = undefined
   let selected = undefined

   const canvasStyle = getComputedStyle(canvas)
   canvas.width = parseInt(canvasStyle.width)
   canvas.height = parseInt(canvasStyle.height)
   const ctx = canvas.getContext("2d")

   window.addEventListener("resize", function() {
      const canvasStyle = getComputedStyle(canvas)
      canvas.width = parseInt(canvasStyle.width)
      canvas.height = parseInt(canvasStyle.height)
      repaint()
   })

   function repaint() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      graph.draw()

      if (selected) {
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

   canvas.addEventListener("mousedown", (event) => {
      let mousePoint = mouseLocation(event)
      dragStartPoint = mousePoint
      selected = graph.findNode(mousePoint)
      selected !== undefined
         ? propBar.getColor(selected.getColor())
         : propBar.emptyField()

      if (currentTool === "select" && selected) {
         dragStartBounds = selected.getBounds()
      }

      if (currentTool === "nodeCircle") {
         let newCircle = createNodeCircle()
         newCircle.translate(mousePoint.x, mousePoint.y)
         graph.add(newCircle)
      }

      if (currentTool === "nodeDiamond") {
         let newDiamond = createNodeDiamond()
         newDiamond.translate(mousePoint.x, mousePoint.y)
         graph.add(newDiamond)
      }

      repaint()
   })

   canvas.addEventListener("mouseup", (event) => {
      let mousePoint = mouseLocation(event)
      if (usingEdge() && dragStartPoint != undefined) {
         let typeName = currentTool
         typeName = typeName.charAt(0).toUpperCase() + typeName.slice(1)
         const e = window["create" + typeName]()
         graph.connect(e, dragStartPoint, mousePoint)
         repaint()
      }
      dragStartPoint = undefined
      dragStartBounds = null
   })

   canvas.addEventListener("mousemove", (event) => {
      let mousePoint = mouseLocation(event)
      if (dragStartBounds != null) {
         const bounds = selected.getBounds()
         selected.translate(
            dragStartBounds.x - bounds.x + mousePoint.x - dragStartPoint.x,
            dragStartBounds.y - bounds.y + mousePoint.y - dragStartPoint.y
         )
         repaint()
      }
   })

   window.addEventListener("keydown", (event) => {
      if (event.code === "Delete") {
         if (selected) {
            graph.remove(selected)
            selected = null
            repaint()
         }
      }
      // do something
   })
})
