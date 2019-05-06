/**
 * Declaration of a hard object for a class node
 * @function
 * @return properties of a class node
 */
function createNodeClass() {
  let width = 120
  let height = 90
  let type = "class"
  let x = 0
  let y = 0
  let container = document.getElementById('button4')
  let actualContainer = document.getElementById('nodeContainer')
  let table = document.createElement('table')
  let tr1 = document.createElement('tr')
  let tr2 = document.createElement('tr')
  let tr3 = document.createElement('tr')
  let td1 = document.createElement('th')
  let td2 = document.createElement('td')
  let td3 = document.createElement('td')
  td1.innerText = "Class Name"
  td2.innerText = "Attributes"
  td3.innerText = "Methods"

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
    contains: p => {
      if(p.x >= x && p.x <= (x+width) && p.y >= y && p.y <= y+height)
        return true
      else
        return false
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
     */
    draw: () => {
      table.appendChild(tr1)
      tr1.appendChild(td1)
      table.appendChild(tr2)
      tr2.appendChild(td2)
      table.appendChild(tr3)
      tr3.appendChild(td3)
      table.style.position = 'absolute'
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
      actualContainer.appendChild(table)

      const tableStyle = getComputedStyle(table)
      width = parseInt(tableStyle.width)
      height = parseInt(tableStyle.height)
    },

    /**
     * Draws the node
     */
    toolBarDraw: () => {
      table.appendChild(tr1)
      tr1.appendChild(td1)
      table.appendChild(tr2)
      tr2.appendChild(td2)
      table.appendChild(tr3)
      tr3.appendChild(td3)
      table.style.position = 'absolute'
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
      container.appendChild(table)
    },

    /**
     * Gets the point of connection
     * @param {Object} other the node's coordinates
     * @return {Object} the x and y
     */
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

    /**
     * Gets the text
     * @param {String} text the text
     * @return {String} the text
     */
    getText1: text => {
      return td1.innerText
    },

    /**
     * Gets the text
     * @param {String} text the text
     * @return {String} the text
     */
    getText2: text => {
      return td2.innerText
    },

    /**
     * Gets the text
     * @param {String} text the text
     * @return {String} the text
     */
    getText3: text => {
      return td3.innerText
    },

    /**
     * Sets the text
     * @param {String} text the text
     */
    setText1: (text) => {
      td1.innerText = text
    },

    /**
     * Sets the text
     * @param {String} text the text
     */
    setText2: (text) => {
      td2.innerText = text
    },

    /**
     * Sets the text
     * @param {String} text the text
     */
    setText3: (text) => {
      td3.innerText = text
    },

    /**
     * Scales the size
     * @param {number} factor the multiplier
     */
    scale: (factor) => {
      width *= factor
      height *= factor
    }
  }
}