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

      contains: (p) => {
         if (p.x >= x && p.x <= x + width && p.y >= y && p.y <= y + height)
            return true
         else return false
      },

      translate: (dx, dy) => {
         x += dx
         y += dy
      },

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

      getText: (noteText) => {
         return td.innerText
      },

      setText: (noteText) => {
         td.innerText = noteText
      },
      scale: (factor) => {
         width *= factor
         height *= factor
      },
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
