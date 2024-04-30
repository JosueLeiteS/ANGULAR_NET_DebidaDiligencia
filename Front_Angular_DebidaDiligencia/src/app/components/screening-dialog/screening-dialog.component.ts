import { Component, Inject, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dataOffshore, dataSanction, dataWorldbank } from 'src/app/models/webscraping/dataModels';
import { WebscraperService } from 'src/app/services/webscraper.service';
import { appsettings } from 'src/app/settings/appsettings';

@Component({
  selector: 'app-screening-dialog',
  templateUrl: './screening-dialog.component.html',
  styleUrls: ['./screening-dialog.component.css']
})
export class ScreeningDialogComponent {

  public searchQuery: string;
  private webscraperService =inject(WebscraperService);

  public authLogin: string = appsettings.webscraperApiUser;
  public authPass: string = appsettings.webscraperApiPass;
  
  public dataSourceOffshore: dataOffshore[];
  public displayedColumnsOffshore: string[] = ["entity", "jurisdiction", "linkedTo", "dataFrom"];
  public dataSourceWorldbank: dataWorldbank[];
  public displayedColumnsWorldbank: string[] = ["firstName", "address", "country", "periodFrom", "periodTo", "grounds"];
  public dataSourceSanction: dataSanction[];
  public displayedColumnsSanction: string[] = ["name", "address", "type", "programs", "list", "score"];

  public dataLoaded: boolean = false;

  pages = this._formBuilder.group({
    offshore: false,
    worldbank: false,
    sanction: false,
  });

  constructor(
    public dialogRef: MatDialogRef<ScreeningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
  ){
    this.searchQuery = data.searchQuery;

    this.dataSourceOffshore = [];
    this.dataSourceWorldbank = [];
    this.dataSourceSanction = [];
  }

  async screeningProveedor(login: string, pass: string, searchQuery: string){

    this.webscraperService.autentificar(login, pass).subscribe({
      next: (data:string) => {
        
        const auth: string = data;

        this.webscraperService.webscraper(searchQuery, auth).subscribe({
          next: (data) => {

            this.dataSourceOffshore = data.pagOffshore.response;
            this.dataSourceWorldbank = data.pagWorldbank.response;
            this.dataSourceSanction = data.pagSanction.response;

            this.dataLoaded = true;
          }
        })
      }
    })

    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
