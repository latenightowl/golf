function createNodeInterface() {
  let width = 80
  let height = 60
  let type = "interface"
  let x = 0
  let y = 0
  let container = document.getElementById('nodeContainer')
  let table = document.createElement('table')
  let tr = document.createElement('tr')
  let tr2= document.createElement('tr')
  let td = document.createElement('th')
  let td2 = document.createElement('td')
  td.innerText = "<<interface>>"
  td2.innerText = ""

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
    if(p.x >= x && p.x <= (x+width) && p.y >= y && p.y <= y+height)
      return true
    else
      return false
  },

  translate: (dx, dy) => {
    x += dx
    y += dy
  },

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
    container.appendChild(table)
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

  getText1: text => {
    return td.innerText
  },
  getText2: text => {
    return td2.innerText
  },

  setInterfaceText: (text) => {
    td.innerText = text
  },

  setInterfaceMethodsText: (text) => {
    td2.innerText = text
  }
}
}