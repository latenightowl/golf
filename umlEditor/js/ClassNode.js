function createClassNode (x, y) {
  const width = 80
  const height = 60

  return {
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: 80,
        height: 60
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
      const container = document.getElementById('nodeContainer')
      const table = document.createElement('table')
      const tr = document.createElement('tr')
      const td = document.createElement('td')
      table.appendChild(tr)
      tr.appendChild(td)
      table.style.position = 'absolute'
      table.style.left = x + 'px'
      table.style.top = y + 'px'
      table.style.width = width + 'px'
      table.style.height = height + 'px'
      container.appendChild(table)
    }
  }
  }