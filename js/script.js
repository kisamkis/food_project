window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabsContent();
    showTabContent();

    tabsParent.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
                
            });
        }
    });


    //timer

    const deadline = '2022-09-14';
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //Date.parse() -  превращает в милисекунды
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor(t / (1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

// Функция, которая устанавливает таймер на страницу
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
              updateClock();
        // Функция для обновления часов
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML =  getZero(t.hours);
            minutes.innerHTML =  getZero(t.minutes);
            seconds.innerHTML =  getZero(t.seconds);
            if(t.total <= 0) {
                clearInterval(timeInterval);
                days.innerHTML = '0';
                hours.innerHTML = '0';
                minutes.innerHTML = '0';
                seconds.innerHTML = '0';
            }
        }
        function getZero(num) {
            if(num >= 0 && num < 10) {
                return `0${num}`;
            }else{
                return num;
            }
        }
    }
    setClock('.timer', deadline);

    // modal
    const modalTrigger = document.querySelectorAll('button[data-modal]'),
          modalClose = document.querySelector('[data-closeModal]'),
          modalWindow = document.querySelector('.modal');
    function modalActive(){
        document.body.style.overflow = 'hidden';
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        clearInterval(modalTimer);
    }
    modalTrigger.forEach(item => {
            item.addEventListener('click', () => {
                modalActive();
            });
    });

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }
    modalClose.addEventListener('click', closeModal);
    modalWindow.addEventListener('click', e => {
        if(e.target === modalWindow) {
            closeModal();
        }
    });
    document.addEventListener('keydown', e => {
        if(e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer = setTimeout(modalActive, 10000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 1) {
            modalActive();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    
});