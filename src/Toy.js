class Toy {
  constructor(obj){
    this.name = obj.name
    this.image = obj.image
    this.likes = obj.likes
    this.id = obj.id
    Toy.all.push(this) //look at line 35
  }

  render(){ return (
    // you have the ability to give you div an attributes you want
    // get creative and use the ids to your advantage
    `<div class="card">
      <h2>${this.name}</h2>
      <img src="${this.image}" class="toy-avatar">
      <p id="p-${this.id}">${this.likes} Likes <p>
      <button class="like-btn" data-id="${this.id}">Like <3</button>
    </div>`
    )
  }

  static find(id){
    //You can create functions that will make your lives easier
    //I use this to search through my instances and operate on them
    return Toy.all.find((toy) => {
      return toy.id == id
    })
  }

}

//remember this is an object we can operate on so we can add an attribute of all
// and use that to store our instances in the frontend
// or we can use a store there is no wrong way to do it
Toy.all = []
