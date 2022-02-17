const likeContainer = document.querySelector('.like-counter')
const likesCounter = document.querySelector('#likesCounter')

const postLike = () => {
  likeContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-heart')) {
      const url = `${location.origin}/recipes/like`
      // console.log(e.target.dataset.recipeId)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipeId: e.target.dataset.recipeId,
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          likeContainer.children[1].textContent = data.counter
          // console.log(data)
        })
    }
  })
}

const firstTimeUpdateLikes = () => {
  if (likesCounter) {
    const heart = document.querySelector('.fa-heart')
    const url = `${location.origin}/recipes/like/${heart.dataset.recipeId}`
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        likesCounter.textContent = data.counter
      })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  postLike()
  firstTimeUpdateLikes()
})
