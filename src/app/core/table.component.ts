import { Component } from "@angular/core";
import { Model } from "../model/repository.model";
import { SharedState, MODES } from "./sharedState.model";
import { Product } from "../model/product.model";

@Component({
  selector: "paTable",
  templateUrl: "table.component.html"
})
export class TableComponent {

  constructor(private model: Model, private state: SharedState) { }

  getProducts(): Product[] {
    return this.model.getProducts();
  }

  getProduct(id: number): Product {
    return this.model.getProduct(id);
  }

  deleteProduct(id: number) {
    this.model.deleteProduct(id);
  }

  editProduct(id: number) {
    this.state.id = id;
    this.state.mode = MODES.EDIT;
  }

  createProduct() {
    this.state.id = undefined;
    this.state.mode = MODES.CREATE;
  }
}
