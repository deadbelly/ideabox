class Comment {
  constructor(idea, content) {
    this.id = Date.now()
    this.ideaId = idea.id
    this.content = content
  }

  saveToStorage() {

  }

  deleteFromStorage() {

  }

  assignToIdea(idea) {
    this.ideaId = idea.id
  }
}
