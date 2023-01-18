import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-addcustomer-page',
  templateUrl: './addcustomer-page.component.html',
  styleUrls: ['./addcustomer-page.component.css']
})
export class AddcustomerPageComponent implements OnInit {
  email:string = "";
  emailTo:string = "";
  customerForm: FormGroup;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private crudService: CrudService) {
      this.customerForm = this.formBuilder.group({
        customer_name: [''],
        customer_email: [''],
        customer_phone: [''],
        customer_address: ['']
      })
    }
    ngOnInit(): void {}
    onSubmit():any{
      this.crudService.AddData(this.customerForm.value).subscribe((res:any)=>{
        console.log("Data Recorded Successfully!");
        this.ngZone.run(()=>{
          this.router.navigateByUrl('/checkout')
        },(err:any) => {
          console.log(err);
        })
      })
    }
}
