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

getData();