window.addEventListener('scroll',function(){
    const header =document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
    
});
//**form */
function verif ()
{  
  //**nom 
  a = formulaire.nom.value;
  exp=/^[A-Z]{1}[a-z ]+$/;
  if(exp.test(a)==false ) 
 {
 alert ("Merci de saisir votre nom et prénom ! la première lettre doit être majuscule! ")
  return false; 
  nom.classList.add("erreur");}


//**email
else if ((formulaire.email.value =="") ||(formulaire.email.value.indexOf('@')==1)||
(formulaire.email.value.indexOf('.')<0))
{alert ("champs mail est obligatoire vous devez le remplir correctement !")
return false;}


return true;

}
//**end form */
//**pi */
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
const randomMeal = document.getElementById('randomMeal');

let urlSearch = '';

const fetchSearch = async(url) => {
	meals = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${url}`)
    .then(res => res.json())
    .then(res => res.meals) 
};

const searchDisplay = async() => {
  await fetchSearch(urlSearch);

  if (meals == null){
    results.innerHTML = `<span class="noResult">No results</span>`
  }
  
  results.innerHTML = (
    
    meals.map(meal => (
            
      `
      <div class="searchContainer">
        <h2>${meal.strMeal}</h2>
        <div class="infos">
          <div>origin : ${meal.strArea}</div>
          <div>category : ${meal.strCategory}</div>
        </div>
        <img src='${meal.strMealThumb}' / style=" width: 90%;
        max-width: 250px;
        border-radius: 30px;
        box-shadow: 0 4px 4px #222;
        margin-bottom: 1rem;"></br>
        <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
      </div>
      `
    )).join('')
  );
};

searchInput.addEventListener('input', (e) => {
  urlSearch = `search.php?s=${e.target.value}`;
  searchDisplay();
});


// GET RANDOM MEAL
const randomMealDisplay = async() => {
  await fetchSearch('random.php');

  results.innerHTML = (
    
    meals.map(meal => (
            
      `
        <div class="randomContainer">
          <h2>${meal.strMeal}</h2>
          <div class="infos">
            <div>origin : ${meal.strArea}</div>
            <div>catégory : ${meal.strCategory}</div>
          </div>
          <img src='${meal.strMealThumb}' / style=" height: 450px;
          border-radius: 10px;
          box-shadow: 0 10px 10px #333;">
          <p>${meal.strInstructions}</p>
          <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
        </div>
      `
    ))
  );
};

randomMeal.addEventListener('click', randomMealDisplay)
randomMealDisplay();
