const alert = document.querySelector('.alert')
const editNameButton = document.querySelector('.edit-name')
const formName = document.querySelector('.list-name-form')
const listNameInput = document.getElementById('list-name-input')
const changeNameButton = document.getElementById('change-name-button')
const form = document.querySelector('.list-form')
const inputItem = document.getElementById('input-item')
const submitButton = document.querySelector('.submit-button')
const listContainer = document.querySelector('.list-container')
const list = document.querySelector('.list')
const clearButton = document.querySelector('.clear-button')

let editElement
let editFlag = false
let editID = ""

editNameButton.addEventListener('click', function(){
    formName.classList.add('show-form')
    editNameButton.classList.add('hide-button')
})

changeNameButton.addEventListener('click', function (){
    
    if (listNameInput.value){
        let newText = listNameInput.value
        document.getElementById('list-name').textContent = newText + " List"
    } else {
        displayAlert("Enter a name for your list", "danger")
    }
    
    formName.classList.remove('show-form')
    editNameButton.classList.remove('hide-button')
})

form.addEventListener('submit', addItem())

function addItem(e) {
    e.preventDefault()
    const value = inputItem.value
    const id = new Date().getTime().toString()

    if (value && !editFlag) {
        const element = document.createElement('article')
        element.classList.add('list-item')
        const attribute = document.createAttribute('data-id')
        attribute.value = id
        element.setAttributeNode(attribute)
        element.innerHTML = `
            <p class="item-title">${value}</p>
            <div class="button-container">
                <button type="button" class="edit-button">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button type="button" class="delete-button">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `
        list.appendChild(element)
        displayAlert("Item added to the list", "success")
        listContainer.classList.add('show-container')
        //add to localStorage
        addToLocalStorage(id,value)
        setBacktoDefault()
    } else if (value && editFlag){

    } else {
        displayAlert("Empty value", "danger")
    }
}

function displayAlert(text, action){
    alert.textContent = text
    alert.classList.add(`alert-${action}`)

    setTimeout(function(){
        alert.textContent = ""
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}

function setBacktoDefault(){

}

function addToLocalStorage(id, value){

}