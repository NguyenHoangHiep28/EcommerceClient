import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './user/layout/header/header.component';
import {FooterComponent} from './user/layout/footer/footer.component';
import {HomeComponent} from './user/home/home.component';
import {ShopComponent} from './user/shop/shop.component';
import {SidebarComponent} from './user/layout/sidebar/sidebar.component';
import { ProductsService } from './user/services/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './admin/orders/checkout.component';
import { OrdersService } from './admin/services/orders.service';
import { CartComponent } from './user/cart/cart.component';
import { CartService } from './user/services/cart.service';
import { OrderCheckoutComponent } from './user/order-checkout/order-checkout.component';
import { LoginComponent } from './user/layout/login/login.component';
import { RegisterComponent } from './user/layout/register/register.component';
import { AuthInterceptor } from './user/services/authIntercepter';
import { TokenStorageServiceService } from './user/services/token-storage-service.service';
import { Router } from '@angular/router';
import { AuthCheckService } from './user/services/auth-check.service';
import { AuthGuardService } from './user/services/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    SidebarComponent,
    CheckoutComponent,
    CartComponent,
    OrderCheckoutComponent,
    LoginComponent,
    RegisterComponent,
    UserInfoComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductsService,
    OrdersService,
    CartService,
    TokenStorageServiceService,
    AuthCheckService,
    AuthGuardService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
