import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CatalogComponent } from "./catalog.component";
import { CatalogRepositoryService } from "./catalog-repository-service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        RouterModule
    ],
    declarations: [CatalogComponent],
    exports: [],
    providers: [CatalogRepositoryService]
})
export class CatalogModule {

}