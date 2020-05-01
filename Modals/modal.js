$(document).ready(function(){
    $("#preAuthentication").modal('show');
});
function validateLoginForm() {
  var email  = document.getElementById("loginemail").value;
  var password= document.getElementById("loginpassword").value;
  var valid = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  var invalid=false;
  if (valid.test(email) !== true) {
    invalid=true;
    $(".invalidemailAlert").show();
    setTimeout(function(){
      $(".invalidemailAlert").hide(); 
    }, 5000);

  }
if (email == "" ||password == ""){
  invalid=true;
  $(".successAlert").hide();
  $(".errorAlert").show();
  setTimeout(function(){
    $(".errorAlert").hide(); 
  }, 5000);

return false;
}
if(invalid===false) { 
  $(".errorAlert").hide();
  $(".successAlert").show();
  setTimeout(function(){
    $(".successAlert").hide(); 
  }, 5000);

}
}

function validateSignUpForm() {
    var email  = document.getElementById("email").value;
    var password= document.getElementById("password").value;
    var mobile = document.getElementById("mobile").value;
    var birthdate = document.getElementById("birthdate").value;
    var invalid=false
       
        if (email == "" || password == ""||mobile==""||birthdate==""){
           invalid=true
           $(".successAlert").hide();
           $(".errorAlert").show();
           setTimeout(function(){
                $(".errorAlert").hide(); 
           }, 5000);

           return false;
        }
        if(invalid===false) { 
          $(".errorAlert").hide();
          $(".successAlert").show();
          setTimeout(function(){
            $(".successAlert").hide(); 
          }, 5000);
        
        }
       
        //document.getElementsByClassName("progress-bar").style.width = "30%";

}
    
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
$(document).ready(function(){
  $('[data-toggle="popover"]').popover(); 
});

// Resposive Modal
$('.modal-content').resizable({
      //alsoResize: ".modal-dialog",
      minHeight: 300,
      minWidth: 300
    });
    $('.modal-dialog').draggable();

    $('#myModal').on('show.bs.modal', function() {
      $(this).find('.modal-body').css({
        'max-height': '100%'
      });
    });
   
   
    $(document).ready(function() {
      var width=(50);
      $('#progress-bar').css('width',width + "%");
      });

      
      
      