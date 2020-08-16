$(document).ready(()=>{
   
    $("#myform").submit((event)=>{
        event.preventDefault();
        if(!$('input[type="file"]').val()) {
            alert("please select file");
            return false;
         }
        
    });
    debugger;
    document.getElementById("one").onchange=function(){
        myFunction();
    }
    function myFunction() {
        var x = document.getElementById("one");
        var txt = "";
        if ('files' in x) {
            if (x.files.length < 2) {
                txt = "Select two or more files.";
                $(".progress").css('visibility', 'hidden');
                $(".mg").css('visibility', 'hidden');
                $(".progress-bar").css('width', '25%');
                $(".progress-bar").addClass("progress-bar-animated");
            }
            else if
                 (x.files.length >8 ) {
                    txt = "Select files lesser than 9.";
                    $(".progress").css('visibility', 'hidden');
                    $(".mg").css('visibility', 'hidden');
                    $(".progress-bar").css('width', '25%');
                    $(".progress-bar").addClass("progress-bar-animated");
                

            }
            
            
            else {
                var j = 1;
                $(".progress-bar").css('width', '25%');
                $(".mg").css('visibility', 'hidden');
                $(".progress").css('visibility', 'visible');
                $(".progress-bar").addClass("progress-bar-animated");
                setTimeout(() => {
                    $(".progress-bar").css('width', '100%');
                    $(".mg").css('visibility', 'visible');
                    txt += "<strong>" + "Selected Files:</strong><br>";
                    debugger;
                    for (var i = (x.files.length) - 1; i >= 0; i--) {
                        // txt += "<strong>" + (i + 1) + ". file</strong><br>";
                        var file = x.files[i];

                        if ('name' in file) {
                            txt += j + ". " + file.name + "<br>";
                            j++;
                        }


                    }
                    document.getElementById("demo").innerHTML = txt;
                    $(".progress-bar").removeClass("progress-bar-animated");
                }, 3000);



            }
        } else {
            if (x.value == "") {
                txt += "Select one or more files.";
            } else {
                txt += "The files property is not supported by your browser!";
                txt += "<br>The path of the selected file: " + x
                    .value; // If the browser does not support the files property, it will return the path of the selected file instead. 
            }
        }
        document.getElementById("demo").innerHTML = txt;
    }
    
    
});