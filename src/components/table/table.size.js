import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coordinates = $parent.getCoordinates();
  const type = $resizer.data.resize;
  const sideProp = type === 'column' ? 'bottom' : 'right';
  let value;

  $resizer.css({
    opacity: 1,
    [sideProp]: '-99999px'
  });

  document.onmousemove = (e) => {
    if (type === 'column') {
      // Здесь всегда целочисленные значения,
      // поэтому не нужен Math.floor()
      const delta = e.pageX - coordinates.right;
      $resizer.css({
        right: -delta + 'px'
      });
      // Считаем ширину колонки
      value = coordinates.width + delta;
      // Это непроизводительно
      // document.querySelectorAll(`[data-column="${$parent.data.column}"]`)
      //     .forEach( (el) => {
      //       el.style.width = value + 'px';
      //     });
      // Уже лучше
      // this.$root.findAll(`[data-column="${$parent.data.column}"]`)
      //     .forEach( (el) => {
      //       el.style.width = value + 'px';
      //     });
    } else {
      const delta = e.pageY - coordinates.bottom;
      value = coordinates.height + delta;
      $resizer.css({
        bottom: -delta + 'px'
      });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'column') {
      $parent.css({width: value + 'px'});
      // Cells resize
      $root
          .findAll(`[data-column="${$parent.data.column}"]`)
          .forEach( (el) => {
            el.style.width = value + 'px';
          });
    } else {
      $parent.css({
        height: value + 'px'
      });
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    });
  };
}
