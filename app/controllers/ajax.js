function getProductApi() {
  const promise = axios({
    url: 'https://shop.cyberlearn.vn/api/Product',
    method: 'GET',
    ResponseType: JSON,
  });
  promise.then(function (result) {
    renderProduct(result.data.content);
  });
  promise.catch(function (err) {
    console.log(err);
  });
}

window.onload = function () {
  getProductApi();
};

function renderProduct(arrProduct) {
  let html = '';

  arrProduct.map((item, index) => {
    // console.log(item);
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
