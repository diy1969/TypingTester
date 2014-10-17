

$(document).ready(function () {
    inputElement = $('#inputword');
    sourceElement = $('#sourceword');
    console.log("ready");
    var text = sourceElement.text();
    var i = 0;
    inputElement.keydown(function (data, fn) {
        var c = String.fromCharCode(data.keyCode);
        console.log(c);
        console.log(text[i]);
        if(c!=text[i])
            inputElement.css("background-color", "#D6D6FF");
        else
            inputElement.css("background-color", "#FFFFFF");
        i++;
    });
});

