 loadTable();
 let namefield = document.getElementById("namefield"); //Termék neve - namefield
 let pricefield = document.getElementById("pricefield"); //Termék darab ára - pricefield
 let countfield = document.getElementById("countfield"); //Termék darab száma - countfield
 let btn_hozzaad = document.getElementById("btn_hozzaad"); //Hozzáadás gomb - btn_hozzaad
 let itemlist = document.getElementById("itemlist"); //Termék lista - itemlist
 let summary = document.getElementById("summary"); //Összegzés - summary


 let items = []; //Termékek tárolására szolgáló lista
/* Tétel hozzáadás */
 let listSum = 0;
 btn_hozzaad.addEventListener('click', () => {
    if(namefield.value == "" || pricefield.value == 0 || countfield.value == 0){
        alert("Nem adtál meg minden paramétert!");
        return;
    };
    
    items.push({
        name: namefield.value,
        price: Number(pricefield.value),
        count: Number(countfield.value),
        sum: pricefield.value * countfield.value
    });
    console.log(items);
    refreshTable();
    clearForm();
    saveTable();
    
    
 
    

     

    /*  <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr> */
 });

 function refreshTable(){
    itemlist.innerHTML = "";
    sum = 0;

    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    for (let i = 0; i < items.length; i++) {
        td1.innerHTML = i+1+".";
        td2.innerHTML = items[i].name;
        td3.innerHTML = items[i].price + ' Ft';
        td4.innerHTML = items[i].count + ' db'; 
        td5.innerHTML = items[i].sum + ' Ft';

        td3.classList.add("text-end")
        td4.classList.add("text-end")
        td5.classList.add("text-end")

        listSum+=items[i].sum;

        
    }
    tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        itemlist.appendChild(tr);
    summary.innerHTML = listSum;
 }

 function clearForm(){
    namefield.value = "";
    pricefield.value = 0;
    countfield.value = 0;
 }

 function saveTable(){
    localStorage.setItem('bevLista', items.toString())
 }
 function loadTable(){

 }
 clearForm();