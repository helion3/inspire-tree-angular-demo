import { ChangeDetectorRef, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NodesComponent } from './nodes.component';

// Import the InspireTree class
import InspireTree from 'inspire-tree';

// Import the node config type
import { NodeConfig } from 'inspire-tree';

/**
 * Inspire Tree component. Initializes InspireTree on a given element.
 */
@Component({
    selector: 'inspire-tree',
    viewProviders: [ NodesComponent ],

    // Allow external css
    encapsulation: ViewEncapsulation.None,

    // Grab the CSS provided by inspire-tree
    styleUrls: [ '../../../node_modules/inspire-tree-dom/dist/inspire-tree-light.css' ],
    template: `
        <div class="inspire-tree" tabindex="-1">
            <ol inspire-tree-nodes [nodes]="nodes" [tree]="tree"></ol>
        </div>
    `
})
export class TreeComponent {
    // Keep a reference to the tree instance
    tree: any;

    // Keep a reference to the tree nodes so Angular can render them.
    nodes: any;

    /**
     * Initialize InspireTree on the component's target element.
     *
     * @param {ElementRef} el An HTML element.
     * @param {HttpClient} http HTTP service for loading JSON data.
     * @param {ChangeDetectorRef} ref Change detection service/
     */
    constructor(el: ElementRef, http: HttpClient, ref: ChangeDetectorRef) {
        this.tree = new InspireTree({
            data: function(node, resolve, reject) {
                http.get<NodeConfig[]>('/assets/full.json').subscribe(
                    data => resolve(data),
                    error => reject(error));
            }
        });

        // Listen for the model loaded event
        this.tree.on('model.loaded', () => {
            // Sync tree nodes with our internal var (so templates have access)
            this.nodes = this.tree.nodes();

            // Angular can't see this change, so we have to tell it
            ref.markForCheck();
        });
    }
}
