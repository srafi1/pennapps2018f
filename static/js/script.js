var idea = '';
var projectNames = ["Cya", "Cryptopedia with Alexa", "Hive Mind", "keypacitance ", "Seshat", "Wae FindAR", "Keychain", "Groupify", " Bionic Lazer", "ChowPal", "3D-Myosis", "Synaptic Gestures", "Recipe Finder", "Funky Fitness ", "Lagacetamol", ";Who is this?", "ARCHive", "Quintessence", "PoetryAndMe", "Crypto Collective", "The Page Turner", "Restrain Alert", "Tune-Chainz", "Cryptopedia"];
var showingProjects = false;

$('document').ready(() => {

  $('#idea').keydown(function(e){
    if(e.which==13){
      console.log('entered idea');
      $('#idea').prop('disabled', true);
      $('#results').children().first().fadeOut('slow', function() {
        $(this).html('Analyzing your idea').fadeIn('slow');
      });
      $('#results').children().fadeIn();

      showingProjects = true;
      var projectIndex = 0;
      function showProject() {
        projectIndex++;
        $('#projectName').html(projectNames[projectIndex]);
        if (showingProjects) {
          window.setTimeout(showProject, 200);
        }
      }
      $('#projectName').html(projectNames[projectIndex]);
      window.setTimeout(showProject, 200);

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
  showingProjects = false;
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
