function half(){
    fetch('json/data_order.json')
    .then( res => res.json() )
    .then( data => callback(data)  );

    function callback(data){
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
window.onload = half;