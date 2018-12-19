$( document ).ready(function() {

    //appends an "active" class to .popup and .popup-content when the "Open" button is clicked
    $(".open").on("click", function(){
        $(".popup-overlay, .popup-content").addClass("active");
    });

    //removes the "active" class to .popup and .popup-content when the "Close" button is clicked 
    $(".close, .popup-overlay").on("click", function(){
        $(".popup-overlay, .popup-content").removeClass("active");
    });


    $('#USArrow').on('click', function() {

        console.log("Clicked!");
        window.parent.document.getElementsByClassName("UpgradeScenario")[0].click();
        console.log();

    })
}