const container = document.createElement('container')
const btnOpen = document.querySelector('#btn_open')
const btnClose = document.querySelector('#btn_close')
const modal = document.querySelector('#modal')
const newCatBtn = document.querySelector('#btn_new_cat')

btnOpen.addEventListener('click', ()=>{
    modal.showModal()
    catFetch()

})
btnClose.addEventListener('click', ()=>{
    modal.close()
})

const handleModalClick = (event) => {
    const modalRect = modal.getBoundingClientRect();
  
    if (
      event.clientX < modalRect.left ||
      event.clientX > modalRect.right ||
      event.clientY < modalRect.top ||
      event.clientY > modalRect.bottom
    ) {
      modal.close();
    }
  };
  
  modal.addEventListener("click", handleModalClick);
async function catFetch(){
    const res = await fetch('https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1')
    const data = await res.json()
    addCat(data[0])
}

function addCat(data){
    const catImg = document.createElement('img')
    catImg.setAttribute('src', '')
    catImg.setAttribute('src', data.url)
    catImg.style.maxWidth='300px'
    container.append(catImg)
    modal.append(container)
}


newCatBtn.addEventListener('click', () => {
    window.location.reload()
})