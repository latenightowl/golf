class Button {
   constructor (x, y, size, icon) {
      this.x = x
      this.y = y
      this.size = size
      this.isSelected = false
      this.icon = icon
   }
   
   select (p) {
      if (p.x > this.x && p.x < this.x + this.size &&
       p.y > this.y && p.y < this.y + this.size) {
         this.isSelected = true
      }   
   }

   draw () {
      this.icon.x = this.x
      this.icon.y = this.y

      const canvas = document.getElementById('editor')
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = (this.isSelected ? "grey" : "white")
      ctx.fillRect(this.x, this.y, this.size, this.size)
      this.icon.draw()
   }
}
