function main(){
    fetch('json/data_index.json')
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
                }
            },
            mouseleave:function(){
                $(this).find('div').stop().slideUp(150);
                $('.backwhite').removeClass('white');
            }
        })

        // 헤더 미니 팝업
        $('.minipop span').click(function(){
            $('.minipop').remove();
        });

        // 피자 목록
        let pzList='';
        const pizza = document.querySelector('.pizza ul');
        data.pizza.forEach(function(v){
            pzList += `<li>
                            <figure>
                                <figcaption>${v.title}</figcaption>
                                <h2>${v.name}</h2>
                                <p><img src="${v.img}"></p>
                            </figure>
                            <article>
                                <div>
                                    <span>L</span>
                                    <span>${v.price}</span>
                                    <span>${v.orig}</span>
                                </div>
                                <h2>배달25%</h2>
                                <button></button>
                            </article>
                        </li>`
        })
        pizza.innerHTML = pzList;


        // 배너 슬라이더
        $('.autoplay').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: true, infinite: true, 
            autoplay: true,
            autoplaySpeed: 1000,
            vertical: true
        });

        //장바구니 숫자
        const cartNum = document.querySelector('.cart button'),
            cartAddBtn = document.querySelectorAll('.pizza ul li article button');
        let i=0, b=1;
        
        for(i=0; i<cartAddBtn.length; i++){
            cartAddBtn[i].addEventListener('click',function(){
                // 피자 등장
                $('.order').hide(); 
                $('.basket').fadeIn(500);
                $('.basket h2 span').css({opacity:'1'}); //추천메뉴는~
                $('.delivery').fadeIn(700);     //포장배달 주문하기
    
                // 장바구니 담기
                cartNum.style.display = 'block';
                if(cartNum.textContent == '9'){
                    alert('피자는 최대 9판, 팬피자 최대 4판, 사이드 & 음료 최대 10개까지 가능합니다. 단체주문은 080-500-5588로 문의주시기 바랍니다.'); return;
                }
                cartNum.textContent = b++;
            });
        }



        

    }
};
window.onload = main;