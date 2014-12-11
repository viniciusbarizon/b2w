jQuery(document).ajaxSuccess(function(event, request, settings) {
    jQuery(function($) {
        $("div.holder").jPages({
            containerID: "products_container"
        });
    });
});


function format_currency(price) {
  return "R$ " + parseFloat(price).toFixed(2).replace('.',',');
}


function ajax_products(ordenar_por) {
  $('#products_container').html("");

  $.ajax({
    url: "xml/products.xml",
    dataType: "text",

    success: function(xml) {
      var data = [];
      $(xml).find('PRODUCT').each(function() {
        var product = {
          id: $(this).find("ID").text(),
          name: $(this).find("NAME").text(),
          autart: $(this).find("AUTART").text(),
          url: $(this).find("URL").text(),
          description: $(this).find("DESCRIPTION").text(),
          price: $(this).find("PRICE").text(),
          pricepromo: $(this).find("PRICEPROMO").text(),
          parcel: $(this).find("PARCEL").text(),
          url_img: $(this).find("URL_IMG").text(),
          category: $(this).find("CATEGORY").text(),
          category_id: $(this).find("CATEGORY_ID").text(),
          last_update: $(this).find("LAST_UPDATE").text(),
        }

        /* push object to array*/
        data.push(product);
      });

      /* sort data*/
      if(ordenar_por != "") {
        data.sort(function(a,b) {
          var a_price = parseFloat(a.price);
          if(a.pricepromo != "") {
            a_price = parseFloat(a.pricepromo);
          }

          var b_price = parseFloat(b.price);
          if(b.pricepromo != "") {
            b_price = parseFloat(b.pricepromo);
          }

          if(ordenar_por == "menorpreco") {
            return ((a_price < b_price) ? -1 : ((a_price > b_price) ? 1 : 0));
          }
          else {
            return ((a_price > b_price) ? -1 : ((a_price < b_price) ? 1 : 0));
          }
        });
      }

      /* now parse to html */
      $.each(data, function(index, product) {
        var price_de = "";
        var price_por = product.price;
        if(product.pricepromo != "") {
          price_de = "<font color='blue'>de: " + format_currency(product.price) + "</font><br>";
          price_por = product.pricepromo;
        }
        price_por =  format_currency(price_por);

        var parcel = "";
        var posX = product.parcel.indexOf("X");
        if(product.parcel != "") {
          parcel = "<font color='blue'>ou <b>" + product.parcel.substring(0, posX) + " sem juros de " + format_currency(product.parcel.substring(posX + 2)) + "</b> no  cartão</font>";
        }

        $('#products_container').append(
        "<li>" +
          "<a href='" + product.url + "' target='_blank'><img src='" + product.url_img + "'></a><br>" +
          "<a href='" + product.url + "' color='black' target='_blank'><b>" + product.name + "</b></a><br>" +
          price_de +
          "<b><font color='blue'>por: " + price_por + "</font></b><br>" +
          parcel +
        "</li>");
      });
    }
  });
}
