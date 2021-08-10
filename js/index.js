function main(){
    fetch('json/data_index.json')
    .then( res => res.json() )
    .then( data => callback(data)  );

    function callback(data){

        // 헤더 서브메뉴
        const menuBtn = document.querySelector('.my a:nth-of-type(3)'),
        subMenu = document.querySelector('.submenu > div'),
        subBg = document.querySelector('.submenu > p');

        menuBtn.addEventListener('click', function(){
            if(menuBtn.classList.contains('active')){
                menuBtn.classList.remove('active');
                subMenu.classList.remove('active');
                subBg.classList.remove('active');
            }else{
                menuBtn.classList.add('active');
                subMenu.classList.add('active');
                subBg.classList.add('active');
            }
            
        });

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