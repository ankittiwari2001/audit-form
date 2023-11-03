
$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    $('#search').on('input', function(e){
        var searchField = $('#search').val();
        var expression = new RegExp(searchField, "i");

        // Clear previous results
        $("#result").html('');

        $.getJSON('data/WCAG-issue-Library.json', function(data) {
            data.forEach((value) => {
                if (value.Barrier_Summary.search(expression) != -1) {
                    $('#result').append(`<option value="${value.Barrier_Summary}" class="list-group-item link-class">${value.Barrier_Summary}</option>`);

                    // Automatically fill other form fields when a suggestion is clicked
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
        });
    });

    // Clear suggestions when an option is clicked
    $('#result').on('click', 'option', function() {
        $("#result").html('');
    });
});


// Dark Mode Button Click Handler
$('#darkModeButton').click(function () {
    $('body').toggleClass('dark-mode');
    $('#darkModeButton').attr("aria-pressed", $('body').hasClass("dark-mode"));
    });


// Function to clear all input fields
function clearFields() {
  document.getElementById("search").value = "";
  document.getElementById("BarrierType").value = "";
  document.getElementById("BarrierTest").value = "";
  document.getElementById("PageTitle").value = "";
  document.getElementById("url").value = "";
  document.getElementById("CodeSnippet").value = "";
  document.getElementById("Severity").value = "";
  document.getElementById("WcagGuideline").value = "";
  document.getElementById("Section").value = "";
  document.getElementById("Platform").value = "";
  document.getElementById("UsersAffected").value = "";
  document.getElementById("StepstoReproduce").value = "";
  document.getElementById("ActualResult").value = "";
  document.getElementById("ExpectedResult").value = "";
  document.getElementById("Recommendation").value = "";
  document.getElementById("Observation").value = "";
  document.getElementById("ScreenshotVideo").value = "";
  document.getElementById("ScreencastURL").value = "";
  document.getElementById("BarrierSource").value = "";
}

// function to the "Clear All Fields" button
document.getElementById("clearFieldsButton").addEventListener("click", clearFields);


const scriptURL = 'https://script.google.com/macros/s/AKfycbx2AzoN4GPBvsD8F1VUNWU99xZyeIm212UwkBclRa4MtdicK2j7rr38XHtRGadq3Ho3/exec'
const form = document.forms['audit-form']

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

