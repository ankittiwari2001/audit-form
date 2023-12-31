// ------------------------ Filtering and autofilling code starts from here ------------------------ //

// Defined variables to store the selected WCAG guideline and Barrier Summary
var selectedGuideline = '';
var selectedBarrierSummary = '';


$(document).ready(function() {
  $.ajaxSetup({ cache: false });

  // Defined a variable to store the JSON data
  var jsonData = null;

  

    // Event handler for the "WCAG Guideline" input field
  $('#WcagGuideline').on('change', function() {
    var selectedGuideline = $(this).val();
    filterBarrierSummaries(selectedGuideline);
  });

  // Added an event handler for clearing the form when WCAG Guideline is cleared
  $('#WcagGuideline').on('input', function() {
    var selectedGuideline = $(this).val();
    if (selectedGuideline === "") {
        clearForm();
    }
  });

  // Function to clear all form fields
  function clearForm() {
    // Reset all form fields to their default or empty values
    $('#myForm')[0].reset();
    // clear any other elements, like the result dropdown, if needed
    $('#result').html('');
  }



  // Function to filter Barrier Summaries based on the selected WCAG guideline
  function filterBarrierSummaries(selectedGuideline) {
      $('#result').html('');
      jsonData.forEach((value) => {
          if (value.WCAG_Guideline === selectedGuideline) {
              $('#result').append(`<option value="${value.Barrier_Summary}" class="list-group-item link-class">${value.Barrier_Summary}</option>`);
          }
      });
  }

  // Function to populate unique WCAG guideline options
  function populateUniqueWcagGuidelines() {
      $('#wcagOptions').html('');
      var uniqueWcagGuidelines = [];
      jsonData.forEach((value) => {
          if (!uniqueWcagGuidelines.includes(value.WCAG_Guideline)) {
              uniqueWcagGuidelines.push(value.WCAG_Guideline);
              $('#wcagOptions').append(`<option value="${value.WCAG_Guideline}" class="list-group-item link-class">${value.WCAG_Guideline}</option>`);
          }
      });
  }

  // Fetch JSON data from the library
  $.getJSON('data/WCAG-issue-Library.json', function(data) {
      jsonData = data;
      populateUniqueWcagGuidelines();
  });

  

  // Event handler for the "search" input field
  $('#search').on('input', function(e) {
      var searchField = $(this).val();
      var expression = new RegExp(searchField, "i");
      $('#result').html('');
      jsonData.forEach((value) => {
          if (value.Barrier_Summary.search(expression) !== -1 ) {
              $('#result').append(`<option value="${value.Barrier_Summary}" class="list-group-item link-class">${value.Barrier_Summary}</option>`);
              // $('#WcagGuideline').val(value.WCAG_Guideline);
              selectedWcagGuideline = value.WCAG_Guideline; // Store the selected WCAG guideline

          }
      });
  });



  // Added an event handler for clearing the Barrier Summary field
  $('#search').on('input', function() {
    var searchField = $(this).val();
    if (searchField === "") {
        clearBarrierSummary();
    }
});

// Function to clear the Barrier Summary field
function clearBarrierSummary() {
    selectedBarrierSummary = ''; 
}

// Function to clear all form fields
function clearForm() {
    // Reset all form fields to their default or empty values
    $('#myForm')[0].reset();
    // Restore the selected WCAG guideline
    $('#WcagGuideline').val(selectedGuideline);
    // restore the selected Barrier Summary
    $('#search').val(selectedBarrierSummary);
    //  clear any other elements, like the result dropdown, if needed
    $('#result').html('');
}





  // Event handler for the "WcagGuideline" input field
  $('#WcagGuideline').on('change', function() {
      var selectedGuideline = $(this).val();
      filterBarrierSummaries(selectedGuideline);
  });

  // Clear suggestions when an option is clicked
  $('#result').on('click', 'option', function() {
      $("#result").html('');
  });
});

$(document).ready(function() {
  $.ajaxSetup({ cache: false });

  // Defined a variable to store the JSON data
  var jsonData = null;

  // Function to populate unique WCAG guideline options
  function populateUniqueWcagGuidelines() {
      $('#wcagOptions').html('');
      var uniqueWcagGuidelines = [];
      jsonData.forEach((value) => {
          if (!uniqueWcagGuidelines.includes(value.WCAG_Guideline)) {
              uniqueWcagGuidelines.push(value.WCAG_Guideline);
              $('#wcagOptions').append(`<option value="${value.WCAG_Guideline}" class="list-group-item link-class">${value.WCAG_Guideline}</option>`);
          }
      });
  }

  // Function to autofill other form fields based on the selected Barrier Summary
  function autofillFields(selectedBarrierSummary) {
      jsonData.forEach((value) => {
          if (value.Barrier_Summary === selectedBarrierSummary) {
              $('#BarrierTest').val(value.Barrier_Test);
              $('#BarrierType').val(value.Barrier_Type);
              $('#Severity').val(value.Severity);
              $('#WcagGuideline').val(value.WCAG_Guideline);
              $('#Section').val(value.Section);
              $('#Platform').val(value.Platform);
              $('#UsersAffected').val(value.Users_Affected);
              $('#ActualResult').val(value.Actual_Result);
              $('#ExpectedResult').val(value.Expected_Result);
              $('#Recommendation').val(value.Recommendation);
          }
      });
  }

  // Fetch JSON data from the library
  $.getJSON('data/WCAG-issue-Library.json', function(data) {
      jsonData = data;
      populateUniqueWcagGuidelines();
  });

  // Event handler for the "search" input field
  $('#search').on('change', function() {
      var selectedBarrierSummary = $(this).val();
      autofillFields(selectedBarrierSummary);
  });

  // Clear suggestions when an option is clicked
  $('#result').on('click', 'option', function() {
      $("#result").html('');
  });
});
 
//  ------------------------   ends here  ------------------------  // 



// Dark Mode Button Click Handler
$('#darkModeButton').click(function () {
    $('body').toggleClass('dark-mode');
    $('#darkModeButton').attr("aria-pressed", $('body').hasClass("dark-mode"));
    });




// ------------------------ Script for submitting for and showing success ,Message ---------------------------------- // 


// base URL for Google Apps Script
const baseUrl = 'https://script.google.com/macros/s/';

// mapping of form names to their respective script IDs
const scriptIds = {
  'form': 'AKfycby7WKyeLp-IMQF2TCtPS9XywqJes-heXxhuZQVQfRG9LCSH2EkvXzR2qQ7UKeoHIw_5mA',
  'form-1': 'AKfycbyUPwhGO3YE6lcqn6YizqbHsBKRHjpm8U7LAUBWnjor0XySRHeT_sYXAUw7FAd1eO9n',
  'form-2': 'AKfycbxUdvmM-lj-uQNX8c7cM_boyqjgihga12iXjutk5Nrw0bgBIFJQ5oBWssILSKsaBbWFcA', // added for advancedbyrtez 
  
};

const pathSegments = window.location.pathname.split('/').filter(segment => segment); 
const formName = pathSegments[pathSegments.length - 1];


// Construct the script URL based on the form name
const scriptURL = baseUrl + scriptIds[formName] + '/exec';

const form = document.forms['audit-form'];


form.addEventListener('submit', e => {
  e.preventDefault();
  
  const successMessage = document.getElementById('message');
  successMessage.innerHTML = '';
  successMessage.style.display = 'none';

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        successMessage.innerHTML = 'Thank you! Your form is submitted successfully.';
        successMessage.style.color = 'green';
        successMessage.style.display = 'block'; 
        form.reset(); 
      } else {
        alert('An error occurred while submitting the form.');
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
    });
});


// console.log('Script URL:', scriptURL);
// console.log('Path Segments:', pathSegments);
// ;



// ------------------------------------ End ----------------------------------- //



//bottom to top / top to bottom button 
var scrollButton = document.getElementById("scrollButton");
var scrollingToTop = true;

window.onscroll = function () {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
};

scrollButton.addEventListener("click", function () {
  if (scrollingToTop) {
    // Scroll to the top
    window.scrollTo(0, 0);
    scrollButton.innerHTML = "⇩"; 
  } else {
    // Scroll to the bottom
    window.scrollTo(0, document.body.scrollHeight);
    scrollButton.innerHTML = "⇧"; 
  }
  scrollingToTop = !scrollingToTop; 
});


$(document).ready(function(){
  // Function to clear all input fields
  $("#clearFieldsButton").on('click', () => {
    document.forms[0].reset();
    let clearToastEle=$("#form-clear-toast");
    let clearToast=new bootstrap.Toast(clearToastEle);
    clearToast.show();
    }); })