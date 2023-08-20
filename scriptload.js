$(window).on('load', function () {
  setTimeout(function () {
    $('.loader').fadeOut('slow');
  }, 500);
  $('.loader').remove('slow');
});

$(".bg-top").parent().addClass('b-top');
$(".bg-bottom").parent().addClass('b-bottom');
$(".bg-center").parent().addClass('b-center');
$(".bg_size_content").parent().addClass('b_size_content');
$(".lazyload").parent().addClass('bg-size');
$(".lazyload.blur-up").parent().addClass('blur-up lazyload');

jQuery('.lazyload').each(function () {

  var el = $(this),
    src = el.attr('src'),
    parent = el.parent();

  parent.css({
    'background-image': 'url(' + src + ')',
    'background-size': 'cover',
    'background-position': 'center',
    'display': 'block'
  });

  el.hide();
});
