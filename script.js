let req = new XMLHttpRequest();

req.open('GET', 'https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json', true);
req.send();

let promise = new Promise(function (resolve, reject) {
  req.onload = function () {
    resolve(JSON.parse(this.response));
  };
  req.onerror = function () {
    reject('Error occured');
  };
});

promise
  .then((data) => {
    console.log(data);
    buildUI(data);
  })
  .catch((error) => {
    console.log(error);
  });

function buildUI(data) {
  let contentRow = document.getElementById('content');
  for (let i = 0; i < data.length; i++) {
    let card = createElement('div');
    setAttribute(card, 'class', 'card col-md-3 col-lg-2 col-sm-4 col-xs-6');
    appendChild(contentRow, card);

    let h6 = createElement('h6');
    h6.innerText = data[i].name;
    appendChild(card, h6);

    let img = createElement('img');
    img.src = data[i].flag;
    setAttribute(img, 'class', 'card-img-top');
    appendChild(card, img);

    let capitalDiv = createElement('div');
    appendChild(card, capitalDiv);

    let capitalLabel = createElement('span');
    capitalLabel.innerText= 'Capital: ';
    appendChild(capitalDiv, capitalLabel);

    let capital = createElement('span');
    setAttribute(capital, 'class', 'badge badge-success');
    capital.innerText = data[i].capital;
    appendChild(capitalDiv, capital);

    let codesDiv = createElement('div');
    appendChild(card, codesDiv);

    let codesLabel = createElement('span');
    codesLabel.innerText= 'Country Codes: ';
    appendChild(codesDiv, codesLabel);

    let codes = createElement('b');
    codes.innerText = `${data[i].alpha2Code}, ${data[i].alpha3Code}`;
    appendChild(codesDiv, codes);

    let regionDiv = createElement('div');
    appendChild(card, regionDiv);

    let regionLabel = createElement('span');
    regionLabel.innerText= 'Region: ';
    appendChild(regionDiv, regionLabel);

    let region = createElement('b');
    region.innerText = data[i].region;
    appendChild(regionDiv, region);

    let latLngDiv = createElement('div');
    appendChild(card, latLngDiv);

    let latLngLabel = createElement('span');
    latLngLabel.innerText= 'Lat, Long: ';
    appendChild(latLngDiv, latLngLabel);

    let latLng = createElement('b');
    latLng.innerText = data[i].latlng.join(', ');
    appendChild(latLngDiv, latLng);
  }
}
