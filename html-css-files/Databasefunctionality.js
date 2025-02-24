import React from 'react'; 


const form = document.getElementById('form');
const username_input = document.getElementById("username");
const email_input = document.getElementById("email");
const password_input = document.getElementById("password");
const confirmpassword_input = document.getElementById("confirmpassword");
const error_message = document.getElementById("error-message");

form.addEventListener('submit', (e) =>{

    //e.preventDefault();

    let errors = [];

    if(email_input){
        //if there is an email input then you are in the Signup form. 
        errors = getSignupFormErrors(username_input.value, email_input.value, password_input.value, confirmpassword_input.value); 
    }
    else{
        //no email means login page
        errors = getLoginFromErrors(username_input.value, password_input.value); 
    }

    if(errors.length >0){
        //prevents the submission of the form if there is 1 or more errors returned
        e.preventDefault; 
        error_message.innerText = errors.join(". ");

    }

})

//form validation for the sign in page
function getSignupFormErrors(username, email, password, confirmpassword){
    let errors =[];
        //check if fields are not empty
    if(username ==='' || username == null){
        errors.push('Username is required');
        username_input.parentElement.classList.add('incorrect');
    }

    if(email ==='' || email == null){
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    }
    if(password ==='' || password == null){
        errors.push('password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    //check for password length
    if(password.length < 6){
        errors.push("Your password is too short.");
        password_input.parentElement.classList.add('incorrect');
    }

    //check if both password inputs are congruent. 
    if(password !== confirmpassword){
        errors.push('The two passwords do not match.');
        password_input.parentElement.classList.add('incorrect');
        confirmpassword_input.parentElement.classList.add('incorrect');

    }
    return errors; 
}

//form validation for the login page
function getLoginFormErrors(username, password){

     //check if fields are not empty
     if(username ==='' || username == null){
        errors.push('Username is required');
        username_input.parentElement.classList.add('incorrect');
    }

    if(password ==='' || password == null){
        errors.push('password is required');
        password_input.parentElement.classList.add('incorrect');
    }

}

//array for all inputs from the form, empty values get filtered out, making the event listener usable for both login and sign up pages
const allInputs = [username_input, email_input, password_input, confirmpassword_input].filter(input => input != null);


//removes the error status for an empty input

allInputs.forEach(input =>{

    input.addEventListener('input', ()=>{
            //gives every input element an event listener
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorect');
            error_message.innerText = ''; 
        }

    }
    )

}

)
