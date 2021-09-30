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
            qtNum = document.querySelector('.quantity div span'),
            sideOrder = document.querySelector('.sideOrder'),
            drinkOrder = document.querySelector('.drinkOrder'),
            finalPrice = document.querySelector('.finalPrice');
        let sizeNum = 0, tpList='', sdList='', drList='', infoList='', qtCount = 1;
        let total = new Array();

        let basicWon = $('.size').children('figure.active').children('article').children('a').children('span:nth-of-type(2)');
        total.push( parseInt( $(basicWon).text().replace(/,/g , '')) )


        for( let z=0; z<sizeBtn.length; z++){
            sizeBtn[z].addEventListener('click',function(){
                sizeBtn[sizeNum].classList.remove('active');
                sizeBtn[z].classList.add('active');
                sizeNum = z;

                const sizeW = $(this).children('article').children('a').children('span:nth-of-type(2)');
                if( $(sizeBtn).hasClass != 'active') total.pop(this) ;
                total.push( parseInt( $(sizeW).text().replace(/,/g , '')) )

                setPrice()
            })
        }

        


        // 토핑 목록
        data.topping.forEach(function(t){
            tpList += `<li class="tplist">
                            <p><img src="${t.img}" alt=""></p>
                            <span>${t.name}</span>
                            <h3>${t.price}</h3>
                            <a><img src="img/chk_btn1.png" alt=""></a>
                        </li>`
        })
        topping.innerHTML = tpList;

        
        // 토핑 체크박스 이미지 변경 + 2개 이상 알람
        const tpBtn = document.querySelectorAll('.tplist a img');
        var tpChk = new Array();
        
        for( let ck=0; ck<tpBtn.length; ck++){
            tpBtn[ck].addEventListener('click',function(){
                let target = event.target;
                if( target.getAttribute('src') == 'img/chk_btn1.png' ){
                    tpChk.push( $(this).parent().index() )
                    if( tpChk.length > 2){
                        alert('토핑은 최대 2가지만 가능합니다.')
                        tpChk.pop()
                        return;
                    }
                    target.src = `img/chk_btn2.png`;
                    total.push( parseInt( $(this).parent().siblings('h3').text().replace(/,/g , '')) )

                }else{
                    tpChk.pop()
                    target.src = `img/chk_btn1.png`;
                    total.pop(this)
                }
                setPrice()
            })
        };


        // 피자 수량 선택 - + 버튼
        qtNum.textContent = `${qtCount}`
        var size1 = $('.size').children('figure:nth-of-type(1)').children('article').children('a').children('span:nth-of-type(2)').text(),
            size2 = $('.size').children('figure:nth-of-type(2)').children('article').children('a').children('span:nth-of-type(2)').text();

        qtPlus.addEventListener('click',function(){
            if( qtCount < 10){ 
                qtCount++
                if( qtCount > 9){
                    alert('피자는 최대 9판까지 가능합니다. 단체주문은 080-500-5588로 문의주시기 바랍니다.');
                    qtCount--;
                }

                qtNum.textContent = `${qtCount}`
                $('.pzNum').text( qtCount )
                if( $('.size').children('figure.active:nth-of-type(1)').hasClass('active') ){
                    total.push( parseInt( size1.replace(/,/g , '')) )
                }else{
                    total.push( parseInt( size2.replace(/,/g , '')) )
                }
            }
            setPrice()
        })

        qtMinus.addEventListener('click',function(){
            if( qtCount > 1 ){
                qtCount--;
                qtNum.textContent = `${qtCount}`;
                $('.pzNum').text( qtCount )
                total.pop(this)
                console.log( total)
            }
            qtNum.textContent = `${qtCount}`
            setPrice()
        })


        // 사이드 목록
        data.side.forEach(function(s){
            sdList += `<li class="sdlist">
                            <figure>
                                <figcaption>${s.sale}</figcaption>
                                <p><img src="img/flag_arrow1.png" alt=""></p>
                            </figure>
                            <p><img src="${s.img}" alt=""></p>
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

        // 소스&음료 목록
        data.drink.forEach(function(d){
            drList += `<li class="drlist">
                            <p><img src="${d.img}" alt=""></p>
                            <span>${d.name}</span>
                            <h3>${d.price}</h3>
                            <div>
                                <button>-</button> <span>0</span> <button>+</button>
                            </div>
                        </li>`
        })
        drink.innerHTML = drList;
        

        const sdMinus = document.querySelectorAll('.sdlist div button:nth-of-type(1)'),
            sdPlus = document.querySelectorAll('.sdlist div button:nth-of-type(2)');
        let sdNum = 0, sdCount = 0;

        const drMinus = document.querySelectorAll('.drlist div button:nth-of-type(1)'),
            drPlus = document.querySelectorAll('.drlist div button:nth-of-type(2)');
        let drNum = 0, drCount = 0;


        // 사이드 버튼 카운트
        for(let sd=0; sd<sdPlus.length; sd++ ){
            sdPlus[sd].addEventListener('click',function(){
                if( sdCount + drCount > 9){
                    alert('사이드 & 음료 최대 10개까지 가능합니다. 단체주문은 080-500-5588로 문의주시기 바랍니다.');
                    return;
                }
                if(sdCount < 10){
                    sdNum = Number( $(this).siblings('span').text() );
                    sdNum++;
                    $(this).siblings('span').text( sdNum );
                    sdCount++;
                    
                    let sideAddName = `<span>${data.side[$(this).parent().parent('li').index()].name}&nbsp;</span>`,
                        sdCo = sdCount - 1,
                        sdOtherNum = `<span>외 ${sdCo}개</span>`;

                    if( $(sideOrder).children().length == 0){
                        sideOrder.innerHTML = sideAddName
                    }else if($(sideOrder).children().length == 1) {
                        $(sideOrder).children().eq(0).after( $(sdOtherNum) );
                    }else{
                        $(sideOrder).children().eq(1).html(`<span>외 ${sdCo}개</span>`);
                    }
                    
                    //값 계산
                    var sideW = $(this).parent().siblings('article').children('h3');
                    total.push( parseInt( $(sideW).text().replace(/,/g , '') ) )
                }
                setPrice()
            })
            sdMinus[sd].addEventListener('click',function(){
                if(sdCount > 0){
                    sdNum = Number( $(this).siblings('span').text() );
                    
                    if( sdCount == '0') return;
                    if( sdNum == '0') return;
                    sdNum--;
                    sdCount--;

                    let sdCo = sdCount - 1;
                    $(sideOrder).children().eq(1).html(`<span>외 ${sdCo}개</span>`);

                    if( sdCount == 1){
                        $(sideOrder).children().eq(1).remove();
                    }else if( sdCount == 0 ){
                        $(sideOrder).children().remove();
                    }
                    $(this).siblings('span').text( sdNum );

                    //값 계산
                    total.pop(this)
                }
                setPrice()
            })
        }

        // 음료&기타 버튼 카운트

        for(let dr=0; dr<drPlus.length; dr++ ){
            drPlus[dr].addEventListener('click',function(){
                if( sdCount + drCount > 9){
                    alert('사이드 & 음료 최대 10개까지 가능합니다. 단체주문은 080-500-5588로 문의주시기 바랍니다.');
                    return;
                }
                if(drCount < 10){
                    drNum = Number( $(this).siblings('span').text() );
                    drNum++;
                    $(this).siblings('span').text( drNum );
                    drCount++;
                    
                    let drinkAddName = `<span>${data.drink[$(this).parent().parent('li').index()].name}&nbsp;</span>`,
                        drCo = drCount - 1,
                        drOtherNum = `<span>외 ${drCo}개</span>`;

                    if( $(drinkOrder).children().length == 0){
                        drinkOrder.innerHTML = drinkAddName
                    }else if($(drinkOrder).children().length == 1) {
                        $(drinkOrder).children().eq(0).after( $(drOtherNum) );
                    }else{
                        $(drinkOrder).children().eq(1).html(`<span>외 ${drCo}개</span>`);
                    }

                    //값 계산
                    var drinkW = $(this).parent().siblings('h3');
                    total.push( parseInt( $(drinkW).text().replace(/,/g , '') ) )
                }
                setPrice()
            })
            drMinus[dr].addEventListener('click',function(){
                if(drCount > 0){
                    drNum = Number( $(this).siblings('span').text() );
                    
                    if( drCount == '0') return;
                    if( drNum == '0') return;
                    drNum--;
                    drCount--;

                    let drCo = drCount - 1;
                    $(drinkOrder).children().eq(1).html(`<span>외 ${drCo}개</span>`);

                    if( drCount == 1){
                        $(drinkOrder).children().eq(1).remove();
                    }else if( drCount == 0 ){
                        $(drinkOrder).children().remove();
                    }
                    $(this).siblings('span').text( drNum );
                    total.pop(this)
                }
                setPrice()

            })
        }


        // 좌우 슬라이드
        $('.responsive').slick({
            dots: true, infinite: false,
            speed: 300, slidesToShow: 4, slidesToScroll: 4
        });



        const infoPop = document.querySelector('.facpop1 > div ul');
        // 토핑정보 팝업
        data.tpinfo.forEach(function(i){
            infoList += `<li>
                            <p><img src="${i.img}" alt=""></p>
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
        

        function sum(array) {
            var result = 0.0;
            for (var i = 0; i < array.length; i++)
              result += array[i];
            return result;
        }
        function setPrice(){
            $(finalPrice).text( sum(total).toLocaleString() )
        }
        setPrice()
        

    }
};
window.onload = sub;