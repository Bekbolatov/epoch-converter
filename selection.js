$(document).ready(function() {
    $('body').append('<div id="ec-bubble"><div id="ec-bubble-text"></div></div>');
    
    $(document).click(function() {
        hideBubble();
    });
   
    $('#ec-bubble').click(function() {
        event.stopPropagation();
    });

	$(document).dblclick(function(e) {
       processSelection(e);
	});
	
	$(document).bind('mouseup', function(e) {
        processSelection(e);
	});

});

function processSelection(e) {	
    let text = getSelectedText();

    if ((text.length == 10 || text.length == 13) && $.isNumeric(text)) {
        if (text.length == 13) {  // Handle millisecond timestamps
            text = text / 1000;
        }
        let humanReadableDate = convertTimestamp(text);
        showBubble(e, humanReadableDate);        
    }
}

function getSelectedText() {
	var text = "";
	
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
	
	return text;
}

function convertTimestamp(ts) {
    ts = ts * 1000;
	let date = new Date(ts).toString();
	let index = /\d+:\d+:\d+/.exec(date).index;
    let u1 = date;

    date = new Date(ts).toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    let u2 = date;

    return ['<font color="gray"><i>' + u1 + '</i></font><br><b>Seattle: ' + u2 + '</b>']
}

function showBubble(e, text) {
    $('#ec-bubble').css('top', e.pageY + 20 + 'px').css('left', e.pageX - 85 + 'px').css('visibility', 'visible');
    $('#ec-bubble-text').html(text);
}

function hideBubble() {
    $('#ec-bubble').css('visibility', 'hidden');
    $('#ec-bubble-text').html("");
}


