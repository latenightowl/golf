/**
 * Declaration of a property sheet
 * @function
 * @return properties
 */
function createProperty() {
   const input = document.createElement("input")
   return {
      /**
       * generates html tags
       */
      generateHTML() {
         input.id = "color"
         input.type = "text"
         input.value = ""

         const text = document.createElement("p")
         text.innerHTML = "Color: "

         let container = document.getElementById("property-container")
         container.appendChild(text)
         container.appendChild(input)
      },
      /**
       * gets the color
       * @param {string} color the color 
       */
      getColor(color) {
         input.value = color
      },
      /**
       * empties the value
       */
      emptyField() {
         input.value = ""
      },
      /**
       * checks if its a valid color
       * @param {string} c the color 
       * @return {boolean} true of false
       */
      isColor(c) {
         let s = new Option().style
         s.color = c
         return s.color === c
      }
   }
}
