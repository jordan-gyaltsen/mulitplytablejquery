// global variables
var slidemin = -50, slidemax = 50;

function newFunction() {
    // store the integer values of inputted entries into variables
    const colmin = parseInt(document.getElementById("colmin").value);
    const colmax = parseInt(document.getElementById("colmax").value);
    const rowmin = parseInt(document.getElementById("rowmin").value);
    const rowmax = parseInt(document.getElementById("rowmax").value);

    /* if a min value is greater than it's corresponding max value
    then update the errormessage element with the error message. */
    if (colmin >= colmax || rowmin >= rowmax) {
        const container = document.getElementById('errmsg');
        container.innerHTML = "Max value should be greater than Min value";
        // otherwise, with no input errors, proceed with table generation
    } else {
    // reset the table and error message elements for a new submssion.
    var table = document.getElementById('mytable');
    document.getElementById('errmsg').innerHTML = "";
    table.innerHTML = "";

    // starting index is rowmin - 1 for the first row
    // first row of the table is created for column hearders at row before rowmin. 
    for (var j = rowmin - 1; j <= rowmax; j++) {
        // for column header row:
        if (j == rowmin - 1) {
            // thead for gropuing th elements for a row            
            var tr = document.createElement("thead");
            /* create an empty td element to append to the row.
            first cell of each row is reserved for blank cell */
            var cell = document.createElement("td");
            cell.innerHTML = "";
            tr.appendChild(cell);
            /* loop, adding each column number from colmin-colmax
            as th elements to the very first (header) row */
            for (i = colmin; i <= colmax; i++) {
                var cell = document.createElement("th");
                cell.innerHTML = i;
                tr.appendChild(cell);
            }
        // now this is for all rows below top column header rowks
        } else {
            /* set the first/left cell of row to row header
            by creating a <th> to append to a newly made tr element*/
            var tr = document.createElement("tr");
            var cell = document.createElement("th");
            cell.innerHTML = j;
            tr.appendChild(cell);
            // all other td elements are the multiplied cells
            /* simply make a td element, set it's html value
            the product of the current col index and row index,
            then append it. */
            for (i = colmin; i <= colmax; i++) {
                var cell = document.createElement("td");
                cell.innerHTML = i*j;
                tr.appendChild(cell);
            }
        }
        /* after making each row element,
        append it to the table element in
        our html file*/
        table.appendChild(tr);
    }
}
    
}

$(document).ready(function testo() {
    //initialize the jquery tabs
    var tabs = $("div#tabs").tabs();

    // on click of the add tab button 
    $("button#add-tab").click(function() {
        newFunction()
        // number to use for the tab name and id
        var num_tabs = $("div#tabs ul li").length + 1;
        // title + close button
        $("div#tabs ul").append(
            "<li><a href='#tab" + num_tabs + "'>#" + num_tabs + "</a><button>X</button></li>"
        );
        // content which is the html code from the generated table
$       ("div#tabs").append(
            "<div id='tab" + num_tabs + "'>" + $("#result").html() + "</div>"
        );
        $("div#tabs").tabs("refresh");
        // on click of the close button
        tabs.on( "click", "button", function() {
            // gets the aria-controls value which is the only one with a straight up usable id name
            var tabnum = $( this ).closest( "li" ).remove().attr( "aria-controls" );
            $( "#" + tabnum ).remove();
            //refreshing the table
            tabs.tabs( "refresh" );
        });
        reloadStylesheets()
    });                    
});


$(document).ready(function($){
    // adds sliders with the set parameters
    $("#slider1").slider({
        min: slidemin,
        max: slidemax,
        slide: function(e, num){
            //sets the input value as the slider value
            $("#colmin").val(num.value);
            // rerenders the table
            newFunction()
        }
    });

    $("#slider2").slider({
        min: slidemin,
        max: slidemax,
        slide: function(e, num){
            $("#colmax").val(num.value);
            newFunction()
        }
    });

    $("#slider3").slider({
        min: slidemin,
        max: slidemax,
        slide: function(e, num){
            $("#rowmin").val(num.value);
            newFunction()
        }
    });

    $("#slider4").slider({
        min: slidemin,
        max: slidemax,
        slide: function(e, num){
            $("#rowmax").val(num.value);
            newFunction()
        }
    });

    //sets the slider value as the input value
    $("#colmin").change(function() {
        $("#slider1").slider("value", $("#colmin").val());
        newFunction()
    });

    $("#colmax").change(function() {
        $("#slider2").slider("value", $("#colmax").val());
        newFunction()
    });

    $("#rowmin").change(function() {
        $("#slider3").slider("value", $("#rowmin").val());
        newFunction()
    });

    $("#rowmax").change(function() {
        $("#slider4").slider("value", $("#rowmax").val());
        newFunction()
    });

}) 


$(document).ready(function(){
    $("#myform").validate({
        //constraints for each input
        rules : {
            colmin : {
                required: true,
                number: true,
                range: [slidemin, slidemax]
            },
            colmax : {
                required: true,
                number: true,
                range: [slidemin, slidemax]
            },
            rowmin : {
                required: true,
                number: true,
                range: [slidemin, slidemax]
            },
            rowmax : {
                required: true,
                number: true,
                range: [slidemin, slidemax]
            }
        },
        placeError : function(error, element){
            $(error).appendTo($("#myform"));
        }
    });
});