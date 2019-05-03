function createNodeCircle() {
  let size = 20
  let x = 0
  let y = 0
  let type = "circle"
  let color = "black"

  return {
    clone: () => {
    return createCircleNode(color)
  },
    getType: () => {
    return type
  },
  getBounds: () => {
    return {
      x: x,
      y: y,
      width: size,
      height: size,
      center: () => {
      return { x: x + size / 2, y: y + size / 2 }
    }
  }
  },
  contains: p => {
    return (
      (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <=
    size ** 2 / 4
  )
  },
  translate: (dx, dy) => {
    x += dx
    y += dy
  },
  draw: ctx => {
    ctx.beginPath()
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
  },
  getConnectionPoint: other => {
    let centerX = x + size / 2
    let centerY = y + size / 2
    let dx = other.getBounds().center().x - centerX
    let dy = other.getBounds().center().y - centerY
    let distance = Math.sqrt(dx * dx + dy * dy)
    if (distance == 0) return other
    else
      return {
        x: centerX + (dx * (size / 2)) / distance,
        y: centerY + (dy * (size / 2)) / distance
      }
  },
  setColor: myColor => {
    color = myColor
  }
}
}
