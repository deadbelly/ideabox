//querySelectors
var saveButton = document.querySelector('.save-button')
var titleInput = document.querySelector('.title-input')
var bodyInput = document.querySelector('.body-input')
var ideasGrid = document.querySelector('.ideas-grid')


//event listeners
saveButton.addEventListener('click', saveCard)
titleInput.addEventListener('keyup', enableSave)
bodyInput.addEventListener('keyup', enableSave)
window.addEventListener('load', loadFromStorage)
ideasGrid.addEventListener('click', runStarBar)


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



//this checks if the event is targeting the delete button and deletes it if so.
function deleteCard(elementClass, targetIndex) {
  if (elementClass == 'delete-icon-active') {
    cards[targetIndex].deleteFromStorage()
    cards.splice(targetIndex, 1)
  }
}

//this checks if the event is targeting the star button and runs toggleStar if so
function starFavorite(elementClass, targetCard) {
  if (elementClass == 'star-icon-active') {
    targetCard.toggleStar()
    targetCard.saveToStorage()
  }
}

function checkStarred(card) {
    if (card.star) {
      return 'starred'
  }
}

function loadFromStorage() {
  for (var i=0; i < localStorage.length; i++) {
    //This line below (122 rn) is pretty dense.
    //I recommend reading it backwards, starting from localStorage.key(i).
    //If we move loadIdea to a method I think the changes we will make here will make it easier to understand.
    cards.push(loadIdea(JSON.parse(localStorage.getItem(localStorage.key(i)))))
  }
  displayCards(cards)
}



//This function populates a new object with the same info that we have in storage.
//It gets called in loadFromStorage.
//It could work as a method, if we made the new Idea inside loadFromStorage, and then called it.
function loadIdea(dataObject) {
  var idea = new Idea()
  idea.id = dataObject.id
  idea.title = dataObject.title
  idea.body = dataObject.body
  idea.star = dataObject.star

  return idea
}

//this looks for events on the star bar and runs the appropriate functions, then updates the display
function runStarBar(event) {
  var targetClass = event.target.classList
  var idToTarget = event.target.closest('.idea').id
  if (targetClass === 'star-icon-active' || 'delete-icon-active') {
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id == idToTarget) {
        starFavorite(targetClass, cards[i])
        deleteCard(targetClass, i)
      }
    }
  }
  displayCards(cards)
}
