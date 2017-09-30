var play = false;
var score;
var trialsLeft;
var fruits= ['apple','banana','grapes','orange','peach','pineapple','pumpkin','raspberry','strawberry','tomato'];
var step;
var action;
var type;
var up;

$(function () {
    $("#start").click(function () {
        if (play) {
            location.reload();
            play = false;
        } else {
            score = 0;
            play = true;
            trialsLeft=3;
            $("#scorevalue").html(score);

            $("#gameOver").hide();

            $("#trialsLeftBox").show();
            addHearts();
            $("#start").html("Reset Game");
            startAction();
        }
    })

    $("#fruit1").mouseover(function () {
        score++;
        $("#scorevalue").html(score);
        document.getElementById("slice").play();

        clearInterval(action);
        $("#fruit1").hide("fold",200);

        setTimeout(startAction,250);
    })



    function addHearts() {
        $("#trialsLeftBox").empty();
        for(i=0;i<trialsLeft;i++){
            $("#trialsLeftBox").append('<img src="images/like.svg" class="hearts">');
        }
    }

    function startAction() {
        $("#fruit1").show();
        chooseFruits();
        type = Math.round(Math.random());
        up=true;

        if(type==0) {
            $("#fruit1").css({
                'left': Math.round(Math.random() * 600),
                'top': -80
            })
        }else{
            $("#fruit1").css({
                'left': -50,
                'top': 300
            })
        }

        // step= Math.round(Math.random()*6)+1;
        step=8;

        action = setInterval(function () {
            if(type==0) {
                $("#fruit1").css('top', $("#fruit1").position().top + step)

                if ($("#fruit1").position().top > $("#fruitContainer").height()) {
                    if (trialsLeft > 1) {

                        type = Math.round(Math.random());
                        up=true;

                        if(type==0) {
                            $("#fruit1").css({
                                'left': Math.round(Math.random() * 600),
                                'top': -80
                            })
                        }else{
                            $("#fruit1").css({
                                'left': -50,
                                'top': 300
                            })
                        }

                        // step = Math.round(Math.random() * 6) + 1;
                        step=8;

                        trialsLeft--;
                        addHearts();
                    } else {
                        play = false;
                        $("#start").html("Start Game");
                        $("#trialsLeftBox").hide();
                        $("#gameOver").show();
                        $("#gameOver").html("<p>Game Over</p><p>Your Score is " + score + "</p>");
                        $("#trialsLeftBox").hide();
                        stopAction();

                    }
                }
            }
            else{
                if($("#fruit1").position().top> 100 && up==true){
                    var n=1;
                    if($("#fruit1").position().top<250 && $("#fruit1").position().top>150){
                        n=2;
                    }else if ($("#fruit1").position().top<150 && $("#fruit1").position().top>120){
                        n=4;
                    }else if($("#fruit1").position().top<120){
                        n=8;
                    }
                    temp= step/n;
                    $("#fruit1").css('top', $("#fruit1").position().top - temp);

                    console.log($("#fruit1").position().top);

                    if((100-$("#fruit1").position().top)<step && $("#fruit1").position().top< 110){
                        up=false;
                    }
                }else{
                    var n=1;
                    if($("#fruit1").position().top<250 && $("#fruit1").position().top>150){
                        n=2;
                    }if ($("#fruit1").position().top<150 && $("#fruit1").position().top>120){
                        n=4;
                    }if($("#fruit1").position().top<120){
                        n=8;
                    }

                    $("#fruit1").css('top', $("#fruit1").position().top + step/n);
                }
                $("#fruit1").css('left', $("#fruit1").position().left + step);

                if ($("#fruit1").position().top > $("#fruitContainer").height() || $("#fruit1").position().left > $("#fruitContainer").width()) {
                    if (trialsLeft > 1) {

                        type = Math.round(Math.random());
                        up=true;

                        if(type==0) {
                            $("#fruit1").css({
                                'left': Math.round(Math.random() * 600),
                                'top': -80
                            })
                        }else{
                            $("#fruit1").css({
                                'left': -50,
                                'top': 300
                            })
                        }

                        // step = Math.round(Math.random() * 6) + 1;
                        step=8;

                        trialsLeft--;
                        addHearts();
                    } else {
                        play = false;
                        $("#start").html("Start Game");
                        $("#trialsLeftBox").hide();
                        $("#gameOver").show();
                        $("#gameOver").html("<p>Game Over</p><p>Your Score is " + score + "</p>");
                        $("#trialsLeftBox").hide();
                        stopAction();

                    }
                }
            }
        },24)
    }

    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide;

    }

    function chooseFruits() {
        var rand = Math.round(Math.random()*9);
        $("#fruit1").attr('src','images/'+ fruits[rand]+'.svg');
    }
});