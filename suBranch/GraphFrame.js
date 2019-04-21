let option = 'select'

function setSelect() { option = 'select' }
function setCircle() { option = 'circle' }
function setDiamond() { option = 'diamond' }
function setEdge() { option = 'edge' }

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
   //const n1 = createCircleNode(10, 10, 20, 'goldenrod')
   //graph.add(n1)
   
  // function center(rect) {
  //  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
  // }

   // function createLineEdge() {
   //   let start = undefined
   //   let end = undefined
   //   return {
   //     connect: (s, e) => {
   //       start = s
   //       end = e
   //     },
   //     draw: () => {
   //       const canvas = document.getElementById('myCanvas')
   //       const ctx = canvas.getContext('2d')
   //       ctx.beginPath()
   //       const p = center(start.getBounds()) // Just pick the center of the bounds for now
   //       const q = center(end.getBounds()) // Not the "connection points" that graphed2 uses
   //       ctx.moveTo(p.x, p.y)
   //       ctx.lineTo(q.x, q.y)
   //       ctx.stroke()
   //     }
   //   }
   // }
   
   // const e = createLineEdge()
   // graph.connect(e, { x: 20, y: 20 }, { x: 40, y: 40 })
   
   
   // graph.draw()
   
   
   let selected = undefined
   
  function repaint() {
    canvas.innerHTML = ''
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    graph.draw()
    // if (selected !== undefined) {
    //   const bounds = selected.getBounds()
    //   drawGrabber(bounds.x, bounds.y)
    //   drawGrabber(bounds.x + bounds.width, bounds.y)
    //   drawGrabber(bounds.x, bounds.y + bounds.height)      
    //   drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    // }
  }
   
  function mouseLocation(event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

   // let dragStartPoint = undefined
   // let dragStartBounds = undefined
  const canvas = document.getElementById('graphpanel')
  canvas.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event)
    // dragStartPoint = mousePoint
    // selected = graph.findNode(mousePoint);
    // if (selected) {
    //   dragStartBounds = selected.getBounds()
    // }
    if(option === 'circle') { graph.add(createCircleNode(mousePoint.x, mousePoint.y)) }
    repaint()
  })
   
  canvas.addEventListener('mousemove', event => {
    let mousePoint = mouseLocation(event)
    // if (dragStartBounds != null) {
    //   const bounds = selected.getBounds()
    //   selected.translate(
    //   dragStartBounds.x - bounds.x
    //   + mousePoint.x - dragStartPoint.x,
    //   dragStartBounds.y - bounds.y
    //   + mousePoint.y - dragStartPoint.y);
    // } 
    repaint()
  })
   
  canvas.addEventListener('mouseup', event => {
    let mousePoint = mouseLocation(event)
    // dragStartPoint = undefined
    // dragStartBounds = null
    repaint()
  })  
})