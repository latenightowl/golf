function createProperty() {
   const input = document.createElement("input")
   return {
      generateHTML() {
         input.id = "color"
         input.type = "text"
         input.value = ""

          const text = document.createElement("p")
          text.innerHTML = "Class Name: "

         let container = document.getElementById("property-container")
         container.appendChild(text)
         container.appendChild(input)
      },
      getColor(color) {
         input.value = color
      },
      emptyField() {
         input.value = ""
      },
      isColor(c) {
         let s = new Option().style
         s.color = c
         return s.color === c
      }
   }
}
