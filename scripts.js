$(function(){
    // 1. Оригинальный скрипт скролла
    $("html,body").scrollTop(0);
    $("img").width($(window).width());
    
    var currentImg = 0;
    var scrolling = false;

    // Клик начинает скролл
    $(window).on("click", function(){
        if(!scrolling && $(window).scrollTop() == 0){
            scrolling = true;
            $("html,body").animate({
                scrollTop: $(window).height()
            }, 1000, function(){
                scrolling = false;
                // Переключаем на вторую страницу
                $(".page.a").removeClass("a");
                $(".page").eq(1).addClass("a");
                // Меняем картинку
                $("img").eq(currentImg).hide();
                currentImg = (currentImg + 1) % 2;
                $("img").eq(currentImg).show();
            });
        }
    });

    // 2. Форма email ведет на me.html со звуком
    $(".subscribe-btn").on("click", function(){
        // Воспроизводим звук
        var audio = document.getElementById("clickSound");
        audio.currentTime = 0;
        audio.play();
        
        // Переходим на me.html через 300ms
        setTimeout(function(){
            window.location.href = "me.html";
        }, 300);
    });

    // 3. Фокус на поле email
    $(".email-input").on("focus", function(){
        $(this).val("");
    });

    $(".email-input").on("blur", function(){
        if($(this).val() === "") {
            $(this).val("Email Address");
        }
    });
});
