    let cart = [];

    //Для фильтрации объекта
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => (res[key] = obj[key], res), {});


    let goToMainPage = function (id) {
      let clients = JSON.parse(localStorage.getItem('clients'));
      console.log(id);
      clients = Object.filter(clients, item => item.id == id)
      localStorage.setItem('choosen_client', JSON.stringify(clients));
      $('#modal-cart').modal('hide');
      $('#modal-cart-buyer').modal('hide');
      fill_table_main_page();
    };
    localStorage.removeItem("items");
    localStorage.removeItem("cart");
    localStorage.removeItem("choosen_client");
    $.ajax({
      type: "POST",
      url: "ajax/getDataById.php",
      data: {action: 'getClients'},
      success: function (json) {
        localStorage.setItem("clients", json);
        let table = $('#table-clients').DataTable({
          "language": {
            "processing": "Подождите...",
            "search": "Поиск:",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
            "infoEmpty": "Записи с 0 до 0 из 0 записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "infoPostFix": "",
            "loadingRecords": "Загрузка записей...",
            "zeroRecords": "Записи отсутствуют.",
            "emptyTable": "В таблице отсутствуют данные",
            "paginate": {
              "first": "Первая",
              "previous": "Предыдущая",
              "next": "Следующая",
              "last": "Последняя"
            },
            "aria": {
              "sortAscending": ": активировать для сортировки столбца по возрастанию",
              "sortDescending": ": активировать для сортировки столбца по убыванию"
            }

          }
        });
        let clients = JSON.parse(json);
        let count = 0;
        Object.keys(clients).forEach((item) => {
          let i = clients[item];
          let row = table.row.add([
            ++count,
            i.name,
            i.telefon,
            i.card_id,
            '<a class="btn btn-primary btn-sq-xs" onclick="goToMainPage(' + i.id + ')"><i class="fa fa-check"></i></a>'
          ]).draw(false);
          row.nodes().to$().attr('id', 'client_' + i.id + '');
        });
      }

    })
    $.ajax({
      url: 'ajax/getDataById.php',
      type: 'POST',
      data: {action: 'getAllItems'},
      success: function (json) {
        let data = json;
        localStorage.setItem("items", data);
      }
    });


    let filtered = [];


    let get_total_count = (table) => {
      let tds = table.find('tr>td:nth-child(5)');
      let count = 0;
      tds.each(function (index) {
        count += Number($(this).text());
      });
      return count;
    }

    let get_total_cost = (table) => {
      let tds = table.find('tr>td:nth-child(6)>span');
      let total_cost = 0;
      tds.each(function (index) {
        total_cost += Number($(this).text());
      })
      return total_cost;
    };


    function deleteFromCart() {
      $('.delete-from-cart').on('click', function (e) {
        e.preventDefault();
        let table = $('.cart-table');
        let tr = $(this).parent().parent();
        let count_items = 0;
        let id = tr.attr('id').split('.')[1];
        let data = "";
        cart = cart.filter((item) => {
          return !(item.id == id)
        });
        if (cart.length == 0) {
          $('.table-row').css('display', 'none');
          localStorage.removeItem('cart');
        }
        cart.forEach((item) => {
          data +=
            `<tr id="cart.${item.id}">` +
            `<td>${Number(++count_items)}</td>` +
            `<td>${item.name}</td>` +
            `<td>${item.taste}</td>` +
            `<td>${item.weight}</td>` +
            `<td>${item.count}</td>` +
            `<td><span>${Number(item.cost * item.count)}</span> тенге</td>` +
            `<td><a href="#" class="btn btn-danger delete-from-cart"><i class="fas fa-trash"></i>Удалить</a></td>` +
            '</tr>';
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        table.html(data);
        table.parent().find('tfoot > tr > td:nth-last-child(1) > span.item-total-cost').html(`${get_total_cost(table)} тенге`);
        table.parent().find('tfoot > tr > td:nth-last-child(1) > span.item-total-count').html(`${get_total_count(table)} шт.`);
        deleteFromCart();
      });
    }

    function add_to_cart(id) {
      let table = $('.cart-table');
      $('.table-row').css('display', 'block');
      let el = $('.cart-table');

      let tr = $('#item_' + id);
      let count_items = 0;

      let ostatok = tr.find('td:nth-child(6)').text();
      let name = tr.find('td:nth-child(2)').text();
      let taste = tr.find('td:nth-child(4)').text();
      let weight = tr.find('td:nth-child(3)').text();
      let count = tr.find('td:nth-child(7) > input').val();
      let cost = Number(tr.find('td:nth-child(5)').text()) * Number(count);
      let cart_obj = {
        id: id,
        name: name,
        taste: taste,
        weight, weight,
        count: count,
        cost: cost,
        ostatok: ostatok
      };
      let condition = true;
      cart.forEach((item, index) => {
        if (item.id == cart_obj.id) {
          if (cart[index].count < cart_obj.ostatok) {
            cart[index].count = Number(cart[index].count) + Number(cart_obj.count);
          }
          condition = false;
          return 0;
        }
      });
      if (condition) {
        cart.push(cart_obj);
      }
      let data = "";
      cart.forEach((item) => {
        data +=
          `<tr id="cart.${item.id}">` +
          `<td>${Number(++count_items)}</td>` +
          `<td>${item.name}</td>` +
          `<td>${item.taste}</td>` +
          `<td>${item.weight}</td>` +
          `<td>${item.count}</td>` +
          `<td><span>${Number(item.cost * item.count)}</span> тенге</td>` +
          `<td><a href="#" class="btn btn-danger delete-from-cart"><i class="fas fa-trash"></i>Удалить</a></td>` +
          '</tr>';
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      table.html(data);
      deleteFromCart();
      table.parent().find('tfoot > tr > td:nth-last-child(1) > span.item-total-cost').html(`${get_total_cost(table)} тенге`);
      table.parent().find('tfoot > tr > td:nth-last-child(1) > span.item-total-count').html(`${get_total_count(table)} шт.`);
    };


    let getFiltered = (table) => {
      let items = localStorage.getItem("items");
      items = JSON.parse(items);
      let el = $('.modal-body').find('li.active');

      let id = el.attr('id');

      let isSub = id ? id.match('^sub_') : null;

      if (isSub) {
        id = id.split('_')[1];
      }

      if (id) {
        filtered = (!isSub) ? Object.filter(items, item => item.product_category_id == id) : Object.filter(items, item => item.pod_category_id == id);
      }
      else {
        filtered = items;
      }
      let shop_id = $('select#shop_id').val();

      if (shop_id == 'all') {
        filtered = filtered;
      }
      else {
        filtered = Object.filter(filtered, item => item.product_shop_id == shop_id)
      }
      return filtered;
    };
    let add_rows = (data, table) => {
      let count = 0;
      table.clear().draw(false);
      Object.keys(data).forEach((item) => {
        let i = data[item];
        count++;
        let input_value = (i.count > 0) ? 1 : 0;
        let row = table.row.add([
          count,
          i.product_name,
          i.ves_kolvo_tabletok,
          i.product_vkus,
          i.prodazhnaya_cena,
          i.count,
          `<input type="number" value="${input_value}" max="${i.count}" min="${input_value}">`,
          '<a onclick="add_to_cart(' + i.product_id + ')" class="btn btn-success btn-squared-default btn-sq-xs add-to-cart"><i class="fa fa-plus fa-1x"></i></a>',
          i.product_shtrih
        ]).draw(false);
        row.nodes().to$().attr('id', 'item_' + i.product_id + '');
      });
    };

    $(document).ready(function () {
      let table = $('#table-items').DataTable({
        "drawCallBack": function () {
          add_to_cart();
        },
        "columnDefs":
          [
            {
              "targets": [8],
              "visible": false,
              "searchable": true
            }
          ],
        "language": {
          "processing": "Подождите...",
          "search": "Поиск:",
          "lengthMenu": "Показать _MENU_ записей",
          "info": "Записи с _START_ до _END_ из _TOTAL_ записей",
          "infoEmpty": "Записи с 0 до 0 из 0 записей",
          "infoFiltered": "(отфильтровано из _MAX_ записей)",
          "infoPostFix": "",
          "loadingRecords": "Загрузка записей...",
          "zeroRecords": "Записи отсутствуют.",
          "emptyTable": "В таблице отсутствуют данные",
          "paginate": {
            "first": "Первая",
            "previous": "Предыдущая",
            "next": "Следующая",
            "last": "Последняя"
          },
          "aria": {
            "sortAscending": ": активировать для сортировки столбца по возрастанию",
            "sortDescending": ": активировать для сортировки столбца по убыванию"
          }

        }
      });


      $('#modal-cart').on('shown.bs.modal', function () {
        let data = JSON.parse(localStorage.getItem("items"));
        add_rows(data, table);
      });

      $('#shop_id').on('change', function (e) {
        let filtered = getFiltered();
        add_rows(filtered, table);
      });


      $('li').on('click', function (e) {
        $('.modal-body').find('li').removeClass('active');
        $(this).toggleClass('active');
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-left');
        let filtered = getFiltered();
        add_rows(filtered, table);
      });
    });
