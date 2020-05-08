$(document).ready(function () {
  $("#preAuthentication").modal('show');
});

const validateLoginForm = () => {
  let email = document.getElementById("loginemail").value;
  let password = document.getElementById("loginpassword").value;
  let valid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let invalid = false;

  if (email == "" || password == "") {
    invalid = true;
    $(".successAlert").hide();
    $(".errorAlert").show();
    setTimeout(function () {
      $(".errorAlert").hide();
    }, 5000);

    return false;
  }
  if (valid.test(email) !== true) {
    invalid = true;
    $(".invalidemailAlert").show();
    setTimeout(function () {
      $(".invalidemailAlert").hide();
    }, 5000);
    return false
  }
  return true;
}
const Login = () => {
  let email = document.getElementById("loginemail").value.toString();
  let password = document.getElementById("loginpassword").value.toString();
  if (validateLoginForm() == true) {
    fetch(`https://pinterest-clone-restful-api.herokuapp.com/api/User/Login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          email: email,
          password: password

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

const showSignUpErrorAlert = (message) => {
  let errorMessage = document.getElementById('errorMessage')
  errorMessage.innerText = message;
  $(".successAlert").hide();
  $(".errorAlert").show();
  setTimeout(function () {
    $(".errorAlert").hide();
  }, 5000);
}
function validateSignUpForm() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let birthdate = document.getElementById("birthdate").value;
  let profilePicUrl = document.getElementById("profilePicUrl").value;
  let valid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email == "" || password == "" || name == "" || birthdate == "" || profilePicUrl == "") {
    showSignUpErrorAlert('Please Fill required data.')
    return false;
  }
  else {
    if (valid.test(email) !== true) {
      showSignUpErrorAlert('Invalid Email')
      return false;
    }
    if (password.length < 8) {
      showSignUpErrorAlert('Short Password')
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
        $(".errorAlert").hide();
        $(".successAlert").show();
        setTimeout(function () {
          $(".successAlert").hide();
        }, 5000);
      })
      .catch((error) => {
        console.error('Error:', error);
        showSignUpErrorAlert(error)
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
      strength = "<small class='progress-bar bg-success' role='progressbar' style='width: 60%'>Strong</small>";
      break;

  }
  password_strength.innerHTML = strength;

}