class Adapter {
  //Classes don't always have to be used for a particular instance/object
  // We can use our class to wrap a bunch of functions for us to used
  // So placing all of my fetches in one place I could keep the logic of communicating
  // with my backend here

  static getToys(){
    // when need to ensure we return our promises to use in our index.js
    return fetch("http://localhost:3000/toys")
    .then((resp)=> resp.json())
  }


  static createToy(toyObj){
    return fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toyObj)
    }).then(resp => resp.json())
  }

  static addALike(id, likes){
    return fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept':"application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes
      })
    }).then(resp => resp.json())
  }

}
