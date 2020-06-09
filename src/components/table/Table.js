import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from '@/components/table/TableSelection';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.size';
import {
  isCell, shouldResize, matrix, nextSelector
} from '@/components/table/table.functions';


export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    this.selectSell(this.$root.find('[data-id="0:0"]'));

    // Подписывается на события ввода
    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    // Подписывается на события нажатия Enter в Formula для получения фокуса
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectSell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        // group select
        const $cells = matrix($target, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ];

    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectSell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
