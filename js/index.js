function pizzahut(){
    fetch('json/data_index.json')
    .then( res => res.json() )
    .then( data => callback(data)  );

    function callback(data){
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
window.onload = pizzahut;