function main(){
    fetch('json/data_index.json')
    .then( res => res.json() )
    .then( data => callback(data)  );

    function callback(data){

        // 월쑤데이 팝업
        const todayPop = document.querySelector('.popup'),
            todayBtn = document.querySelector('.popup div button:nth-of-type(1)');

        todayBtn.onclick = function(){
            let date = new Date();
            date.setDate(date.getDate() + 1);
            document.cookie = 'MWpopup=close;expires=' + date.toUTCString();
            todayPop.style.display = 'none'
        };
        if(document.cookie.match('close')){
            todayPop.style.display = 'none'
        }else{
            todayPop.style.display = 'block'
        }

        $('.popup div button:nth-of-type(2)').click(function(){
            $('.popup').fadeOut(200);
        })


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


        // 피자 목록
        let pzList='';
        const pizzalist = document.querySelector('.pizza ul');
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
                                    <span>${v.price}원</span>
                                    <span>${v.orig}</span>
                                </div>
                                <h2>배달25%</h2>
                                <button></button>
                            </article>
                        </li>`
        })
        pizzalist.innerHTML = pzList;


        // 배너 슬라이더
        $('.autoplay').slick({
            slidesToShow: 3, slidesToScroll: 1,
            dots: true, infinite: true,  autoplay: true,
            autoplaySpeed: 1000, vertical: true
        });





        //피자 + 누르면 장바구니 숫자
        const cartNum = document.querySelector('.cart button'), //장바구니 위 버튼
            cartAddBtn = document.querySelectorAll('.pizza ul li article button'), //피자리스트 더하기(+) 버튼
            bkPizza = document.querySelector('.basket article'), //피자 글씨 & 큰사진
            deliList = document.querySelector('.deliList ul'), // 주문내역
            total = document.querySelector('.total'); //총금액
         let b=1, bkList='', bk = [];

        function createPizza(key){
            this.title = data.pizza[key].title;
            this.name = data.pizza[key].name;
            this.img = data.pizza[key].img;
            this.bgimg = data.pizza[key].bgimg;
            this.price = data.pizza[key].price;
            this.orig = data.pizza[key].orig;
            this.edge = data.pizza[key].edge;
            this.sale = data.pizza[key].sale;
            this.count = 0;
            this.total=0;
            this.tag = function(){
                    return `<li>
                            <p>${this.name}<b>(L)</b> ${this.count}개</p>
                            <small>
                                <span>엣지</span>
                                <span>${this.edge}</span>
                            </small>
                            <div>
                                <span>${this.orig}원</span>
                                <span>${this.sale}</span>
                                <span>${this.price}원</span>
                            </div>
                        </li>`;
            };
            this.update = function(){
                this.count += 1;
                this.total = parseInt(data.pizza[key].price.replace(/,/g , '')) ;
            }

        }
  
        let obj = [];
        data.pizza.forEach(function(v,k){
            obj.push(new createPizza(k));
        })


        for(let i=0; i<cartAddBtn.length; i++){
            cartAddBtn[i].addEventListener('click',function(e){
                $('.order').hide();             //기존 없애기
    
                // 장바구니 숫자 담기
                cartNum.style.display = 'block'
                if(cartNum.textContent == '9'){
                    alert('피자는 최대 9판, 팬피자 최대 4판, 사이드 & 음료 최대 10개까지 가능합니다. 단체주문은 080-500-5588로 문의주시기 바랍니다.'); return;
                }
                cartNum.textContent = b++;
                

                // 인덱스번호 맞춰서 해당 피자 내용
                bkList += `<div class="swiper-slide">
                                <h2>
                                    <span>내가 담은</span>
                                    <span>${data.pizza[i].name} L 1개</span>
                                </h2>
                                <figure>
                                    <p><img src="img/bg_cart_empty_400.png" alt=""></p>
                                    <p class="plate"><img src="${data.pizza[i].bgimg}" alt=""></p>
                                </figure>
                            </div>`
                bkPizza.innerHTML = bkList;

                $('.basket').fadeIn(500);  // 피자 등장
                $( '.basket > div:nth-of-type(1) article > div h2' ).animate( { opacity: '1' },10);  // 내가 담은
                $('.basket > div:nth-of-type(1) article > div h2 > span').css({opacity:'1'}); // 리얼 하프앤하프 1개
                $( '.plate' ).animate( { opacity: '1' },10); // 피자 사진 등장 

                var swiper = new Swiper(".swiper-container", {
                    direction: "vertical",
                    mousewheelControl: true,
                    slidesPerView: 1,
                    freeMode: false,
                    // followFinger: true,
                    loop: false,
                    initialSlide: 9,
                    speed: 600,
                    effect: "slide"
                });


                $('.delivery').fadeIn(700);     //포장배달 주문하기 등장
                // 클릭한 피자의 주문 내역 추가
                  
              
                bk.unshift($(this).parents('li').index());
                obj[i].update();
               
                const set2 = new Set(bk);
                const bkset = [...set2];

                // bkset.sort((a,b)=>b-a);
                console.log(bkset)
                deliList.innerHTML ='';
                bkset.forEach(function(k){
                    deliList.innerHTML += obj[k].tag();
                })



                //담은 내역 2개 이상 높이
                if(deliList.children.length != 1){
                    deliList.style.height = '220px'
                }


                // 합계 표시
                let sum = 0;
                bk.forEach(function(k){
                    sum += obj[k].total;
                })
                total.textContent = `(${bk.length})` + sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + `원 주문`

            }); 
        }
    
        // 피자 목록 호버 높이 자연스럽게
        let j=0;
        const ulElement = document.querySelectorAll(".pizza ul li"),
            initialHeight = getComputedStyle(ulElement[j]).height,

            handlerMouseOver = (evt) => {
            evt.currentTarget.style.height = evt.currentTarget.scrollHeight + 30 + "px";
            },
            handlerMouseOut = (evt) => {
            evt.currentTarget.style.height = initialHeight;
            };
        
        for(j=0; j<ulElement.length; j++){
            ulElement[j].addEventListener("mouseenter", handlerMouseOver);
            ulElement[j].addEventListener("mouseleave", handlerMouseOut);
        }
        

    }
};
window.onload = main;