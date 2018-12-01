import { Component, KeyValueDiffer, KeyValueDiffers, ChangeDetectorRef } from "@angular/core";
import { Model } from "../model/repository.model";

@Component({
  selector: "paCategoryCount",
  template: `
    <div class="bg-primary p-2 text-white">
      There are {{count}} categories
    </div>
  `
})
export class CategoryCountComponent {
  private differ: KeyValueDiffer<any, any>;
  private count: number = 0;

  constructor(private model: Model,
    private keyValueDiffers: KeyValueDiffers,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.differ = this.keyValueDiffers.find(this.model.getProducts()).create();
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (this.differ.diff(this.model.getProducts()) != null) {
      this.count = this.model.getProducts()
        .map(p => p.category)
        .filter((category, index, array) => array.indexOf(category) == index)
        .length;
    }
  }
}
