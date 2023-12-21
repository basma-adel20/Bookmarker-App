/*************************** */

// it will get only once the elements in html so that is better than i put them in the function -> performance.

var siteNameInput = document.getElementById('siteNameInput'); //full input element tag
var siteUrlInput = document.getElementById('siteUrlInput'); //full input element tag
var tableBody= document.getElementById('tbody');

var addBtn=document.getElementById('submitBtn');
var error_box = document.getElementById('error_box');

var webSitesList=[];


if(localStorage.getItem('myWebsites')!=null)
{
    webSitesList=JSON.parse(localStorage.getItem('myWebsites'));
    displayWebsites(); 
}


function addSite()
{ 
    if(validateSiteName(siteNameInput.value) && validateSiteUrl(siteUrlInput.value))
    {
      var site ={
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value,
        };
      webSitesList.push(site); 
      localStorage.setItem('myWebsites',JSON.stringify(webSitesList));
      clearForm();
      displayWebsites();
    }
    else{
        error_box.classList.remove('d-none');
        console.log(error_box);

    }
}

// console.log(localStorage.getItem('myWebsites').split(','));



// arr--> webSitesList

function displayWebsites() {
   
    var cartoona = ``;
    var index=1;
    for (var i = 0; i < webSitesList.length; i++) {
        cartoona+= `<tr>
        <td>${index++}</td>
        <td>${webSitesList[i].siteName}</td>
        <td><button onclick="visit(${i})" class="btn btn-sm text-white visit px-2"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-danger btn-sm submit"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
    </tr>`;
    }
    tableBody.innerHTML=cartoona;
}


function deleteSite(deleteIndex) {
    webSitesList.splice(deleteIndex,1) ;
    console.log(webSitesList); 
    localStorage.setItem('myWebsites',webSitesList);
    displayWebsites();
}


function validateSiteName(name) {
    var regexName =/^[a-z0-9A-Z]{3}[a-z0-9A-Z]*$/; 
 
    if(regexName.test(name)){
        siteNameInput.classList.replace('is-invalid' ,'is-valid');
        return true;
    }
    else
    {
        siteNameInput.classList.add('is-invalid');
        return false ;
    }
    
}

function validateSiteUrl(url) {
    var regexUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    if(regexUrl.test(url)){
        siteUrlInput.classList.replace('is-invalid' ,'is-valid');
        return true;
    }
    else
    {
        siteUrlInput.classList.add('is-invalid');
        return false;
    }
    
}

function visit(index) {
    var site = webSitesList[index].siteUrl;
    // console.log(site);
    window.open(site, "_blank");
}



function closeBox(){
    error_box.classList.add('d-none');
}

function clearForm()
{
    siteNameInput.value='';
    siteUrlInput.value='';
}
