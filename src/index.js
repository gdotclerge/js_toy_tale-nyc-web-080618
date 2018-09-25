const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionDiv = document.getElementById('toy-collection')
const form = toyForm.querySelector(".add-toy-form")
let addToy = false


addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    form.addEventListener("submit", (event)=>{
      event.preventDefault()
      let name = form.querySelectorAll("input")[0].value
      let image = form.querySelectorAll("input")[1].value
      //because I extracted my fetch I could write less lines of code here
      Adapter.createToy({name, image, likes: 0})
      // I am returning a promise from the Adapter so I can attach a .then to use the response 
      .then(json => {
        let toy = new Toy(json)
        toyCollectionDiv.innerHTML += toy.render()
      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// Example of Event Bubbling with Optimistic rendering

toyCollectionDiv.addEventListener("click", (event)=>{
  if (event.target.className === "like-btn"){
    let toy = Toy.find(event.target.dataset.id)
    let toyPTag = document.getElementById(`p-${toy.id}`)
    toyPTag.innerText = `${++toy.likes} Likes`
    Adapter.addALike(toy.id, toy.likes)
  }
})

// ------------------------------------------------------------------
// Example of Event Bubbling with Pessimistic rendering

// toyCollectionDiv.addEventListener("click", (event)=>{
//   if (event.target.className === "like-btn"){
//     let toy = Toy.find(event.target.dataset.id)
//     Adapter.addALike(toy.id, ++toy.likes)
//     .then(json => {
//       toy.likes = json.likes
//       let toyPTag = document.getElementById(`p-${toy.id}`)
//       toyPTag.innerText = `${toy.likes} Likes`
//     })
//   }
// })
// -------------------------------------------------------------------


// Event Listener for the DOM
// You don't have to wrap everything is this event listener just the items
// you need loaded right away
document.addEventListener("DOMContentLoaded", (event)=>{
  Adapter.getToys()
  .then((json)=>{
    json.forEach((toyJSON)=>{
      let toy = new Toy(toyJSON)
      toyCollectionDiv.innerHTML += toy.render()
    })
  })
})
