var timer;
var rightCountElement;
var totalCountElement;
var speedElement;
var totalCount = 0;
var rightCount = 0;
var startTime;
function TimerStartEvent() {
    var date = new Date();
    var delayTime = parseInt((date.getTime() - startTime) / 1000);
    timer.text(delayTime);
    totalCountElement.text(totalCount);
    rightCountElement.text(rightCount);
    speedElement.text(parseInt(rightCount * 60 / delayTime));
}
var isStarted = false;
function Init() {
    timer = $('#timer');
    rightCountElement = $('#rightCount');
    totalCountElement = $('#totalCount');
    speedElement = $('#speed');
    totalCount = 0;
    rightCount = 0;
    isStarted = true;
    startTime = new Date().getTime();
    setInterval(TimerStartEvent, 1000);
}
$(document).ready(function () {
    var inputTextbox = $('#inputword');
    var sourceElement = $('#sourceword');
    console.log("ready");
    var text = sourceElement.text();
    var cur = $('#currentword');
    var str = cur.text();
    var tmp = '';
    var isCorrect = true;
    var curi = 0; //当前词的索引号
    var date = new Date();
    var inputContent = [];



    //按键被按下时触发，用来识别退格键
    inputTextbox.keydown(function (event) {
        if (event.which == 8) {
            if (curi == 0) {
                return false;
            }
            if (curi > str.length + 1) {
                curi--;
            } else if (curi == str.length + 1) {
                if (cur.hasClass('incorrectword') == true) {
                    cur.removeClass('incorrectword');
                }
                curi--;
            } else {
                curi--;
                tmp = tmp.substring(0, tmp.lastIndexOf('<span'));
                cur.html(tmp + str.substring(curi, str.length));
            }
        }
        return true;
    });
    inputTextbox.keypress(function (data) {
        var k = String.fromCharCode(data.which);
        inputContent.push(new Date().getTime());

        totalCount++;

        if (isStarted == false) {
            Init();
        }
        if (data.which == 32) {
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
            str = cur.text();
            tmp = '';
            isCorrect = true;
            return;
        }
        if (curi >= str.length) {
            if (cur.hasClass('incorrectword') == false) {
                cur.addClass('incorrectword');
            }
            curi++;
        }
        if (k == str[curi]) {
            tmp = tmp + "<span class='correct'>" + str[curi] + "</span>";
            curi++;
            cur.html(tmp + str.substring(curi, str.length));
            rightCount++;

        } else if (curi < str.length) {
            tmp = tmp + "<span class='incorrect'>" + str[curi] + "</span>";
            curi++;
            cur.html(tmp + str.substring(curi, str.length));
            isCorrect = false;
        }
    });
});

