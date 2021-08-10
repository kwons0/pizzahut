function main(){
    fetch('json/data_index.json')
    .then( res => res.json() )
    .then( data => callback(data)  );

    function callback(data){

        // 헤더 버거메뉴
        const menuBtn = document.querySelector('.my a:nth-of-type(3)'), //버거버튼
        subMenu = document.querySelector('.submenu > div'), //서브 내용
        subWhite = document.querySelector('.submenu > p'), //서브 흰배경
        subBlack = document.querySelector('header');

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


        // $('.menu ul:nth-of-type(1) li:nth-of-type(1)').hover(
        //     function(){
        //         $('.mini li:nth-of-type(1)').stop().slideDown(500);
        //         $('.backwhite').addClass('white');
        //     },
        //     function(){
        //         $('.mini li:nth-of-type(1)').stop().slideUp(200);
        //         $('.backwhite').removeClass('white');
        //     }
        // )


        // 피자 목록
        let tagList='';
        const pizza = document.querySelector('.pizza ul');
        data.pizza.forEach(function(v){
            tagList += `<li>
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
        pizza.innerHTML = tagList;
    }
};
window.onload = main;