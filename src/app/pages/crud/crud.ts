import { style } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
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
import { priority, Product, ProductService } from '../service/product.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BadgeModule } from 'primeng/badge';
import { JsonpInterceptor } from '@angular/common/http';
import { BackendService } from '../service/backend.service';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ListboxModule } from 'primeng/listbox';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { AvatarModule } from 'primeng/avatar';
import { Popover, PopoverModule } from 'primeng/popover';

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
        DatePickerModule ,
        ButtonModule,
        RippleModule,
        ToastModule,
        FloatLabelModule ,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        PanelMenuModule,
        PopoverModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        BadgeModule,
        MultiSelectModule ,
        ListboxModule ,
        InputIconModule,
        OverlayBadgeModule,
        AvatarModule ,
        IconFieldModule,
        ConfirmDialogModule
    ],
    template: `
        <p-toolbar styleClass="mb-2">
            <ng-template #start>
                <p-button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
                <p-button severity="secondary" label="Delete" icon="pi pi-trash" outlined (onClick)="deleteSelectedProducts()" [disabled]="!selectedProducts || !selectedProducts.length" />
            </ng-template>

            <ng-template *ngIf="!isMobileDevice()" #end>
                <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template> 
            <ng-template *ngIf="isMobileDevice()" #end>
                <p-button type="button" icon="pi pi-filter" (onClick)="toggle($event)" />
            </ng-template>
            <p-popover #op>
        <div class="flex flex-col gap-4">
            <div>
                <span class="font-medium block mb-2">Select Status</span>
                <ul class="list-none p-0 m-0 flex flex-col">
                    <li *ngFor="let member of Statuses" class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border" (click)="selectMember(member.value)">
                        <div>
                            <span class="bg-black p-2 font-medium" style="border-radius: 10%">{{ member.label }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </p-popover>
            

        </p-toolbar>

        <p-table
            #dt
            [value]="products()"
            *ngIf="!isMobileDevice()"
            stripedRows
            [rows]="10"
            [columns]="cols"
            [loading]="loading"
            [paginator]="true"
            [globalFilterFields]="['title', 'description', 'priority', 'status']"
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
                    <th pSortableColumn="name" style="min-width:17rem">
                        Name
                        <p-sortIcon field="title" />
                    </th>
                    <th style="min-width:23rem">Description</th>
                    <th pSortableColumn="status" style="min-width:8rem">
                        Status
                        <p-columnFilter field="status" matchMode="in"  display="menu" [showMatchModes]="false" [showOperator]="false" [showAddButton]="false">
                        <ng-template #header>
                            <div class="px-4 pt-4 pb-0">
                                <span class="font-bold">Statuses</span>
                            </div>
                        </ng-template>
                        <ng-template #filter let-value let-filter="filterCallback">
                            <p-select [(ngModel)]="filterStatus"  [showClear]="true" [options]="Statuses" placeholder="Any" (onChange)="filterByStatus()" optionLabel="label" optionValue="value" >
                                <ng-template let-option #item>
                                    <div class="inline-block align-middle">
                                        <span class="ml-1 mt-1">{{ option.label }}</span>
                                    </div>
                                </ng-template>
                            </p-select>
                        </ng-template>
                    </p-columnFilter>
                    </th>
                    <th  style="min-width: 9rem">
                        Priority
                        
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
                    <td style="min-width: 1rem">{{ product.id }}</td>
                    <td style="min-width: 4rem">{{ product.title }}</td>
                    <td style="min-width: 20rem">
                    {{ product.description }}
                    </td>
                    <td>
                        <p-tag [value]="product.status" [severity]="getSeverity(product.status)" />
                    </td>
                    <td>
                        <p-tag [value]="product.priority" [severity]="getSeverity(product.priority)" />
                    </td>
                    <td>{{ product.created_at }}</td>
                    <td>
                    {{ product.due_date }}
                    </td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="editProduct(product)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-panelmenu 
  *ngIf="isMobileDevice()" 
  styleClass="w-full md:w-80" 
  [model]="panelMenuItems">
  <ng-template #item let-item>
    <a 
      pRipple 
      class="flex items-center px-4 py-2 cursor-pointer group justify-between w-full"
      [ngClass]="{'bg-hover': !item.expanded}"
    >
      <div class="flex w-full items-center justify-between">
        <!-- Left Section: Icon and Label -->
        <div class="flex items-center flex-grow">
          <i [class]="item.icon + ' text-primary group-hover:text-inherit mr-2'"></i>
          <span class="ml-1 truncate">{{ item.label }}</span>
        </div>

        <!-- Right Section: Status Tag, Buttons, and Avatar -->
        <div class="flex items-center gap-2">
          <p-tag 
            [value]="item.value" 
            *ngIf="item.value" 
            [severity]="getSeverity(item.value)" 
            [ngStyle]="{'max-width': '150px'}"
          />
          <p-button 
            *ngIf="item.edit" 
            icon="pi pi-pencil" 
            class="p-button-rounded p-button-outlined" 
            (click)="editProduct(item)"
          />
          <p-button 
            *ngIf="item.delete" 
            icon="pi pi-trash" 
            severity="danger" 
            class="p-button-rounded p-button-outlined" 
            (click)="console(item)"
          />
          <p-avatar 
            *ngIf="item.bg" 
            size="normal" 
            shape="circle" 
            [style]="{'background-color': item.bg}"
          />
        </div>
      </div>
    </a>
  </ng-template>
</p-panelmenu>
        <p-dialog stripedRows  [(visible)]="productDialog" [style]="{ 'width ': '550px','height': '500px' }" header="Product Details ( Real Time Update)" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6 mt-3">
                    
                    <div>
                        <p-floatlabel variant="on">
                            <input type="text" pInputText id="title" [(ngModel)]="product.title" autocomplete="off" required autofocus fluid />
                            <label for="title">Title</label>
                        </p-floatlabel>
                        <small class="text-red-500" *ngIf="submitted && !product.title">Title is required.</small>
                    </div>
                    <div>
                        <p-floatlabel variant="on">
                            <textarea  pTextarea id="description" rows="3"  cols="20" [(ngModel)]="product.description" autocomplete="off" autofocus fluid ></textarea>
                            <label for="description">Description</label>
                        </p-floatlabel>
                    </div>

                    <div>
    <p-floatlabel variant="on">
                            <p-select  [(ngModel)]="product.priority" 
        inputId="priority" 
        [options]="statuses" 
        optionLabel="label" 
        optionValue="value" 
        placeholder="Select a Priority" 
        fluid />
                            <label for="priority">Priority</label>
                        </p-floatlabel></div>

                    

                        <div>
                            <p-floatlabel variant="on">
    <p-datepicker [(ngModel)]="product.due_date" inputId="due_date" showIcon iconDisplay="input" fluid [showTime]="true" [hourFormat]="'24'" />
    <label for="due_date">Due Date</label>
</p-floatlabel>
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
    providers: [MessageService,BackendService, ProductService, ConfirmationService]
})
export class Crud implements OnInit {
    productDialog: boolean = false;

    products = signal<Product[]>([]);

    product!: Product;
    loading: boolean = false

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses: priority[] = [
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' }
    ];

    Statuses: priority[] = [
        { label: 'Missing', value: 'Missing' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Pending', value: 'Pending' }
    ];



    @ViewChild('dt') dt!: Table;
    @ViewChild('op') op!: Popover;

    toggle(event: any) {
        this.op.toggle(event);
    }

    selectMember(member: any) {
        this.filterStatus = member;
        this.op.hide();
        this.filterByStatus();
    }

    exportColumns!: ExportColumn[];

    cols!: Column[];
    filterStatus!: string
    dict:any[] = [];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
                public backend: BackendService,
                private cdr: ChangeDetectorRef
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }
    clear(table: Table) {
        table.clear();
        this.filterStatus = ''
    }


    filterByStatus(){
        this.loading = true
        const token = localStorage.getItem('access_token')
        this.backend.getTodosFilteredByStatus(token!,this.filterStatus).subscribe({
            next: (value: any) => {
                this.products.set(value['todos'])
                console.log(this.products)
                this.loading = false
                this.isMobileDevice() ? this.mobilePanelMenuMapper() : ''
                this.cdr.detectChanges();
        
                this.products().forEach((element)=>{
                    element.due_date = new Date(element.due_date as unknown as string);
                    element.created_at = new Date(element.created_at as unknown as string);
                })
            }
        });
    }



    ngOnInit() {
        this.loading = true
        this.loadData();
        window.addEventListener('resize', () => {
            this.isMobileDevice()
        });
    }
    console(id: any){
        this.messageService.add({
            severity: 'info',
            summary: JSON.stringify(id),
        });
    }
    panelMenuItems: any[] = []
    


    loadData() {
        const token = localStorage.getItem('access_token')
        this.backend.getTodos(token!).subscribe({
            next: (value: any) => {
                this.products.set(value['todos'])
                console.log(this.products)
                this.loading = false
                this.isMobileDevice() ? this.mobilePanelMenuMapper() : ''
                this.products().forEach((element)=>{
                    element.due_date = new Date(element.due_date as unknown as string);
                    element.created_at = new Date(element.created_at as unknown as string);
                })
            }
        });

        
            
        


        this.cols = [
            { field: 'id', header: 'Id', customExportHeader: 'Todo Id' },
            { field: 'title', header: 'Title' },
            { field: 'description', header: 'Description' },
            { field: 'status', header: 'Status' },
            { field: 'priority', header: 'Priority' },
            { field: 'created_at', header: 'Created At' },
            { field: 'due_date', header: 'due_date' }
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

     toTitleCase(str:any) {
        return str
          .toLowerCase()              // Convert entire string to lowercase first
          .split(' ')                 // Split into array of words
          .map((word: string) =>                // Capitalize first letter of each word
            word.charAt(0).toUpperCase() + word.slice(1)
          )
          .join(' ');                 // Join words back with spaces
      }

      mobilePanelMenuMapper() {
        this.dict = []; // Clear the existing items
        this.products().forEach((element) => {
            let innerChildrens: any[] = [];
            Object.entries(element).forEach(([key, value]) => {
                if (key != 'id' && key != 'username' && key != 'is_deleted') {
                    innerChildrens.push({ label: `${this.toTitleCase(key)}:`, value: value });
                }
            });
            this.dict.push({
                label: element.title,
                icon: 'pi pi-angle-right',
                bg: element.status === 'Completed' ? '#4DDF82' : element.status === 'Missing' ? '#F87171' : '#FB923C',
                items: innerChildrens
            });
        });
        this.panelMenuItems = [...this.dict]; // Create a new reference
        this.cdr.detectChanges();
    }
    

    deleteSelectedProducts() {
        // this.confirmationService.confirm({
        //     message: 'Are you sure you want to delete the selected products?',
        //     header: 'Confirm',
        //     icon: 'pi pi-exclamation-triangle',
        //     accept: () => {
        //         this.products.set(this.products().filter((val) => !this.selectedProducts?.includes(val)));
        //         this.selectedProducts = null;
        //         this.messageService.add({
        //             severity: 'success',
        //             summary: 'Successful',
        //             detail: 'Products Deleted',
        //             life: 3000
        //         });
        //     }
        // });
        this.messageService.add({
                        severity: 'success',
                        summary: JSON.stringify(this.selectedProducts)
                    });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    // deleteProduct(product: Product) {
    //     this.confirmationService.confirm({
    //         message: 'Are you sure you want to delete ' + product.name + '?',
    //         header: 'Confirm',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.products.set(this.products().filter((val) => val.id !== product.id));
    //             this.product = {};
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Successful',
    //                 detail: 'Product Deleted',
    //                 life: 3000
    //             });
    //         }
    //     });
    // }
    saveProduct(){
        console.log(this.product)
    }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products().length; i++) {
    //         if (this.products()[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

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
            case 'Completed':
                return 'success';
            case 'Pending':
                return 'warn';
            case 'Missing':
                return 'danger';
                
            case 'High':
                return 'success';
            case 'Medium':
                return 'warn';
            case 'Low':
                return 'danger';
            default:
                return 'info';
        }
    }

    // saveProduct() {
    //     this.submitted = true;
    //     let _products = this.products();
    //     if (this.product.name?.trim()) {
    //         if (this.product.id) {
    //             _products[this.findIndexById(this.product.id)] = this.product;
    //             this.products.set([..._products]);
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Successful',
    //                 detail: 'Product Updated',
    //                 life: 3000
    //             });
    //         } else {
    //             this.product.id = this.createId();
    //             this.product.image = 'product-placeholder.svg';
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Successful',
    //                 detail: 'Product Created',
    //                 life: 3000
    //             });
    //             this.products.set([..._products, this.product]);
    //         }

    //         this.productDialog = false;
    //         this.product = {};
    //     }
    // }

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
