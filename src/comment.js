class Comment {
  constructor(idea, content) {
    this.id = Date.now()
    this.ideaId = idea.id
    this.content = content
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this))
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id)
  }

  assignToIdea(idea) {
    this.ideaId = idea.id
  }
}
