import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyvalidatorService } from '../services/companyvalidator.service';
import { Company } from '../models/company';
import { typesId } from '../models/typeidenum';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-companydata',
  templateUrl: './companydata.component.html',
  styleUrls: ['./companydata.component.css']
})
export class CompanydataComponent implements OnInit {

  constructor(companyService : CompanyvalidatorService, 
              private form : FormBuilder,
              private router : Router,
              private modalService: NgbModal) {
    this.companyService = companyService;
   }
  //Variables
  typelist : Array<string> = [];
  seleccione = 'seleccione'; 
  disablednameperson = 'disabled';
  disablednamecompany = 'disabled';
  errortype = 'disabled';
  errorid = 'disabled';
  errorname = 'disabled';
  errorsecondname = 'disabled';
  errorcompany = 'disabled';
  errorlastname = 'disabled';
  colortitle = 'green';
  closeResult: string = '';
  CompanyData : Company = {
    Id: 0, 
    IdentificationType: '', 
    IdentificationNumber: 0, 
    CompanyName: '', 
    FirstName: '', 
    SecondName: '', 
    FirstLastName: '' 
   };
  dataRequest : Company = {
    Id: 0, 
    IdentificationType: '', 
    IdentificationNumber: 0, 
    CompanyName: '', 
    FirstName: '', 
    SecondName: '', 
    FirstLastName: '' 
  };
  Company : FormGroup = new FormGroup({});
  
  @ViewChild('selectid') select : any; 
  companyService : CompanyvalidatorService;
  ngOnInit(): void {
    this.Company = this.form.group
    ({
      Id: new FormControl(this.CompanyData.Id),
      IdentificationType: new FormControl(this.seleccione, Validators.required),
      IdentificationNumber: new FormControl('', [numberValidator]),
      CompanyName: new FormControl('', Validators.required),
      FirstName: new FormControl('', Validators.required),
      SecondName: new FormControl('', Validators.required),
      FirstLastName: new FormControl('', Validators.required)
  });
    for(let type in typesId) {
      if((!Number(type)) && type != '0'){
        this.typelist.push(type);
      }
    };
    
    function numberValidator(control: any): { [key: string]: boolean } | null {

      if (control.value !== undefined && !Number(control.value)) {
          return { 'IdentificationNumber': true };
      }
      return null;
    };
  }
  get f() { 
    return this.Company.controls; 
  }
  async insert(modal : any) {
    if (this.Company.controls.IdentificationType.invalid || this.Company.controls.IdentificationNumber.invalid || ((this.disablednamecompany !== 'disabled' && this.Company.controls.CompanyName.invalid) ||
      (this.disablednameperson !== 'disabled' && (
        this.Company.controls.FirstName.invalid ||
        this.Company.controls.SecondName.invalid ||
        this.Company.controls.FirstLastName.invalid)))) {
          this.errortype = this.Company.controls.IdentificationType.invalid ? '': 'disabled';
          this.errorid = this.Company.controls.IdentificationNumber.invalid ? '': 'disabled';
          this.errorname = this.disablednameperson !== 'disabled' && this.Company.controls.FirstName.invalid ? '' : 'disabled';
          this.errorsecondname = this.disablednameperson !== 'disabled' && this.Company.controls.SecondName.invalid ? '' : 'disabled';
          this.errorcompany = this.disablednamecompany !== 'disabled' && this.Company.controls.CompanyName.invalid ? '' : 'disabled';
          this.errorlastname = this.disablednameperson !== 'disabled' && this.Company.controls.FirstLastName.invalid ? '' : 'disabled';
      return;
  }
    this.CompanyData  = this.Company.value as Company;
    this.CompanyData.IdentificationNumber = Number.parseInt(this.CompanyData.IdentificationNumber.toString());
    const result = await this.companyService.insertData(this.CompanyData).toPromise();
    console.log(result);
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((resultmodal) => {
      this.closeResult = `Closed with: ${resultmodal}`;
      this.router.navigateByUrl('');
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  onValidateFields(evento : any){
    switch(evento.Company.value.IdentificationType){
      case 'NIT':
      case 'CE':
        this.disablednameperson = 'disabled';
        this.disablednamecompany = '';
      break;
      case '':
        this.disablednameperson = 'disabled';
        this.disablednamecompany = 'disabled';
      break;
      default:
        this.disablednameperson = '';
        this.disablednamecompany = 'disabled';
    }
  }
}

