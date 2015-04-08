jQuery(function () {

   // On load display default view.
   $(document).ready(function(){
        // Default view is grid        
        AppOperations.displayGrid();
    });

/**
 * Gets selected display type. Changes active/enactive btns class.
 */
    $('.header-action').on("click", function(e){
        console.log("In header-action click");

        // If selected view is already active
        if($(this).hasClass("action-active"))
            return;

        // Remove active class from all other header actions
        $('.action-active').removeClass("action-active");

        // Add active class to this
        $(this).addClass("action-active");

        // Show selected display view
        AppOperations.showView(this.id);
    });   
});
