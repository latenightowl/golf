function createNodeClass() {
  let width = 120
  let height = 90
  let type = "class"
  let color = "black"
  let x = 0
  let y = 0
  let container = document.getElementById('nodeContainer')
  let table = document.createElement('table')
  let tr1 = document.createElement('tr')
  let tr2 = document.createElement('tr')
  let tr3 = document.createElement('tr')
  let td1 = document.createElement('th')
  let td2 = document.createElement('td')
  let td3 = document.createElement('td')
  td1.innerText = ""
  td2.innerText = ""
  td3.innerText = ""


  return {
    getType: () => {
      return type
    },

    getBounds: () => {
      return {
        x: x,
        y: y,
        width: 120,
        height: 90,
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


    getText1: text => {
      return td1.innerText
    },
    getText2: text => {
      return td2.innerText
    },
    getText3: text => {
      return td3.innerText
    },


    setText1: (text) => {
      td1.innerText = text
    },
    setText2: (text) => {
      td2.innerText = text
    },
    setText3: (text) => {
      td3.innerText = text
    }    
  }
}