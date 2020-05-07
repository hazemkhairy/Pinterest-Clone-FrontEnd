$(document).ready(function(){
  $("#preAuthentication").modal('show');
});

const validateLoginForm=()=> {
var email  = document.getElementById("loginemail").value;
var password= document.getElementById("loginpassword").value;
var valid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
var invalid=false;

if (email == "" ||password == ""){
invalid=true;
$(".successAlert").hide();
$(".errorAlert").show();
setTimeout(function(){
  $(".errorAlert").hide(); 
}, 5000);

return false;
}
if (valid.test(email) !== true) {
invalid=true;
$(".invalidemailAlert").show();
setTimeout(function(){
  $(".invalidemailAlert").hide(); 
}, 5000);
return false
}
return true;
}
const Login=()=>
{
var email  = document.getElementById("loginemail").value.toString();
var password= document.getElementById("loginpassword").value.toString();
if(validateLoginForm()==true)
{
fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/User/Login`,
  {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({

        email:email,
        password:password
      
    })
  }).then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
}
function validateSignUpForm() {
  var email  = document.getElementById("email").value;
  var password= document.getElementById("password").value;
  var name = document.getElementById("name").value;
  var birthdate = document.getElementById("birthdate").value;
  var profilePicUrl = document.getElementById("profilePicUrl").value;
  var invalid=false
  var valid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (email == "" || password == "" || name=="" || birthdate=="" || profilePicUrl=="")
      {
         invalid=true
         $(".successAlert").hide();
         $(".errorAlert").show();
         setTimeout(function(){
              $(".errorAlert").hide(); 
         }, 5000);
         return false;
      }
      else
      {
      if (valid.test(email) !== true) {
        invalid=true;
        $(".invalidemailAlert").show();
        setTimeout(function(){
          $(".invalidemailAlert").hide(); 
        }, 5000);
        return false;
      }
      if(password.length<8)
      {
        invalid=true;
        $(".shortpasswordAlert").show();
        setTimeout(function(){
          $(".shortpasswordAlert").hide(); 
        }, 5000);
        return false;
      }
     
    }
    return true;
   
}
const SignUp=()=> {
  var email  = document.getElementById("email").value.toString();
  var password= document.getElementById("password").value.toString();
  var name = document.getElementById("name").value.toString();
  var birthdate = document.getElementById("birthdate").value.toString();
  var birthdate = birthdate+'T14:48:00.000Z'
  var profilePicUrl = document.getElementById("profilePicUrl").value.toString();
 validateSignUpForm();
if(validateSignUpForm()==true)
{
  fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/User/Register`,
  {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
      name:name,
      birthDate:birthdate,
      email:email,
      password:password,
      profilePicture:profilePicUrl
    })
   
    
  }).then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    $(".errorAlert").hide();
    $(".successAlert").show();
    setTimeout(function(){
      $(".successAlert").hide(); 
    }, 5000);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
}
}

$(function () {
$('[data-toggle="tooltip"]').tooltip()
})
$(document).ready(function(){
$('[data-toggle="popover"]').popover(); 
});

  // Resposive Modal
  // $('.modal-content').resizable({
  //       //alsoResize: ".modal-dialog",
  //       minHeight: 300,
  //       minWidth: 300
  //     });
  // $('.modal-dialog').draggable();

  // $('#myModal').on('show.bs.modal', function() {
  //   $(this).find('.modal-body').css({
  //     'max-height': '100%'
  //   });
  // });
 
 
 
  function isGood(password) {
    var password_strength = document.getElementById("password-text");

    //TextBox left blank.
    if (password.length == 0) {
      password_strength.innerHTML = "";
      return;
    }

    //Regular Expressions.
    var regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*#?&]"); //Special Character.

    var passed = 0;

    //Validate for each Regular Expression.
    for (var i = 0; i < regex.length; i++) {
      if (new RegExp(regex[i]).test(password)) {
        passed++;
      }
    }

    //Display status.
    var strength = "";
    switch (passed) {
      case 0:
      case 1:
      case 2:
        strength = "<small class='progress-bar bg-danger' role='progressbar' style='width: 20%'>Weak</small>";
        break;
      case 3:
        strength = "<small class='progress-bar bg-warning' role='progressbar' style='width: 40%'>Medium</small>";
        break;
      case 4:
        strength = "<small class='progress-bar bg-success' role='progressbar' style='width: 60%'>Strong</small>";
        break;

    }
    password_strength.innerHTML = strength;

  }