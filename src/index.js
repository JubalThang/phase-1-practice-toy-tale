let addToy = false;
const DBURL = 'http://localhost:3000/toys'
const headers = {
  'Content-type' : 'application/json',
  'Accept': 'applicaton/json'
}

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToyForm = document.querySelector('.add-toy-form')
  newToyForm.addEventListener('submit', event => addNewToy(event))
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetchToys()
});

function fetchToys() {
  fetch(DBURL)
  .then(res => res.json())
  .then(toys => toys.forEach(toy => displayToy(toy)))
  .catch(error => console.error(`Unable to fetch : ${error}`))
}

function displayToy(toy) {
  const toyDiv = document.getElementById('toy-collection')

  const card = document.createElement('div')
  const toyHeader = document.createElement('h2')
  const toyAvator = document.createElement('img')
  const likeBtn = document.createElement('button')
  const likeCountP = document.createElement('p')

  toyHeader.textContent = toy.name
  toyAvator.src = toy.image
  likeBtn.textContent = "Like"
  likeCountP.textContent = `likes : ${toy.likes}`
  likeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    toy.likes+=1
    handleToyLike(toy)
  })
  
  card.className = 'card'
  toyAvator.className = 'toy-avatar'
  likeBtn.className = 'like-btn'
  
  card.append(toyHeader, toyAvator, likeCountP,likeBtn)

  toyDiv.append(card)
}

function handleToyLike(toy,likeCountP) {
  // console.log(`${DBURL}/${toy.id}`)
  // toy.likes += 1
  fetch(`${DBURL}/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  // .then(res => res.json())
  // .then(data => console.log(likeCountP))
}

function addNewToy(e) {
  e.preventDefault()
  const body = {
    "name": e.target.querySelector("input[name='name']").value ,
    "image": e.target.querySelector("input[name='image']").value,
    "likes": 0
  }
  fetch(DBURL, {
    method : 'POST',
    headers: headers,
    body : JSON.stringify(body),
  })
  .then(res => res.json())
  .then(toys => toys.forEach(toy => displayToy(toy)))
  // console.log(body)
}
