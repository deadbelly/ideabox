// variables
var cards = []

//querySelectors
var sidebar = document.querySelector('.sidebar')
var filterMessage = document.querySelector('h2')
var showStarredButton = document.querySelector('.show-starred-button')
var commentLabel = document.querySelector('.comment-label')

var form = document.querySelector('form')
var titleInput = document.querySelector('.title-input')
var bodyInput = document.querySelector('.body-input')
var saveButton = document.querySelector('.save-button')
var searchBar = document.querySelector('.search-bar')

var ideasGrid = document.querySelector('.ideas-grid')

var commentDisplay = document.querySelector('.comment-display')
var exitCommentForm = document.querySelector('.delete-button')
var commentInput = document.querySelector('.comment-input')
var addCommentButton = document.querySelector('.add-comment-button')

//event listeners
window.addEventListener('load', loadFromStorage)

showStarredButton.addEventListener('click', showStarredCards)

form.addEventListener('keyup', toggleAllButtons)
saveButton.addEventListener('click', saveCard)
searchBar.addEventListener('keyup', search)

ideasGrid.addEventListener('click', assignIdeaTask)

commentDisplay.addEventListener('click', deleteAndDisplayComment)
exitCommentForm.addEventListener('click', closeCommentForm)
addCommentButton.addEventListener('click', addCommentAndUpdate)

//functions
function saveCard(event) {
  event.preventDefault()
  resetShowStarredButton()
  var newIdea = new Idea(titleInput.value, bodyInput.value)
  cards.push(newIdea)
  displayCards(cards)
  clearInputs()
  toggleAllButtons()
  newIdea.saveToStorage()
}

function displayCards(cardArray) {
  ideasGrid.innerHTML = ''
  for(var i = 0; i < cardArray.length; i ++) {
    cardArray[i].countComments()
    ideasGrid.innerHTML += cardArray[i].formatCard()
  }
}

function toggleAllButtons() {
  toggleButton(saveButton, (titleInput.value && bodyInput.value))
  toggleButton(addCommentButton, commentInput.value)
}

function toggleButton(button, condition) {
  if (condition) {
    button.disabled = false
  } else {
    button.disabled = true
  }
}

function clearInputs() {
  titleInput.value = ''
  bodyInput.value = ''
  commentInput.value = ''
}

function loadFromStorage() {
  for (var i=0; i < localStorage.length; i++) {
    var storedObject = JSON.parse(localStorage.getItem(localStorage.key(i)))
    var reInstantiation = new Idea()
    reInstantiation.loadStorageData(storedObject)
    cards.push(reInstantiation)
  }
  displayCards(cards)
}

function findTargetCard(idToTarget) {
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].id == idToTarget) {
      return cards[i]
    }
  }
}

function assignIdeaTask(event) {
  var targetClass = event.target.classList
  var card = event.target.closest('.idea')
  var idea = findTargetCard(card.id)
  if (targetClass == 'star-icon-active') {
      starFavorite(idea)
  } else if (targetClass == 'delete-icon-active') {
    var index = cards.indexOf(idea)
    deleteCard(index)
    commentDisplay.innerHTML = ''
  } else if (targetClass == 'comment-icon') {
    toggleCommentForm()
    addCommentButton.id = card.id
  } else if (targetClass != 'ideas-grid') {
    displayComments(idea)
    updateCommentLabel(idea)
  }
  displayCards(cards)
}

function starFavorite(targetCard) {
  targetCard.toggleStar()
  targetCard.saveToStorage()
}

function deleteCard(targetIndex) {
  cards[targetIndex].deleteFromStorage()
  cards.splice(targetIndex, 1)
}

function deleteAndDisplayComment(event) {
  var ideaId = event.target.closest('.comment').id
  var classList = event.target.classList
  var commentId = event.target.closest('.display-comment-bar').id
  if (classList == 'delete-icon-active') {
    var idea = findTargetCard(ideaId)
    deleteComment(idea, commentId)
    idea.saveToStorage()
    displayComments(idea)
  }
  displayCards(cards)
}

function deleteComment(idea, commentId) {
  for (var i = 0; i < idea.comments.length; i++) {
    if(commentId == idea.comments[i].id) {
      idea.comments.splice(i,1)
    }
  }
}

function showStarredCards() {
  var starredCards = []
  if (showStarredButton.innerText === 'Show Starred Ideas') {
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].star) {
        starredCards.push(cards[i])
      }
    }
    displayCards(starredCards)
    filterMessage.innerText = 'Your Starred Ideas'
    showStarredButton.innerText = 'Show All Ideas'
  } else {
    resetShowStarredButton()
    displayCards(cards)
  }
}

function resetShowStarredButton() {
  filterMessage.innerText = 'All Your Ideas'
  showStarredButton.innerText = 'Show Starred Ideas'

}

function search(event) {
  event.preventDefault()
  resetShowStarredButton()
  var searchResults = []
  var userSearch = searchBar.value
  for (var i = 0; i < cards.length; i++) {
    cards[i].checkIfContains(userSearch)
    if (cards[i].containsSearch) {
      searchResults.push(cards[i])
    }
  }
  displayCards(searchResults)
  clearResults(searchResults)
}

function clearResults(resultsArray) {
  for (var i = 0; i < resultsArray.length; i++) {
    resultsArray[i].containsSearch = false
  }
}

function addCommentAndUpdate(event) {
  event.preventDefault()
  var idea = findTargetCard(addCommentButton.id)
  addComment(idea)
  displayComments(idea)
  updateCommentLabel(idea)
  displayCards(cards)
  clearInputs()
  toggleAllButtons()
}

function addComment(idea) {
  idea.addComment(commentInput.value)
  idea.saveToStorage()
}

function closeCommentForm(event) {
  event.preventDefault()
  toggleCommentForm()
}

function displayComments(idea) {
  commentDisplay.innerHTML = ''
  for (var i = 0; i < idea.comments.length; i++) {
    commentDisplay.innerHTML += idea.comments[i].formatComment()
  }
}

function updateCommentLabel(idea) {
  if (idea.comments.length) {
    commentLabel.innerText = `Displaying comments for ${idea.title}`
  } else {
    commentLabel.innerText = ''
  }
}

function toggleCommentForm() {
  ideasGrid.classList.toggle('blur')
  sidebar.classList.toggle('blur')
  formToggle()
}

function formToggle() {
  var formEles = document.querySelectorAll('.form-ele')
  for (var i = 0; i < formEles.length; i++) {
    formEles[i].classList.toggle('hidden')
  }
}
