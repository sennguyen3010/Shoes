window.onload = function () {
    getProductByID();

}

function getProductByID() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('product');
    console.log(myParam);
    let pro = {};
    const promise = axios({
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${myParam}`,
        method: 'GET',
        ResponseType: JSON,
    });
    promise.then(function (result) {
        pro = { ...result.data.content };
        renderProductByID(pro);
        renderProduct(pro.relatedProducts);

    });
    promise.catch(function (err) {
        console.log(err);
    });

}

function renderProductByID(pro) {
    let html = `
    <div class="product-detail__img col-xl-4">
    <div class="bg-product">
        <img src="${pro.image}" alt="">
    </div>

</div>
<div class="product-detail__content col-xl-6">
    <h3 class="product__name">
        ${pro.name}
    </h3>
    <p class="product__info">
        ${pro.description}
    </p>
    <p class="available-size">
        Available size
    </p>
    <ul class="product__size-selection btn-group" role="group" aria-label="Basic example">
        <li>
            <button type="button" class="btn">38</button>
        </li>
        <li>
            <button type="button" class="btn">39</button>

        </li>
        <li>
            <button type="button" class="btn">40</button>

        </li>
        <li>
            <button type="button" class="btn">41</button>

        </li>
        <li>
            <button type="button" class="btn">42</button>

        </li>
    </ul>
    <p class="product__price">
        ${pro.price}$
    </p>
    <div class="product-amount">
        <button class="product-amount__plus" id="btnPlus" onclick="plus()">+</button>
        <span class="product-amount__selected">1</span>
        <button class="product-amount__minus" id="btnMinus" onclick="minus()">-</button>
    </div>
    <button class="btnProductAdd">
        Add to cart
    </button>
</div>
`;

    document.querySelector('.product-detail__layout').innerHTML = html;

}

function renderProduct(arrProduct) {
    let html = '';

    arrProduct.map((item, index) => {
        if (index < 6) {
            html += `
        <div class="col-12 col-md-6 col-lg-4">
        <a href="../views/detail.html?product=${item.id}" class="productFeature-item">
          <div class="productFeature-item-top">
            <div class="productFeature-item-img">
              <img src="${item.image}" alt="" />
            </div>
            <h4>${item.alias}</h4>
            <p>${item.shortDescription}</p>
          </div>
          <div class="row">
            <div class="col-6 pe-0">
              <div class="productFeature-item-bottom bottom-bg-yellow">
                <button class="productFeature-btn item-bottom-text">
                  Buy now
                </button>
              </div>
            </div>
  
            <div class="col-6 ps-0">
              <div class="productFeature-item-bottom bottom-bg-grey">
                <button class="productFeature-price item-bottom-text">
                  ${item.price}$
                </button>
              </div>
            </div>
          </div>
        </a>
      </div>
              `;
        }
    });
    document.querySelector('.productFeature-group').innerHTML = html;
}

window.plus = () => {
    let amuont = Number(document.querySelector('.product-amount__selected').innerHTML);
    amuont++;
    document.querySelector('.product-amount__selected').innerHTML = amuont;
}

window.minus = () => {
    let amuont = Number(document.querySelector('.product-amount__selected').innerHTML);
    if (amuont > 1) {
        amuont--;
        document.querySelector('.product-amount__selected').innerHTML = amuont;
    }

}