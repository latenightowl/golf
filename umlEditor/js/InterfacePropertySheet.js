/**
 * Declaration of a property sheet
 * @function
 * @return properties
 */
function createInterfaceProperty() {
  const input1 = document.createElement("input")
  const input2 = document.createElement("input")
  const br1 = document.createElement('br')
  return {
    /**
     * generates html tags
     */
    generateHTML() {
      input1.id = "interfaceName"
      input2.id = "interfaceMethods"

      const name = document.createElement("p")
      const methods = document.createElement("p")
      const title = document.createElement("h3")
      title.innerHTML = "Interface"
      name.innerHTML = "Name: "
      methods.innerHTML = "Methods: "

      let container = document.getElementById("interface-property-container")
      container.appendChild(title)
      container.appendChild(name)
      container.appendChild(input1)
      container.appendChild(br1)
      container.appendChild(methods)
      container.appendChild(input2)
    },
    /**
     * Retrieves the text
     * @param {string} text1 the first text
     * @param {string} text2 the second text
     */
    getText(text1, text2) {
      input1.value = text1
      input2.value = text2
    },
    /**
     * Empties the input field
     */
    emptyField() {
      input1.value = ""
      input2.value = ""
    },
  }
}
