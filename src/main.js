//querySelectors
var saveButton = document.querySelector(".save-button")
var titleInput = document.querySelector(".title-input")
var bodyInput = document.querySelector(".body-input")
var ideasGrid = document.querySelector(".ideas-grid")


//event handlers
saveButton.addEventListener("click", saveCard)
titleInput.addEventListener("keyup", enableSave)
bodyInput.addEventListener("keyup", enableSave)


// variables

var cards = []

//functions

function saveCard(event) {
  event.preventDefault()
  var newIdea = new Idea(titleInput.value, bodyInput.value)
  cards.push(newIdea)
  displayCards(cards)
  titleInput.value = ""
  bodyInput.value = ""
  enableSave()
}

function isInput() {
  if (titleInput.value && bodyInput.value) {
    return true
  }
}

function enableSave() {
  if (isInput()) {
    saveButton.disabled = false
  } else {
    saveButton.disabled = true
  }
}

function displayCards(cards) {
  ideasGrid.innerHTML = ""
  for(var i = 0; i < cards.length; i ++) {
  ideasGrid.innerHTML +=
  `<div class="idea" id="">
    <span class="star-bar">
      <button class="fave-button">
       <img class="star-icon" src="assets/star.svg" alt="star">
       <img class="star-icon-active hidden" src="assets/star-active.svg" alt="red star">
     </button>
      <button class="delete-button">
       <img class="delete-icon" src="assets/delete.svg" alt="delete ex">
       <img class="delete-icon-active hidden" src="assets/delete-active.svg" alt="delete ex">
     </button>
    </span>
    <article class="card-body">
      <h3>${cards[i].title}</h3>
      <p>${cards[i].body}</p>
    </article>
    <span class="comment-bar">
      <button name="comment-button" class="comment-button">
        <img class="comment-icon" src="assets/comment.svg" alt="adding plus">
      </button>
      <label for="comment-button">Comment</label>
    </span>
  </div>`
}
}
