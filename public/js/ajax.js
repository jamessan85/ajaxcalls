    
$('#submitForm').submit(function(event){
    event.preventDefault();

    var formData = $('#submitForm').serialize();

    $.ajax({
        type: "POST",
        url: "/balls",
        data: formData,
    }).done(function(response) {
        console.log(response);
        $('#name').val('');
        $('#email').val('');
        })
})    
