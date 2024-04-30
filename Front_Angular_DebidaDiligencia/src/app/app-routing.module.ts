import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProveedorComponent } from './components/lista-proveedor/lista-proveedor.component';
import { ObservarProveedorComponent } from './components/observar-proveedor/observar-proveedor.component';

const routes: Routes = [
  {path: "", component: ListaProveedorComponent },
  {path: "proveedor/:id", component: ObservarProveedorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
