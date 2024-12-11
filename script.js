let td;
function drag() {
  $('td').on('dragstart', function (event) {
    td = $(this);
  });
}
function offDrag() {
  $('td').off('dragstart');
}

function drop() {
  $('table td').on('dragenter dragover drop', function (event) {
    event.preventDefault();
    if (event.type === 'drop') {
      if (td.parent().attr('class') == $(this).parent().attr('class')) {
        let swap_html = $(this).html();
        $(this).html(td.html());
        td.html(swap_html);
        offEdit();
        offSave();
        setEdit();
        setSave();
      }
    }
  });
}
function offDrop() {
  $('table td').off('dragenter dragover drop');
}

function offEdit() {
  $('.edit').off('click');
}
function offSave() {
  $('.save').off('click');
}

function setEdit() {
  $('.edit').on('click', function () {
    if (!$(this).parent().find('.cell').length) $(this).parent().prepend('<span class="cell"></span>');
    $(this).parent().find('.cell').attr('contenteditable', true);
    $(this).parent().find('.cell').focus();
  });
}
function setSave() {
  $('.save').on('click', function () {
    $(this).parent().find('.cell').attr('contenteditable', false);
  });
}

setEdit();
setSave();
drag();
drop();

$('.add-row').on('click', function () {
  const cells = $('table thead tr th').map((it, ind) =>
    it == 0
      ? `<td class="month">
            <button class="edit"></button>
            <button class="save"></button>
          </td>`
      : it == 1
      ? `<td class="week">
            <button class="edit"></button>
            <button class="save"></button>
          </td>`
      : `<td draggable="true">
            <button class="edit"></button>
            <button class="save"></button>
          </td>`
  );
  $('table > tbody:last-child').append(`<tr>${cells.get().join('')}</tr>`);
  offEdit();
  offSave();
  offDrag();
  offDrop();
  setEdit();
  setSave();
  drag();
  drop();
});

$('.add-column').on('click', function () {
  const th = '<th draggable="false" contenteditable="true"></th>';
  $('table > thead tr').append(th);
  const td = `<td draggable="true">
                <button class="edit"></button>
                <button class="save"></button>
              </td>`
  $('table > tbody tr').each((i, tr) => $(tr).append(td));
  offEdit();
  offSave();
  offDrag();
  offDrop();
  setEdit();
  setSave();
  drag();
  drop();
});
