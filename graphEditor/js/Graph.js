function createGraph() {
   let nodes = []
   let edges = []

   return {
      add: (n) => {
         nodes.push(n)
      },

      remove: (n) => {
         let toRemove = []

         for (const e of edges) {
            let startEnd = e.getStartEnd()

            if (startEnd[0] === n || startEnd[1] === n) {
               toRemove.push(e)
            }
         }

         for (const e of toRemove) {
            edges.splice(edges.indexOf(e), 1)
         }

         nodes.splice(nodes.indexOf(n), 1)
      },

      findNode: (p) => {
         for (let i = nodes.length - 1; i >= 0; i--) {
            const n = nodes[i]
            if (n.contains(p)) return n
         }
         return undefined
      },

      draw: () => {
         const canvas = document.getElementById("graphpanel")
         const ctx = canvas.getContext("2d")

         for (const e of edges) {
            e.draw(ctx)
         }
         for (const n of nodes) {
            n.draw(ctx)
         }
      },

      connect: function(e, p1, p2) {
         const n1 = this.findNode(p1)
         const n2 = this.findNode(p2)
         if (n1 !== undefined && n2 !== undefined) {
            e.connect(n1, n2)
            edges.push(e)
            return true
         }
         return false
      }
   }
}
