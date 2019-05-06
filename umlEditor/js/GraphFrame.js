let option = "select"

function setTool(newTool) {
  option = newTool
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
    createTBButton("edgeLine"),
    createTBButton("dashLine"),
    createTBButton("nodeClass"),
    createTBButton("nodeNote"),
    createTBButton("nodeInterface")
  )
  toolbar.generateHTML()

  const propBar = createClassProperty()
  propBar.generateHTML()

  const notePropBar = createNoteProperty()
  notePropBar.generateHTML()

  const interfacePropBar = createInterfaceProperty()
  interfacePropBar.generateHTML()

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
    let c = document.getElementById('nodeContainer');
    if(c !== null){
      c.innerHTML = '';
    }
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

    if (option === "select" && selected) {
      dragStartBounds = selected.getBounds()
    }

    if (option === "nodeClass") {
      let newClass = createNodeClass()
      newClass.translate(mousePoint.x, mousePoint.y)
      graph.add(newClass)
    }

    if (option === "nodeNote") {
      let newNote = createNodeNote()
      newNote.translate(mousePoint.x, mousePoint.y)
      graph.add(newNote)
    }

    if (option === "nodeInterface") {
      let newInterface = createNodeInterface()
      newInterface.translate(mousePoint.x, mousePoint.y)
      graph.add(newInterface)
    }

    if (selected !== undefined) {
      if (selected.getType() === "class") {
        let input1 = document.getElementById("name")
        input1.addEventListener("input", event => {selected.setText1(input1.value)})
        let input2 = document.getElementById("attribute")
        input2.addEventListener("input", event => {selected.setText2(input2.value)})
        let input3 = document.getElementById("methods")
        input3.addEventListener("input", event => {selected.setText3(input3.value)})

        selected !== undefined ?
          propBar.getText(selected.getText1(),selected.getText2(),selected.getText3()) : propBar.emptyField()
      }

      if (selected.getType() === "note") {
        let input = document.getElementById("text")
        input.addEventListener("input", event => {selected.setText(input.value)})

        selected !== undefined ?
          notePropBar.getText(selected.getText()) : notePropBar.emptyField()
      }

      if (selected.getType() === "interface") {
        let input = document.getElementById("interfaceName")
        input.addEventListener("input", event => {selected.setInterfaceText(input.value)})
        let input1 = document.getElementById("interfaceMethods")
        input1.addEventListener("input", event => {selected.setInterfaceMethodsText(input1.value)})

        selected !== undefined ?
          interfacePropBar.getText(selected.getText1(), selected.getText2()) : interfacePropBar.emptyField()
      }
    }
  repaint()
  })

  canvas.addEventListener("mouseup", event => {
    let mousePoint = mouseLocation(event)

    if (option === "edgeLine" && dragStartPoint != undefined) {
      const edgeLine = createEdgeLine()
      graph.connect(edgeLine, dragStartPoint, mousePoint)
      repaint()
    }

    if (option === "dashLine" && dragStartPoint != undefined) {
      const dashLine = createDashLine()
      graph.connect(dashLine, dragStartPoint, mousePoint)
      repaint()
    }

    dragStartPoint = undefined
    dragStartBounds = null
})

  canvas.addEventListener("mousemove", event => {
    let mousePoint = mouseLocation(event)
    if (dragStartBounds != null) {
    const bounds = selected.getBounds()
    selected.translate(
      dragStartBounds.x - bounds.x + mousePoint.x - dragStartPoint.x,
      dragStartBounds.y - bounds.y + mousePoint.y - dragStartPoint.y
    )}
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
  // do something
})
})
