/**
 * Represents an arrowhead
 * @param {context} ctx the context
 * @param {number} fromX the from X point
 * @param {number} fromY the from Y point
 * @param {number} toX the to X point
 * @param {number} toY the to Y point
 * @param {number} r the radius
 */
function arrowHead(ctx, fromX, fromY, toX, toY, r) {
    let x_center = toX
    let y_center = toY

    let angle
    let x
    let y

    ctx.fillStyle = 'black'

    ctx.beginPath();

    angle = Math.atan2(toY-fromY,toX-fromX)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;

    ctx.moveTo(x, y);

    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;

    ctx.lineTo(x, y);

    angle += (1/3)*(2*Math.PI)
    x = r*Math.cos(angle) + x_center;
    y = r*Math.sin(angle) + y_center;

    ctx.lineTo(x, y);

    ctx.closePath();

    ctx.fill();
}