var idea = '';

$('document').ready(() => {

  $('#idea').keydown(function(e){
    if(e.which==13){
      console.log('entered idea');
      $('#idea').prop('disabled', true);
      $('#results').children().first().fadeOut('slow', function() {
        $(this).html('Analyzing your idea').fadeIn('slow');
      });
      $('#results').children().fadeIn();

      idea = $(this).val();

      $.ajax({
        url: "/search",
        type: "get",
        data: {jsdata: idea},
        success: animateIdea,
        error: function(xhr) {
        }
      });

      return false;
    };
  });
});

function animateIdea(response) {
  $('#results').children().fadeOut('fast', function() {
    $(this).remove();
  });

  var results = d3.select('#results');
  var svg = results.append('svg').attr('id', 'idea-animation');
  var words = idea.split(' ');
  var coloredSentence = '';
  words.forEach((word) => {
      if (word === 'asdf') {
        coloredSentence +=  '<span class="blue-text">' + word + '</span>';
      } else {
        coloredSentence +=  word;
      }
    });
  svg.append('text')
    .attr('x', 0)
    .attr('y', 50)
    .html(coloredSentence);
}
