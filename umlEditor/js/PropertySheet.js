function createProperty() {
   const input = document.createElement("input")
   return {
      generateHTML() {
         input.id = "className"

         const text = document.createElement("classNameText")
         text.innerHTML = "Class Name: "

         let container = document.getElementById("property-container")
         container.appendChild(text)
         container.appendChild(input)
      },

      getText(text) {
         input.value = text
      },

      emptyField() {
         input.value = ""
      },
   }
}
