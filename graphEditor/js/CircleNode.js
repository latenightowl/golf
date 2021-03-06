/**
 * Declaration of a hard object for a circle node
 * @function
 * @return properties of a circle node
 */
function createNodeCircle() {
   let radius = 40
   let x = 0
   let y = 0
   let type = "circle"
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
            width: radius,
            height: radius,
            /**
              * Gets the center coordinates
              * @return {Object} the x and y position
             */
            center: () => {
               return { x: x + radius / 2, y: y + radius / 2 }
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
            (x + radius / 2 - p.x) ** 2 + (y + radius / 2 - p.y) ** 2 <=
            radius ** 2 / 4
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
         ctx.arc(x + radius / 2, y + radius / 2, radius / 2, 0, 2 * Math.PI)
         ctx.fillStyle = color
         ctx.fill()
      },
      /**
       * Gets the point of connection
       * @param {Object} other the node's coordinates
       * @return {Object} the x and y
       */
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
       * Scales the radius
       * @param {number} factor the multipier
       */
      scale: (factor) => {
         radius *= factor
      }
   }
}
