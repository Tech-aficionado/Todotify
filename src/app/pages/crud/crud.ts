import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Product, ProductService } from '../service/product.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { JsonpInterceptor } from '@angular/common/http';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-crud',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        PanelMenuModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        BadgeModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
                <p-button severity="secondary" label="Delete" icon="pi pi-trash" outlined (onClick)="deleteSelectedProducts()" [disabled]="!selectedProducts || !selectedProducts.length" />
            </ng-template>

            <ng-template #end>
                <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="products()"
            *ngIf="!isMobileDevice()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['name', 'country.name', 'representative.name', 'status']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedProducts"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage Todos</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th style="min-width: 1rem">Id</th>
                    <th pSortableColumn="name" style="min-width:4rem">
                        Name
                        <p-sortIcon field="name" />
                    </th>
                    <th style="min-width:20rem">Description</th>
                    <th pSortableColumn="category" style="min-width:10rem">
                        Status
                        <p-sortIcon field="category" />
                    </th>
                    <th pSortableColumn="rating" style="min-width: 12rem">
                        Priority
                        <p-sortIcon field="rating" />
                    </th>
                    <th pSortableColumn="inventoryStatus" style="min-width: 12rem">
                        Created at
                        <p-sortIcon field="inventoryStatus" />
                    </th>
                    <th pSortableColumn="inventoryStatus" style="min-width: 12rem">
                        Due Date
                        <p-sortIcon field="inventoryStatus" />
                    </th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="product" />
                    </td>
                    <td style="min-width: 1rem">{{ product.code }}</td>
                    <td style="min-width: 4rem">{{ product.name }}</td>
                    <td style="min-width: 20rem">
                    {{ product.name }}
                    </td>
                    <td>
                        <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                    </td>
                    <td>
                        <p-tag [value]="product.inventoryStatus" [severity]="getSeverity(product.inventoryStatus)" />
                    </td>
                    <td>{{ product.category }}</td>
                    <td>
                    {{ product.category }}
                    </td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editProduct(product)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="deleteProduct(product)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>
        <p-panelmenu *ngIf=" isMobileDevice()" styleClass="w-full md:w-80" [model]="panelMenuItems" >
        <ng-template #item let-item>
        <a pRipple class="flex items-center px-4 py-2 cursor-pointer group justify-between">
            <span> <i [class]="item.icon + ' text-primary group-hover:text-inherit'"></i>
            <span class="ml-2">
                {{ item.label }}
            </span></span>
            <!-- <p-badge *ngIf="item.duedate" class="ml-auto" [value]="item.duedate" />
            <p-tag [value]="item.inventoryStatus" *ngIf="item.inventoryStatus" class="ml-auto" [severity]="getSeverity(item.inventoryStatus)" /> -->
            <p-tag [value]="item.value" *ngIf="item.value" class="ml-auto" [severity]="getSeverity(item.value)" />
            <span>
                <p-button icon="pi pi-pencil" *ngIf="item.edit"  class="ml-4 justify-content-end align-items-end" [rounded]="true" [outlined]="true" (click)="editProduct(item)" />
            <p-button class="ml-4 justify-content-end align-items-end" *ngIf="item.delete" icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (click)="console(item)" />
            </span>
        </a>
    </ng-template>
        </p-panelmenu>
        <p-dialog stripedRows  [(visible)]="productDialog" [style]="{ width: '450px' }" header="Product Details" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    
                    <div>
                        <label for="name" class="block font-bold mb-3">Name</label>
                        <input type="text" pInputText id="name" [(ngModel)]="product.name" required autofocus fluid />
                        <small class="text-red-500" *ngIf="submitted && !product.name">Name is required.</small>
                    </div>
                    <div>
                        <label for="description" class="block font-bold mb-3">Description</label>
                        <textarea id="description" pTextarea [(ngModel)]="product.description" required rows="3" cols="20" fluid></textarea>
                    </div>

                    <div>
                        <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                        <p-select [(ngModel)]="product.inventoryStatus" inputId="inventoryStatus" [options]="statuses" optionLabel="label" optionValue="label" placeholder="Select a Status" fluid />
                    </div>

                    <div>
                        <span class="block font-bold mb-4">Category</span>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category1" name="category" value="Accessories" [(ngModel)]="product.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category2" name="category" value="Clothing" [(ngModel)]="product.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category3" name="category" value="Electronics" [(ngModel)]="product.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category4" name="category" value="Fitness" [(ngModel)]="product.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-6">
                            <label for="price" class="block font-bold mb-3">Price</label>
                            <p-inputnumber id="price" [(ngModel)]="product.price" mode="currency" currency="USD" locale="en-US" fluid />
                        </div>
                        <div class="col-span-6">
                            <label for="quantity" class="block font-bold mb-3">Quantity</label>
                            <p-inputnumber id="quantity" [(ngModel)]="product.quantity" fluid />
                        </div>
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()" />
                <p-button label="Save" icon="pi pi-check" (click)="saveProduct()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
        <p-toast />
    `,
    providers: [MessageService, ProductService, ConfirmationService]
})
export class Crud implements OnInit {
    productDialog: boolean = false;

    products = signal<Product[]>([]);

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
        window.addEventListener('resize', () => {
            let i = 0
            console.log('Is mobile:',  this.isMobileDevice());
            i++;
            this.messageService.add({
                severity: 'success',
                summary: String(this.isMobileDevice()),
            });
        });
    }
    toggleMenu(event: Event, item: MenuItem): void {
        item.expanded = !item.expanded; // Toggle submenu visibility
        event.stopPropagation(); // Prevent unwanted bubbling
    }
    console(id: any){
        this.messageService.add({
            severity: 'info',
            summary: JSON.stringify(id),
        });
    }
    panelMenuItems = [
        {
            label: 'Cook Food',
            icon: 'pi pi-envelope',
            duedate:'12/12/2002',
            inventoryStatus: 'INSTOCK',
            delete: true,
            edit: true,
            id: '1000',
                code: 1,
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                rating: 5,
            items: [
                {
                    label: 'Name: ',
                    icon: 'pi pi-file-edit',
                    value: 'Cook Food',
                    delete: false,
                    edit: false
                },
                {
                    label: 'Description: ',
                    icon: 'pi pi-inbox',
                    value: 'Breakfast',
                    delete: false,
                    edit: false
                },
                {
                    label: 'Created At: ',
                    icon: 'pi pi-send',
                    value: '25/2/2025',
                    delete: false,
                    edit: false
                },
                {
                    label: 'Due Date: ',
                    icon: 'pi pi-trash',
                    value: '14/3/2025',
                    delete: false,
                    edit: false
                }
            ]
        },
        {
            label: 'Reports',
            icon: 'pi pi-chart-bar',
            
            inventoryStatus: 'INSTOCK',
            items: [
                {
                    label: 'Sales',
                    icon: 'pi pi-chart-line',
                    inventoryStatus: 'INSTOCK'
                },
                {
                    label: 'Products',
                    icon: 'pi pi-list',
                    inventoryStatus: 'INSTOCK'
                }
            ]
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            inventoryStatus: 'INSTOCK',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-cog',
                    inventoryStatus: 'INSTOCK',
                },
                {
                    label: 'Privacy',
                    icon: 'pi pi-shield',
                    inventoryStatus: 'INSTOCK',
                }
            ]
        }
    ];

    loadDemoData() {
        this.productService.getProducts().then((data) => {
            this.products.set(data);
        });

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.cols = [
            { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products.set(this.products().filter((val) => !this.selectedProducts?.includes(val)));
                this.selectedProducts = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products.set(this.products().filter((val) => val.id !== product.id));
                this.product = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products().length; i++) {
            if (this.products()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    saveProduct() {
        this.submitted = true;
        let _products = this.products();
        if (this.product.name?.trim()) {
            if (this.product.id) {
                _products[this.findIndexById(this.product.id)] = this.product;
                this.products.set([..._products]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
                this.products.set([..._products, this.product]);
            }

            this.productDialog = false;
            this.product = {};
        }
    }

    isMobileDevice(): boolean {
        // Check user agent string for common mobile device keywords
        const userAgent: string = navigator.userAgent.toLowerCase();
        const mobileKeywords: RegExp = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
        const isMobileUA: boolean = mobileKeywords.test(userAgent);
    
        // Check screen width (common mobile threshold is 768px)
        const isMobileWidth: boolean = window.innerWidth <= 768;
    
        // Return true if either user agent or screen width indicates mobile
        return isMobileUA || isMobileWidth;
    }
    
}
