function center(rect) {
   return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

function createEdgeV() {
   let start
   let end
   return {
      connect: (s, e) => {
         start = s
         end = e
      },
      draw: (ctx) => {
         ctx.beginPath()
         const p = start.getConnectionPoint(end)
         const q = end.getConnectionPoint(start)
         ctx.moveTo(p.x, p.y)
         ctx.lineTo(p.x, q.y)
         ctx.lineTo(q.x, q.y)
         ctx.setLineDash([])
         ctx.stroke()
      }
   }
}
