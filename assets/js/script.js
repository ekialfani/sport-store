// ketika halaman di load
window.addEventListener('load', function(){
    productList();
})


// ketika logo di klik
const logo = document.querySelector('header h1');

logo.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })

    productList();
})

// ketika tombol cari sekarang di klik
const jumbotronButton = document.querySelector('.jumbotron button');

jumbotronButton.addEventListener('click', function(){
    window.scrollTo({
        top: 380,
        behavior: 'smooth'
    })

    productList();
})


// error handling
const disconnect = document.querySelector('.disconnect');

window.addEventListener('offline', function(){
    disconnect.classList.replace('hidden','inline');
})

window.addEventListener('online', function(){
    disconnect.classList.replace('inline','hidden');
})

// menampilkan semua list produk
async function productList(){
    const products = await getDataProducts();

    const { dataShoes, dataJersey, dataJacket, dataEquip, dataMerch } = filterDataProducts(products);

    updateProductList(dataShoes, dataJersey, dataJacket, dataEquip, dataMerch);
}

function filterDataProducts(products){
    const data = {
        dataShoes: [],
        dataJersey: [],
        dataJacket: [],
        dataEquip: [],
        dataMerch: [],
    }

    products.forEach(product => {
        if(product.kategori == 'sepatu'){
            data.dataShoes.push(product);
        }else if(product.kategori == 'jersey'){
            data.dataJersey.push(product);
        }else if(product.kategori == 'jaket'){
            data.dataJacket.push(product);
        }else if(product.kategori === 'alat'){
            data.dataEquip.push(product);
        }else {
            data.dataMerch.push(product);
        }
    })

    return data;
}

function updateProductList(dataShoes, dataJersey, dataJacket, dataEquip, dataMerch){
    const productListContainer = document.querySelector('.product-list');

    const products = (
        `<div>
            ${shoes(dataShoes)}
            ${jersey(dataJersey)}
            ${jacket(dataJacket)}
            ${equipments(dataEquip)}
            ${merchandies(dataMerch)}
        </div>`
    )

    productListContainer.innerHTML = products;
}


function shoes(dataShoes){
    let cards = '';
    dataShoes.forEach(s => cards += card(s));
    
    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Sepatu</h3>
        
            <ul class="cards-merchandies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                ${cards}
            </ul>
        </div>`
    )
}


function jersey(dataJersey){
    let cards = '';

    dataJersey.forEach(j => cards += card(j));

    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Jersey</h3>
    
            <ul class="cards-merchandies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                ${cards}
            </ul>
        </div>`
    )
}


function jacket(dataJacket){
    let cards = '';

    dataJacket.forEach(j => cards += card(j));

    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Jaket</h3>
    
            <ul class="cards-merchandies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                ${cards}
            </ul>
        </div>`
    )
}


function equipments(dataEquip){
    let cards = '';

    dataEquip.forEach(e => cards += card(e));

    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Alat Olahraga</h3>
    
            <ul class="cards-merchandies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                ${cards}
            </ul>
        </div>`
    )
}


function merchandies(dataMerch){
    let cards = '';

    dataMerch.forEach(m => cards += card(m));

    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Merchandies</h3>
    
            <ul class="cards-merchandies grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                ${cards}
            </ul>
        </div>`
    )
}


function card(product){
    return (
        `<li 
            data-id=${product.id}
            class="bg-white shadow-md rounded-xl p-5 hover:cursor-pointer hover:bg-slate-50 relative">
            <img 
                class="w-full h-32 object-cover object-center rounded-xl border border-customcolor"
                src=${product.gambar}>
        
            <h4 class="text-sm mt-2 mb-1">${product.nama}</h4>
            <p class="text-lg font-bold">${product.deskripsi.harga}</p>
            <span class="card absolute top-0 left-0 right-0 bottom-0 bg-transparent"></span>
        </li>`
    )
}


// menampilkan info detail dari produk
window.addEventListener('click', function(e){
    const cardInfo = document.querySelector('.card-info');
    const productInfo = document.querySelector('.product-info');
    const cardList = document.querySelectorAll('.card');

    if(e.target.classList.contains('card')){
        const idProduct = e.target.parentElement.dataset.id;
        
        productDetails(idProduct);

        cardList.forEach(card => card.parentElement.classList.replace('bg-slate-100', 'bg-white'));
        e.target.parentElement.classList.replace('bg-white', 'bg-slate-100');

        // animation card info
        cardInfo.classList.replace('animate-hide', 'animate-show');
        productInfo.classList.replace('hidden','flex');
    }


    if(e.target.parentElement.classList.contains('close') || e.target.classList.contains('close') || e.target.classList.contains('product-info')){
        cardInfo.classList.replace('animate-show', 'animate-hide');

        setTimeout(() => {
            productInfo.classList.replace('flex','hidden');
        }, 200);
    }
    
})

async function productDetails(idProduct){
    const products = await getDataProducts();

    products.forEach(product => (product.id.toString() === idProduct) ? updateProductDetails(product) : null);
}

function updateProductDetails(product){
    const productDetail = document.querySelector('.product-detail');

    const detail = cardDetails(product);
    
    productDetail.innerHTML = detail;
}


function cardDetails(product){
    return (
        `<img
            class="h-full w-full object-contain border-b border-slate-300 md:border-b-0 md:border-r border-slate-400 p-3" 
            src=${product.gambar} alt=${product.nama}>

        <div class="p-5">
            <h3 class="text-lg font-medium">${product.nama}</h3>
            <p class="text-2xl font-bold">${product.deskripsi.harga}</p>
            <div class="border-t border-slate-300 mt-2 pt-3">

                <h4 class="underline underline-offset-2 decoration-2 text-customcolor mb-3">Detail</h4>
                ${
                    product.deskripsi.merek ? 
                    `<p class="text-sm text-slate-500 mb-1">Merek: ${product.deskripsi.merek}</p>` : ''
                }

                ${
                    product.deskripsi.toko ? 
                    `<p class="text-sm text-slate-500 mb-1">Toko: ${product.deskripsi.toko}</p>` : ''
                }
                    <p class="text-sm text-slate-500 mb-1">Kategori: ${product.deskripsi.kategori}</p>
                ${
                    product.deskripsi.warna ?
                    `<p class="text-sm text-slate-500 mb-1">Warna: ${product.deskripsi.warna}</p>` : ''
                }

                ${
                    product.deskripsi.bahan ?
                    `<p class="text-sm text-slate-500 mb-1">Bahan: ${product.deskripsi.bahan}</p>` : ''
                }
                
                ${
                    product.deskripsi.material ?
                    `<p class="text-sm text-slate-500 mb-1">Material: ${product.deskripsi.material}</p>` : ''
                }
                    <p class="text-sm text-slate-500">Ukuran: ${product.deskripsi.ukuran}</p>
            </div>
        </div>
        `
    )
}

// memfilter data berdasarkan list kategori
const categoryList = document.querySelectorAll('.category-list li');

categoryList.forEach(category => {
    category.addEventListener('click', async function(){
        const productListContainer = document.querySelector('.product-list');

        const products = await getDataProducts();

        const { dataShoes, dataJersey, dataJacket, dataEquip, dataMerch } = filterDataProducts(products);

        
        if(category.classList.contains('shoes')) productListContainer.innerHTML = shoes(dataShoes);

        if(category.classList.contains('jersey')) productListContainer.innerHTML = jersey(dataJersey);

        if(category.classList.contains('jacket')) productListContainer.innerHTML = jacket(dataJacket);

        if(category.classList.contains('equipments')) productListContainer.innerHTML = equipments(dataEquip);

        if(category.classList.contains('merchandies')) productListContainer.innerHTML = merchandies(dataMerch);
    })
})


// menampilkan data berdasarkan masukan pengguna
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', async function(){
    const productListContainer = document.querySelector('.product-list');

    const products = await getDataProducts();

    const { dataShoes, dataJersey, dataJacket, dataEquip, dataMerch } = filterDataProducts(products);

    const keyword = searchInput.value;
    
    if(keyword === 'sepatu'){
        productListContainer.innerHTML = shoes(dataShoes);

    }else if(keyword === 'jersey'){
        productListContainer.innerHTML = jersey(dataJersey);

    }else if(keyword === 'jaket'){
        productListContainer.innerHTML = jacket(dataJacket);

    }else if(keyword === 'alat olahraga'){
        productListContainer.innerHTML = equipments(dataEquip);

    }else if(keyword === 'merchandies'){
        productListContainer.innerHTML = merchandies(dataMerch);

    }else {
        productListContainer.innerText = 'Maaf produk yg anda cari tidak ditemukan!';
    }
})


// mengambil data melalui data.json menggunakan fetch
function getDataProducts(){
    return fetch('assets/data/data.json')
    .then(response => response.json())
    .then(response => response);
}