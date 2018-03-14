import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeComponent } from './tree.component';
import { NodesComponent } from './nodes.component';

/**
 * Inspire Tree module. Exposes inspire-tree component and
 * contains related internal-use components.
 */
@NgModule({
    declarations: [
        TreeComponent,
        NodesComponent
    ],
    imports: [ BrowserModule ],
    exports: [ TreeComponent ]
})
export class TreeModule {}
