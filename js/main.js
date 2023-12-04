//createElemWithText
//a. Receives up to 3 parameters
//b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
//c. Set a default value for the 1st parameter to “p”
//d. 2nd parameter is the textContent of the element to be created
//e. Default value of the 2nd parameter is “”
//f. 3rd parameter is a className if one is to be applied (optional)
//g. Use document.createElement() to create the requested HTML element
//h. Set the other desired element attributes.
//i. Return the created element.

const createElemWithText = (param1 = "p", param2 = "", param3) => {
  
  const newElement = document.createElement(param1);
  newElement.textContent = param2;
  
  if(param3){
    newElement.classList.add(param3);
  }
  return newElement;
  
}

//createSelectOptions
//a. Test users JSON data available here: https://jsonplaceholder.typicode.com/users
//b. For testing (not in function) you may want to define users with the test data.
//c. Receives users JSON data as a parameter
//d. Returns undefined if no parameter received
//e. Loops through the users data
//f. Creates an option element for each user with document.createElement()
//g. Assigns the user.id to the option.value
//h. Assigns the user.name to the option.textContent
//i. Return an array of options elements

const createSelectOptions = jsonData => {
  
  if(!jsonData) return;
  
  const usersArray = jsonData.map(user => {
    const newOption = document.createElement('option');
    newOption.value = user.id;
    newOption.textContent = user.name
    return newOption;
  })
  
  return usersArray;
}

//toggleCommentSection
//a. Receives a postId as the parameter
//b. Selects the section element with the data-post-id attribute equal to the postId
//received as a parameter
//c. Use code to verify the section exists before attempting to access the classList
//property
//d. At this point in your code, the section will not exist. You can create one to test if
//desired.
//e. Toggles the class 'hide' on the section element
//f. Return the section element

const toggleCommentSection = postId => {
  
  if(!postId) return;
  
  const sections = document.querySelectorAll('section');
  for (const element of sections){
    if(Number(element.getAttribute('data-post-id'))){
      if(Number(element.getAttribute('data-post-id')) === postId){
        element.classList.toggle('hide');
        return element;
      }
    }
  }
  
  return null;
  
}

//toggleCommentButton
//a. Receives a postId as the parameter
//b. Selects the button with the data-post-id attribute equal to the postId received as a
//parameter
//c. If the button textContent is 'Show Comments' switch textContent to 'Hide
//Comments'
//d. If the button textContent is 'Hide Comments' switch textContent to 'Show
//Comments'
//e. Suggestion (not required) for above: try a ternary statement
//f. Return the button element

const toggleCommentButton = postId => { 
  
  if(!postId) return;
  
  if(!document.querySelector(`button[data-post-id="${postId}"]`)) {
    return null;
  }
  const button = document.querySelector(`button[data-post-id="${postId}"]`);
  button.textContent === "Show Comments" ? button.textContent = "Hide Comments" : button.textContent = "Show Comments";
  
  return button;
}

//deleteChildElements
//a. Receives a parentElement as a parameter
//b. Define a child variable as parentElement.lastElementChild
//c. While the child exists…(use a while loop)
//d. Use parentElement.removeChild to remove the child in the loop
//e. Reassign child to parentElement.lastElementChild in the loop
//f. Return the parentElement

const deleteChildElements = parentElement => {
  
  if(!(parentElement instanceof Element)) return;

  let child = parentElement.lastElementChild;
  while(child){
    parentElement.removeChild(child);
    child = parentElement.lastElementChild
  }
  return parentElement;
  
}

//addButtonListeners
//a. Selects all buttons nested inside the main element
//b. If buttons exist:
//c. Loop through the NodeList of buttons
//d. Gets the postId from button.dataset.postId
//e. Adds a click event listener to each button (reference addEventListener)
//f. The listener calls an anonymous function (see cheatsheet)
//g. Inside the anonymous function: the function toggleComments is called with the
//event and postId as parameters
//h. Return the button elements which were selected
//i. You may want to define an empty toggleComments function for now. Not all tests
//will pass for addButtonListeners until toggleComments exists. I recommend
//waiting on the logic inside the toggleComments function until we get there

const addButtonListeners = () => {
  
  const buttons = document.querySelectorAll('main button');
  
  if(buttons.length) {
    for(const button of buttons){
      const postId = button.dataset.postId;
      button.addEventListener('click', event => {
      toggleComments(event, postId);
      })
    }
  }
  return buttons;
}

//removeButtonListeners
//a. Selects all buttons nested inside the main element
//b. Loops through the NodeList of buttons
//c. Gets the postId from button.dataset.id
//d. Removes the click event listener from each button (reference
//removeEventListener)
//e. Refer to the addButtonListeners function as this should be nearly identical
//f. Return the button elements which were selected

const removeButtonListeners = () => {
  
  const buttons = document.querySelectorAll('main button');
  
  if(buttons.length){
    for (const button of buttons){
      const postId = button.dataset.postId;
      button.removeEventListener('click', event => {
        toggleComments(event, postId);
      });
    }
  }
  return buttons;
}

//createComments
//a. Depends on the createElemWithText function we created
//b. Receives JSON comments data as a parameter
//c. Creates a fragment element with document.createDocumentFragment()
//d. Loop through the comments
//e. For each comment do the following:
//f. Create an article element with document.createElement()
//g. Create an h3 element with createElemWithText('h3', comment.name)
//h. Create an paragraph element with createElemWithText('p', comment.body)
//i. Create an paragraph element with createElemWithText('p', `From:
//${comment.email}`)
//j. Append the h3 and paragraphs to the article element (see cheatsheet)
//k. Append the article element to the fragment
//l. Return the fragment element

const createComments = (comments) => {

    if(!comments) return;

    const returnVal = document.createDocumentFragment();

    for( var i = 0; i < comments.length; i++ ){
        const article = document.createElement("article");
        const h3Element = createElemWithText('h3', comments[i].name );
        const p1Element = createElemWithText('p', comments[i].body );
        const p2Element = createElemWithText('p', `From: ${comments[i].email}`);
        article.append(h3Element);
        article.append(p1Element);
        article.append(p2Element);
        returnVal.append(article);
    }
    return returnVal;
  
}

//populateSelectMenu
//a. Depends on the createSelectOptions function we created
//b. Receives the users JSON data as a parameter
//c. Selects the #selectMenu element by id
//d. Passes the users JSON data to createSelectOptions()
//e. Receives an array of option elements from createSelectOptions
//f. Loops through the options elements and appends each option element to the
//select menu
//g. Return the selectMenu element

const populateSelectMenu = jsonData => {
  
  if(!jsonData) return;
  
  const selectMenu = document.getElementById('selectMenu');
  const usersArray = createSelectOptions(jsonData);
  for (const option of usersArray){
    selectMenu.append(option);
  }
  return selectMenu;
  
}

//getUsers
//a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
//Resources section)
//b. Should be an async function
//c. Should utilize a try / catch block
//d. Uses the fetch API to request all users
//e. Await the users data response
//f. Return the JSON data

const getUsers = async () => {
  
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

//getUserPosts
//a. Receives a user id as a parameter
//b. Fetches post data for a specific user id from:
//https://jsonplaceholder.typicode.com/ (look at Routes section)
//c. Should be an async function
//d. Should utilize a try / catch block
//e. Uses the fetch API to request all posts for a specific user id
//f. Await the users data response
//g. Return the JSON data

const getUserPosts = async userId => {
  
  if(!userId) return;
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return await res.json();
  } catch {
    console.error(err);
  }
}

//getUser
//a. Receives a user id as a parameter
//b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
//(look at Routes section)
//c. Should be an async function
//d. Should utilize a try / catch block
//e. Uses the fetch API to request a specific user id
//f. Await the user data response
//g. Return the JSON data

const getUser = async userId => {
  
  if(!userId) return;
  
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if(!res.ok) throw new Error('Status code not in 200 - 299 range');
    return await res.json();
  } catch {
    console.error(err);
  }
}

//getPostComments
//a. Receives a post id as a parameter
//b. Fetches comments for a specific post id from:
//https://jsonplaceholder.typicode.com/ (look at Routes section)
//c. Should be an async function
//d. Should utilize a try / catch block
//e. Uses the fetch API to request all comments for a specific post id
//f. Await the users data response
//g. Return the JSON data


const getPostComments = async postId => {
  
  if(!postId) return;
  
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    return await res.json();
  } catch {
    console.error(err);
  }
}

//displayComments
//a. Dependencies: getPostComments, createComments
//b. Is an async function
//c. Receives a postId as a parameter
//d. Creates a section element with document.createElement()
////e. Sets an attribute on the section element with section.dataset.postId
//f. Adds the classes 'comments' and 'hide' to the section element
//g. Creates a variable comments equal to the result of await
//getPostComments(postId);
//h. Creates a variable named fragment equal to createComments(comments)
//i. Append the fragment to the section
//j. Return the section element

const displayComments = async postId => {
  
  if(!postId) return;
  
  const section = document.createElement('section');
  section.dataset.postId = postId;
  section.classList.add('comments', 'hide');
  const comments = await getPostComments(postId);
  const fragment = createComments(comments);
  section.append(fragment);
  
  return section;
  
}

//createPosts
//a. Dependencies: createElemWithText, getUser, displayComments
//b. Is an async function
//c. Receives posts JSON data as a parameter
//d. Create a fragment element with document.createDocumentFragment()
//e. Loops through the posts data
//f. For each post do the following:
//g. Create an article element with document.createElement()
//h. Create an h2 element with the post title
//i. Create an p element with the post body
//j. Create another p element with text of `Post ID: ${post.id}`
//k. Define an author variable equal to the result of await getUser(post.userId)
//l. Create another p element with text of `Author: ${author.name} with
//${author.company.name}`
//m. Create another p element with the author’s company catch phrase.
//n. Create a button with the text 'Show Comments'
//o. Set an attribute on the button with button.dataset.postId = post.id
//p. Append the h2, paragraphs, button, and section elements you have created to
//the article element.
//q. Create a variable named section equal to the result of await
//displayComments(post.id);
//r. Append the section element to the article element

const createPosts = async (post) => {
  
    if(!post) return;

    const postsElement = document.createDocumentFragment();
    for( var i = 0; i < post.length; i++ ){

        const article = document.createElement("article");
        const h2Element = createElemWithText('h2', post[i].title );
        const p1Element = createElemWithText('p', post[i].body );
        const p2Element = createElemWithText('p', `Post ID: ${post[i].id}`);
        const author = await getUser( post[i].userId );
        const authorElement = createElemWithText( 'p', `Author: ${author.name} with ${author.company.name}` );
        const compPhrase = createElemWithText( 'p', `${author.company.catchPhrase}`)
        const buttonElement = createElemWithText( 'button', 'Show Comments');
        buttonElement.dataset.postId = post[i].id;

        article.append(h2Element);
        article.append(p1Element);
        article.append(p2Element);
        article.append(authorElement);
        article.append(compPhrase);
        article.append(buttonElement);

        const section = await displayComments( post[i].id );

        article.append( section );
        postsElement.append(article);
    }

    return postsElement;

}

//displayPosts
//a. Dependencies: createPosts, createElemWithText
//b. Is an async function
//c. Receives posts data as a parameter
//d. Selects the main element
//e. Defines a variable named element that is equal to:
//i. IF posts exist: the element returned from await createPosts(posts)
//ii. IF post data does not exist: create a paragraph element that is identical to
//the default paragraph found in the html file.
//iii. Optional suggestion: use a ternary for this conditional
//f. Appends the element to the main element
//g. Returns the element variable

const displayPosts = async postData => {
  
  const mainElem = document.querySelector('main');
  const element = postData ?
  await createPosts(postData) :
  document.querySelector('.default-text').cloneNode(true);
  mainElem.append(element);
  
  return element;
}

//toggleComments
//a. Dependencies: toggleCommentSection, toggleCommentButton
//b. Receives 2 parameters: (see addButtonListeners function description)
//i. The event from the click event listener is the 1st param
//ii. Receives a postId as the 2nd parameter
//c. Sets event.target.listener = true (I need this for testing to be accurate)
//d. Passes the postId parameter to toggleCommentSection()
//e. toggleCommentSection result is a section element
//f. Passes the postId parameter to toggleCommentButton()
//g. toggleCommentButton result is a button
//h. Return an array containing the section element returned from
//toggleCommentSection and the button element returned from
//toggleCommentButton: [section, button]

const toggleComments = (event, postId) => {
  
  if (!event || !postId) return;
  
  event.target.listener = true;
  const section = toggleCommentSection(postId);
  const button = toggleCommentButton(postId);
  
  return [section, button];
}

//refreshPosts
//a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts,
//addButtonListeners
//b. Is an async function
//c. Receives posts JSON data as a parameter
//d. Call removeButtonListeners
//e. Result of removeButtonListeners is the buttons returned from this function
//f. Call deleteChildElements with the main element passed in as the parameter
//g. Result of deleteChildElements is the return of the main element
//h. Passes posts JSON data to displayPosts and awaits completion
//i. Result of displayPosts is a document fragment
//j. Call addButtonListeners
//k. Result of addButtonListeners is the buttons returned from this function
//l. Return an array of the results from the functions called: [removeButtons, main,
//fragment, addButtons]

const refreshPosts = async post => {
  
  if(!post) return;
  
  const noButtons = removeButtonListeners();
  const element = deleteChildElements(document.querySelector('main'));
  const fragment = await displayPosts(post);
  const addButtons = addButtonListeners();
  
  return [noButtons, element, fragment, addButtons];
}

//selectMenuChangeEventHandler
//a. Dependencies: getUserPosts, refreshPosts
//b. Should be an async function
//c. Automatically receives the event as a parameter (see cheatsheet)
//d. Disables the select menu when called into action (disabled property)
//e. Defines userId = event.target.value || 1; (see cheatsheet)
//f. Passes the userId parameter to await getUserPosts
//g. Result is the posts JSON data
//h. Passes the posts JSON data to await refreshPosts
//i. Result is the refreshPostsArray
//j. Enables the select menu after results are received (disabled property)
//k. Return an array with the userId, posts and the array returned from refreshPosts:
//[userId, posts, refreshPostsArray}

const selectMenuChangeEventHandler = async event => {
  
  if(!event) return;
  
  const select = document.getElementById('selectMenu');
  select.disabled = true;
  const userId = event?.target?.value || 1;
  const postData = await getUserPosts(userId);
  const refreshedPosts = await refreshPosts(postData);
  select.disabled = false;
  
  return [userId, postData,refreshedPosts];

}

//initPage
//a. Dependencies: getUsers, populateSelectMenu
//b. Should be an async function
//c. No parameters.
//d. Call await getUsers
//e. Result is the users JSON data
//f. Passes the users JSON data to the populateSelectMenu function
//g. Result is the select element returned from populateSelectMenu
//h. Return an array with users JSON data from getUsers and the select element
//result from populateSelectMenu: [users, select]

const initPage = async () => {
  
  const users = await getUsers();
  const select = populateSelectMenu(users);
  
  return [users, select];
  
}

//initApp
//a. Dependencies: initPage, selectMenuChangeEventHandler
//b. Call the initPage() function.
//c. Select the #selectMenu element by id
//d. Add an event listener to the #selectMenu for the “change” event
//e. The event listener should call selectMenuChangeEventHandler when the change
//event fires for the #selectMenu

const initApp = async () => {
  initPage();
  
  const select = document.getElementById('selectMenu');
  select.addEventListener('change', selectMenuChangeEventHandler);

} 

document.addEventListener('DOMContentLoaded', event => {
  initApp();
  
})