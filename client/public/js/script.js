$(document).ready(() => {
  $('.button-collapse').toggle(() => {
    $(this).toggleClass('.collapsible');
  });

  $('select').material_select();
});
