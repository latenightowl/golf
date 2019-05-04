function createProperty() {
   console.log('prop')
   return {
      generateHTML() {
         let input = document.createElement("input")
         input.type = "text"
         input.oninput = "update()"
         input.value = ""

         let container = document.getElementById("property-container")
         container.appendChild(input)
      },
      update() {

      }
   }
}
