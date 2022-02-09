let table,form,inputName,inputBreed,inputSex,submitButton;
document.addEventListener('DOMContentLoaded', () => {
    init();
})
function init(){
    table = document.getElementById('table-body');
    form = document.getElementById('dog-form');
    inputName = document.getElementById('inputName');
    inputBreed = document.getElementById('inputBreed');
    inputSex = document.getElementById('inputSex');
    submitButton = document.getElementById('submitButton');
    submitButton.className = '';
    //console.log(inputName,inputBreed,inputSex,submitButton);
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(data => {
        data.map((e) =>{
            createDataChart(e);
        })
    })
    submitButton.addEventListener('click', ()=>{    
        //console.log(submitButton.classList[0]);
        fetch(`http://localhost:3000/dogs/${submitButton.classList[0]}`, {
    method: 'PATCH',
    body: JSON.stringify({
    name: inputName.value,
    breed: inputBreed.value,
    sex: inputSex.value,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => {
        //console.log(json);
         let child = table.children;
         
         //console.log(child[json.id-1].children[0].textContent);
         child[json.id-1].children[0].textContent = json.name;
         child[json.id-1].children[1].textContent = json.breed;
         child[json.id-1].children[2].textContent = json.sex;
    
    });
    submitButton.className = '';
    inputName.value = '';
    inputBreed.value = '';
    inputSex.value = '';
})
}
function createDataChart(data){
    //console.log(data.name);
    let tableRow = document.createElement('tr');
    tableRow.innerHTML = `
    <td id ='${data.name}'>${data.name}</td>
    <td id ='${data.breed}'>${data.breed}</td>
    <td id ='${data.sex}'>${data.sex}</td>
    <td><button id='${data.id}'>Edit</button></td>
    `;
    table.appendChild(tableRow);
    let button = document.getElementById(data.id);
    button.addEventListener('click',() =>{
        submitButton.classList.add(data.id);
        inputBreed.value = data.breed;
        inputName.value = data.name;
        inputSex.value = data.sex;
    });
}
