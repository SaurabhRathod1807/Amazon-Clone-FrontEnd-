import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { AdminactionComponent } from './adminaction/adminaction.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [

    {path:"register", component:RegisterComponent},
    {path:"login", component:LoginComponent},
    {path:"product", component:ProductComponent},
    {path:"order", component:OrderComponent},
    {path:"cart", component:CartComponent},
    {path:"admin", component:AdminComponent},
    {path:"adminaction", component:AdminactionComponent},
    {path: '', redirectTo:'product', pathMatch:'full' },
    {path:'logout', component:LogoutComponent}
];
