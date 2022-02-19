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
          // console.log(data)
          likeContainer.children[1].textContent = data.counter
        })
        .catch((err) => {
          Swal.fire({
            title: 'Sign in',
            text: 'To give a like you need to sign in.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#8dad63',
            cancelButtonColor: '#eb6e6e',
            confirmButtonText: 'Login',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `${window.location.origin}/login`
            }
          })
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
