function displayTextToPreview(event) {
    $("#preview").html(marked(event.target.value));
    
    // update '#preview-container' height
    previewContainerStyle.height = $("#preview-container").css("height");
    
}

function toggleFullscreen() {
    let window = $(this).parent().parent();
    let oldStyle = ($(this).offsetParent().is("#editor-container")) ? editorContainerStyle : previewContainerStyle;
    let otherWindow = ($(this).offsetParent().is("#editor-container")) ? $("#preview-container") : $("#editor-container");
    const HEIGHT = ($(this).offsetParent().is("#editor-container")) ? "93vh" : "fit-content"
    const ANIMATE_TIME = 500;

    if ($(this).hasClass("fa-expand-alt")) {
        // window is minimized
        $(this).removeClass("fa-expand-alt");
        $(this).addClass("fa-compress-alt");

        // maximize window
        window.animate({
            height: HEIGHT,
            width: "100%"
        }, ANIMATE_TIME);

        // hide other window
        if (otherWindow.is("#preview-container")) {
            otherWindow.fadeOut(ANIMATE_TIME);
        } else {
            otherWindow.slideUp(ANIMATE_TIME);
        }

    } else if ($(this).hasClass("fa-compress-alt")) {
        // window is maximized
        $(this).removeClass("fa-compress-alt");
        $(this).addClass("fa-expand-alt");

        // minimize window
        window.animate(oldStyle, ANIMATE_TIME);

        // show other
        if (otherWindow.is("#preview-container")) {
            otherWindow.fadeIn(ANIMATE_TIME);
        } else {
            otherWindow.slideDown(ANIMATE_TIME);
        }
    }
}

const editorContainerStyle = {
    height: $("#editor-container").css("height"),
    width: $("#editor-container").css("width")
};

const previewContainerStyle = {
    height: $("#preview-container").css("height"),
    width: $("#preview-container").css("width")
};

$("#editor").on("input", displayTextToPreview);

// listen for click events
$(".toggle-fullscreen").click(toggleFullscreen);