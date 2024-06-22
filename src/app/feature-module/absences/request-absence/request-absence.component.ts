
import { Component, OnInit } from '@angular/core';
import { AbsencesService } from 'src/app/services/absenceService/absences.service';
import { SalaryService } from 'src/app/services/salaryService/salary.service';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-absence',
  templateUrl: './request-absence.component.html',
  styleUrls: ['./request-absence.component.scss']
})
export class RequestAbsenceComponent implements OnInit {
  me: any
  salaryRequest: any
  absence: any
  constructor(private userService: UserService, private absenceService: AbsencesService) {
    if (sessionStorage.getItem('roles')) {
      this.userService.getUserById(sessionStorage.getItem('id')).subscribe((res: any) => {
        console.log('me', res)
        this.me = res
        // this.userService

      })
    }
  }
  ngOnInit(): void {
    this.getAllAbsnece()
  }

  deleteReq(item:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.absenceService.deleteAbsences(item.id).subscribe(res=>{
          console.log(res)
          Swal.fire(
            'Good job!',
            'You deleted a request!',
            'success'
          ).then(() => {
            window.location.reload()
          })
         
        })
       
      }
    })
  
  }

  getAllAbsnece() {
    this.absenceService.getAbsences().subscribe(res => {
      console.log("ab", res)
      this.absence = res
      this.absence = this.absence.filter((i:any)=>i.status == "IN_PROGRESS")
      console.log("ab", this.absence)
    })
  }

  getNumberdays(dateone: any, datetwo: any) {
    const date1 = new Date(dateone);
    const date2 = new Date(datetwo);
    const timeDiff = Math.abs(Number(date2) - Number(date1));
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.floor(timeDiff / oneDay);
    return diffDays
  }

  Accept(data: any, status: any , user : any) {

    data.status = status
    var obj = {
      id: data.id,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      numberOfDays: data.numberOfDays,
      remainingLeaves: data.remainingLeaves,
      leaveReason: data.leaveReason,
      status: data.status,
      leaveType: data.leaveType,
      user : user
    }
   console.log(user);
   if(status == 'ACCEPT'){
    var nb = this.getNumberdays(data.dateFrom ,data.dateTo )
    user.daysConge = user.daysConge-nb
   }

    this.absenceService.editAbsences(obj , user.id).subscribe(res=>{
      console.log(res)
      Swal.fire(
        'Good job!',
        'You accepted a request!',
        'success'
      ).then(() => {
        this.userService.editUser(user).subscribe(res=>{
          console.log(res)
          this.getAllAbsnece()
        })
        
     
      })
    })
    // this.salaryService.editSalary(data).subscribe(res=>{
    //   console.log(res)
    // })
  }
}

