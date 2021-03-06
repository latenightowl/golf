/**
 * Declaration of a hard object for a diamond node
 * @function
 * @return properties of a diamond node
 */
function createNodeDiamond() {
   let width = 60
   let height = 40
   let x = 0
   let y = 0
   let type = "diamond"
   let color = "gray"

   return {
      /**
       * Gets the type of node
       * @return {String} the type
       */
      getType: () => {
         return type
      },
      /**
       * Gets the bounds of node
       * @return {Object} the coordinates and a center
       */   
      getBounds: () => {
         return {
            x: x,
            y: y,
            width: width,
            height: height,
            /**
              * Gets the center coordinates
              * @return {Object} the x and y position
             */
            center: () => {
               return { x: x + width / 2, y: y + height / 2 }
            }
         }
      },
      /**
       * Checks if a point is within the node
       * @param {Object} p the specified point
       * @return {Boolean} true if p within the node
       */
      contains: (p) => {
         return (
            (x + width / 2 - p.x) ** 2 + (y + height / 2 - p.y) ** 2 <=
            (width * height) / 4
         )
      },
      /**
       * Moves the position of the node
       * @param {number} dx the changing x
       * @param {number} dy the changing y
       */
      translate: (dx, dy) => {
         x += dx
         y += dy
      },
      /**
       * Draws the node
       * @param {Context} ctx the context
       */
      draw: (ctx) => {
         ctx.beginPath()
         ctx.moveTo(x + width / 2, y)
         ctx.lineTo(x + width, y + height / 2)
         ctx.lineTo(x + width / 2, y + height)
         ctx.lineTo(x, y + height / 2)
         ctx.fillStyle = color
         ctx.fill()
      },
      /**
       * Gets the point of connection
       * @param {Object} other the node's coordinates
       * @return {Object} the x and y
       */
      getConnectionPoint: (other) => {
         let centerX = x + width / 2
         let centerY = y + height / 2
         let dx = other.getBounds().center().x - x
         let dy = other.getBounds().center().y - y
         if (dx >= dy && dx >= -dy) return { x: x + width, y: centerY }
         if (dx < dy && dx >= -dy) return { x: centerX, y: y + height }
         if (dx >= dy && dx < -dy) return { x: centerX, y: y }
         return { x, y: centerY }
      },
      /**
       * Sets the color
       * @param {String} myColor the color
       */
      setColor: (myColor) => {
         color = myColor
      },
      /**
       * Gets the color
       * @return {String} the color
       */
      getColor: () => {
         return color
      },
      /**
       * Scales the size
       * @param {number} factor the multipier
       */
      scale: (factor) => {
         width *= factor
         height *= factor
      }
   }
}
