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


        // 헤더 슬라이드 메뉴
        $('.menu ul li').on({
            mouseenter:function(){
                $(this).find('div').stop().slideDown(550);
                if( $(this).children().length == 2){
                    $('.backwhite').addClass('white');
                };
                if( $('.submenu > div').hasClass('active')){
                    $(this).find('div').stop().slideUp(150);
                    $('.backwhite').removeClass('white');
                }
            },
            mouseleave:function(){
                $(this).find('div').stop().slideUp(150);
                $('.backwhite').removeClass('white');
            }
        
        })

        // 헤더 빨간 미니 팝업
        $('.minipop span').click(function(){
            $('.minipop').remove();
        });


        const topping = document.querySelector('.topping ul'),
            side = document.querySelector('.side ul'),
            drink = document.querySelector('.drink ul'),
            sizeBtn = document.querySelectorAll('.size figure'),
            qtMinus = document.querySelector('.quantity button:nth-of-type(1)'),
            qtPlus = document.querySelector('.quantity button:nth-of-type(2)'),
            qtNum = document.querySelector('.quantity div span');
        let sizeNum = 0, tpList='', sdList='', drList='', infoList='', qtCount = 1;
        
        //사이즈 선택 버튼
        for( let z=0; z<sizeBtn.length; z++){
            sizeBtn[z].addEventListener('click',function(){
                sizeBtn[sizeNum].classList.remove('active');
                sizeBtn[z].classList.add('active');
                sizeNum = z;
                
            })
        }

        // 토핑 목록
        data.topping.forEach(function(t){
            tpList += `<li class="tplist">
                            <p><img src="${t.img}"></p>
                            <span>${t.name}</span>
                            <h3>${t.price}</h3>
                            <a><img src="img/chk_btn1.png"></a>
                        </li>`
        })
        topping.innerHTML = tpList;


        const tpBtn = document.querySelectorAll('.tplist a');

        for( let ck=0; ck<tpBtn.length; ck++){
            tpBtn[ck].addEventListener('click',function(){
                let target = event.target;
                if( target.getAttribute('src') == 'img/chk_btn2.png'){
                    target.src = `img/chk_btn1.png`; return;
                }
                target.src = `img/chk_btn2.png`
            })
        }

        // 피자 수량 선택 - + 버튼
        qtNum.textContent = `${qtCount}`

        qtMinus.addEventListener('click',function(){
            if( qtCount > 1 ){
                qtCount--;
                qtNum.textContent = `${qtCount}`;
            }
            qtNum.textContent = `${qtCount}`
        })

        qtPlus.addEventListener('click',function(){
            if( qtCount < 10){ 
                qtCount++
                if( qtCount > 9){
                    alert('피자는 최대 9판까지 가능합니다. 단체주문은 080-500-5588로 문의주시기 바랍니다.');
                    qtCount--;
                }
                qtNum.textContent = `${qtCount}`
               
            }
        })


        // 사이드 목록
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

        const sdMinus = document.querySelectorAll('.sdlist div button:nth-of-type(1)'),
            sdPlus = document.querySelectorAll('.sdlist div button:nth-of-type(2)');
        let sdCount = 0, sd = 0;

        // sideNum.textContent = `${sdCount}`;

        for(sd=0; sd<sdPlus.length; sd++ ){
            sdPlus[sd].addEventListener('click',function(){
                if(sdCount < 11){
                    sdCount++;
                    
                    if( sdCount > 10){
                        alert( 'ssss'); sdCount--;
                    }
                    $(this).siblings('span').text(sdCount)
                }
            })
            sdMinus[sd].addEventListener('click',function(){
                if(sdCount > 0){
                    sdCount--;
                    $(this).siblings('span').text(sdCount)
                }
            })
            
        }


        // 소스&음료 목록
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

        // 좌우 슬라이드
        $('.responsive').slick({
            dots: true, infinite: false,
            speed: 300, slidesToShow: 4, slidesToScroll: 4
        });


        const infoPop = document.querySelector('.facpop1 > div ul');
        // 토핑정보 팝업
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

        $('.facts button:nth-of-type(1)').click(function(){
            $('.facpop1').fadeIn(200)
            $('.facpop1').find('button').click(function(){
                $('.facpop1').fadeOut(100)
            })
        })

        $('.facts button:nth-of-type(2)').click(function(){
            $('.facpop2').fadeIn(200)
            $('.facpop2').find('button').click(function(){
                $('.facpop2').fadeOut(100)
            })
        })

        $('.facts button:nth-of-type(3)').click(function(){
            $('.facpop3').fadeIn(200)
            $('.facpop3').find('button').click(function(){
                $('.facpop3').fadeOut(100)
            })
        })

        $('.facts button:nth-of-type(4)').click(function(){
            $('.facpop4').fadeIn(200)
            $('.facpop4').find('button').click(function(){
                $('.facpop4').fadeOut(100)
            })
        })

        






        
        // final 네비 스크롤 내리면 고정
        const final = document.querySelector('.final'),
            footer = document.querySelector('footer');

        $(document).scroll(function() {
            if( ( $(window).scrollTop() + $(window).innerHeight()) >= $(footer).offset().top ){
                $(final).addClass('fixedOn')
            }else{
                $(final).removeClass('fixedOn')
            }
        });

    }
};
window.onload = sub;