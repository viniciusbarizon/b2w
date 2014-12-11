function submenu(arrow_object) {
  var div_name = $(arrow_object).attr('data-submenu');

  if($(div_name).is(':visible')) {
    $(div_name).hide();
    arrow_object.attr("src","images/arrow_down.png");
  }
  else {
    $(div_name).show();
    arrow_object.attr("src","images/arrow_up.png");
  }
}
