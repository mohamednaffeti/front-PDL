import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/services/salaryService/salary.service';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-all-request-salary',
  templateUrl: './get-all-request-salary.component.html',
  styleUrls: ['./get-all-request-salary.component.scss']
})
export class GetAllRequestSalaryComponent implements OnInit {
  me: any
  salaryRequest: any
  salarie:any
  constructor(private userService: UserService, private salaryService: SalaryService) {
    if (sessionStorage.getItem('roles')) {
      this.userService.getUserById(sessionStorage.getItem('id')).subscribe((res: any) => {
        console.log('me', res)
        this.me = res
        // this.userService

      })
    }
  }
  ngOnInit(): void {
    this.getAllSalary()
  }

  getAllSalary() {
    this.salaryService.getSalary().subscribe(res => {
      console.log(res)
      this.salarie = res
      this.salarie = this.salarie.filter((item : any)=>{
        return item.status == 'IN_PROGRESS'
      })

      this.salarie = this.salarie.filter((item : any)=>{
        return item.user.team?.id == this.me.team?.id
      })
    })
  }

  Accept(data : any , status :any){
    
    
    // console.log(status);
    data.status = status
    console.log(data);
    this.salaryService.editSalary(data).subscribe(res=>{
      console.log(res)
      Swal.fire(
        'CHANGED!',
        'Your file has been changed.',
        'success'
      ).then(()=>{
        window.location.reload()
      })
    })
  }
}
