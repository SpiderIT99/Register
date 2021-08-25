const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const btnSend = document.querySelector('.send');
const btnClear = document.querySelector('.control-buttons button');
const btnClose = document.querySelector('.close')
const popup = document.querySelector('.popup');
const formBoxx = document.querySelector('.form-box');



function cleaError(eleInput){

  const formBox = eleInput.parentElement; //
  formBox.classList.remove('error'); //usuwanie wyglądu dla erroru
  
}

function showError(eleInput, mgsError){

  const formBox = eleInput.parentElement;
  formBox.classList.add('error'); //pokaż wygląd dla erroru

  const errorText = formBox.querySelector('.error-text') //<p>error<p> (ukryte)
  errorText.textContent = mgsError; //zmienie napis "error"

}

function sendForm(tabInput){

  tabInput.forEach( eleInput => {

    if(eleInput.value === ''){
      showError(eleInput, eleInput.placeholder); //brak wpisanego tekstu, wyświetl error
    }
    else{
      cleaError(eleInput);
    }

  })

}

const checkLeght = function(eleInput, min){

  if(eleInput.value.length < min){

    const label = eleInput.previousElementSibling;
    textLabel = label.textContent.slice(0,-1);
    const mgsError = `${textLabel}, musi mieć min. ${min} znaków` ;
    showError(eleInput, mgsError);

  }

}

const checkPassword = function(password, password2){

  if(password.value !== password2.value){
    showError(password2,"Inne hasła");
  }

}

const checkEmail = function(email){

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(re.test(email.value)){
    cleaError(email);
  }
  else{
    showError(email, "Nieprawdziwy adres e-mail!");
  }

}

const checkSend = function(){
  
  const div = document.querySelectorAll('div .form-box');

  let errorCount = 0;

  div.forEach( ele => {
    if(ele.classList.contains('error')){
      errorCount++;
    }
  })

  if(errorCount===0){
    popup.classList.add('show-popup');
  }

}

btnSend.addEventListener('click', eve =>{

  eve.preventDefault();
  tabInput = [username,password,password2,email];

  sendForm(tabInput);
  checkLeght(username, 5);
  checkLeght(password, 8);
  checkPassword(password, password2);
  checkEmail(email);
  checkSend();

})

btnClear.addEventListener('click', eve => {

  eve.preventDefault();
  tabInput = [username,password,password2,email];

  tabInput.forEach( input => {
    input.value = "";
    cleaError(input); 
  }) 

})