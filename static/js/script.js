var idea = '';
var projectNames = ["Cya", "Cryptopedia with Alexa", "Hive Mind", "keypacitance ", "Seshat", "Wae FindAR", "Keychain", "Groupify", " Bionic Lazer", "ChowPal", "3D-Myosis", "Synaptic Gestures", "Recipe Finder", "Funky Fitness ", "Lagacetamol", ";Who is this?", "ARCHive", "Quintessence", "PoetryAndMe", "Crypto Collective", "The Page Turner", "Restrain Alert", "Tune-Chainz", "Cryptopedia"];
var showingProjects = false;

$('document').ready(() => {

  $('#idea').keydown(function(e){
    if(e.which==13){
      //console.log('entered idea');
      $('#idea').prop('disabled', true);
      $('#results').children().first().fadeOut('slow', function() {
        $(this).html('Analyzing these projects').fadeIn('slow');
        $('#results').children().fadeIn('slow');
      });

      showingProjects = true;
      var projectIndex = 0;
      function showProject() {
        projectIndex++;
        if (projectIndex >= projectNames.length) {
          projectIndex = 0;
        }
        $('#projectName').html(projectNames[projectIndex]);
        if (showingProjects) {
          window.setTimeout(showProject, 200);
        }
      }
      $('#projectName').html(projectNames[projectIndex]);
      window.setTimeout(showProject, 200);

      var bannerIndex = 12;
      function showBanner() {
        bannerIndex++;
        if (bannerIndex > 17) {
          bannerIndex = 12;
        }
        $('#banner').prop('src', '/static/img/' + bannerIndex.toString() + '.png');
        if (showingProjects) {
          window.setTimeout(showBanner, 500);
        }
      }
        $('#banner').prop('src', '/static/img/' + bannerIndex.toString() + '.png');
      window.setTimeout(showBanner, 500);

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
  console.log(response);
  showingProjects = false;
  $('#results').children().fadeOut('fast', function() {
    $(this).remove();
  });

  $('#idea').fadeOut('fast', function() {
    $(this).remove();
  });

  var highlightedWords = Object.keys(JSON.parse(response).keywords);
  //console.log(highlightedWords);

  var words = idea.split(' ');
  var sentence = '';
  words.forEach((word) => {
    var highlighted = false;
    highlightedWords.forEach((w) => {
      if (w === word) {
        highlighted = true;
      }
    });
    if (highlighted) {
      sentence += '<span class="blue-text">' + word + ' </span>';
    } else {
      sentence += word + ' ';
    }
  });
  $('#results').append('<h5>' + sentence + '</h5>');

  var similarProjects = JSON.parse(response).similar;
  if (similarProjects.length > 0) {
    $('#results').append('<h5 class="red-text">That\'s not an original idea</h5>');
  } else {
    $('#results').append('<h5 class="green-text">Your idea is good to go!</h5>');
  }

  similarProjects.forEach((proj) => {
    $('#results').append(`<div class="row center-align">
      <div class="col s1"></div>
      <div class="col s10">
        <div class="card blue-white">
          <div class="card-content black-text">
            <p>${proj.info}</p>
          </div>
          <div class="card-action">
            <a href="${proj.url}" target="_blank" class="blue-text">Find it on Devpost</a>
          </div>
        </div>
      </div>
      <div class="col s1"></div>
    </div>`);
  });

  $('#results').append('<a href="/">Try another idea</a>');

  /*
  var results = d3.select('#results');
  var svg = results.append('svg').attr('id', 'idea-animation');
  var words = idea.split(' ');
  var ideaText = svg.append('text')
    .attr('x', 200)
    .attr('y', 50)
  words.forEach((word) => {
      if (word === 'asdf') {
        ideaText.append('tspan')
          .attr('class', 'blue-text')
          .html(word);
      } else {
        ideaText.append('tspan')
          .html(word);
      }
    });
    */
}
