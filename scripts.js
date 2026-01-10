$(function(){
    // Упрощенная версия - только эффект скролла изображений
    setTimeout(function(){
        scrollTo(0,-1);
    },0);

    var currentPage = 0;
    var totalPages = $('.page').length;
    var isAnimating = false;

    $("html,body").scrollTop(0);

    // Настройка изображений
    $("img").width($(window).width());
    $("img").height($(window).height());

    // Клик для начала скролла
    $(window).on("click",function(e){
        if($(e.target).closest('.styled-btn').length === 0 && !isAnimating){
            if($(window).scrollTop() == 0){
                nextPage();
            }
        }
    })

    // Скролл колесиком/свайпом
    $(window).on("wheel touchmove", function(e){
        if(isAnimating) return false;
        
        var delta = e.originalEvent.deltaY || 
                   (e.originalEvent.touches ? 
                    e.originalEvent.touches[0].clientY - lastTouchY : 0);
        
        if(Math.abs(delta) > 10){
            if(delta > 0 && currentPage < totalPages - 1){
                nextPage();
            } else if(delta < 0 && currentPage > 0){
                prevPage();
            }
            return false;
        }
    });

    var lastTouchY = 0;
    $(window).on('touchstart', function(e){
        lastTouchY = e.originalEvent.touches[0].clientY;
    });

    function nextPage(){
        if(currentPage >= totalPages - 1 || isAnimating) return;
        
        isAnimating = true;
        currentPage++;
        
        // Анимация скролла
        $("html,body").animate({
            scrollTop: $(window).height() * currentPage
        }, 800, function(){
            isAnimating = false;
        });
        
        // Переключение страниц
        $(".page").removeClass("a");
        $(".page").eq(currentPage).addClass("a");
        
        // Эффект переключения изображений
        if(currentPage % 2 == 0){
            $("img").eq(0).show();
            $("img").eq(1).hide();
        } else {
            $("img").eq(0).hide();
            $("img").eq(1).show();
        }
    }

    function prevPage(){
        if(currentPage <= 0 || isAnimating) return;
        
        isAnimating = true;
        currentPage--;
        
        $("html,body").animate({
            scrollTop: $(window).height() * currentPage
        }, 800, function(){
            isAnimating = false;
        });
        
        $(".page").removeClass("a");
        $(".page").eq(currentPage).addClass("a");
        
        if(currentPage % 2 == 0){
            $("img").eq(0).show();
            $("img").eq(1).hide();
        } else {
            $("img").eq(0).hide();
            $("img").eq(1).show();
        }
    }

    function init(){
        $("img").width($(window).width());
        $("img").height($(window).height());
    }

    $(window).on("resize",function(){
        init();
    });

    // ================================================
    // ДОБАВЛЕННЫЙ КОД ДЛЯ КНОПОК
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
    
    // Переход на страницу ME
    $('#goToSecret').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        playClickSound();
        animateClick(this);
        
        // Переход через 200ms (для звука)
        setTimeout(function() {
            window.location.href = 'me.html';
        }, 200);
    });
    
    // Обработчики для кнопок с ссылками (кроме ME)
    $('.styled-btn:not(#goToSecret)').on('click', function(e) {
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
