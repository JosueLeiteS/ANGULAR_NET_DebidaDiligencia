import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ScreeningDialogComponent } from '../screening-dialog/screening-dialog.component';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.css']
})
export class ListaProveedorComponent {

  private proveedorService = inject(ProveedorService);
  public ListaProveedor : proveedor[] = [];
  public dataSource: MatTableDataSource<proveedor>;
  public displayedColumns: string[] = ["IdProveedor", "razonSocial", "nombreComercial", "identificacionTributaria", "sitioWeb", "fechaUltimaEdicion", "acciones"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router:Router, public dialog: MatDialog){
    this.listarProveedores();
    this.dataSource = new MatTableDataSource(this.ListaProveedor);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async listarProveedores(){
    this.proveedorService.listar().subscribe({
      next: (data) => {
        console.log(data);
        if (data.length > 0){
          this.ListaProveedor = data;
          
          this.dataSource = new MatTableDataSource(this.ListaProveedor);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } 
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  eliminarProveedor(obj: proveedor){
    if (confirm("Desea eliminar siguiente proveedor: " + obj.razonSocial)){
      this.proveedorService.eliminar(obj.idProveedor).subscribe({
        next: (data) => {
          if(data.responseState){
            this.listarProveedores();
          }else{
            alert("No se pudo eliminar al proveedor.")
          }
        },
        error: (err) => {
          console.log(err.message)
        }
      })
    }
  }

  routeCrearProveedor(){
    this.router.navigate(['/proveedor', 0])
  }

  routeEditarProveedor(obj: proveedor){
    this.router.navigate(['/proveedor', obj.idProveedor])
  }

  dialogScreeningProveedor(searchQuery: string){
    const dialogRef = this.dialog.open(ScreeningDialogComponent, {
      width:"100%",
      data: {searchQuery: searchQuery},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog para ' + searchQuery + " cerrado.")
    });
  }

}
