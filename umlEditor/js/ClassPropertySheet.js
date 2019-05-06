/**
 * Declaration of a hard object for a class property sheet
 * @function
 * @return properties of the class property sheet
 */
function createClassProperty() {
   const input1 = document.createElement("input")
   const input2 = document.createElement("input")
   const input3 = document.createElement("input")
   const br1 = document.createElement('br')
   const br2 = document.createElement('br')
   return {
      /**
       * Generates HTML of the class property sheet
       */
      generateHTML() {
         input1.id = "name"
         input2.id = "attribute"
         input3.id = "methods"

         const name = document.createElement("p")
         const attribute = document.createElement("p")
         const methods = document.createElement("p")
         const title = document.createElement("h3")
         title.innerHTML = "Class"
         name.innerHTML = "Name: "
         attribute.innerHTML = "Attribute: "
         methods.innerHTML = "Methods: "

         let container = document.getElementById("property-container")
         container.appendChild(title)
         container.appendChild(name)
         container.appendChild(input1)
         container.appendChild(br1)
         container.appendChild(attribute)
         container.appendChild(input2)
         container.appendChild(br2)
         container.appendChild(methods)
         container.appendChild(input3)
      },

      /**
       * Gets the text
       * @param {String} text the text
       * @return {String} the text
       */
      getText(text1, text2, text3) {
         input1.value = text1
         input2.value = text2
         input3.value = text3
      },

      /**
       * Set the text to empty fields
       */
      emptyField() {
         input1.value = ""
         input2.value = ""
         input3.value = ""
      },
   }
}
