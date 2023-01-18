import { Component, NgZone, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  Customer:any = []
constructor(private crudApi:CrudService,
private ngZone: NgZone,
private router:Router) {  }

ngOnInit(): void {
this.crudApi.getCustomers().subscribe(res=>{
  console.log("response array",res);
  this.Customer = res;
    })
  }

deleteAll() {
  this.crudApi.deleteData().subscribe(res=>{
    this.Customer = res;
      })
  this.ngZone.run(()=>{
    this.router.navigateByUrl('/cart-page')
  },(err:any) => {
    console.log(err);
  })
}
}
