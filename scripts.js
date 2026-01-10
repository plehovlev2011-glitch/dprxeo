$(document).ready(function(){
    // 1. Настройка
    $("html,body").scrollTop(0);
    let currentPage = 0;
    let currentImg = 0;
    
    // 2. Клик по экрану - скролл и смена страниц
    $(window).on('click', function(){
        if($(window).scrollTop() === 0){
            // Скроллим вниз
            $('html,body').animate({scrollTop: $(window).height()}, 800);
            
            // Меняем страницу
            $('.page').removeClass('active');
            currentPage = (currentPage + 1) % 2;
            $('.page').eq(currentPage).addClass('active');
            
            // Меняем картинку
            $('#img' + (currentImg + 1)).hide();
            currentImg = (currentImg + 1) % 2;
            $('#img' + (currentImg + 1)).show();
        }
    });
    
    // 3. Кнопка SUBSCRIBE - переход на me.html со звуком
    $('.subscribe-btn').on('click', function(){
        // Звук
        $('#click-sound')[0].play();
        
        // Переход через 0.3 секунды
        setTimeout(function(){
            window.location.href = 'me.html';
        }, 300);
    });
    
    // 4. Фокус на поле email
    $('.email-input').on('focus', function(){
        $(this).val('');
    }).on('blur', function(){
        if($(this).val() === '') {
            $(this).val('Email Address');
        }
    });
});
