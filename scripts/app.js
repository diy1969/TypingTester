

$(document).ready(function () {
    inputElement = $('#inputword');
    sourceElement = $('#sourceword');
    console.log("ready");
    var text = sourceElement.text();
    var cur = $('#currentword');
    var str = cur.text().toLowerCase();
    var tmp = '';
    var isCorrect = true;
    var curi = 0;   //当前词的索引号
    var inputContent = [];
    inputElement.keydown(function (data, fn) {
        var k = String.fromCharCode(data.keyCode).toLowerCase();
        inputContent.push(data.keyCode);
        console.log(inputContent);
        if (data.keyCode == 8) {
            if (curi == 0) {
                var items = $('.lastword');
                var last = items.last();
                cur.removeAttr('id');
                last.attr('id', 'currentword');
                str = cur.text().toLowerCase();
                tmp = '';
                isCorrect = true;
            }
            curi--;
            tmp = tmp.substring(0, tmp.lastIndexOf('<span'));
            cur.html(tmp + str.substring(curi, str.length));
            return;
        }

        if (data.keyCode == 32) {
            curi = 0;
            cur.removeAttr('id');
            cur.addClass('lastword');
            cur.removeClass('nextword');
            if (tmp.lastIndexOf('incorrect') > -1) {
                cur.addClass('incorrectword');

            } else {
                cur.addClass('correctword');
            }
            cur.html(str);
            cur = cur.next();
            cur.attr('id', 'currentword');
            str = cur.text().toLowerCase();
            tmp = '';
            isCorrect = true;
            return;
        }

        if (k == str[curi]) {
            tmp = tmp + "<span class='correct'>" + str[curi] + "</span>";
            curi++;
            cur.html(tmp + str.substring(curi, str.length));
        } else {
            tmp = tmp + "<span class='incorrect'>" + str[curi] + "</span>";
            curi++;
            cur.html(tmp + str.substring(curi, str.length));
            isCorrect = false;
        }
        console.log(tmp);
    });
});

