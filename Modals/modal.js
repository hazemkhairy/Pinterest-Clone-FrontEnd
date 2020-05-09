$(document).ready(function () {
  $('.modal').modal({
    backdrop: 'static',
    keyboard: false
  })
  showModal('preAuthentication')


});
const showModal = (target) => {

  $("#preAuthentication").modal('hide');
  $("#Login").modal('hide');
  $("#SignUp").modal('hide');
  $(`#${target}`).modal('show');
}
function validateLoginForm() {
  let email = document.getElementById("loginemail").value;
  let password = document.getElementById("loginpassword").value;
  let valid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (email == "" || password == "") {
    showloginErrorAlert('Please Fill required data.')
    return false;
  }
  else {
    if (valid.test(email) !== true) {
      showloginErrorAlert('Invalid Email')
      return false;
    }
  }
  return true;
}

const Login = () => {
  let email = document.getElementById("loginemail").value.toString();
  let password = document.getElementById("loginpassword").value.toString();
  let obj = {
    email: email,
    password: password
  }
  if (validateLoginForm() == true) {
    fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/User/Login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.message == 'Login success') {
          $(".errorAlert").hide();
          $(".successAlert").show();
          setTimeout(function () {
            $(".successAlert").hide();
            window.location.replace("HomePage.html")
          }, 1000);
        }
        else
          showloginErrorAlert(data.message)
      })
      .catch((error) => {
        console.error('Error:', error);
        showloginErrorAlert(error)
      });

  }
}
const showErrorAlert = (message) => {
  let errorMessage = document.getElementById('errorMessage')
  errorMessage.innerText = message;
  $(".successAlert").hide();
  $(".errorAlert").show();
  setTimeout(function () {
    $(".errorAlert").hide();
  }, 5000);
}
const showloginErrorAlert = (message) => {
  let errorMessage = document.getElementById('errorloginMessage')
  errorMessage.innerText = message;
  $(".successAlert").hide();
  $(".errorLoginAlert").show();
  setTimeout(function () {
    $(".errorLoginAlert").hide();
  }, 5000);
}
function validateSignUpForm() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let birthdate = document.getElementById("birthdate").value;
  let profilePicUrl = document.getElementById("profilePicUrl").value;
  let valid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  var letters = /^[A-Za-z ]+$/;
  if (email == "" || password == "" || name == "" || birthdate == "" || profilePicUrl == "") {
    showErrorAlert('Please Fill required data.')
    return false;
  }
  else {
    if (valid.test(email) !== true) {
      showErrorAlert('Invalid Email')

      return false;
    }
    if (password.length < 8) {
      showErrorAlert('Short Password')

      return false;
    }
    if (letters.test(name) !== true) {
      showErrorAlert('Enter letters or space only in your name')
      return false;
    }
  }
  return true;

}
const SignUp = () => {
  let email = document.getElementById("email").value.toString();
  let password = document.getElementById("password").value.toString();
  let name = document.getElementById("name").value.toString();
  let birthdate = document.getElementById("birthdate").value.toString();
  birthdate = birthdate + 'T14:48:00.000Z'
  let profilePicUrl = document.getElementById("profilePicUrl").value.toString();
  let obj = {
    name: name,
    birthDate: birthdate,
    email: email,
    password: password,
    profilePicture: profilePicUrl
  }
  if (validateSignUpForm() == true) {
    fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/User/Register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.message == 'Registered successfully') {
          $(".errorAlert").hide();
          $(".successAlert").show();
          setTimeout(function () {
            $(".successAlert").hide();
          }, 5000);
        }
        else
          showErrorAlert(data.message)
      })
      .catch((error) => {
        console.error('Error:', error);
        showErrorAlert(error)
      });

  }
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
$(document).ready(function () {
  $('[data-toggle="popover"]').popover();
});


function isGood(password) {
  let password_strength = document.getElementById("password-text");

  //TextBox left blank.
  if (password.length == 0) {
    password_strength.innerHTML = "";
    return;
  }

  //Regular Expressions.
  let regex = new Array();
  regex.push("[A-Z]"); //Uppercase Alphabet.
  regex.push("[a-z]"); //Lowercase Alphabet.
  regex.push("[0-9]"); //Digit.
  regex.push("[$@$!%*#?&]"); //Special Character.

  let passed = 0;

  //Validate for each Regular Expression.
  for (let i = 0; i < regex.length; i++) {
    if (new RegExp(regex[i]).test(password)) {
      passed++;
    }
  }

  //Display status.
  let strength = "";
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
      strength = "<small class='progress-bar bg-success' role='progressbar' style='width: 80%'>Strong</small>";
      break;

  }
  password_strength.innerHTML = strength;

}