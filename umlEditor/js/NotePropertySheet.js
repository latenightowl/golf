function createNoteProperty() {

  const input = document.createElement("input")

  return {
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

    getText(text) {
      input.value = text
    },

    emptyField() {
      input.value = ""
    }
  }
}
