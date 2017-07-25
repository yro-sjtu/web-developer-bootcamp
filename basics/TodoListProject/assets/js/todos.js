// Check off specific Todos By Clicking
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});

// Click on X to delete specific Todo
$("ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();//stop "event bubbling"
});

//
$("input[type='text']").keypress(function(event){
	if (event.which === 13) {
		// grabbling new todo text from input
		var todoText = $(this).val();
		$(this).val("");
		// create a new li and add to ul

		$("ul").append('<li><span><i class="fa fa-trash" aria-hidden="true"></i></span> ' + todoText +'</li>');
	}
});

$(".fa-plus").click(function(){
	$("input:text").fadeToggle();
});