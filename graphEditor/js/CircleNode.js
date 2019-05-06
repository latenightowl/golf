"use strict"

function createNodeCircle() {
   let radius = 40
   let x = 0
   let y = 0
   let type = "circle"
   let color = "gray"

   return {
      clone: () => {
         return createCircleNode(color)
      },
      getType: () => {
         return type
      },
      getBounds: () => {
         return {
            x: x,
            y: y,
            width: radius,
            height: radius,
            center: () => {
               return { x: x + radius / 2, y: y + radius / 2 }
            }
         }
      },
      contains: (p) => {
         return (
            (x + radius / 2 - p.x) ** 2 + (y + radius / 2 - p.y) ** 2 <=
            radius ** 2 / 4
         )
      },
      translate: (dx, dy) => {
         x += dx
         y += dy
      },
      draw: (ctx) => {
         ctx.beginPath()
         ctx.arc(x + radius / 2, y + radius / 2, radius / 2, 0, 2 * Math.PI)
         ctx.fillStyle = color
         ctx.fill()
      },
      getConnectionPoint: (other) => {
         let centerX = x + radius / 2
         let centerY = y + radius / 2
         let dx = other.getBounds().center().x - centerX
         let dy = other.getBounds().center().y - centerY
         let distance = Math.sqrt(dx * dx + dy * dy)
         if (distance == 0) return other
         else
            return {
               x: centerX + (dx * (radius / 2)) / distance,
               y: centerY + (dy * (radius / 2)) / distance
            }
      },
      setColor: (myColor) => {
         color = myColor
      },
      getColor: () => {
         return color
      },
      scale: (factor) => {
         radius *= factor
      }
   }
}
