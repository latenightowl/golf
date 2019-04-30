let option = 'select'

function setSelect() { option = 'select' }
function setCircle() { option = 'circle' }
function setDiamond() { option = 'diamond' }
function setEdge() { option = 'edge' }
function drawGrabber(x, y) {
   const size = 3;
   const c = document.getElementById("graphpanel");
   const ctx = c.getContext("2d");
   ctx.beginPath()
   ctx.rect(x - size / 2, y - size / 2, size, size)
   ctx.fillStyle = 'black'
   ctx.fill()
}

document.addEventListener('DOMContentLoaded', function () {
   const graph = new Graph()
   const canvas = document.getElementById('graphpanel')
   let dragStartPoint = undefined
   let dragStartBounds = undefined
   let selected = undefined

   function repaint() {
      canvas.innerHTML = ''
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      graph.draw()

      if (selected !== undefined) {
         const bounds = selected.getBounds()
         drawGrabber(bounds.x, bounds.y)
         drawGrabber(bounds.x + bounds.width, bounds.y)
         drawGrabber(bounds.x, bounds.y + bounds.height)
         drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
      }
   }

   function mouseLocation(event) {
      var rect = canvas.getBoundingClientRect();
      return {
         x: event.clientX - rect.left,
         y: event.clientY - rect.top,
      }
   }

   canvas.addEventListener('mousedown', event => {
      let mousePoint = mouseLocation(event)
      dragStartPoint = mousePoint
      selected = graph.findNode(mousePoint)
      if (option === 'select' && selected) { dragStartBounds = selected.getBounds() }
      if (option === 'circle') { graph.add(createCircleNode(mousePoint.x, mousePoint.y)) }
      if (option === 'diamond') { graph.add(createDiamondNode(mousePoint.x, mousePoint.y)) }
      repaint()
   })

   canvas.addEventListener('mouseup', event => {
      let mousePoint = mouseLocation(event)
      if (option === 'edge' && dragStartPoint != undefined) {
         const e = createLineEdge()
         graph.connect(e, dragStartPoint, mousePoint)
      }
      dragStartPoint = undefined
      dragStartBounds = null
      repaint()
   })

   canvas.addEventListener('mousemove', event => {
      let mousePoint = mouseLocation(event)
      if (dragStartBounds != null) {
         const bounds = selected.getBounds()
         selected.translate(
            dragStartBounds.x - bounds.x
            + mousePoint.x - dragStartPoint.x,
            dragStartBounds.y - bounds.y
            + mousePoint.y - dragStartPoint.y)
      }
      repaint()
   })
})