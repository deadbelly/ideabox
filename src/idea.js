class Idea {
  constructor(title, body) {
    this.id = Date.now()
    this.title = title
    this.body = body
    this.star = false
    this.containsSearch = false
    this.comments = []
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this))
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id)
  }

  updateIdea() {
    // DO WE NEED THIS FUNCTION?!
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

  checkStarred() {
      if (this.star) {
        return 'starred'
    }
  }

  formatCard() {
    var cardHTML =
    `<div class="idea" id="${this.id}">
        <span class="star-bar">
          <button class="fave-button ${this.checkStarred()}">
           <img class="star-icon" src="assets/star.svg" alt="star">
           <img class="star-icon-active" src="assets/star-active.svg" alt="red star">
         </button>
          <button class="delete-button">
           <img class="delete-icon" src="assets/delete.svg" alt="delete ex">
           <img class="delete-icon-active" src="assets/delete-active.svg" alt="delete ex">
         </button>
        </span>
        <article class="card-body">
          <h3>${this.title}</h3>
          <p>${this.body}</p>
        </article>
        <span class="comment-bar">
          <button name="comment-button" class="comment-button">
            <img class="comment-icon" src="assets/comment.svg" alt="adding plus">
          </button>
          <label for="comment-button">Comment</label>
        </span>
      </div>`
      return cardHTML
  }

}
