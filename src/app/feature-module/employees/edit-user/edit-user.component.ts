import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/userService/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent  implements OnInit{
@Input() userChild :any;
@Output() closeModalEvent = new EventEmitter();
userForm:FormGroup = new FormGroup({});

  constructor(
    private fb : FormBuilder,
    private userService: UserService
  ) {}
ngOnInit() {
  console.log(this.userChild,'thisuser')
  this.userForm = this.fb.group({
    id:[this.userChild.id],
    firstName:[this.userChild.firstName,[Validators.required]],
    lastName:[this.userChild.lastName,[Validators.required]],
    birthDay:[this.userChild.birthDay,[Validators.required]],
    address:[this.userChild.address,[Validators.required]],
    phone:[this.userChild.phone,[Validators.required]],
    reportsTo:[this.userChild.reportsTo,[Validators.required]],
    department:[this.userChild.department,[Validators.required]],
    designation:[this.userChild.designation,[Validators.required]],
  })
}

  submitForm(): void {
    console.log(this.userForm.value)
    this.userService.editUser(this.userForm.value).subscribe((res)=>{
      this.closeModalEvent.emit(res);
    })
  }
}
