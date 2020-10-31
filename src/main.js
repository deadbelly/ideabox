//querySelectors
var saveButton = document.querySelector('.save-button')
var titleInput = document.querySelector('.title-input')
var bodyInput = document.querySelector('.body-input')
var ideasGrid = document.querySelector('.ideas-grid')


//event listeners
saveButton.addEventListener('click', saveCard)
titleInput.addEventListener('keyup', enableSave)
bodyInput.addEventListener('keyup', enableSave)
ideasGrid.addEventListener('click', deleteCard)
ideasGrid.addEventListener('click', starFavorite)
window.addEventListener('load', loadFromStorage)

// variables

var cards = []

//functions

function saveCard(event) {
  event.preventDefault()
  var newIdea = new Idea(titleInput.value, bodyInput.value)
  cards.push(newIdea)
  displayCards(cards)
  titleInput.value = ''
  bodyInput.value = ''
  enableSave()
  newIdea.saveToStorage()
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

function displayCards(cardArray) {
  ideasGrid.innerHTML = ''
  for(var i = 0; i < cardArray.length; i ++) {
  ideasGrid.innerHTML +=
  `<div class="idea" id="${cardArray[i].id}">
    <span class="star-bar">
      <button class="fave-button ${checkStarred(cardArray[i])}">
       <img class="star-icon" src="assets/star.svg" alt="star">
       <img class="star-icon-active" src="assets/star-active.svg" alt="red star">
     </button>
      <button class="delete-button">
       <img class="delete-icon" src="assets/delete.svg" alt="delete ex">
       <img class="delete-icon-active" src="assets/delete-active.svg" alt="delete ex">
     </button>
    </span>
    <article class="card-body">
      <h3>${cardArray[i].title}</h3>
      <p>${cardArray[i].body}</p>
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

function deleteCard(event) {
  if (event.target.classList.contains('delete-icon-active')) {
    var idToDelete = event.target.closest('.idea').id
    for (var i = 0; i < cards.length; i++){
      if (cards[i].id == idToDelete) {
        // cards[i].deleteFromStorage()
        console.log(cards[i])
        cards.splice(i, 1)
        break
      }
    }
  }

  displayCards(cards)
}

//add function that removes event.target id from cards

//add event listener to ideas grid that runs this new function and then displayCards()

function starFavorite() {
  if (event.target.classList.contains('star-icon-active')) {
    var idToStar = event.target.closest('.idea').id
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id == idToStar) {
        cards[i].toggleStar()
        break
      }
    }
  }

  displayCards(cards)

}

function checkStarred(card) {
    if (card.star) {
      return 'starred'
  }
}

function loadFromStorage() {
  for (var i=0; i < localStorage.length; i++) {
    cards.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
  displayCards(cards)
}

//
