class Idea {
  constructor(title, body) {
    this.id = Date.now()
    this.title = title
    this.body = body
    this.star = false
    this.containsSearch = false
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this))
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id)

  }

  updateIdea() {

  }

  toggleStar() {
    this.star = !this.star
  }

  checkIfContains(search) {
    var userSearch = search.toUpperCase()
    var searchedTitle = this.title.toUpperCase()
    var searchedBody =  this.body.toUpperCase()

    if (searchedTitle.includes(userSearch) || searchedBody.includes(userSearch)) {
      this.containsSearch = true
    }

    /*
    because our conditional returns a boolean,
    and we're setting the property 'contains' to a boolean,
    we could also write it as:
    this.contains = searchedTitle.includes(userSearch) || searchedBody.includes(userSearch)
    */
  }
}
