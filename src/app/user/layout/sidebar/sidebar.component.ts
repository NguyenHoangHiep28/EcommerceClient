import {Component, OnInit} from '@angular/core';
import { CategoriesService } from 'src/app/user/services/categories.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  brands : any;
  categories : any;
  constructor(private service : CategoriesService) {
  }

  ngOnInit(): void {
    // this.getCategories();
    // this.getBrands();
  }
  getCategories() {
    this.service.getCategories().subscribe((response : any) => {
      this.categories = response
    })
  }
  getBrands() {
    this.service.getBrands().subscribe((response:any) => {
      this.brands = response
    });
  }
}
