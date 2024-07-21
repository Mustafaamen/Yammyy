let rowDate = document.getElementById('rowDate')
let searchContainer = document.getElementById('searchContainer')
let btnSubmit;

$(document).ready(()=>{
   searchByName('').then(()=>{
      $('.loading').fadeOut(500)
$('body').css("overflow","visible")
   })
})

function openSaidNav() {
   $(".said-nav").animate({ left: 0 }, 500)
   $('.open-close').removeClass('fa-bars')
   $('.open-close').addClass('fa-x')

   for (let i = 0; i < 5; i++) {
      $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100)

   }
}
function closeSaidNav() {
   let navWidth = $(".said-nav .nav-left").outerWidth()

   $(".said-nav").animate({ left: -navWidth }, 500)


   $('.open-close').addClass('fa-bars')
   $('.open-close').removeClass('fa-x')
   $(".links li").animate({ top: 300 }, 500)
}
closeSaidNav()
$(".nav-right i.open-close").click(() => {

   //  $(".said-nav .nav-left").outerwidth()
   //  $(".said-nav").animate({left : -navWidth},500)

   if ($(".said-nav").css('left') == '0px') {

      closeSaidNav()
   } else {
      openSaidNav()
      // $(".links li").eq(0).animate({ top: 0 }, 500)
      // $(".links li").eq(1).animate({ top: 0 }, 600)
      // $(".links li").eq(2).animate({ top: 0 }, 700)
      // $(".links li").eq(3).animate({ top: 0 }, 800)
      // $(".links li").eq(4).animate({ top: 0 }, 900)

   }
})



function displayMeals(arr) {
   let cartona = ``
   for (let i = 0; i < arr.length; i++) {
      cartona += `
   
      <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 curser-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="meal">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div> 
            </div>
      `
   }
   rowDate.innerHTML = cartona
}


async function fetchDataForcategory() {
   searchContainer.innerHTML = ""

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
   let finalRes = await response.json()
   allDataForHome = finalRes.categories
   console.log(allDataForHome);
   displayCategores(allDataForHome)
}
function displayCategores(arr) {
   let cartona = ``
   for (let i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col-md-3">
               <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 curser-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="meal">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        
<p> ${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>

                    </div>
                </div> 
            </div>
      `
   }
   rowDate.innerHTML = cartona

}

async function getArea() {
   searchContainer.innerHTML = ""

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
   response = await response.json()
   console.log(response.meals);
   displayArea(response.meals)
}
function displayArea(arr) {
   let cartona = ``
   for (let i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class=" rounded-2 text-center curser-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                        

                </div> 
            </div>
      `
   }
   rowDate.innerHTML = cartona
}


async function getIngredients() {
   searchContainer.innerHTML = ""

   let response = await fetch(`https:/www.themealdb.com/api/json/v1/1/list.php?i=list`)
   response = await response.json()
   console.log(response.meals);
   displayIngredients(response.meals.slice(0, 25))
}
function displayIngredients(arr) {
   let cartona = ``
   for (let i = 0; i < arr.length; i++) {
      cartona += `
      <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class=" rounded-2 text-center curser-pointer">
                 <i class="fa-solid fa-bowl-food fa-4x text-warning"></i>
                        <h3>${arr[i].strIngredient}</h3>
<p> ${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                        

                </div> 
            </div>
      `
   }
   rowDate.innerHTML = cartona
}

async function getCategoryMeals(category) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
   response = await response.json()
   console.log(response);
   displayMeals(response.meals)
}


async function getAreaMeals(area) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
   response = await response.json()
   console.log(response);
   displayMeals(response.meals)
}


async function getIngredientsMeals(ingredients) {

   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
   response = await response.json()
   console.log(response);
   displayMeals(response.meals)
}

async function getMealDetails(mealId) {
   searchContainer.innerHTML = ""
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
   response = await response.json()
   // console.log(response.meals[0]);
   displayMealDetails(response.meals[0])
}
function displayMealDetails(meal) {

   let ingredients = ``
   for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
         ingredients += `
                        <li class="alert  alert-info">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>
   
   `
      }
   }
   let tags = meal.strTags?.split(",")
   if (!tags) tags = []
   let tagsStr = ``

   for (let i = 0; i < tags.length; i++) {
      tagsStr += `
                        <li class="alert  alert-danger">${tags[i]} </li>
            
            `

   }
   let cartona = `
  <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="detelsmale">
                <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p${meal.strInstructions}</P>
                    <h3> <span class="fw-bolder">Area :</span>${meal.strArea}</h3>
                    <h3> <span class="fw-bolder">Category  :</span>${meal.strCategory}</h3>
                    <h3> <span class="fw-bolder">Recipes  :</span></h3>
                    <ul class="d-flex flex-wrap gap-2">
                       ${ingredients}
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="d-flex flex-wrap gap-2">
                        ${tagsStr}
                    </ul>
                   
                    <a target="_blank" class="btn btn-success" href="${meal.strYoutube}">source</a>
                    <a target="_blank" class="btn btn-danger" href="${meal.strSource}">Youtube</a>
            </div>
`
   rowDate.innerHTML = cartona
}


function showSearchInput() {
   searchContainer.innerHTML = `
         
       <div class="row py-4">
            <div class="col-md-6">
                <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByFirstLitter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Litter">
            </div>
        </div>
         `
   rowDate.innerHTML = ""
}

//     async function searchByName(term){
// let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
//  response =  await response.json()
// console.log(response);
// }  

async function searchByName(term) {
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
   response = await response.json()
   // console.log(response.meals);

   response.meals ? displayMeals(response.meals) : displayMeals([])
}

async function searchByFirstLitter(term) {
   term == "" ? term = "a" : "";
   let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
   response = await response.json()
   // console.log(response.meals);

   response.meals ? displayMeals(response.meals) : displayMeals([])
}

function showContactUs() {
   rowDate.innerHTML = `
   
     <section class=" content" >
        <div class="container">
            <h1 class="text-white text-center">ContacUs...</h1>
            <div class="row desplay-ingredient py-5 g-4 ">
                <div class="col-md-6">
                    <input onkeyup="inputValidation()"  id="userName" class="form-control text-center bg-black rounded-0 text-white  " type="text" placeholder="Enter Your Name"/>
                  <div id="name-alert" class="alert alert-danger w-100 mt-2 d-none">
special
</div>
                </div>
                <div class="col-md-6">
                    <input onkeyup="inputValidation()" id="userMail" class="form-control text-center bg-black  rounded-0 text-white "  type="email" placeholder="Enter Your Mail"/>
                    <div id="email-alert" class="alert alert-danger w-100 mt-2 d-none">
                       email not valid example*mustafaelhadad@gmail.com
                    </div>
                </div>
    
                <div class="col-md-6">
                    <input onkeyup="inputValidation()"  id="userNumber" class="form-control text-center bg-black rounded-0 text-white  " type="number" placeholder="Enter Your Number"/>
                 <div id="phone-alert" class="alert alert-danger w-100 mt-2 d-none">
                       number not valid example*01003293537
                    </div>
                    </div>
                
                <div class="col-md-6">
                    <input onkeyup="inputValidation()" id="userAge" class="form-control text-center bg-black  rounded-0 text-white "  type="number" placeholder="Enter Your Age"/>
                <div id="age-alert" class="alert alert-danger w-100 mt-2 d-none">
                       min age  3 
                    </div>
                    </div>
                <div class="col-md-6">
                    <input onkeyup="inputValidation()" id="userPass1" class="form-control text-center bg-black  rounded-0 text-white "  type="password" placeholder="Enter Your Password"/>
               <div id="pass1-alert" class="alert alert-danger w-100 mt-2 d-none">
                       enter pass min 9 deg
                    </div>
                    </div>
    
                <div class="col-md-6">
                    <input onkeyup="inputValidation()"  id="userPass2" class="form-control text-center bg-black rounded-0 text-white  " type="password" placeholder="Enter Your Password"/>
                <div id="pass2-alert" class="alert alert-danger w-100 mt-2 d-none">
                      password not valid
                    </div>
                    </div>
                <div class="alert alert-danger" role="alert" style="display: none;">
                    check your valid
                </div>
                <div class="col-md-12 text-center">
                    <button id="check" class="btn btn-outline-warning " >check</button>
    
                    <button disabled id="submit" class="btn btn-outline-danger " disabled>submit</button>
                </div>
    
            </div>
            
        </div>
    </section> 
   `
   btnSubmit = document.getElementById('submit')
   document.getElementById('userName').addEventListener('focus',()=>{
      nameInputTouch=true;
   })
   document.getElementById('userMail').addEventListener('focus',()=>{
      emailInputTouch=true;
   })
   document.getElementById('userNumber').addEventListener('focus',()=>{
      phoneInputTouch=true;
   })
   document.getElementById('userAge').addEventListener('focus',()=>{
      ageInputTouch=true;
   })
   document.getElementById('userPass1').addEventListener('focus',()=>{
      pass1InputTouch=true;
   })
   document.getElementById('userPass2').addEventListener('focus',()=>{
      pass2InputTouch=true;
   })

}

let nameInputTouch=false;
let emailInputTouch=false;
let phoneInputTouch=false;
let ageInputTouch=false;
let pass1InputTouch=false;
let pass2InputTouch=false;



function inputValidation() {

if(nameInputTouch){
   if(nameValidation()){
      document.getElementById("name-alert").classList.replace("d-block","d-none")
   }else{
      document.getElementById("name-alert").classList.replace("d-none","d-block")

   }
}
   if(emailInputTouch){
      if(emailValidation()){
         document.getElementById('email-alert').classList.replace('d-block','d-none')
      }else{
         document.getElementById('email-alert').classList.replace('d-none','d-block')
   
      }
   }
 
  if(phoneInputTouch){
   if(numberValidation()){
      document.getElementById('phone-alert').classList.replace('d-block','d-none')
   }else{
      document.getElementById('phone-alert').classList.replace('d-none','d-block')

   }
  }
  if(ageInputTouch){
   if(ageValidation()){
      document.getElementById('age-alert').classList.replace('d-block','d-none')
   }else{
      document.getElementById('age-alert').classList.replace('d-none','d-block')

   }
  }
   if(pass1InputTouch){
      if(passwordValidation()){
         document.getElementById('pass1-alert').classList.replace('d-block','d-none')
      }else{
         document.getElementById('pass1-alert').classList.replace('d-none','d-block')
   
      }
   }
  if(pass2InputTouch){
   if(rePasswordValidation()){
      document.getElementById('pass2-alert').classList.replace('d-block','d-none')
   }else{
      document.getElementById('pass2-alert').classList.replace('d-none  ','d-block')

   } 
  }
   if (nameValidation() &&
      emailValidation() &&
      numberValidation() &&
      ageValidation() &&
      passwordValidation() &&
      rePasswordValidation()
   ) {
      btnSubmit.removeAttribute('disabled')
   } else {
      btnSubmit.setAttribute('disabled', true)
   }

}

function nameValidation() {
   return /^[a-zA-Z ]+$/.test(document.getElementById("userName").value)

}
function emailValidation() {
   return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("userMail").value)


}

function numberValidation() {
   return /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{5})$/g


      .test(document.getElementById("userNumber").value)

}
function ageValidation() {
   return /^([3-9]|[1-6][0-9])$/gm.test(document.getElementById("userAge").value)

}
function passwordValidation() {
   return /^\d{9,}$/.test(document.getElementById("userPass1").value)

}

/*
حتوي على 8 أحرف على الأقل.
تحتوي على حرف صغير واحد على الأقل.
تحتوي على حرف كبير واحد على الأقل.
تحتوي على رقم واحد على الأقل.
تحتوي على رمز خاص واحد على الأقل.
*/

function rePasswordValidation() {
   return document.getElementById("userPass2").value == document.getElementById("userPass1").value

}  

let facebook = document.querySelector('#facebook')
let twitter = document.querySelector('#twitter')
facebook.addEventListener("click",function(){
   window.open('https://www.facebook.com/elhdad20155','_blank')
})
twitter.addEventListener("click",function(){
   window.open('https://x.com/muelhadad1','_blank')
})