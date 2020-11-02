// variables
var cards = []

//querySelectors
var showStarredButton = document.querySelector('.show-starred-button')
var titleInput = document.querySelector('.title-input')
var bodyInput = document.querySelector('.body-input')
var saveButton = document.querySelector('.save-button')
var searchButton = document.querySelector('.search-button')
var searchBar = document.querySelector('.search-bar')
var ideasGrid = document.querySelector('.ideas-grid')
var filterMessage = document.querySelector('h2')
var form = document.querySelector('form')
var sidebar = document.querySelector('.sidebar')

//event listeners
window.addEventListener('load', loadFromStorage)
showStarredButton.addEventListener('click', showStarredCards)
saveButton.addEventListener('click', saveCard)
titleInput.addEventListener('keyup', enableSave)
bodyInput.addEventListener('keyup', enableSave)
searchBar.addEventListener('keyup', search)
ideasGrid.addEventListener('click', runStarBar)

//functions
function saveCard(event) {
  event.preventDefault()
  resetShowStarredButton()
  var newIdea = new Idea(titleInput.value, bodyInput.value)
  cards.push(newIdea)
  displayCards(cards)
  clear(titleInput)
  clear(bodyInput)
  enableSave()
  newIdea.saveToStorage()
}

function displayCards(cardArray) {
  ideasGrid.innerHTML = ''
  for(var i = 0; i < cardArray.length; i ++) {
    ideasGrid.innerHTML += cardArray[i].formatCard()
  }
}

function enableSave() {
  if (isInput()) {
    saveButton.disabled = false
  } else {
    saveButton.disabled = true
  }
}

function isInput() {
  if (titleInput.value && bodyInput.value) {
    return true
  }
}

function clear(formInput) {
  formInput.value = ''
}

function loadFromStorage() {
  var storedObject
  var newIdeaInstantiation
  for (var i=0; i < localStorage.length; i++) {
    storedObject = JSON.parse(localStorage.getItem(localStorage.key(i)))
    newIdeaInstance = loadIdea(storedObject)
    cards.push(newIdeaInstance)
  }
  displayCards(cards)
}

function loadIdea(dataObject) {
  var idea = new Idea()
  idea.id = dataObject.id
  idea.title = dataObject.title
  idea.body = dataObject.body
  idea.star = dataObject.star

  return idea
}

function runStarBar(event) {
  var targetClass = event.target.classList
  var idToTarget = event.target.closest('.idea').id
  if (targetClass === 'star-icon-active' || 'delete-icon-active' || 'comment-button') {
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id == idToTarget) {
        starFavorite(targetClass, cards[i])
        deleteCard(targetClass, i)
        openCommentForm(targetClass, cards[i])
      }
    }
  }
  displayCards(cards)
}

function starFavorite(elementClass, targetCard) {
  if (elementClass == 'star-icon-active') {
    targetCard.toggleStar()
    targetCard.saveToStorage()
  }
}

function deleteCard(elementClass, targetIndex) {
  if (elementClass == 'delete-icon-active') {
    cards[targetIndex].deleteFromStorage()
    cards.splice(targetIndex, 1)
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
  starredCards = []
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


////////



function openCommentForm(elementClass, idea) {
  if (elementClass == 'comment-icon') {
    ideasGrid.classList.add('blur')
    sidebar.classList.add('blur')
    form.innerHTML =
    `<div class="comment-form">
      <textarea class="comment-form"></textarea>
      <button class="add-comment-button">Add Comment</button>
    </div>`
    var addCommentButton = document.querySelector('.add-comment-button')
    addCommentButton.addEventListener('click', function () {
        console.log(idea)
        event.preventDefault()
        var commentForm = document.querySelector('.comment-form')
        // enableSave(addCommentButton, commentForm.value)
        var newComment = new Comment(idea, commentForm.value)
        idea.comments.push(newComment)
        console.log(idea.comments)
        clear(commentForm)
      }
    )
  }
}

function addComment(idea) {
  console.log(idea)
  event.preventDefault()
  var commentForm = document.querySelector('.comment-form')
  // enableSave(addCommentButton, commentForm.value)
  var newComment = new Comment(idea, commentForm.value)
  idea[comments].push(newComment)
  clear(commentForm)
}
