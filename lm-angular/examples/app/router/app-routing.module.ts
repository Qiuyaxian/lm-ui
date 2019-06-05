import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../views/home/home.component'
import { GridComponent } from '../views/grid/grid.component'
import { CellComponent } from '../views/cell/cell.component'
import { SwitchComponent } from '../views/switch/switch.component'
import { DialogComponent } from '../views/dialog/dialog.component'
import { AlertComponent } from '../views/alert/alert.component'
import { ActionsheetComponent } from '../views/actionsheet/actionsheet.component'
import { PopupComponent } from '../views/popup/popup.component'
import { FlexboxComponent } from '../views/flexbox/flexbox.component'
import { PickerComponent } from '../views/picker/picker.component'
import { PopupPickerComponent } from '../views/popup-picker/popup-picker.component'


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'grid', component: GridComponent},
  { path: 'cell', component: CellComponent},
  { path: 'switch', component: SwitchComponent},
  { path: 'dialog', component: DialogComponent},
  { path: 'alert', component: AlertComponent},
  { path: 'actionsheet', component: ActionsheetComponent},
  { path: 'popup', component: PopupComponent},
  { path: 'flexbox', component: FlexboxComponent},
  { path: 'picker', component: PickerComponent},
  { path: 'popup-picker', component: PopupPickerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
