/**
 * Declaration of a node property sheet
 * @function
 * @return properties
 */
function createNoteProperty() {
  const input = document.createElement("input")
  return {
    /**
     * generates html tags
     */
    generateHTML() {
      input.id = "text"

      const title = document.createElement("h3")
      const name = document.createElement("p")
      title.innerHTML = "Note"
      name.innerHTML = "Text: "

      let container = document.getElementById("note-property-container")
      container.appendChild(title)
      container.appendChild(name)
      container.appendChild(input)
    },
    /**
     * Gets the text from input
     * @Param {string} text the text
     */
    getText(text) {
      input.value = text
    },
    /**
     * Empties the input
     */
    emptyField() {
      input.value = ""
    }
  }
}
