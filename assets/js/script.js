const listNameInput = document.getElementById('list-name-input')
const changeNameButton = document.getElementById('change-name-button')

changeNameButton.addEventListener('click', function (){
    let newText = listNameInput.value;
    document.getElementById("list-name").textContent = newText + " List";
})

//outra cor: thistle