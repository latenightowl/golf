/**
 * Declaration of a hard object for node note
 * @function
 * @return properties of a note node
 */
function createNodeNote() {
   let width = 40
   let height = 30
   let type = "note"
   let x = 0
   let y = 0
   let container = document.getElementById("button3")
   let actualContainer = document.getElementById("nodeContainer")
   let table = document.createElement("table")
   let tr = document.createElement("tr")
   let td = document.createElement("th")
   td.innerText = "Note"
   table.bgColor = "yellow"

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
         if (p.x >= x && p.x <= x + width && p.y >= y && p.y <= y + height)
            return true
         else return false
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
      draw: () => {
         table.appendChild(tr)
         tr.appendChild(td)
         table.style.position = "absolute"
         table.style.left = x + "px"
         table.style.top = y + "px"
         table.style.width = width + "px"
         table.style.height = height + "px"
         actualContainer.appendChild(table)

         const tableStyle = getComputedStyle(table)
         width = parseInt(tableStyle.width)
         height = parseInt(tableStyle.height)
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
       * Gets text
       * @param {Object} noteText the note
       * @return {String} the note input
       */
      getText: (noteText) => {
         return td.innerText
      },
      /**
       * Sets text
       * @param {Object} notetext the note
       */
      setText: (noteText) => {
         td.innerText = noteText
      },
      /**
       * Scales the size
       * @param {Number} factor the multiplier
       */
      scale: (factor) => {
         width *= factor
         height *= factor
      },
      /**
       * Draws icon on the toolbar
       */
      toolBarDraw: () => {
         table.appendChild(tr)
         tr.appendChild(td)
         table.style.position = "absolute"
         table.style.left = x + "px"
         table.style.top = y + "px"
         table.style.width = width + "px"
         table.style.height = height + "px"
         container.appendChild(table)
      }
   }
}
