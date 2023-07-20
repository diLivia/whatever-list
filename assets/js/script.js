// controle do DOM
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

// variaveis alternantes
let editElement
let editFlag = false
let editID = ''

// eventListeners
editNameButton.addEventListener('click', hideButton)
changeNameButton.addEventListener('click', changeName)
form.addEventListener('submit', addItem)
clearButton.addEventListener('click', clearItems)

// funções
function hideButton(){
    formName.classList.add("show-form")
    editNameButton.classList.add("hide")
}

function changeName(){
    if (listNameInput.value) {
        let newText = listNameInput.value;
        document.getElementById("list-name").textContent = newText + " List"
    } else {
        displayAlert("Enter a name for your list", "danger")
    }

    formName.classList.remove("show-form")
    editNameButton.classList.remove("hide")
}

function addItem(e) {
    e.preventDefault();
    const value = inputItem.value;
    const id = new Date().getTime().toString()

    if (value && !editFlag) {
        const element = document.createElement("article")
        element.classList.add("list-item")
        const attribute = document.createAttribute("data-id")
        attribute.value = id
        element.setAttributeNode(attribute)
        element.classList.add('list-item')
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

        const editButton = element.querySelector('.edit-button')
        const deleteButton = element.querySelector('.delete-button')
        editButton.addEventListener('click', editItem)
        deleteButton.addEventListener('click', deleteItem)

        list.appendChild(element)
        displayAlert("Item added to the list", "success")
        listContainer.classList.add("show-container")
        //add to localStorage
        addToLocalStorage(id, value)
        setBackToDefault()

    } else if (value && editFlag) {
        editElement.innerHTML = value
        editLocalStorage(editID, value)
        displayAlert('Item name changed', 'success')
        setBackToDefault()
    } else {
        displayAlert('Please enter a value', 'danger')
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`)

    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`)
    }, 1000);
}

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling
    inputItem.value = editElement.innerHTML
    editFlag = true
    editID = element.dataset.id
    submitButton.textContent = 'Edit'
}

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)

    if (list.children.length === 0){
        listContainer.classList.remove('show-container')
    }

    displayAlert('Item deleted', 'danger')
    setBackToDefault()
    //removeFromLocalStorage(id)
}

function clearItems(){
    const items = document.querySelectorAll('.list-item')

    if (items.length > 0){
        items.forEach(function(item){
            list.removeChild(item)
        })
    }

    listContainer.classList.remove('show-container')
    displayAlert('All items have been removed', 'danger')
    setBackToDefault()
    //localStorage.removeItem('list')
}

function setBackToDefault() {
    inputItem.value = ''
    editFlag = false
    editID = ''
    submitButton.textContent = 'Submit'
}

// funções do localStorage
function addToLocalStorage(id, value) {}

function editLocalStorage(id, value) {}

function removeFromLocalStorage(id){}
