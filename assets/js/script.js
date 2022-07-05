const list = document.querySelector('.product-list');
const disconnect = document.querySelector('.disconnect');
const jumbotronButton = document.querySelector('.jumbotron button');
const logo = document.querySelector('header h1');


// ketika halaman di load
window.addEventListener('load', function(){
    listProducts();
})


// menambahakan error handling ketika user online atau offline dengan menampilkan pesan kesalahan
window.addEventListener('offline', function(){
    disconnect.classList.replace('hidden','inline');
})

window.addEventListener('online', function(){
    disconnect.classList.replace('inline','hidden');
})


// ketika logo di klik
// maka scroll nya akan kembali ke atas
logo.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
    
    listProducts();
})


// ketika tombol "cari sekarang juga" di klik 
jumbotronButton.addEventListener('click', function(){
    window.scrollTo({
        top: 380,
        behavior: 'smooth'
    })

    listProducts();
})


// mengambil daftar produk
async function listProducts(){
    // mengambil data produk
    const products = await getDataProducts();

    // memasukkan data produk yg sudah diambil dan menjadikannya argument updateListProduct 
    updateListProducts(products);
}

// memperbaru daftar produk berdasarkan kategori
function updateListProducts(products){
    let result;

    // melooping dan memfilter datanya berdasarkan kategori dan menampilkannya ke halaman menggunakan template literals
    products.forEach(product => {
        result = (
            `<div>
                ${shoes(product.sepatu)}
                ${jersey(product.jersey)}
                ${jacket(product.jaket)}
                ${equipments(product.peralatan)}
                ${merchandies(product.merchandies)}
            </div>`
        );
    });

    // memasukkan semua data kategori yg sudah dirubah menjadi html kedalam product-list pada file htmlnya
    list.innerHTML = result;
}


// mengambil data berdasarkan kategorinya dan memasukkannya kedalam card
// mengambil data sepatu dan membuatnya menjadi card
function shoes(products){
    let cards = '';

    // melooping data sepatu dan memasukkannya kedalam card
    products.forEach(product => cards += card(product));

    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Sepatu</h3>

            <ul class="cards-shoes grid grid-cols-5 gap-10">
            ${cards}
            </ul>
        </div>`
    );
}


// mengambil data jersey dan membuatnya menjadi card
function jersey(products){
    let cards = '';

    products.forEach(product => cards += card(product));

    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Jersey</h3>

            <ul class="cards-jersey grid grid-cols-5 gap-10">
                ${cards}
            </ul>
        </div>`
    );
}


// mengambil data jaket dan membuatnya menjadi card
function jacket(products){
    let cards = '';

    products.forEach(product => cards += card(product));

    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Jaket</h3>

            <ul class="cards-jacket grid grid-cols-5 gap-10">
                ${cards}
            </ul>
        </div>`
    );
}


// mengambil data peralatan olahraga dan membuatnya menjadi card
function equipments(products){
    let cards = '';

    products.forEach(product => cards += card(product));

    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Alat Olahraga</h3>

            <ul class="cards-equipments grid grid-cols-5 gap-10">
                ${cards}
            </ul>
        </div>`
    );
}


function merchandies(products){
    let cards = '';

    products.forEach(product => cards += card(product));

    return (
        `<div class="my-6">
            <h3 class="text-lg font-medium my-2">Merchandies</h3>

            <ul class="cards-merchandies grid grid-cols-5 gap-10">
                ${cards}
            </ul>
        </div>`
    );
}


// mengambil semua kategori menggunakan DOM manipulation
const categoryList = document.querySelectorAll('.category-list li');

// ketika salah satu dari daftar kategorinya di klik
categoryList.forEach(category => {
    category.addEventListener('click', async function(){
        const products = await getDataProducts();

        categoryList.forEach(c => c.classList.remove('border-sky-500'));

        // ketika kategori sepatu di klik maka dia akan memfilter datanya dan hanya menampilkan list sepatu
        if(category.classList.contains('shoes')){
            category.classList.add('border-sky-500');

            products.map(product => {
                list.innerHTML = shoes(product.sepatu);
            })

        // ketika kategori jersey di klilk
        }else if(category.classList.contains('jersey')){
            category.classList.add('border-sky-500');

            products.map(product => {
                list.innerHTML = jersey(product.jersey);
            })

        // ketika kategori jaket di klik
        }else if(category.classList.contains('jacket')){    
            category.classList.add('border-sky-500');

            products.map(product => {
                list.innerHTML = jacket(product.jaket);
            })

        // ketika kategori alat olahraga di klik
        }else if(category.classList.contains('equipments')){    
            category.classList.add('border-sky-500');

            products.map(product => {
                list.innerHTML = equipments(product.peralatan);
            })

        // ketika merchandies di klik
        }else {
            category.classList.add('border-sky-500');

            products.map(product => {
                list.innerHTML = merchandies(product.merchandies);
            })
        }
    })
})


// memfilter data menggunakan menu pencarian
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

// ketika tombol pencarian di klik
searchButton.addEventListener('click', async function(){
    // mengambil apapun yg dimasukkan pengguna
    const namaProduct = searchInput.value;

    // mengambil data produk
    const products = await getDataProducts();

    // memfilter data produk berdasarkan masukan pengguna
    products.map(product => {
        if(namaProduct == 'sepatu'){
            list.innerHTML = shoes(product.sepatu);

        }else if(namaProduct == 'jersey'){
            list.innerHTML = jersey(product.jersey);

        }else if(namaProduct == 'jaket'){
            list.innerHTML = jacket(product.jaket);

        }else if(namaProduct == 'alat olahraga'){
            list.innerHTML = equipments(product.peralatan);

        }else if(namaProduct == 'merchandies'){
            list.innerHTML = merchandies(product.merchandies);

        }else {
            // jika produk tidak ditemukan
            list.innerHTML = '<span class="mt-10">Maaf! produk yang anda cari tidak ditemukan.</span>';
        }
    })
})


const productInfo = document.querySelector('.product-info');
const cardInfo = document.querySelector('.card-info');

// menampilkan info detail dari produk ketika di klik
window.addEventListener('click', async function(e){
    // mengambil data produk
    const products = await getDataProducts();

    // mengambil id dari produk yg di klik
    const id = e.target.parentElement.dataset.id;
    const productId = id ? id : null;

    
    if(e.target.parentElement.parentElement.classList.contains('cards-shoes')){
        products.forEach(product => productDetails(productId, product.sepatu));

    }else if(e.target.parentElement.parentElement.classList.contains('cards-jersey')){
        products.forEach(product => productDetails(productId, product.jersey));

    }else if(e.target.parentElement.parentElement.classList.contains('cards-jacket')){
        products.forEach(product => productDetails(productId, product.jaket));

    }else if(e.target.parentElement.parentElement.classList.contains('cards-equipments')){
        products.forEach(product => productDetails(productId, product.peralatan));

    }else if(e.target.parentElement.parentElement.classList.contains('cards-merchandies')){
        products.forEach(product => productDetails(productId, product.merchandies));
    }

    // animasi untuk card info
    if(e.target.parentElement.classList.contains('card')){
        const cardList = document.querySelectorAll('.card');

        cardList.forEach(card => card.classList.replace('bg-slate-100', 'bg-white'));

        e.target.parentElement.classList.replace('bg-white', 'bg-slate-100')
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


// mengambil info detail dari card produk yg di klik
function productDetails(productId, products){
    products.forEach(product => {
        if(productId == product.id){
            updateProductDetails(product);
        }
    });
}


// memperbarui info detail dari produk yg di klik dan men-generate nya menjadi html
function updateProductDetails(product){
    const detail = document.querySelector('.product-detail');
    
    const productDetail = (
        `<img 
            class="h-full w-full object-contain border-r border-slate-300 px-3" 
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
        </div>`
    )

    detail.innerHTML = productDetail;
}


function card(product){
    return (
        `<li 
            data-id=${product.id}
            class="card bg-white shadow-md rounded-xl p-5 hover:cursor-pointer hover:bg-slate-50">
            <img 
            class="w-full h-32 object-cover object-center rounded-xl border border-customcolor"
            src=${product.gambar}>

            <h4 class="text-sm mt-2 mb-1">${product.nama}</h4>
            <p class="text-lg font-bold">${product.deskripsi.harga}</p>
        </li>`
    )
}


// mengambil data dari fake database menggunakan fetch api.
function getDataProducts(){
    return fetch('assets/data/data.json').then(response => response.json()).then(response => response);
}