function createCircleNode (x, y) {
   let size = 20;
   
   return {
      getBounds: () => {
         return {
            x: x,
            y: y,
            width: size,
            height: size,
            center: () => {return {x: x + size / 2, y: y + size / 2}}
         }
      },
      contains: p => {
         return (x+size/2-p.x)**2+(y+size/2-p.y)**2 <= size**2/4
      },
      translate: (dx, dy) => {
         x += dx
         y += dy
      },
      draw: () => {
         const c = document.getElementById("graphpanel")
         const ctx = c.getContext("2d")
         ctx.beginPath()
         ctx.arc(x+size/2, y+size/2, size/2, 0, 2*Math.PI)
         ctx.fillStyle = 'goldenrod'
         ctx.fill()
      },
      getConnectionPoint: (other) => {
         let centerX = x + size / 2
         let centerY = y + size / 2
         let dx = other.getBounds().center().x - centerX
         let dy = other.getBounds().center().y - centerY
         let distance = Math.sqrt(dx * dx + dy * dy)
         if (distance == 0) return other
         else return {
            x: centerX + dx * (size / 2) / distance,
            y:  centerY + dy * (size / 2) / distance
         }
      }
   }
}