import { Component, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router } from "@angular/router";
// import { filter, map, distinctUntilChanged, skipWhile } from "rxjs/operators";

@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent {
    product: Product = new Product();

    constructor(private model: Model, activeRoute: ActivatedRoute,
      private router: Router) {

      // this.editing = activeRoute.snapshot.url[1].path == "edit";
      this.editing = activeRoute.snapshot.params["mode"] == "edit";
      let id = activeRoute.snapshot.params["id"];
      if (id != null) {
        let name = activeRoute.snapshot.params["name"];
        let category = activeRoute.snapshot.params["category"];
        let price = activeRoute.snapshot.params["price"];

        if (name != null && category != null && price != null) {
          this.product.id = id;
          this.product.name = name;
          this.product.category = category;
          this.product.price = Number.parseFloat(price);
        } else {
          Object.assign(this.product, model.getProduct(id) || new Product());
        }
      }
    }

    editing: boolean = false;

    submitForm(form: NgForm) {
        if (form.valid) {
            this.model.saveProduct(this.product);
            this.router.navigateByUrl("/");
        }
    }

    resetForm() {
        this.product = new Product();
    }
}
