$('document').ready(() => $('#idea').keydown(function(e){
    if(e.which==13){
        console.log('entered');
        return false;
    }
}));
