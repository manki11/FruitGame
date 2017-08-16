var play = false;
var score;
var trialsLeft;
var fruits= ['apple','banana','grapes','orange','peach','pineapple','pumpkin','raspberry','strawberry','tomato'];
var step;
var action;

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
        $("#fruit1").css({
            'left': Math.round(Math.random()*600),
            'top':-80
        })

        step= Math.round(Math.random()*6)+1;

        action = setInterval(function () {
            $("#fruit1").css('top',$("#fruit1").position().top+step)

            if($("#fruit1").position().top > $("#fruitContainer").height()){
                if(trialsLeft > 1){

                    chooseFruits();
                    $("#fruit1").css({
                        'left': Math.round(Math.random()*600),
                        'top':-80
                    })

                    step= Math.round(Math.random()*6)+1;

                    trialsLeft--;
                    addHearts();
                }else{
                    play=false;
                    $("#start").html("Start Game");
                    $("#trialsLeftBox").hide();
                    $("#gameOver").show();
                    $("#gameOver").html("<p>Game Over</p><p>Your Score is "+score+"</p>");
                    $("#trialsLeftBox").hide();
                    stopAction();

                }
            }
        },12)
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