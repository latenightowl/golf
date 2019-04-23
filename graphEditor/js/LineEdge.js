function center(rect) {
   return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

function createLineEdge() {
   let start = undefined
   let end = undefined
   return {
      connect: (s, e) => {
         start = s
         end = e
      },
      draw: () => {
         const canvas = document.getElementById('graphpanel')
         const ctx = canvas.getContext('2d')
         ctx.beginPath()
         //const pCenter = center(start.getBounds()) // Just pick the center of the bounds for now
         //const qCenter = center(end.getBounds()) // Not the "connection points" that graphed2 uses
         const p = start.getConnectionPoint(end) // Just pick the center of the bounds for now
         const q = end.getConnectionPoint(start) // Not the "connection points" that graphed2 uses
         ctx.moveTo(p.x, p.y)
         ctx.lineTo(q.x, q.y)
         ctx.stroke()
      }
   }
}