$(function(){
    setTimeout(function(){
        scrollTo(0,-1);
    },0);

    var i = 1;
    var t = 1;
    var imgt = 1;
    var down = 0;
    var timer = 0;
    
    // Переменные для карусели
    var currentSlide = 0;
    var totalSlides = $('.carousel-slide').length;
    var carouselTrack = $('.carousel-track');
    var carouselWidth = $('.horizontal-carousel').width();

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
    
    // Функция перехода по ссылке
    function navigateToLink(link) {
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
    }
    
    // Функция для карусели
    function updateCarousel() {
        var translateX = -currentSlide * 100;
        carouselTrack.css('transform', 'translateX(' + translateX + '%)');
        
        // Обновляем активную точку
        $('.dot').removeClass('active');
        $('.dot[data-slide="' + currentSlide + '"]').addClass('active');
    }
    
    // Обработчики для кнопок навигации
    $('.next-nav').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        playClickSound();
        animateClick(this);
        
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    $('.prev-nav').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        playClickSound();
        animateClick(this);
        
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    // Обработчики для точек
    $('.dot').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        playClickSound();
        animateClick(this);
        
        currentSlide = parseInt($(this).data('slide'));
        updateCarousel();
    });
    
    // Обработчик для кнопки ME (переход на секретную страницу)
    $('.me-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        playClickSound();
        animateClick(this);
        
        // Переключаем на секретную страницу
        setTimeout(function() {
            // Прокручиваем к началу
            $("html,body").scrollTop(0);
            
            // Показываем секретную страницу
            $('.page').removeClass('a');
            $('.secret-page').addClass('a');
            
            // Сбрасываем индексы для скролла
            i = 1;
            t = 1;
            
            // Обновляем высоту body для скролла
            $("html,body").height($(".viewport").height() * 3);
        }, 200);
    });
    
    // Обработчик для кнопки BACK
    $('.back-btn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        playClickSound();
        animateClick(this);
        
        // Возвращаемся на страницу с кнопками
        setTimeout(function() {
            $("html,body").scrollTop(0);
            $('.page').removeClass('a');
            $('.page').eq(1).addClass('a'); // Вторая страница с кнопками
            
            // Сбрасываем индексы
            i = 1;
            t = 1;
            $("html,body").height($(".viewport").height() * 3);
        }, 200);
    });
    
    // Обработчики для обычных кнопок (ссылки)
    $('.styled-btn:not(.me-btn):not(.back-btn)').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var link = $(this).data('link');
        
        playClickSound();
        animateClick(this);
        navigateToLink(link);
    });

    $("html,body").scrollTop(0);

    $("img").width($(window).width());

    $(window).on("click",function(e){
        // Проверяем, не кликнули ли по кнопке или элементам карусели
        if ($(e.target).closest('.styled-btn, .carousel-nav, .dot').length === 0) {
            if($(window).scrollTop() == 0){
                $("html,body").animate({"scrollTop":$(".viewport").height()})
            }
        }
    })

    function init(){
        $("img").width($(window).width());
        // Обновляем ширину карусели при ресайзе
        carouselWidth = $('.horizontal-carousel').width();
    }

    $(window).on("resize",function(){
        init();
    });

    $(window).on("scroll",function(){
        var cur = $(window).scrollTop();
        
        // Пропускаем логику скролла если на секретной странице
        if ($('.secret-page').hasClass('a')) {
            return;
        }
        
        //Image sizing
        if(t == 0){
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
            down = 1;
        }

        //reset 
        if(cur <= 0){
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
});
