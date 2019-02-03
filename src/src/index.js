const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

document.addEventListener("DOMContentLoaded", getToys);

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});

// YOUR CODE HERE

// STEP 1: Render Toys to the Page

// fetches all toys from api
// iterates through returned json
// passes individual toy objects to renderToy function
function getToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(json => {
      json.forEach(toy => {
        renderToy(toy);
      });
    });
}

// a function rendering all toys creating...
//  * div with class name card
//  * h2 tag with the toy's name
//  * image tag with the src of the toy's image attribute - needs a class name of "toy-avatar"
//  * p tag with how many likes that toy has
//  * button tag with an class of "like-btn"

function renderToy(toy) {
  //get parent
  let toyCollection = document.getElementById("toy-collection");

  //create div + div elements
  let toyDiv = document.createElement("div");
  toyDiv.classList.add("card");
  toyDiv.dataset.id = toy.id
  let h2 = document.createElement("h2");
  h2.innerText = toy.name;
  let img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";
  let p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;
  let button = document.createElement("button");
  button.innerText = "like";
  button.className = "like-btn";

  //add event listener to toy collection div for increaseLikes function (using event delegation)
  toyCollection.addEventListener("click", function(event) {
    if (event.target.classList.contains('like-btn')) {
      increaseLikes(event)
    }
  })

  //append child elements to div card
  toyDiv.appendChild(h2);
  toyDiv.appendChild(img);
  toyDiv.appendChild(p);
  toyDiv.appendChild(button);
  toyCollection.appendChild(toyDiv);
}

// STEP 2: Add/Create New Toys

// get toyform + add event listener for the submit that calls a function to handle input values from user
const newToyForm = document.querySelector(".add-toy-form");
newToyForm.addEventListener("submit", inputHandler);

// when a user clicks on the add new toy button - a POST request is sent to http://localhost:3000/toys and the new toy is added to Andy's Toy Collection.
// the toy should conditionally render to the page.
function inputHandler(event) {
  event.preventDefault();
  // get info from the DOM
  let name = newToyForm.elements.namedItem("name").value;
  let image = newToyForm.elements.namedItem("image").value;

  // check to see that form inputs have info
  if (name === "" || image === "") {
    alert("Fill in both fields!");
  } else {
    // fetch post to database
    // render the toy
    postToy(name, image);
  }
}

function postToy(name, image) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
    .then(res => res.json())
    .then(json => {
      newToyForm.reset();
      // pass json object to renderToy function
      renderToy(json);
      // scrolls to bottom of page
      window.scrollTo(0, document.body.scrollHeight);
    });
}

// STEP 3: Implement Like Increase

// increment likes and get likesNumber + toyId
// on click, calls the updateLikes function where you pass in the like info + execute a patch fetch
function increaseLikes(event) {
  let likeButton = event.target
  let toyDiv = likeButton.parentNode
  let toyId = toyDiv.dataset.id
  let likesNumber = toyDiv.querySelector("p").innerText.split(" ")[0];
  likesNumber++;
  updateLikes(likesNumber, toyId);
}

function updateLikes(number, id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: number
    })
  })
    .then(r => r.json())
    .then(json => {
      //pessimistic render: Display that new like count on the page
      let toyToUpdate = document.querySelector(`[data-id = '${id}']`);
      toyToUpdate.querySelector("p").innerText = `${number} likes`;
    });
}
