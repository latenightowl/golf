function createDiamondNode (x, y) {
  return {
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: 20,
        height: 20        
      }
    },
    contains: p => {
      return (x+20/2-p.x)**2+(y+20/2-p.y)**2 <= 20**2/4
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    draw: () => {
      const c = document.getElementById("graphpanel")
      const ctx = c.getContext("2d")
      ctx.beginPath()
      ctx.arc(x+20/2, y+20/2, 20/2, 0, 2*Math.PI)
      ctx.fillStyle = 'goldenrod'
      ctx.fill()
    }
  }
}