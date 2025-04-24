$(function(){
    let score = 0;
    let count = 30;
    let kuppa = 1;
    let cloneID1,cloneID2,cloneID3,timer;
    let bgm;
    let se = new Audio("sound/小パンチ.mp3");
    let se2 = new Audio("sound/大パンチ.mp3");

    function getPosition(){
        return {
            //Math.random() 0~1の数字を返します。
            //Math.floor() 小数点以下切り捨て

            left: Math.floor(Math.random() * 800),
            top: Math.floor(Math.random() * 450)
        }
    }

    //キャラを増やす命令
    function appear(){
        //setInterval(やること,〇秒ごと);
        cloneID1 = setInterval(function(){
            //親要素に対して、何番目の要求かを指定する
            $('.chara:first-child')
            .clone()
            .appendTo('#stage')
            .css(getPosition())
            .animate({opacity:1},2000)
            .animate(getPosition(),7000)      
        },500);
    }

    function appear2(){
        //setInterval(やること,〇秒ごと);
        cloneID2 = setInterval(function(){
            $('.chara2:nth-child(2)')
            .clone()
            .appendTo('#stage')
            .css(getPosition())
            .animate({opacity:1},2000)
            .animate(getPosition(),7000)      
        },200);
    }

    function appear3(){
        //setInterval(やること,〇秒ごと);
        cloneID3 = setInterval(function(){
            $('.chara3:nth-child(3)')
            .clone()
            .appendTo('#stage')
            .css(getPosition())
            .animate({opacity:1},2000)
            .animate(getPosition(),7000)      
        },6000);
    }

    //キャラを叩いた時の命令
    $('#stage').on('click','.chara',function(){
        $(this)
        .css('background-position','bottom')
        .prop('disabled',true)
        .stop(true, false).animate({opacity:0},500,function(){
            $(this).remove();
        })
        se.play();
        score += 50 * kuppa;
        $('.score span').text(score);
    })

    $('#stage').on('click','.chara2',function(){
        $(this)
        .css('background-position','bottom')
        .prop('disabled',true)
        .stop(true, false).animate({opacity:0},500,function(){
            $(this).remove();
        })
        $('.score span').text(score);
    })

    $('#stage').on('dblclick','.chara3',function(){
        $(this)
        .css('background-position','bottom')
        .prop('disabled',true)
        .stop(true, false).animate({opacity:0},500,function(){
            $(this).remove();
        })
        se2.play();
        score += 150;
        kuppa = kuppa + 1;
        $('.score span').text(score);
    })

    $(".bgm_btn").click(function(){
        if(bgm.paused){
            bgm.play();
        }else{
            bgm.pause();
        }
    })

    //スタートボタンを押してゲームを始める命令
    $('#start').click(function(){
        appear();
        $(this).animate({opacity:0},300,function(){
            $(this).remove();
        });
        appear2();
        appear3();
        bgm = $('#bgm')[0];
        bgm.play();
        //タイムカウントスタート
        timer = setInterval(function(){
            if(count <= 0){
                clearInterval(timer);
                clearInterval(cloneID1);
                clearInterval(cloneID2);
                clearInterval(cloneID3);
                $('.chara').prop('disabled',true);
                $('.chara2').prop('disabled',true);
                $('.chara3').prop('disabled',true);
                bgm.pause();
                bgm = $('#試合終了のゴング')[0];
                bgm.play();
                endGame();
                // alert('スコアは' + score + 'です！')
            }else{
                count--;
                $('.count span').text(count);
            }
        },1000);
    })
    
    //ゲームが終わった後の処理
    function endGame(){
        let playerName = prompt(
            "ゲーム終了！名前を入力してください：",
            "プレイヤー"
        );
        //playerGameの中に文字があったら
        if(playerName){
            saveScore(playerName, score);
        }
        showRanking();
    }
    function saveScore(nameV, scoreV){
        console.log(`player:${nameV}/score:${scoreV}`);
        //ローカルストレージに保存
        //まずやるのは、今保存されてるデータの読み込み
        let rankings = JSON.parse(localStorage.getItem("rankings")) || [];
        rankings.push({name: nameV, score: scoreV});
        rankings.sort((a,b) => b.score - a.score); //ハイスコア順に並べる
        localStorage.setItem("rankings", JSON.stringify(rankings));
    }
    
    function showRanking(){
        let rankings = JSON.parse(localStorage.getItem("rankings")) || [];
        $("#rankingModal").show();
        let rankingHtml = "<h2>ランキング</h2><ul>"
        for(let i = 0; i < rankings.length;i++){
            rankingHtml += `<li>${i+1}. ${rankings[i]["name"]} : ${rankings[i]["score"]} </li>`;
        }
        rankingHtml += "</ul><button id='closeModal'>閉じる</button>"
        $(".modal-content").html(rankingHtml);
    }
    $(document).on("click", "#closeModal", function(){
        $("#rankingModal").fadeOut();
        location.reload();
    })
})

//JSON形式
//key : value
const hayama = [
    {
        name:"Tamaki",
        age:13,
        club:"Track and Field",
        favorite:{
            game:"スプラトゥーン",
            hobby:"ルービックキューブ",
        },
    },
    {
        name:"Rintaro",
        age:17,
        club:"Track and Field",
        favorite:{
            game:"妖怪ウォッチ",
            hobby:"リスニング",
        },
    },
];
    console.log(hayama[0]["age"]);
    console.log(hayama[1]["favorite"]["game"]);