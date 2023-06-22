var loading = false;
var currentPage = 1;
var searchInput = document.getElementById("search-input");

function fetchData() {
  if (loading) {
    return;
  }
  
  loading = true;
  $('#loading-indicator').show();

  var liveprice = {
    url: "https://api.coingecko.com/api/v3/exchange_rates",
    method: "GET",
    headers: {}
  };

  $.ajax(liveprice)
    .done(function(response) {
      if (response.rates) {
        var container = document.getElementById("container");
        container.innerHTML = ""; 

        for (var currency in response.rates) {
          var currencyData = response.rates[currency];
          var currencyName = currencyData.name;
          var currencyUnit = currencyData.unit;
          var currencyValue = currencyData.value;
          var currencyImage = currencyData.id;

          if (
            currencyName.toLowerCase().includes(searchInput.value.toLowerCase())
          ) {
            var cryptoContainer = document.createElement("div");
            cryptoContainer.className = "crypto-container";

            var logoImg = document.createElement("img");
            logoImg.src = "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880" + currencyData.id + ".png"; 
            logoImg.className = "crypto-logo";

            var cryptoInfo = document.createElement("div");
            cryptoInfo.className = "crypto-info";

            var rateHeading = document.createElement("h3");
            var rateValueSpan = document.createElement("span");
            rateValueSpan.style.color = "#B6EADA";
            rateValueSpan.textContent = currencyValue;
            rateHeading.textContent = "Rate: ";
            rateHeading.appendChild(rateValueSpan);

            var nameHeading = document.createElement("h4");
            var nameValueSpan = document.createElement("span");
            nameValueSpan.style.color = "#B6EADA";
            nameValueSpan.textContent = currencyName;
            nameHeading.textContent = "Crypto name: ";
            nameHeading.appendChild(nameValueSpan);

            var unitHeading = document.createElement("h4");
            var unitValueSpan = document.createElement("span");
            unitValueSpan.style.color = "#B6EADA";
            unitValueSpan.textContent = currencyUnit;
            unitHeading.textContent = "Crypto unit: ";
            unitHeading.appendChild(unitValueSpan);

            cryptoInfo.appendChild(rateHeading);
            cryptoInfo.appendChild(nameHeading);
            cryptoInfo.appendChild(unitHeading);

            cryptoContainer.appendChild(logoImg);
            cryptoContainer.appendChild(cryptoInfo);

            container.appendChild(cryptoContainer);
            container.appendChild(document.createElement("hr"));
          }
        }

        loading = false;
        $('#loading-indicator').hide();

        if (currentPage >= 5) {
          $('#end-notification').show();
        } else {
          currentPage++;
        }
      } else {
        console.error("Missing 'rates' property in the API response:", response);
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.error("AJAX request failed:", textStatus, errorThrown);
    });
}

$(window).on('scroll', function() {
  var scrollHeight = $(document).height();
  var scrollPosition = $(window).height() + $(window).scrollTop();

  if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
    fetchData();
  }
});

searchInput.addEventListener("input", function() {
  fetchData();
});

fetchData();



let mybutton = document.getElementById("myBtn");


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}