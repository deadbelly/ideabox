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

//event listeners
window.addEventListener('load', loadFromStorage)
showStarredButton.addEventListener('click', showStarredCards)
saveButton.addEventListener('click', saveCard)
titleInput.addEventListener('keyup', enableSave)
bodyInput.addEventListener('keyup', enableSave)
searchButton.addEventListener('click', searchAndClear)
searchBar.addEventListener('keyup', search)
ideasGrid.addEventListener('click', runStarBar)


//functions

/*creates a new array to hold array of starred cards
if the button says 'Show Starred Ideas' when clicked, it changes to 'Show All Ideas'
loops through the cards and checks if the card's 'star' property is true
if it's starred, that Idea instance gets added to the array
that starred array is displayed
if the button says 'Show All ideas' when clicked, it changes the button to say "Show Starred Ideas"
it displays all the idea cards
it clears the starredCards array so as to avoid duplication next time the starred button is clicked
*/
function showStarredCards() {
  var starredCards = []
  if (showStarredButton.innerText === 'Show Starred Ideas') {
    showStarredButton.innerText = 'Show All Ideas'
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].star) {
        starredCards.push(cards[i])
      }
    }
    displayCards(starredCards)
  } else {
    showStarredButton.innerText = 'Show Starred Ideas'
    displayCards(cards)
    starredCards = []
  }
}

/*
the preventDefault stops the page from just reloading to display all cards
this declares a new array to hold our search searchResults  >>>>> searchResults
grabs the input from the user  >>>>> userSearch
this goes through each card in our cards array >>>>> for... loop
calls a method on the card that checks if the search is in that card's body or title >>> .checkIfContains()
gets the boolean saying if it does >>> if cards[i].contains
pushes the results into a searchResults array >>>>> searchResults.push(cards[i])
and then displays it >>>>> displayCards()
we also clear the searchResults array to be clear for next search

NOT WORKING PROPERLY I think because of the method? I logged the input and the array, and nothing is getting added to the results array but somehow some stuff is still getting filtered out, bewilderingly.
If you do a search and then delete and do another, nothing happens.
*/
function search(event) {
  event.preventDefault()
  var searchResults = []

  var userSearch = searchBar.value
// console.log('Search input:', userSearch, 'Results Array:', searchResults)
// debugger
  for (var i = 0; i < cards.length; i++) {
    cards[i].checkIfContains(userSearch)
    if (cards[i].containsSearch) {
      searchResults.push(cards[i])
    }
  }

  displayCards(searchResults)
  clearResults(searchResults)
  // searchResults = []
}

function clearResults(resultsArray) {
  for (var i = 0; i < resultsArray.length; i++) {
    resultsArray[i].containsSearch = false
  }
}

function searchAndClear(event) {
  event.preventDefault()
  ideasGrid.innerHTML = `<p>Showing results for '${searchBar.value}':</p>` + ideasGrid.innerHTML
  search(event)
  clear(searchBar)
}

function isInput() {
  if (titleInput.value && bodyInput.value) {
    return true
  }
}

//this clears the user's input of any of the form areas
function clear(formInput) {
  formInput.value = ''
}


function saveCard(event) {
  event.preventDefault()
  var newIdea = new Idea(titleInput.value, bodyInput.value)
  cards.push(newIdea)
  displayCards(cards)
  clear(titleInput)
  clear(bodyInput)
  enableSave()
  newIdea.saveToStorage()
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
    ideasGrid.innerHTML += cardArray[i].formatCard()
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

/*
localStorage holds an array of objects that have keys (properties and values) we want >>>>>> localStorage.key(i)
We go through the localStorage array of these objects >>>>> for... loop
and extract the key-pairs of each item >>>>>  localStorage.getItem()
We have to translate back into JS from JSON >>>>> JSON.parse
and we use the values returned to call a helper function which creates a new Idea (line 124) >>>>> loadIdea()
it takes each of those values we accessed (line 107) and assigns them to the properties of our new Class instantiation (line 126-130)
then we push that fully re-Classified (it's back to having methods) Idea object into the cards array again >>>>> cards.push()

I just added some variables to make it easier to read, if we like that

//This line below (122 rn) is pretty dense.
//I recommend reading it backwards, starting from localStorage.key(i).
//If we move loadIdea to a method I think the changes we will make here will make it easier to understand.
*/
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
