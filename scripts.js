$(function(){
    // ОРИГИНАЛЬНЫЙ КОД SOPHIE (не трогаем!)
    setTimeout(function(){
        scrollTo(0,-1);
    },0);

    var i = 1;
    var t = 1;
    var imgt = 1;
    var down = 0;
    var timer = 0;

    $( "html,body" ).keypress(function( event ) {
      if ( event.which == 112 ) {
        $("html,body").animate({"scrollTop":30000},100000,"linear")
      }
      })

    $("html,body").scrollTop(0);

    /*

    $(window).bind('beforeunload',function(){

        $("html,body").scrollTop(0);

    });
    */


    $("img").width($(window).width());



    $(window).on("click",function(){
        
        if($(window).scrollTop() == 0){
            $("html,body").animate({"scrollTop":$(".viewport").height()})
        }
    })


    function init(){

        $("img").width($(window).width());
        // $(".viewport").height($(".viewport").height());
        console.log("a");

    }


    $(window).on("resize",function(){
        console.log("resize");
        init();
    });



    $(window).on("scroll",function(){

        var cur = $(window).scrollTop();
        
        //Image sizing

        if(t == 0 ){

            var math = cur - $(".viewport").height()*(i-1);
            $("img").height(math);

        }else{

            var math = $(".viewport").height()*(i)- cur;
            $("img").height(math);

        }

        //trigger

        if(cur > $(".viewport").height()*i){

                
            i++;
            togglePosition();
            $("html,body").height($("html,body").height()+$(".viewport").height())
        

        }

        //scrolling up

        if(cur + 5 < $(".viewport").height()*i - ($(".viewport").height())){
            
            i--;
            togglePosition();

            down = 1

        }

        //reset 

        if(cur <= 0){

            console.log("reset");
            
            $(".page.a").removeClass("a");
            $(".page").eq(0).addClass("a");
        }

        //change text

        

        if($("img").height() == $(".viewport").height() && cur > 10){
            
            if(timer == 0){

                timer = 1;
                text();
                setTimeout(function(){
                    timer = 0;
                },300)



            }
            

            

        }

        //alternate images

        if($("img").height() <= 0){
            
            if (imgt%2 == 0){

                $("img").hide().eq(1).show();

            }else{

                $("img").hide().eq(0).show();

            }

            imgt++;

        }

        

        $("#mc_embed_signup input").on("click",function(e){
            
            $(this).val("")
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                $("img").hide();
                $("ul#active").hide();
            }

            

        });
        
        
        $("input.email").on("focusout",function(e){
            
            $(this).val("Email Address")

            

        });

    });


    function togglePosition(){


        if (i%2 == 0){

            t = 0;
            $("img").css({"top":"auto","bottom":"0"});

        }else{

            t = 1;
            $("img").css({"top":"0","bottom":"auto"});
        
        }

    }

        
    function text(){

        if($(".page.a").next().length == 0){
            $(".page.a").removeClass("a");
            $(".page").eq(0).addClass("a");

        }else{
            $(".page.a").removeClass("a").next().addClass("a");
        }

    }

    // ================================================
    // ДОБАВЛЕННЫЙ КОД ДЛЯ СЕКРЕТНОЙ СТРАНИЦЫ
    // ================================================

    // Инициализация аудио
    var clickSound = document.getElementById('clickSound');
    
    // Функция для воспроизведения звука
    function playClickSound() {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(function(error) {
                console.log('Audio play failed:', error);
            });
        }
    }
    
    // Функция для анимации клика
    function animateClick(button) {
        $(button).addClass('clicked');
        setTimeout(function() {
            $(button).removeClass('clicked');
        }, 150);
    }
    
    // Переход на секретную страницу
    $('#goToSecret').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        playClickSound();
        animateClick(this);
        
        // Скрываем основную страницу, показываем секретную
        setTimeout(function() {
            $('.viewport').hide();
            $('.secret-page').show();
            // Останавливаем скролл эффект
            $(window).off('scroll');
        }, 200);
    });
    
    // Возврат с секретной страницы
    $('#goBack').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        playClickSound();
        animateClick(this);
        
        // Возвращаемся на основную страницу
        setTimeout(function() {
            $('.secret-page').hide();
            $('.viewport').show();
            // Восстанавливаем скролл эффект
            $(window).on('scroll', arguments.callee);
            // Сбрасываем скролл
            $("html,body").scrollTop(0);
            i = 1;
            t = 1;
        }, 200);
    });
    
    // Обработчики для кнопок с ссылками (кроме ME и BACK)
    $('.styled-btn:not(#goToSecret):not(#goBack)').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var link = $(this).data('link');
        
        playClickSound();
        animateClick(this);
        
        // Переход по ссылке с задержкой
        setTimeout(function() {
            if (link) {
                if (link.startsWith('http') || link.startsWith('https')) {
                    window.open(link, '_blank');
                } else if (link.startsWith('t.me')) {
                    window.open('https://' + link, '_blank');
                } else {
                    window.open('https://' + link, '_blank');
                }
            }
        }, 200);
    });
});
