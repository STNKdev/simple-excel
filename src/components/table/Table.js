import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    // console.log(event.target.getAttribute('data-resize'));
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      // ну такое
      // const $parent = $resizer.$el.parentNode;
      // уже лучше
      // const $parent = $resizer.$el.closest('[data-type="resizable"]');
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coordinates = $parent.getCoordinates();

      const cells = this.$root
          .findAll(`[data-column="${$parent.data.column}"]`);

      document.onmousemove = (e) => {
        // Здесь всегда целочисленные значения,
        // поэтому не нужен Math.floor()
        const delta = e.pageX - coordinates.right;
        // Считаем ширину колонки
        const value = coordinates.width + delta;
        $parent.$el.style.width = value + 'px';
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
        cells.forEach( (el) => {
          el.style.width = value + 'px';
        });
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}


// 316 msScripting
// 5897 msRendering
// 969 msPainting

// 156 msScripting
// 3700 msRendering
// 559 msPainting
