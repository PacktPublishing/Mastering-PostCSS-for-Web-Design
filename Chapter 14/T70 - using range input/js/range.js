var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function(){
      $(this).next(value).html(this.value);
    });
  });
};


// DOM Ready
$(document).ready(function(){

  var el, newPoint, newPlace, offset;
 
  // Select all range inputs, watch for change
  $("input[type='range']").change(function() {
    el = $(this);
    width = el.width();
    newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));
     
    offset = -1.3;
     
    if (newPoint < 0) { newPlace = 0; }
    else if (newPoint > 1) { newPlace = width; }
    else { newPlace = width * newPoint + offset; offset -= newPoint; }
     
    el
      .next("output")
      .css({left: newPlace, marginLeft: offset + "%"})
      .text(el.val());
  }).trigger('change');

  rangeSlider();
});
