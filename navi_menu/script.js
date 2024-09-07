const navMenu = document.querySelector('#navMenu')
const openButton = document.querySelector('#openButton')
const closeButton = document.querySelector('#closeButton')
const btnCreateCat = document.querySelector('#btn_new_cat')
const textCat = document.querySelector('.text_cat')
const listContainer = document.querySelector('.list_container')

const catTitle = document.createElement('h3')
const catImg = document.createElement('img')
const catName = document.createElement('p')
const catId = document.createElement('p')

const elementMenu1 = document.querySelector('#element1')
const elementMenu2 = document.querySelector('#element2')
const elementMenu3 = document.querySelector('#element3')
const elementMenu4 = document.querySelector('#element4')

const elementList1 = document.querySelector('#element_list_1')
const elementList2 = document.querySelector('#element_list_2')
const elementList3 = document.querySelector('#element_list_3')
const elementList4 = document.querySelector('#element_list_4')

elementMenu1.addEventListener('click', ()=> {
    elementList1.classList.toggle('element_list_close')
})
elementMenu2.addEventListener('click', ()=> {
    elementList2.classList.toggle('element_list_close')
})
elementMenu3.addEventListener('click', ()=> {
    elementList3.classList.toggle('element_list_close')
})
elementMenu4.addEventListener('click', ()=> {
    elementList4.classList.toggle('element_list_close')
})
const toggleMenu = () => {
    navMenu.classList.toggle('nav-menu--open')
}

openButton.addEventListener('click', () => {
    toggleMenu()
})

closeButton.addEventListener('click', () => {
    toggleMenu()
})

async function  createCat(){

    const res = await fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1")
    const data = await res.json()

    resetEl()
    catImg.setAttribute('src', data[0].url)
    catName.innerText = 'Name Cat: Sima'
    catId.innerText = `Id cat: ${data[0].id}`
    textCat.append(catImg, catName, catId)
   
}

function resetEl(){

    catImg.setAttribute('src', '')
    catName.innerText = ''
    catId.innerText = ``
}


btnCreateCat.addEventListener('click', () => createCat())


const arrList = [
    {
        id:1,
        description:'Видим кнопку, например, fetch. По клику на эту кнопку открывается модальное окно'
    },
    {
        id:2,
        description:'В модальном окне вытаскиваем данные, согласно поставленной задаче'
    },
    {
        id:3,
        description:'Каждое модальное окно должно быть способным закрываться и открываться по клику'
    }
]

function createList (arr){
    arr.forEach(i => {
        const list = document.createElement('ul')
        const listEl1 = document.createElement('li')
        const listEl2 = document.createElement('li')
        listEl1.classList.add('title')
        list.classList.add('list')
        
        listEl1.innerText = i.id
        listEl2.innerText = i.description

        list.append(listEl1,listEl2)
        listContainer.appendChild(list)

        
    });

}

createList(arrList)