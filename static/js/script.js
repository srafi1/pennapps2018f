$(document).ready(function(){
  const numBanners = 6;
  var bannerNum = 12;
  var showLoadingAnim = true;
  var banner = document.getElementById("banner");

  var projName = document.getElementById("projName");
  var titles = [];

  $.ajax({
    url: "/getTitles",
    type: "get",
    success: function(response) {
      titles = $.parseJSON(response);
    },
  });

  function updateBanner(){
    bannerNum++;
    if(bannerNum > 11+numBanners){
      showLoadingAnim = false;
    }

    if(showLoadingAnim){
      banner.src="../static/img/" + bannerNum.toString() + ".png";
    }
  }

  var titleNum = 0;

  function cycleTitles(){
    if(showLoadingAnim){
      projName.innerText = titles[titleNum];
      titleNum++;
    }
  }

  $('#idea').keydown(function(e) {
    if(e.which==13) {
      analyzer.style.visibility = "visible";
      setInterval(updateBanner, 2000);
      setInterval(cycleTitles, 2000*numBanners/titles.length);

      var text = $(this).val();

      $.ajax({
        url: "/search",
        type: "get",
        data: {jsdata: text},
        success: function(response) {
          $("#place_for_suggestions").html(response);
        },
        error: function(xhr) {
        }
      });
    };
  });
});
