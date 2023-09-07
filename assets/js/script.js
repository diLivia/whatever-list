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
window.addEventListener('DOMContentLoaded', setupItems)

// funções
function hideButton(){
    formName.classList.add("show-form")
    editNameButton.classList.add("hide")
}

function changeName(){
    if (listNameInput.value) {
        const newName = listNameInput.value;
        document.getElementById("list-name").textContent = newName
        localStorage.setItem("listName", newName)
        displayAlert("List name changed", "success")
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
        listContainer.classList.add("show-container")
        addToLocalStorage(id, value)
        displayAlert("Item added to the list", "success")
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
    removeFromLocalStorage(id)
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
    localStorage.removeItem('list')
}

function setBackToDefault() {
    inputItem.value = ''
    editFlag = false
    editID = ''
    submitButton.textContent = 'Submit'
}

// funções do localStorage

function getLocalStorage(){
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []
}

function addToLocalStorage(id, value) {
    const item = { id, value }
    let items = getLocalStorage()
    items.push(item)
    localStorage.setItem('list', JSON.stringify(items))
}

function editLocalStorage(id, value) {
    let items = getLocalStorage()
    items.map(function (item) {
        if (item.id === id) {
            item.value = value
        }
        return item
    })

    localStorage.setItem('list', JSON.stringify(items))
}

function removeFromLocalStorage(id){
    let items = getLocalStorage()
    items = items.filter(function(item){
        if (item.id !== id){
            return item
        }
    })

    localStorage.setItem('list', JSON.stringify(items))
}

//setup items
function setupItems(){
    let items = getLocalStorage()
    if (items.length > 0) {
        items.forEach(function(item){
            createListItem(item.id, item.value)
        })
    }

    const savedListName = localStorage.getItem('listName');
    if (savedListName) {
        document.getElementById("list-name").textContent = savedListName;
    }
}

function createListItem(id, value){
    const element = document.createElement("article")
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
    listContainer.classList.add("show-container")
}