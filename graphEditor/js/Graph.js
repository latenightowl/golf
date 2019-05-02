class Graph {
   
   constructor() {
      this.nodes = []
      this.edges = []
   }

   add(n) {
      this.nodes.push(n)
   }

   findNode(p) {
      for (let i = this.nodes.length - 1; i >= 0; i--) {
         const n = this.nodes[i]
         if (n.contains(p)) return n
      }
      return undefined
   }

   draw() {
      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext("2d");
      for (const n of this.nodes) {
         n.draw(ctx)
      }
      for (const e of this.edges) {
         e.draw(ctx)
      }
   }

   connect(e, p1, p2) {
      const n1 = this.findNode(p1)
      const n2 = this.findNode(p2)
      if (n1 !== undefined && n2 !== undefined) {
         e.connect(n1, n2)
         this.edges.push(e)
         return true
      }
      return false
   }
} 