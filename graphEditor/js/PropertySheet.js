function createProperty() {
   let input = document.createElement("input")
   return {
      generateHTML() {
         input.id = "color"
         input.type = "text"
         input.value = ""

         let container = document.getElementById("property-container")
         container.appendChild(input)

         input.addEventListener("input", event => {
            console.log('sucesss')
            if(this.isColor(input.value)) selected.setColor(input.value)
         })
      },
      getColor(color) {
         input.value = color
      },
      isColor(c) {
         let s = new Option().style
         s.color = c
         return s.color === c
      }
   }
}
