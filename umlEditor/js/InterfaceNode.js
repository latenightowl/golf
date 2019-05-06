/**
 * Declaration of a hard object for an interface node
 * @function
 * @return properties of an interface node
 */
function createNodeInterface() {
  let width = 100
  let height = 60
  let type = "interface"
  let x = 0
  let y = 0
  let container = document.getElementById('button5')
  let actualContainer = document.getElementById('nodeContainer')
  let table = document.createElement('table')
  let tr = document.createElement('tr')
  let tr2= document.createElement('tr')
  let td = document.createElement('th')
  let td2 = document.createElement('td')
  td.innerText = "<<interface>>"
  td2.innerText = ""

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
    table.appendChild(tr)
    tr.appendChild(td)
    table.appendChild(tr2)
    tr2.appendChild(td2)
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
    return td.innerText
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
   * Sets the text
   * @param {String} text the text
   */
  setInterfaceText: (text) => {
    td.innerText = text
  },
  /**
   * Sets the text
   * @param {String} text the text
   */
  setInterfaceMethodsText: (text) => {
    td2.innerText = text
  },
  /**
   * Scales the size
   * @param {number} factor the multiplier
   */
  scale: (factor) => {
    width *= factor
    height *= factor
  },
  /**
   * Draws the node
   */
  toolBarDraw: () => {
    table.appendChild(tr)
    tr.appendChild(td)
    table.appendChild(tr2)
    tr2.appendChild(td2)
    table.style.position = 'absolute'
    table.style.left = x + 'px'
    table.style.top = y + 'px'
    table.style.width = width + 'px'
    table.style.height = height + 'px'
    container.appendChild(table)
  }
}
}