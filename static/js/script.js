$('document').ready(() => $('#idea').keydown(function(e){
  if(e.which==13){
    console.log('entered');

    var text = $(this).val();

    $.ajax({
      url: "/search",
      type: "get",
      data: {jsdata: text},
      success: function(response) {
        console.log(response);
        $("#place_for_suggestions").html(response);
      },
      error: function(xhr) {
      }
    });
  };
}));
