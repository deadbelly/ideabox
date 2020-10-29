//querySelectors
var saveButton = document.querySelector(".save-button")
var titleInput = document.querySelector(".title-input")
var bodyInput = document.querySelector(".body-input")
var ideasGrid = document.querySelector(".ideas-grid")


//event handlers
saveButton.addEventListener("click", saveCard)

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
}

function isInput() {
  if (titleInput.value && bodyInput.value) {
    return true
}
}

function enableSave() {
  if (isInput()) {
    button.disabled = false
  } else {
    button.disabled = true
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



//checking the input field - if there is no value then disable save button**
// add hover to button in a lighter color if button is disabled (css)
// - lighter color, cursor not pointer(css)
//after you click save display a new card, taking an object of the idae class and using innerHTML to interpolate - createCard function
// clear input fields - sets both .values to empty
// stop the page from reloading - preventDefault
