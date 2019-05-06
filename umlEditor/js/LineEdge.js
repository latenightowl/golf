function center(rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}

function createEdgeLine() {
  let start
  let end
  return {
    connect: (s, e) => {
    start = s
    end = e
  },
    draw: (ctx) => {
    ctx.beginPath()

    let p
    let q
    if (start.getConnectionPoint) {
      p = start.getConnectionPoint(end)
    } else {
      p = start
    }
    if (end.getConnectionPoint) {
      q = end.getConnectionPoint(start)
    } else {
      q = end
    }

    ctx.moveTo(p.x, p.y)
    ctx.lineTo(q.x, q.y)
    ctx.setLineDash([])
    ctx.stroke()

    arrowHead(ctx, p.x, p.y, q.x, q.y, 7);
  },
  getStartEnd: () => {
    return [start, end]
  }
}
}
