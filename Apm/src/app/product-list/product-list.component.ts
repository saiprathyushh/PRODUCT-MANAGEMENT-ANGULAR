import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit ,OnDestroy{

  pageTitle:string='Product List';
  imageWidth:number=50;
  imageMargin:number=2;
  private _listFilter:string='';
  showImage:boolean=false;
  products:IProduct[]=[];
filteredProducts:IProduct[]=this.products;
  errorMessage: string='';
  sub!:Subscription;

constructor(private productService: ProductService){
  
}
  get listFilter() :string {
    return this._listFilter;
  }
  set listFilter(value:string){
    this._listFilter=value;
    console.log('in setter :',this._listFilter);
    this.filteredProducts=this.performFilter(value);
  }   
  ngOnInit(): void {
   this.sub=this.productService.getProducts().subscribe({
    next: products=>{
      this.products=products;
      this.filteredProducts=this.products;
    },
    error:err=> this.errorMessage=err
   });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
  toggleImage():void{
    this.showImage=!this.showImage;
  }

  performFilter(value:string):IProduct[]{
    value=value.toLocaleLowerCase();
      return this.products.filter((product:IProduct)=>
      product.productName.toLocaleLowerCase().includes(value));
    }
    onRatingClicked(message:string ):void{
      this.pageTitle='ProductList: '+message;
    }

}
