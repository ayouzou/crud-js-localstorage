let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount=document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let categorie=document.getElementById('categorie');
let Create=document.getElementById('submit');

let mood='Create';
let tmp;


console.log(title, price,taxes,ads,discount,total,count,categorie,Create);


//Get total
function getTotal(){
    if(price.value!=''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='green'
    }
    else{
        total.innerHTML='';
        total.style.background='red'
    }
}
//create data
let dataPro;
    if(localStorage.Product!=null){
          dataPro=JSON.parse(localStorage.Product);
    }else{
        dataPro=[];
    }
   
    Create.onclick=function(){
        if(title.value !="" &&price.value!="" && taxes.value !="" && ads.value !="" &&discount.value !="" && categorie.value!=""){
             let newPro={
                title:title.value,
                price:price.value,
                taxes:taxes.value,
                ads:ads.value,
                discount:discount.value,
                total:total.innerHTML,
                count:count.value,
                categorie:categorie.value,
            }
            if(mood==='Create'){
                if(newPro.count>1){
                        for(let i=0 ;i<newPro.count;i++){
                            dataPro.push(newPro);
                        } 
                } 
                else{
                    dataPro.push(newPro);
                }
            
            }else{
                dataPro[tmp]=newPro;
                Create.innerHTML='Create';
                count.style.display="block";
               total.style.background='red';
               mood='Create'
            }
            localStorage.setItem('Product',JSON.stringify(dataPro));
            clear()
            getdata()
        }else{
            alert('tapez tous les champs !')
        }    
    }
  



 //clear Data
    function clear(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        categorie.value='';

    }
   

    //Get data

    function getdata(){
        let table ="";
        for(let i = 0 ; i < dataPro.length ; i++){
            table+=`
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].categorie}</td>
            <td><Button id="update" onclick="Update(${i})">Update</Button></td>
             <td><Button id="delete" onclick="Delete(${i})">Delete</Button></td>
             </tr>            
            `
         
        }
        document.getElementById('tbody').innerHTML=table;
        let btnDelete=document.getElementById('deleteAll');
        if(dataPro.length>0){
            btnDelete.style.display='block';
            btnDelete.style.content= ``;
           
          }else{
              btnDelete.style.display='none';
          } 
    }
    getdata()
    //deleteAll
    
    function deleteAll(){
     
        localStorage.clear()
        dataPro.splice(0)
        getdata()  
             
    }
    
    //delete 
    function Delete(i){
        dataPro.splice(i,1);
        localStorage.Product=JSON.stringify(dataPro);
        getdata()
    }

    //update
    function Update(i){
        title.value=dataPro[i].title;
        price.value=dataPro[i].price;
        taxes.value=dataPro[i].taxes;
        ads.value=dataPro[i].ads;
        discount.value=dataPro[i].discount;
        total.innerHTML=dataPro[i].total;
        categorie.value=dataPro[i].categorie;
        Create.innerHTML="Update";
        count.style.display='none';
        getTotal()
        mood='Update';
        tmp=i;
    }
   