

$(document).ready(function () {
    inputElement = $('#inputword');
    sourceElement = $('#sourceword');
    console.log("ready");
    var text = sourceElement.text();
    var i = 0;
    var cur = $('#currentword');
    var str = cur.text().toLowerCase();
    var tmp = '';
    inputElement.keydown(function (data, fn) {
        var k = String.fromCharCode(data.keyCode).toLowerCase();
        //console.log(data.keyCode);
        if (data.keyCode == 8) {
            i--;
            return;
        }
        if (k == str[i]) {
            tmp = tmp + "<span class='correct'>" + str[i] + "</span>";
            i++;
            cur.html(tmp + str.substring(i, str.length));
        }
        if (data.keyCode == 32) {
            i = 0;
            cur.removeAttr('id');
            cur.addClass('correctword');
            cur.html(str);
            cur = cur.next();
            cur.attr('id', 'currentword');
            str = cur.text().toLowerCase();
            tmp = '';
        }
    });
});

