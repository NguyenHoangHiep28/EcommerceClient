import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../admin/services/orders.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orders : any[] = [];
  p : number = 1;
  limit : number = 10;
  sortBy : string = "status";
  total : number = 0;
  itemsPerPage : number = 5;
  currentDate : string = new Date().toISOString().slice(0, 10);
  orderIdList : any[] = [];
  detail : any;
 filter : any = {
    createdDate: 'latest',
    status : -1,
    total : 'none',
    userName : null,
    phone : null,
    email : null,
    dateBetween : {
      startDate : null,
      endDate : null
    },
    orderId : null,
    productName : null
  }
  clearObj = {
    createdDate: 'latest',
    status : -1,
    total : 'none',
    userName : null,
    phone : null,
    email : null,
    dateBetween : {
      startDate : null,
      endDate : null
    },
    orderId : null,
  }
  filterDescription : string = "";
  constructor(private service : OrdersService, private modalService: NgbModal) { }
  updateFilterDescription() {
    this.filterDescription = "results for orders : ";
    let status:string = "";
    this.filterDescription += "SortBy:" + this.filter.createdDate;
    if(this.filter.status != -1) {
      switch(this.filter.status){
        case "0" : 
          status = "Rejected";
          break;
        case "1" :
          status = "Pending";
          break;
        case "2" : 
          status = "Processing";
          break;
        case "3" :
          status = "On-Delivery";
          break;
        case "4": 
          status = "Delivered";
          break;
      }
      this.filterDescription += "/Status:" + status;
    }
    if(this.filter.total !== "none"){
      this.filterDescription += "/total:" + this.filter.total;
    }
    if(this.filter.userName || this.filter.phone 
      || this.filter.email || this.filter.dateBetween.startDate 
      || this.filter.dateBetween.endDate || this.filter.orderId){
        this.filterDescription += "/SearchBy:";
        if(this.filter.userName) {
          this.filterDescription += "/UserName:" + this.filter.userName;
        }
        if(this.filter.phone) {
          this.filterDescription += "/Phone:" + this.filter.phone;
        }
        if(this.filter.dateBetween.startDate) {
          this.filterDescription += "/From:" + this.filter.dateBetween.startDate;
        }
        if(this.filter.dateBetween.endDate) {
          this.filterDescription += "/To:" + this.filter.dateBetween.endDate;
        }
        if(this.filter.orderId) {
          this.filterDescription += "/OrderId:" + this.filter.orderId;
        }
    }

  }
  openXl(content : any, orderId:string) {
    console.log(orderId)
   this.orders.forEach(order => {
      if(order.id == orderId) {
        this.detail = order;
      }
    })
    console.log(this.detail)
    this.modalService.open(content, { size: 'xl', animation : true});
  }
  ngOnInit(): void {
    this.updateFilterDescription();
    this.getOrders();
    this.updateOrderIdList();
  }

  
  getOrders() {
    let filerRequestBody = {
      page: this.p,
      limit : this.limit,
      status : this.filter.status,
      priceSorting : this.filter.total,
      timeSorting : this.filter.createdDate,
      startDate : this.filter.dateBetween.startDate,
      endDate : this.filter.dateBetween.endDate,
      orderId : this.filter.orderId,
      productName : this.filter.productName,
      customerName : this.filter.userName,
      customerPhone : this.filter.phone,
      customerEmail : this.filter.email,
    }
    console.log(filerRequestBody);
      this.service.getOrders(filerRequestBody).subscribe((response:any) => {
      this.orders = response.content;
      this.total = response.totalElements;
      console.log(this.orderIdList)
    })
  }
  updateOrderIdList() {
    this.orderIdList = this.orders.map(ord => ({
      orderId : ord.id,
      isChecked : false,
      isDisabled : false
    }))
  }
  pageChangeEvent(event: number){
    this.p = event;
    console.log(this.p);
    this.getOrders();
  }
  onSubmit(sortAndShow: NgForm) {
    this.p = 1;
    this.getOrders();
    this.updateFilterDescription();
  }
  clear() {
    this.p = 1
    this.limit = 10
    this.filter.status = -1
    this.filter.total = 'none'
    this.filter.createdDate = 'latest'
    this.filter.dateBetween.startDate = null
    this.filter.dateBetween.endDate = null
    this.filter.orderId = null
    this.filter.productName = null
    this.filter.userName = null
    this.filter.phone = null
    this.filter.email = null
    this.getOrders();
  }

}
