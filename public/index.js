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
                    <div onclick="showToJudge(${obj.id})">
                        <img src="../images/${obj.filename}?t=${Date.now()}" alt="${obj.name}">
                        <p>${obj.name}</p>
                        <p>${obj.description}</p>
                        <div>${obj.rating.length}</div>
                    </div>
                    <br>
                    <div class="likeBtn" onclick="addLike(${obj.id})"><span>&#128077;&#127996;</span></div>
                    <br>
                    <div>
                        <button onclick="deleteItem(${obj.id})">Delete</button>
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
    document.getElementById('imageU').value = "";
    document.getElementById('imageP').src = "";
}

async function addCorse() {
    try{
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let imageU = document.getElementById('imageU').files[0];
        let formData = new FormData();
        formData.append('name',name);
        formData.append('description',description);
        if(imageU){
            formData.append('imageU',imageU)
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
    let id = document.getElementById('id').value;
    if(id){
        editItem(id);
    }else{
        addCorse();
    }
}

getData();

async function deleteItem(id) {
    try {
        if(confirm('are you sure?')){
    await fetch(`/c/${id}`,{
        method: 'DELETE'
    })}
    getData();
        
    } catch (error) {
        alert(error);
    }
}



async function getById(id) {
    try {
        let response = await fetch(`/c/${id}`);
        let obj = await response.json();
        document.getElementById('id').value = obj.id;
        document.getElementById('name').value = obj.name;
        document.getElementById('description').value = obj.description;
        document.getElementById('imageP').src = "../images/" + obj.filename + "?t=" + Date.now();
        
    } catch (error) {
        alert(error);
    }
    
}

async function editItem(id) {
    try {
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let imageU = document.getElementById('imageU').files[0];
        let formData = new FormData();
        formData.append('name',name);
        formData.append('description',description);
        if(imageU){
            formData.append('imageU',imageU)
        }
        await fetch(`/c/${id}`,{
            method:'PATCH',
            body:formData
        })
        getData();
        clearInputs();
        
    } catch (error) {
        alert(error)
    }
    
}

async function addLike(id) {
    try {
        let response = await fetch(`/c/L/${id}`,{
             method:'PATCH'
         })
        let message = await response.json();
        alert(message.message);
        getData();
        
    } catch (error) {
        alert(error);
    }
    
}

function showToJudge(id){
    window.open(`judge.html?id=${id}`, '_blank');
}
