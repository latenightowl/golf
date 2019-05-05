function createNodeClass() {
  let width = 80
  let height = 60
  let type = "class"
  let color = "black"
  let x = 0
  let y = 0
  let container = document.getElementById('nodeContainer')
  let table = document.createElement('table')
  let tr = document.createElement('tr')
  let td = document.createElement('td')
  td.innerText = "Class Name"

  return {
    getType: () => {
      return type
    },

    getBounds: () => {
      return {
        x: x,
        y: y,
        width: 80,
        height: 60,
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

    setColor: myColor => {
      color = myColor
    },

    getColor: myColor => {
      return color
    },

    getText: className => {
      return td.innerText
    },

    setText: className => {
      td.innerText = className
    }
  }
}