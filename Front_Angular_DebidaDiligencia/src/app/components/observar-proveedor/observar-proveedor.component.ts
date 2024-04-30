import { Component, Input, OnInit, inject } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor.service';
import countryData from 'src/assets/json/countries.json';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { proveedor } from 'src/app/models/proveedor';
import { HttpClient } from '@angular/common/http';
import { pais } from 'src/app/models/pais';
import { Observable, map, startWith } from 'rxjs';


@Component({
  selector: 'app-observar-proveedor',
  templateUrl: './observar-proveedor.component.html',
  styleUrls: ['./observar-proveedor.component.css'],
})
export class ObservarProveedorComponent implements OnInit {
  
  public idProveedor!: number;
  private paisesLista: pais[] = [];
  private paisSelect: any;
  private validatorAlfanumerico = Validators.pattern(/^[a-zA-Z0-9\s]+$/);
  private validatorNumerico = Validators.pattern(/^[0-9]+$/);
  private proveedorService = inject(ProveedorService);
  public formBuilder = inject(FormBuilder);

  public formCrearProveedor: FormGroup = new FormGroup({
    razonSocial: new FormControl(null, [Validators.required, this.validatorAlfanumerico]),
    nombreComercial: new FormControl(null, this.validatorAlfanumerico),
    identificacionTributaria: new FormControl(null, [Validators.maxLength(11), this.validatorNumerico]),
    numeroTelefonico: new FormControl(null, [Validators.maxLength(20), Validators.pattern(/^\+?[0-9\-\(\)\s]+$/)]),
    correoElectronico: new FormControl(null, Validators.email),
    sitioWeb: new FormControl(null,),
    direccionFisica: new FormControl(null,),
    pais: new FormControl(null,),
    facturacionAnualDolares: new FormControl(null, Validators.pattern(/^-?\d{1,8}(\.\d{2})?$/)),
    
  })

  autocompleteControl = new FormControl<string | pais>('');
  filteredOptions?: Observable<pais[]>;

  constructor(private router:Router, private route:ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {

    this.idProveedor = this.route.snapshot.params["id"];

    for (let country of countryData){
      let tempPais: pais = {
        country_name: country.country_name,
        country_code: country.country_code
      }
      this.paisesLista.push(tempPais);
    }

    this.filteredOptions = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const country_name = typeof value === 'string' ? value : value?.country_name;
        return country_name ? this._filter(country_name as string) : this.paisesLista.slice();
      }),
    );
    

    if (this.idProveedor != 0){
      this.proveedorService.obtener(this.idProveedor).subscribe({
        next: (data) => {
          this.formCrearProveedor.patchValue({
            idProveedor: this.idProveedor,
            razonSocial: data.razonSocial,
            nombreComercial: data.nombreComercial,
            identificacionTributaria: data.identificacionTributaria,
            numeroTelefonico: data.numeroTelefonico,
            correoElectronico: data.correoElectronico,
            sitioWeb: data.sitioWeb,
            direccionFisica: data.direccionFisica,
            pais: data.pais,
            facturacionAnualDolares: data.facturacionAnualDolares,
            fechaUltimaEdicion: data.fechaUltimaEdicion
          })
        }, error: (err) => {
          console.log(err.message)
        }
      })
    }
  }

  enviarProveedor(){
    const obj: proveedor = {
      idProveedor: this.idProveedor,
      razonSocial: this.formCrearProveedor.value.razonSocial,
      nombreComercial: this.formCrearProveedor.value.nombreComercial,
      identificacionTributaria: this.formCrearProveedor.value.identificacionTributaria,
      numeroTelefonico: this.formCrearProveedor.value.numeroTelefonico,
      correoElectronico: this.formCrearProveedor.value.correoElectronico,
      sitioWeb: this.formCrearProveedor.value.sitioWeb,
      direccionFisica: this.formCrearProveedor.value.direccionFisica,
      pais: this.formCrearProveedor.value.pais,
      facturacionAnualDolares: this.formCrearProveedor.value.facturacionAnualDolares,
      fechaUltimaEdicion: new Date(Date.now()),
    }

    if (this.idProveedor != 0){
      this.proveedorService.editar(obj).subscribe({
        next: (data) => {
          if (data.responseState){
            this.routeListarProveedor();
          } else {
            alert("Error al editar el proveedor" + obj.razonSocial)
          }
        }, error: (err) => {
          console.log(err.message)
        }
      })
    } else {
      this.proveedorService.crear(obj).subscribe({
        next: (data) => {
          if (data.responseState){
            this.routeListarProveedor();
          } else {
            alert("Error al crear nuevo proveedor")
          }
        }, error: (err) => {
          console.log(err.message)
        }
      })
    }
  }

  routeListarProveedor(){
    this.router.navigate(['/'])
  }

  TESTenviar(){
    console.log(this.formCrearProveedor);
  }

  private _filter(country_name: string): pais[] {
    const filterValue = country_name.toLowerCase();

    return this.paisesLista.filter(option => option.country_name.toLowerCase().includes(filterValue));
  }

}
