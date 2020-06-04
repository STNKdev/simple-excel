export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = [];
  }

  clear() {
    this.group.forEach( ($element) => {
      $element.removeClass(TableSelection.className);
    });
    this.group = [];
  }

  // $el instanceof DOM === true
  select($element) {
    this.clear();
    this.group.push($element);
    $element.addClass('selected');
  }

  selectGroup() {}
}
