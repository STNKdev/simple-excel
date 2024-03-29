export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = [];
    this.current = null;
  }

  clear() {
    this.group.forEach( ($element) => {
      $element.removeClass(TableSelection.className);
    });
    this.group = [];
  }

  get selectedIds() {
    return this.group.map(($el) => $el.id());
  }

  // $el instanceof DOM === true
  select($element) {
    this.clear();
    $element.focus().addClass('selected');
    this.group.push($element);
    this.current = $element;
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(
        ($element) => $element.addClass(TableSelection.className)
    );
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}
