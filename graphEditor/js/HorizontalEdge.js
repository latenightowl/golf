/**
 * Gets the center
 * @param {object} rect the rectangle
 * @return {object} returns x and y
 */
function center(rect) {
   return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}
/**
 * creates horizontal edge
 * @return {object} edge with properties
 */
function createEdgeH() {
   let start
   let end
   return {
      /**
       * Connects two points
       * @param {object} s the start
       * @param {object} e the end
       */
      connect: (s, e) => {
         start = s
         end = e
      },
      /**
       * draws the edge
       * @param {context} ctx the context
       */
      draw: (ctx) => {
         ctx.beginPath()

         let p
         let q
         if (start.getConnectionPoint) {
            p = start.getConnectionPoint(end)
         } else {
            p = start
         }
         if (end.getConnectionPoint) {
            q = end.getConnectionPoint(start)
         } else {
            q = end
         }
         // Ensure we draw left to right
         if (p.x > q.x) {
            [p, q] = [q, p]
         }

         ctx.moveTo(p.x, p.y)
         ctx.lineTo(q.x, p.y)
         ctx.lineTo(q.x, q.y)
         ctx.setLineDash([])
         ctx.stroke()
      },
      /**
       * gets the objects
       * @return {objects} the start and end objects
       */
      getStartEnd: () => {
         return [start, end]
      }
   }
}
