import { Component, ElementRef, OnInit, Directive } from '@angular/core';
import { CompanyvalidatorService } from '../services/companyvalidator.service';
import { Company } from '../models/company';
import { CompanyValidator } from '../models/companyvalidation';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companyvalidator',
  templateUrl: './companyvalidator.component.html',
  styleUrls: ['./companyvalidator.component.css']
})
export class CompanyvalidatorComponent implements OnInit {

  constructor(private companyService : CompanyvalidatorService, 
              private modalService: NgbModal,
              private router : Router
              ) { 
  }
  ngOnInit(): void {
  }
  // variables
  buttonsave : any;
  showError : boolean = false;
  doFade : boolean = false;
  errorMessage : string = '';
  btnActive : boolean = true;
  closeResult: string = '';
  validationerror : string = '';
  titlemodal : string = '';
  description : string = '';
  namebutton : string = '';
  colortitle = '';

  async check(id : string, modal: any ) {
    const result  = await this.companyService.checkData(id).toPromise();
    this.showModal(result.isValid, modal, result);
  }
  showModal(isValid: boolean, modal: any, result : CompanyValidator) {
    this.validationerror = isValid ? '' : result.reason;
    this.titlemodal = isValid ? 'Empresa Validada' : 'Error de Validación';
    this.description = isValid ? 'Empresa se valido correctamentamente, favor ingresar información.' : `No se pudo validar empresa porque : ${result.reason}.`;
    this.namebutton = isValid ? 'Ingresar' : 'Cerrar';
    this.colortitle = isValid ? 'turquoise' : 'sandybrown';

    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((resultmodal) => {
      isValid ? this.router.navigateByUrl('/savecompany') : '';
      this.closeResult = `Closed with: ${resultmodal}`;
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
}

