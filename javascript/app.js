
let nameField = document.getElementById("nameField");
let priceField = document.getElementById("priceField");
let countField = document.getElementById("countField");
let addBtn = document.getElementById("addBtn");
let itemsList = document.getElementById("itemsList");
let sumLbl = document.getElementById("sumLbl");
let productInList = document.getElementById("productInList");

let items = [];
let productList = []; /* név, ár */

addBtn.addEventListener('click', () => {
    if ((nameField.value == '' || productInList.value == '')|| priceField.value == 0 || countField.value == 0) {
        window.alert("Nem adtál meg minden adatot!");
        return;
    }

    if(nameField.value != ""){
        items.push({
            name: nameField.value,
            price: Number(priceField.value),
            count: Number(countField.value),
            sum: priceField.value * countField.value
        });

        for (let i = 0; i < items.length; i++) {
            if(!productList.find(x => x.name == items[i].name)){
                productList.push({
                    name: items[i].name,
                    price: items[i].price,
                })
            }
            
        }
    }else{
        items.push({
            name: productInList.value,
            price: Number(priceField.value),
            count: Number(countField.value),
            sum: priceField.value * countField.value
        })
    } 

    RefreshTable();
    ClearForm();
    Save();
    LoadProduct();
});

function RefreshTable(){
    itemsList.innerHTML = "";
    let sum = 0;

    for (let i = 0; i < items.length; i++) {

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let btn = document.createElement('button');

        td1.innerHTML = i+1;
        td2.innerHTML = items[i].name;
        td3.innerHTML = items[i].price + ' Ft';
        td4.innerHTML = items[i].count + ' db';
        td5.innerHTML = items[i].sum + ' Ft'; 
        btn.innerHTML = "X"

        td3.classList.add('text-end');
        td4.classList.add('text-end');
        td5.classList.add('text-end');
        btn.classList.add('btn,btn-danger,text-center,align-middle');
        btn.addEventListener('click', () => {
            Delete(i);
        })
    
        sum += items[i].sum;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        td6.appendChild(btn);

        itemsList.appendChild(tr);
       
    }
    sumLbl.innerHTML = sum;
    
}

function ClearForm(){
    nameField.value = '';
    priceField.value = 0;
    countField.value = 0;
}

function Save(){
    localStorage.setItem('bevlista', JSON.stringify(items));
    localStorage.setItem('product', JSON.stringify(productList));
}

function Load(){
    if(localStorage.getItem('bevlista')){
        items = JSON.parse(localStorage.getItem('bevlista'));
    }
}
function Delete(index){
    if(confirm("Biztosan törölni szeretnéd?")){
        items.splice(index, 1)
    }
    RefreshTable();
    Save();
}

function LoadProduct(){
    productInList.innerHTML = "";
    if(localStorage.getItem('product')){
        productList = JSON.parse(localStorage.getItem('product'));
    }

    for (let i = 0; i < productList.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = productList[i].name;
        priceField.value = productList[i].price;

        productInList.appendChild(option)
    }
    
}

function Valtozik(){
    for (let i = 0; i < productList.length; i++) {
        alert(productList[i].name + ' - ' + productList[i].price)
        alert(productInList.value)
        if(productInList.value == productList[i].name){
            priceField.innerHTML = 1
        }
        
    }
}

//App indítása, törli a beviteli mezőt, betölti a tömböt, és kiírja a táblázatba.
ClearForm();
LoadProduct();
Load();
RefreshTable();


//768 Egységár és mennyiség egymás mellett, 992 mindhárom egymás mellett