import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { AbsencesService } from 'src/app/services/absenceService/absences.service';
import { UserService } from 'src/app/services/userService/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-absences-content',
  templateUrl: './absences-content.component.html',
  styleUrls: ['./absences-content.component.scss']
})

export class AbsencesContentComponent {
  lstEmployee: any
  absneceForm: any
  typeAbsence: any
  me: any
  allAbsence: any
  eventAbsence: any = []
  @ViewChild('closeModel') closeModel: any

  calendarOptions: CalendarOptions = {

    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    eventColor: 'blue',
    events: [
    ]
  };
  constructor(
    private userService: UserService,
    private absenceService: AbsencesService,
    public router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.getCurrentUser()
  }

  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }

  ngOnInit() {
    this.absneceForm = this.formBuilder.group({
      dateFrom: ["", [Validators.required]],
      dateTo: ["", [Validators.required]],
      leaveType: ["", [Validators.required]],
      status: ["IN_PROGRESS", []],
      user: [{}, []],

    });
    this.getListUsers()
    this.getAllAbsences()
    this.getType()


  }
  getListUsers() {
    this.userService.getUsers().subscribe(
      (response: any) => {
        console.log('response', response)
        this.lstEmployee = response;
        console.log(response)
      }
    )
  }

  getCurrentUser() {
    if (sessionStorage.getItem('roles')) {
      this.userService.getUserById(sessionStorage.getItem('id')).subscribe((res: any) => {
        console.log('me', res)
        this.me = res




      })
    }
  }

  getType() {
    this.absenceService.getTypeAbsences().subscribe(res => {
      this.typeAbsence = res
      console.log(res);

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

  addAbsence() {
    // this.absneceForm.value.user = this.me
    console.log(this.absneceForm.value)
    var nbDays = this.getNumberdays(this.absneceForm.value.dateFrom, this.absneceForm.value.dateTo)
    console.log(`Number of days between the two dates: ${nbDays}`);
    if (nbDays > this.me.daysConge) {
      Swal.fire(
        'Problème!',
        'Vous avez dépassé le nombre de conge disponible!',
        'error'
      )
    }else{
      this.absneceForm.value.user = this.me
      this.absenceService.addAbsences(this.absneceForm.value, this.me.id).subscribe(res => {
        console.log(res)
        Swal.fire(
          'Good job!',
          'You added an user!',
          'success'
        ).then(() => {
        
            this.closeModel.nativeElement.click()
            this.getAllAbsences()
         
        
          
        })
      })
    }
  
  }

  changeFormatDate(date: Date) {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd'); // Adjust the format string as needed
    console.log(formattedDate);
    return formattedDate
  }

  getAllAbsences() {
    this.absenceService.getAbsences().subscribe(res => {
      console.log(res)
      this.allAbsence = res
      this.allAbsence = this.allAbsence.filter((i: any) => {
        return i.status
      })
      if (this.me.roles[0].id == 3) {
        this.allAbsence = this.allAbsence.filter((i: any) => {
          return i.user.id == this.me.id
        })

      }
      if (this.me.roles[0].id == 2) {
        this.allAbsence = this.allAbsence.filter((i: any) => {
          return i.user.team?.id == this.me.team?.id
        })

      }

      this.allAbsence.map((i: any) => {

        i.dateFrom = this.changeFormatDate(new Date(i.dateFrom))
        i.dateTo = this.changeFormatDate(new Date(i.dateTo))
        console.log(i);
        var obj = {
          title: i.user.username,
          start: i.dateFrom,
          end: i.dateTo
        }
        this.eventAbsence.push(obj)
        this.calendarOptions.events = this.eventAbsence
      })
    })
  }
}

