class Comment {
  constructor(ideaId, content) {
    this.id = Date.now()
    this.ideaId = ideaId
    this.content = content
  }

  formatComment() {
    var commentHTML =
      `<div class="comment" id="${this.ideaId}">
        <div class="display-comment-bar" id="${this.id}">
          <button class="delete-comment-button">
           <img class="delete-icon" src="assets/delete.svg" alt="delete ex">
           <img class="delete-icon-active" src="assets/delete-active.svg" alt="delete ex">
         </button>
        </div>
        <article class="comment-body">
          <p>${this.content}</p>
        </article>
      </div>`
    return commentHTML
  }
}
