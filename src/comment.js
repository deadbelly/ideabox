class Comment {
  constructor(ideaId, content) {
    this.id = Date.now()
    this.ideaId = ideaId
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
