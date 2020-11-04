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
var addCommentButton = document.querySelector('.add-comment-button')
var commentInput = document.querySelector('.comment-input')
var commentDisplay = document.querySelector('.comment-display')
var exitCommentForm = document.querySelector('.delete-button')

//event listeners
window.addEventListener('load', loadFromStorage)
showStarredButton.addEventListener('click', showStarredCards)
saveButton.addEventListener('click', saveCard)
titleInput.addEventListener('keyup', function() {
  enableButton(saveButton, (titleInput.value && bodyInput.value))
})
bodyInput.addEventListener('keyup', function() {
  enableButton(saveButton, (titleInput.value && bodyInput.value))
})
searchBar.addEventListener('keyup', search)
ideasGrid.addEventListener('click', assignIdeaTask)
commentInput.addEventListener('keyup', function() {
  enableButton(addCommentButton, commentInput.value)
})
commentDisplay.addEventListener('click', deleteComment)
exitCommentForm.addEventListener('click', closeCommentForm)


//functions
function saveCard(event) {
  event.preventDefault()
  enableButton(saveButton, (titleInput.value && bodyInput.value))
  resetShowStarredButton()
  var newIdea = new Idea(titleInput.value, bodyInput.value)
  cards.push(newIdea)
  displayCards(cards)
  clear(titleInput)
  clear(bodyInput)
  newIdea.saveToStorage()
}

function displayCards(cardArray) {
  ideasGrid.innerHTML = ''
  for(var i = 0; i < cardArray.length; i ++) {
    cardArray[i].countComments()
    ideasGrid.innerHTML += cardArray[i].formatCard()
  }
}

function enableButton(button, inputCheck) {
  if (inputCheck) {
    button.disabled = false
  } else {
    button.disabled = true
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
    newCommentArray = loadComment(storedObject)
      console.log(newCommentArray)
    newIdeaInstance = loadIdea(storedObject, newCommentArray)
    cards.push(newIdeaInstance)
  }
  displayCards(cards)
}

function loadComment(storedObject) {
  var commentArray = []
  for (var i = 0; i < storedObject.comments.length; i++) {
    var comment = new Comment()

    comment.id = storedObject.comments[i].id
    comment.ideaId = storedObject.comments[i].ideaId
    comment.content = storedObject.comments[i].content

    commentArray.push(comment)
  }
  return commentArray
}

function loadIdea(dataObject, newCommentArray) {
  var idea = new Idea()
  idea.id = dataObject.id
  idea.title = dataObject.title
  idea.body = dataObject.body
  idea.star = dataObject.star
  idea.comments = newCommentArray;

  return idea
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
  var targetIdea = event.target.closest('.idea')
  // var idToTarget = event.target.closest('.idea').id
  var targetCard = findTargetCard(targetIdea.id)

  if (targetClass == 'star-icon-active') {
      starFavorite(targetCard)

  } else if (targetClass == 'delete-icon-active') {
    var index = cards.indexOf(targetCard)
    deleteCard(index)
    commentDisplay.innerHTML = ''

  } else if (targetClass == 'comment-icon') {
    openCommentForm(targetCard)

  } else if (targetClass != 'ideas-grid') {
    console.log(targetIdea)
    displayCommentsForIdea(targetIdea, targetCard)

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

function deleteComment(event) {
  var targetIdeaId = event.target.closest('.comment').id
  var targetClassList = event.target.classList

  var targetCommentBodyId = event.target.closest('.display-comment-bar').id
  if (targetClassList == 'delete-icon-active') {
    for (var i = 0; i < cards.length; i++) {
      if (targetIdeaId == cards[i].id){
        for (var j = 0; j < cards[i].comments.length; j++) {
          if(targetCommentBodyId == cards[i].comments[j].id) {
            cards[i].comments.splice(j,1)
            cards[i].saveToStorage()
            displayComments(cards[i])
            break
            console.log(cards[i].comments)
          }
        }
      }
    }
  }
  displayCards(cards)
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


////////



function openCommentForm(idea) {
  toggleCommentForm()

  function addComment() {
    event.preventDefault()
    enableButton(addCommentButton, commentInput.value)
    idea.addComment(commentInput.value)
    idea.saveToStorage()
    displayComments(idea)
    clear(commentInput)
  }

  addCommentButton.addEventListener('click', addComment)
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

function displayCommentsForIdea(targetClass, idea) {
  console.log('Hi Rachel')
  targetClass.classList.toggle('selected')
  displayComments(idea)
}
