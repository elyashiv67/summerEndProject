async function getData() {
    try{
        let response = await fetch('/c');
        let data = await response.json();
        createGrid(data);
    }catch(err){
        alert(err)
    }
}

function createGrid(data){
    let txt = "";
    for(obj of data){
        if(obj){
            txt += 
                `<div class="card">
                    <div>
                        <p>${obj.name}</p>
                        <p>${obj.description}</p>
                        <div>${obj.rating}</div>
                    </div>
                    <div>
                        <button onclick="deleteProduct(${obj.id})">Delete</button>
                        <button onclick="getById(${obj.id})">Edit</button>
                    </div>
                </div>`
        }
    }
    document.getElementById('main').innerHTML = txt;
}
function clearInputs(){
    document.getElementById('id').value = "";
    document.getElementById('name').value = "";
    document.getElementById('description').value = "";
    document.getElementById('rating').value = 0;
    document.getElementById('output').value = 0;
    document.getElementById('myFile').value = "";
    document.getElementById('myImage').src = "";
}

async function addCorse() {
    try{
        let name = document.getElementById('name').value;
        let rating = document.getElementById('rating').value;
        let description = document.getElementById('description').value;
        let myFile = document.getElementById('myFile').files[0];
        let formData = new FormData();
        formData.append('name',name);
        formData.append('rating',rating);
        formData.append('description',description);
        if(myFile){
            formData.append('myFile',myFile)
        }
        await fetch('/c',{
            method:'POST',
            body:formData
        })
        getData();
        clearInputs();
    }catch(err){
        alert(err)
    }
    
}

function addOrEdit(){
    addCorse();
}

getData();