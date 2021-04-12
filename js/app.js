$(document).ready(function () {

//*************************************************************************
//
//
//
//
//***********************************************************************/ 
  $("#emlBtn").on("click", function(e){ 
	  $(this).attr("class","searchBtnSelected bubble"); 
	  $("#phoneNmBtn").attr("class","searchBtnUnselected"); 
	  var typeOfSearch = '<input id="typeOfSearchip" class="form-control" type="text" name="email" placeholder="Enter an Email Address" />'+
     '<p class="error-msg">Please enter a valid email address</p>' + 
    '<button id="btn-search" onclick ="querySearchTerm(); return false;" class="btn btn-form-submit text-uppercase" data-valinput="email" type="submit">Go!</button>';

	  resetbtnValues(typeOfSearch); 

  });

  $("#phoneNmBtn").on("click", function(e){ 
	  $(this).attr("class","searchBtnSelected bubble");  
	  $("#emlBtn").attr("class","searchBtnUnselected"); 
	  
	  var typeOfSearch = '<input id="typeOfSearchip" class="form-control" type="text" name="number" placeholder="Enter a Phone Number" />'+
     '<p class="error-msg">Please enter a valid phone number</p>' + 
    '<button id="btn-search" class="btn btn-form-submit text-uppercase"  data-valinput="phoneNum" onclick ="querySearchTerm(); return false;" type="submit" >Go!</button>';
	  
	  resetbtnValues(typeOfSearch); 
  });
  

  
//*************************************************************************
//
//
//
//
//***********************************************************************/
  $('input[type="text"]').keypress(function (event) {
    email = $('input[type="text"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;

 

      if (x === true) {
        const proxyurl = "";
        const url =
          'https://ltv-data-api.herokuapp.com/api/v1/records.json?email=' + email;
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  });

});



function querySearchTerm(){ 
		localStorage.clear(); //Clears storage for next request
		// get data from html value,
		var inputValue = document.getElementById('btn-search').dataset.valinput;
		
		console.log(inputValue);
		
		if(inputValue == "email"){ 
			var email = $('input[type="text"]').val().toLowerCase();
			searchEmail(email)
			return true;
		}else{
            var phone = $('input[type="text"]').val().toLowerCase();
			searchPhoneNumber(phone)
			return true;
		}
		return false;
		
  }

    function resetbtnValues(typeOfSearch){
	  document.querySelector('input[type="text"]').parentNode.classList.remove("error");
	  $("#typeOfSearch").empty(); 
	  $("#typeOfSearch").append(typeOfSearch); 
  }

  

  function searchEmail(email){
   var x;
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
    } else {
      x = false;
    }
    callHerokuApi(x,"email=", email); 
  }

  function searchPhoneNumber(phonenumber){
     var x;
    regEx = /[0-9]{10}/;
    if (phonenumber.match(regEx)) {
      x = true;
    } else {
      x = false;
    } 
    callHerokuApi(x,"phone=", phonenumber);   
  }

  function callHerokuApi(x, type,  value){
    if (x === true) {
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
      const proxyurl = "";
      const url =
        'https://ltv-data-api.herokuapp.com/api/v1/records.json?' + type + value;
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          window.location.href = "result.html";
        })
        .catch((e) => console.log(e));
    } else if (x !== true) {
      document.querySelector('input[type="text"]').parentNode.classList.add("error");
    }

  }