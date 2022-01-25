import { Injectable } from '@angular/core';
import { AngularFireDatabase,  } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Product } from './model/model-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any){
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products')
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as Product;
                    const id = c.payload.key;
                    return { id, ...data };
                })
            )
        );
}

  get(productId: string){
    return this.db.object('/products/' +productId).valueChanges();
  }

  update(productId: string, product: Partial<unknown>){
    this.db.object('/products/' + productId).update(product)
  }

  delete(productId: string){
    return this.db.object('/products/' + productId).remove();
  }


  
}
