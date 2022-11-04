let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const url = 'http://localhost:3000/toys'
  const toyCollection = document.getElementById('toy-collection')

  //In the function below, we defined how to create card with data coming from DB
  function createCard () 
  {
    fetch(url)
    .then(resp => resp.json())
    .then(json => {
  
      json.map(element => {
  
        //Creating card
        const div = document.createElement('div')
        div.classList = 'card'
  
        //Adding Toy's name 
        const h2 = document.createElement('h2')
        h2.textContent = element.name
        div.appendChild(h2)
  
        //Adding img
        const img = document.createElement('img')
        img.src = element.image
        img.classList = 'toy-avatar'
        div.appendChild(img)
  
        //Adding <p> tag for likes
        const p = document.createElement('p')
        p.textContent = `no likes yet `
        p.id = `p${element.id}`
        div.appendChild(p)
  
        //Adding button for likes
        const likeBtn = document.createElement('button')
        likeBtn.textContent = 'Like'
        likeBtn.classList = 'like-btn'
        likeBtn.id = element.id
        div.appendChild(likeBtn)
  
        //Adding individual div of related toy to the container
        toyCollection.appendChild(div)
        let counter = 0

        //Like button function
        likeBtn.addEventListener('click', (e) => {
          e.preventDefault()
          
          counter++
          
          fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            'likes': counter
          })
          })
          
          //Reached out to the related <p> and updated its inner text
          document.querySelector(`#p${e.target.id}`).textContent = `${counter} likes`
          })
  
      })
    })
  }

  //We called the function first time
createCard()

const form = document.querySelector('.add-toy-form')
const nameInput = document.getElementsByName('name')[0]
const imageInput = document.getElementsByName('image')[0]

form.addEventListener('submit', event => {
  event.preventDefault()

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': `${nameInput.value}`,
      'image': `${imageInput.value}`,
      'likes': 0
    })
  }).then(
    createCard() //After adding an element, we called this function 2nd time
  )


})

});


