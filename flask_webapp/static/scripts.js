// Javascript file 
$(document).ready(function () {
    $(".switch").on("click", function () {
      console.log("Switch clicked"); // Check if this logs
      $(".toggle-btn").toggleClass("active");
    });
  });
  