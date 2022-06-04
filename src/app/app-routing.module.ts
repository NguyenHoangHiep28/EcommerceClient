import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CheckoutComponent } from './orders/checkout.component';
import {ShopComponent} from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserInfoComponent } from './user-info/user-info.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'orders', component: CheckoutComponent},
  {
    path : 'cart', component: CartComponent,
  //  canActivate:[AuthGuardService]
  },
  {path : 'checkout', component:OrderCheckoutComponent},
  {path : 'login', component:LoginComponent},
  {path : 'register', component:RegisterComponent},
  {path : 'account', component:UserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
