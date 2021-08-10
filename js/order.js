function sub(){
    fetch('json/data_order.json')
    .then( res => res.json() )
    .then( data => callback(data)  );

    function callback(data){

        // 헤더 버거메뉴
        const menuBtn = document.querySelector('.my a:nth-of-type(3)'), //버거버튼
        subMenu = document.querySelector('.submenu > div'), //버거 내용
        subWhite = document.querySelector('.submenu > p'), //버거 흰배경
        subBlack = document.querySelector('header'); //버거 검정배경

        menuBtn.addEventListener('click', function(){
            if(menuBtn.classList.contains('active')){
                menuBtn.classList.remove('active');
                subMenu.classList.remove('active');
                subWhite.classList.remove('active');
                subBlack.classList.remove('black');

            }else{
                menuBtn.classList.add('active');
                subMenu.classList.add('active');
                subWhite.classList.add('active');
                subBlack.classList.add('black');
            }
            
        });


        //헤더 미니메뉴
        $('.menu ul:nth-of-type(1) li').on({
            mouseenter:function(){
                $(this).find('div').stop().slideDown(550);
                if( $(this).children().length == 2){
                    $('.backwhite').addClass('white');
                }
            },
            mouseleave:function(){
                $(this).find('div').stop().slideUp(150);
                $('.backwhite').removeClass('white');
            }
        })

        
        let tpList='', sdList='', drList='', infoList='';

        const topping = document.querySelector('.topping ul');
        data.topping.forEach(function(t){
            tpList += `<li class="tplist">
                            <p><img src="${t.img}"></p>
                            <span>${t.name}</span>
                            <h3>${t.price}</h3>
                            <a><img src="img/chk_btn1.png"></a>
                        </li>`
        })
        topping.innerHTML = tpList;


        const side = document.querySelector('.side ul');
        data.side.forEach(function(s){
            sdList += `<li class="sdlist">
                            <figure>
                                <figcaption>${s.sale}</figcaption>
                                <p><img src="img/flag_arrow1.png"></p>
                            </figure>
                            <p><img src="${s.img}"></p>
                            <small>${s.name}</small>
                            <article>
                                <small>${s.orig}</small>
                                <h3>${s.price}</h3>
                            </article>
                            <div>
                                <button>-</button> <span>0</span> <button>+</button>
                            </div>
                        </li>`
        })
        side.innerHTML = sdList;


        const drink = document.querySelector('.drink ul');
        data.drink.forEach(function(d){
            drList += `<li class="drlist">
                            <p><img src="${d.img}"></p>
                            <span>${d.name}</span>
                            <h3>${d.price}</h3>
                            <div>
                                <button>-</button> <span>0</span> <button>+</button>
                            </div>
                        </li>`
        })
        drink.innerHTML = drList;


        $('.responsive').slick({
            dots: true, infinite: false,
            speed: 300, slidesToShow: 4, slidesToScroll: 4
        });

        const infoPop = document.querySelector('.facpop1 > div ul');
        data.tpinfo.forEach(function(i){
            infoList += `<li>
                            <p><img src="${i.img}"></p>
                            <article>
                                <h2>${i.name}</h2>
                                <small>${i.detail}</small>
                            </article>
                        </li>`
        })
        infoPop.innerHTML = infoList;
    }
};
window.onload = sub;