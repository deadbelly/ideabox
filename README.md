# Ideabox Group Project

Good ideas are like fish: there's a lot of them in the sea, but we rarely take the time to catch them.

Every developer has more ideas than time. As David Allen likes to say "the human brain is for creating ideas, not remembering them." To keep those ideas from swimming away, we built an application that records and archives our ideas (good and bad alike).

In this project, we provide a fluid and responsive client-side interface, relying on JavaScript to implement snappy filtering in the browser, and `localStorage` to persist our wonderful ideas between sessions.

## Technologies and Skills

We used:
* Clean HTML and CSS to match a provided comp
* Vanilla Javascript and JSON to implement client-side data persistence using `localStorage`
* Array incorporation and iteration to filter what is being displayed

We ensure best practices:
* Separating our data model (using classes) and DOM model
* Coding with clean style, using small functions that show trends toward DRYness and SRP
* Practicing collaborative Git workflow and version control

## Contributors

Project implementation by [Rachel Buchta](https://github.com/rachelbuchta), [Boone Epstein](https://github.com/deadbelly), and [Alice Ruppert](https://github.com/srslie).

Project created by [Turing School](https://turing.io/) staff.

Special thanks to [Scott Schipke](https://github.com/sschipke), [Theresa Marquis](https://github.com/tmcjunkinmarquis), and our **2010 FE Cohort** instructors and peers for the technical and moral support.

## Future Iterations

Currently there are no planned additions to our IdeaBox.

If we were to continue this project, we might be tempted to add the ability to share ideas, let others comment on them, or set reminders for yourself. It could also be cool to use our filtering and create folders or subsections of related thoughts.

If we had more time, we could've done some animations. We would also want to ensure that the filter/search display is not reset after a comment is added. The hover on the star button could also be seen as confusing after it's unclicked, so we would want to clarify that. Additionally, we wanted to score higher on accessibility but struggled to label our form inputs: the labels we designed for the screen readers didn't show up.

## Support

Please contact [Alice](mailto:aliceruppertgmail.com) for technical assistance related to this project!

## Features

### User Functionality

As a user,
- If either the "Title" or "Body" inputs are empty, the "Save" button is disabled (it is a lighter color and the cursor is not a pointer when hovering over it)
- If I entered information in both the "Title" and "Body" input fields, when I click "Save", A new idea card with the provided title and body appear in the idea list and the "Title" and "Body" input fields clear out
- When the new card is displayed, the page is not reloading

![GIF OF SAVING AN IDEA](https://media.giphy.com/media/RdY4O2wzaS6TxqcsGe/giphy.gif)

- When hovering over the buttons, the colors of the star or delete 'x' will temporarily change to red to indicate these buttons can be pushed.
- When I click the "Delete" button on an idea card, the card is permanently removed from my view
- When I click the "Star" button on an idea card, the button changes from a white star (not favorited), to a red star (favorited) until I choose to click again and unfavorite it
- When I delete or favorite any card, the page is not reloading

![GIF OF FAVORITING AND DELETING](https://media.giphy.com/media/04XGXB2zSHKJg0uvr9/giphy.gif)

- When I create one idea successfully, then refresh the page, the idea card is still in the idea list
- When I create two cards successfully, delete one, then refresh the page, one idea card is still in the idea list (the one I did not delete)
- When I favorite an idea card, then refresh the page, that idea card is still in the "favorite" state with the filled in star icon

![GIF OF RELOADING PAGE](https://media.giphy.com/media/rmvECyWto4wsTHVIO3/giphy.gif)

- When I click "Show Starred Ideas", I see only card that are favorited, the text on that button has changed to "Show All Ideas"
- When I click  "Show All Ideas", I see all ideas, favorited or not
- The message above this button indicates which cards are currently being shown

![GIF OF SHOWING STARRED IDEAS](https://media.giphy.com/media/OXPYo9crRCEyq9xrdO/giphy.gif)

- When typing a letter or phrase into the search bar, I now only see the cards that include the letter/phrase in the title or body
- When I backspace and delete something from the search bar, so that it's empty, I see all cards since no search criteria is being provided

![GIF OF FILTERING SEARCH](https://media.giphy.com/media/CweX1UAmQPo6in7GI9/giphy.gif)

- When I click the "Add" icon on an idea card, a form to add a comment appears
- When the "Comment" input field is empty, the "Add Comment" button is disabled (it is a lighter color and the cursor is not a pointer when I hover over it)
- When I open the comment form on a card, type something in, and click "Add Comment", the text typed in is now a comment attached to this card, and the "Comment" input field clears out and is ready to accept another comment
- When I comment on an idea card, then refresh the page, that comment is still on the idea card
- To exit out of the comment form, I hit the 'x' above the form.

![GIF OF ADDING COMMENTS](https://media.giphy.com/media/RQ88r7lnpQHdCVcGjk/giphy.gif)

### AcCOMPlishments (required specs)

We used:
- HTML and CSS so that our application matches this comp:  
<img src="https://frontend.turing.io/projects/module-1/assets/ideabox-group/desktop.jpg" alt="comp image" width="200"/>

- The same text throughout to ensure our spacing/sizing is accurate.
- `svg` files for the star, delete, and menu icons.
- JSON and `localStorage` to persist data on page reload.
- JavaScript to manage client-side interactions.
- An `idea.js` file that contains an `Idea` class.
- A `main.js` file that contains all DOM related JavaScript.
- A `comment.js` file holding a class, `Comment`.
