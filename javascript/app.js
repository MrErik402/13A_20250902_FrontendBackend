let nameField = document.getElementById("nameField");
let priceField = document.getElementById("priceField");
let countField = document.getElementById("countField");
let addBtn = document.getElementById("addBtn");
let itemsList = document.getElementById("itemsList");
let sumLbl = document.getElementById("sumLbl");
let nameFieldList = document.getElementById("termekek")

let items = [];
let products = [];

addBtn.addEventListener('click', () => {

    if (nameField.value == '' || priceField.value == 0 || countField.value == 0) {
        window.alert("Nem adtál meg minden adatot!");
        return;
    }

    items.push({
        name: nameField.value,
        price: Number(priceField.value),
        count: Number(countField.value),
        sum: priceField.value * countField.value
    });

    let meglevoTermek = products.find(product => product.name == nameField.value)
    if (meglevoTermek) {
        if (meglevoTermek.price != Number(priceField.value)) {
            items.forEach(item => {
                if (item.name == nameField.value) {
                    item.price = Number(priceField.value);
                    item.sum = item.price * item.count;
                }});
            meglevoTermek.price = Number(priceField.value);
        }
    }
    else {
        products.push({
            name: nameField.value,
            price: Number(priceField.value)
        });
    }

    RefreshTable();
    ClearForm();
    Save();
});

nameField.addEventListener('selectionchange', () => {
    let item = products.find(product => product.name == nameField.value);
    if (items) {
        priceField.value = item.price;
    }
});


function RefreshTable() {
    itemsList.innerHTML = "";
    nameFieldList.innerHTML = "";
    let sum = 0;

    for (let j = 0; j < products.length; j++) {
        let optionData = document.createElement('option')
        optionData.value = products[j].name;
        nameFieldList.appendChild(optionData)
    }

    for (let i = 0; i < items.length; i++) {

        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');

        let btn = document.createElement("button");

        td1.innerHTML = i + 1;
        td2.innerHTML = items[i].name;
        td3.innerHTML = items[i].price + ' Ft';
        td4.innerHTML = items[i].count + ' db';
        td5.innerHTML = items[i].sum + ' Ft';
        btn.innerHTML = "X";

        td3.classList.add('text-end');
        td4.classList.add('text-end');
        td5.classList.add('text-end');
        td6.classList.add('text-center');
        btn.classList.add('btn', 'btn-danger', 'btn-sm')
        btn.addEventListener('click', () => { DeleteItem(i) });

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

function ClearForm() {
    nameField.value = '';
    priceField.value = 0;
    countField.value = 0;
}

function Save() {
    localStorage.setItem('bevLista', JSON.stringify(items));
    localStorage.setItem('products', JSON.stringify(products));
}

function Load() {
    if (localStorage.getItem("bevLista")) {
        items = JSON.parse(localStorage.getItem("bevLista"));
    }

    if (localStorage.getItem("products")) {
        products = JSON.parse(localStorage.getItem("products"));
    }
}

function DeleteItem(idx) {
    if (confirm("Biztosan törlöd a tételt?")) {
        items.splice(idx, 1);
        RefreshTable();
        Save();
    }

}

Load();
RefreshTable();
ClearForm();