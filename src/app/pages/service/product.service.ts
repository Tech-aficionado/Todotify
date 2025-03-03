import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface priority {
    label: string;
    value: string;
}

export interface Product {
    id?: number;
    username?: string;
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    due_date?: Date;
    created_at?: Date;
    updated_at?: Date;
    is_deleted? : number;
}

@Injectable()
export class ProductService {
    

}
