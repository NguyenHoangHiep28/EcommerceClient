import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CheckoutComponent } from './admin/orders/checkout.component';
import {ShopComponent} from './user/shop/shop.component';
import { CartComponent } from './user/cart/cart.component';
import { OrderCheckoutComponent } from './user/order-checkout/order-checkout.component';
import { LoginComponent } from './user/layout/login/login.component';
import { RegisterComponent } from './user/layout/register/register.component';
import { AuthGuardService } from './user/services/auth-guard.service';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path : 'user', 
    component : UserComponent,
    children: [
      {
        path : 'shop',
        component : ShopComponent
      },
      {path : 'checkout', component:OrderCheckoutComponent},
      {
        path : 'cart', component: CartComponent,
      //  canActivate:[AuthGuardService]
      },
      {path : 'login', component:LoginComponent},
      {path : 'register', component:RegisterComponent},
      {path : 'account', component:UserInfoComponent}
    ]
  },
  {
    path : 'admin',
    component : AdminComponent,
    children : [
      {path: 'orders', component: CheckoutComponent},
    ]
  },
  {path: '', component: ShopComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
