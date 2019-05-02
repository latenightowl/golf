function createNodeDiamond() {
   let width = 20
   let height = 20
   let x = 0
   let y = 0
   let type = "diamond"
   let color = "black"

   return {
      getType: () => {
         return type
      },
      getBounds: () => {
         return {
            x: x,
            y: y,
            width: width,
            height: height,
            center: () => {
               return { x: x + width / 2, y: y + height / 2 }
            }
         }
      },
      contains: p => {
         return (
            (x + width / 2 - p.x) ** 2 + (y + height / 2 - p.y) ** 2 <=
            (width * height) / 4
         )
      },
      translate: (dx, dy) => {
         x += dx
         y += dy
      },
      draw: ctx => {
         ctx.beginPath()
         ctx.moveTo(x + width / 2, y)
         ctx.lineTo(x + width, y + height / 2)
         ctx.lineTo(x + width / 2, y + height)
         ctx.lineTo(x, y + height / 2)
         ctx.fillStyle = color
         ctx.fill()
      },
      getConnectionPoint: other => {
         let centerX = x + width / 2
         let centerY = y + height / 2
         let dx = other.getBounds().center().x - x
         let dy = other.getBounds().center().y - y
         if (dx >= dy && dx >= -dy) return { x: x + width, y: centerY }
         if (dx < dy && dx >= -dy) return { x: centerX, y: y + height }
         if (dx >= dy && dx < -dy) return { x: centerX, y: y }
         return { x, y: centerY }
      },
      setColor: myColor => {
         color = myColor
      }
   }
}
