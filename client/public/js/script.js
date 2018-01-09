$(document).ready(() => {
  $('.button-collapse').sideNav({
    menuWidth: 250, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });
  $(".dropdown-button").dropdown();
  $('.modal').modal();

  $('select').material_select();  
  		$(window).on(function(){
			$('.app').fadeOut('slow',
			function(){$(this).remove();});
    });
    $('ul.tabs').tabs();  
});
