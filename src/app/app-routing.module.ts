import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyvalidatorComponent } from './companyvalidator/companyvalidator.component'; 
import { CompanydataComponent } from './companydata/companydata.component';

const routes: Routes = [
  { path: '', component: CompanyvalidatorComponent },
  { path: 'savecompany', component: CompanydataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }