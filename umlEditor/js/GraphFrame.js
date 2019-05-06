// Enum generation code from TypeScript transpilation
var TOOL_TYPE

;(function(TOOL_TYPE) {
   TOOL_TYPE[(TOOL_TYPE["select"] = 0)] = "select"
   TOOL_TYPE[(TOOL_TYPE["edgeLine"] = 3)] = "edgeLine"
   TOOL_TYPE[(TOOL_TYPE["edgeLineDot"] = 4)] = "edgeLineDot"
   TOOL_TYPE[(TOOL_TYPE["edgeH"] = 5)] = "edgeH"
   TOOL_TYPE[(TOOL_TYPE["edgeHDot"] = 6)] = "edgeHDot"
   TOOL_TYPE[(TOOL_TYPE["edgeV"] = 7)] = "edgeV"
   TOOL_TYPE[(TOOL_TYPE["edgeVDot"] = 8)] = "edgeVDot"
   TOOL_TYPE[(TOOL_TYPE["nodeClass"] = 9)] = "nodeClass"
   TOOL_TYPE[(TOOL_TYPE["nodeNote"] = 10)] = "nodeNote"
   TOOL_TYPE[(TOOL_TYPE["nodeInterface"] = 11)] = "nodeInterface"
})(TOOL_TYPE || (TOOL_TYPE = {}))

let currentTool = TOOL_TYPE.select

/**
 * Checks for which edge tool
 * @return {enum} the type of edge
 */
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

/**
 * Sets tool
 * @param {object} newTool the tool
 */
function setTool(newTool) {
   currentTool = newTool
}

/**
 * Draws the grabber
 * @param {Context} ctx the context
 * @param {Object} bounds the coordinates of object
 */
function drawGrabber(ctx, bounds) {
   drawGrabberCorner(ctx, bounds.x, bounds.y)
   drawGrabberCorner(ctx, bounds.x + bounds.width, bounds.y)
   drawGrabberCorner(ctx, bounds.x, bounds.y + bounds.height)
   drawGrabberCorner(ctx, bounds.x + bounds.width, bounds.y + bounds.height)
}
/**
 * Draws the corners of grabber
 * @param {context} ctx the context
 * @param {number} x the x position
 * @param {number} y the y position
 */
function drawGrabberCorner(ctx, x, y) {
   const size = 4
   ctx.beginPath()
   ctx.rect(x - size / 2, y - size / 2, size, size)
   ctx.fillStyle = "black"
   ctx.fill()
}
/**
 * Main
 */
document.addEventListener("DOMContentLoaded", function() {
   const toolbar = createToolbar(
      createTBButton(TOOL_TYPE[TOOL_TYPE.select]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.edgeLine]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.edgeLineDot]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.nodeNote]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.nodeClass]),
      createTBButton(TOOL_TYPE[TOOL_TYPE.nodeInterface])
   )
   toolbar.generateHTML()

   const propBar = createClassProperty()
   propBar.generateHTML()

   const notePropBar = createNoteProperty()
   notePropBar.generateHTML()

   const interfacePropBar = createInterfaceProperty()
   interfacePropBar.generateHTML()

   const graph = new createGraph()
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

   /**
    * Repaints the canvas
    */
   function repaint() {
      let c = document.getElementById("nodeContainer")
      if (c !== null) {
         c.innerHTML = ""
      }

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

      if (currentTool === "select" && selected) {
         dragStartBounds = selected.getBounds()
      }

      if (currentTool === "nodeClass") {
         let newClass = createNodeClass()
         newClass.translate(mousePoint.x, mousePoint.y)
         graph.add(newClass)
      }

      if (currentTool === "nodeNote") {
         let newNote = createNodeNote()
         newNote.translate(mousePoint.x, mousePoint.y)
         graph.add(newNote)
      }

      if (currentTool === "nodeInterface") {
         let newInterface = createNodeInterface()
         newInterface.translate(mousePoint.x, mousePoint.y)
         graph.add(newInterface)
      }

      if (selected !== undefined) {
         if (selected.getType() === "class") {
            let input1 = document.getElementById("name")
            input1.addEventListener("input", (event) => {
               selected.setText1(input1.value)
            })
            let input2 = document.getElementById("attribute")
            input2.addEventListener("input", (event) => {
               selected.setText2(input2.value)
            })
            let input3 = document.getElementById("methods")
            input3.addEventListener("input", (event) => {
               selected.setText3(input3.value)
            })

            selected !== undefined
               ? propBar.getText(
                    selected.getText1(),
                    selected.getText2(),
                    selected.getText3()
                 )
               : propBar.emptyField()
         }

         if (selected.getType() === "note") {
            let input = document.getElementById("text")
            input.addEventListener("input", (event) => {
               selected.setText(input.value)
            })

            selected !== undefined
               ? notePropBar.getText(selected.getText())
               : notePropBar.emptyField()
         }

         if (selected.getType() === "interface") {
            let input = document.getElementById("interfaceName")
            input.addEventListener("input", (event) => {
               selected.setInterfaceText(input.value)
            })
            let input1 = document.getElementById("interfaceMethods")
            input1.addEventListener("input", (event) => {
               selected.setInterfaceMethodsText(input1.value)
            })

            selected !== undefined
               ? interfacePropBar.getText(
                    selected.getText1(),
                    selected.getText2()
                 )
               : interfacePropBar.emptyField()
         }
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
      }
      repaint()
   })

   window.addEventListener("keydown", (event) => {
      if (event.code === "Delete" || event.code === "Backspace") {
         if (selected) {
            graph.remove(selected)
            selected = null
            repaint()
         }
      }
   })
})
