const itemsToDelete = document.querySelectorAll('.delete-item')

const deleteRecipe = (item) => {
  const container = document.querySelector('.actions-container')
  const url = `${location.origin}/recipes/delete`

  // console.log(item.parentElement.parentElement.parentElement.parentElement)
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#8dad63',
    cancelButtonColor: '#eb6e6e',
    confirmButtonText: 'Delete recipe',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeId: item.dataset.recipeId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 200) {
            Swal.fire(
              'Success',
              'Your recipe was deleted succesfully',
              'success'
            )
            container.removeChild(
              item.parentElement.parentElement.parentElement
            )
          } else {
            throw Error()
          }
        })
        .catch((err) => {
          Swal.fire(
            'Forbidden',
            "You're not allowed to do this action",
            'warning'
          )
        })
    }
  })
}

if (itemsToDelete) {
  itemsToDelete.forEach((item) => {
    const { recipeId } = item.dataset
    item.addEventListener('click', (e) => {
      deleteRecipe(e.target)
    })
  })
}
