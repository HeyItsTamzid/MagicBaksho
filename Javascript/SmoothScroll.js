// SmoothScrolling
$("#showcaseBtn").click(function () {

  var jumpTo = $("#what-we-do");
  var new_position = $(jumpTo).offset();
  $('html, body').stop().animate({ scrollTop: new_position.top }, 1000);
  event.preventDefault();
});


$(".read-more, .orderNow").click(function () {

  var jumpTo = $("#contactUs");
  var new_position = $(jumpTo).offset();
  $('html, body').stop().animate({ scrollTop: new_position.top }, 1000);
  event.preventDefault();
});


$("#home").click(function () {

  var jumpTo = $("#showcase");
  var new_position = $(jumpTo).offset();
  $('html, body').stop().animate({ scrollTop: new_position.top }, 1000);
  event.preventDefault();
});

$("#about").click(function () {

  var jumpTo = $("#wrapper");
  var new_position = $(jumpTo).offset();
  $('html, body').stop().animate({ scrollTop: new_position.top }, 1000);
  event.preventDefault();
});

$("#price").click(function () {

  var jumpTo = $("#pricing");
  var new_position = $(jumpTo).offset();
  $('html, body').stop().animate({ scrollTop: new_position.top }, 1000);
  event.preventDefault();
});

$("#contact").click(function () {

  var jumpTo = $("#contactUs");
  var new_position = $(jumpTo).offset();
  $('html, body').stop().animate({ scrollTop: new_position.top }, 1000);
  event.preventDefault();
});