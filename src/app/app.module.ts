import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HomeComponent} from './home/home.component';
import {ShopComponent} from './shop/shop.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import { ProductsService } from './services/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutComponent } from './orders/checkout.component';
import { OrdersService } from './services/orders.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { AuthInterceptor } from './services/authIntercepter';
import { TokenStorageServiceService } from './services/token-storage-service.service';
import { Router } from '@angular/router';
import { AuthCheckService } from './services/auth-check.service';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfoComponent } from './user-info/user-info.component';

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
    UserInfoComponent
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
