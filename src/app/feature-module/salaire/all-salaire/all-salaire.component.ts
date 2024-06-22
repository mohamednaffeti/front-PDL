import { Component, OnInit, ViewChild } from '@angular/core';
import { SalaireService } from 'src/app/services/salaireService/salaire.service';
import { UserService } from 'src/app/services/userService/user.service';
import Swal from 'sweetalert2';
class Salaire {
  id: any
  dateFrom: any
  dateTo: any
  value: any
  user: any
}
@Component({
  selector: 'app-all-salaire',
  templateUrl: './all-salaire.component.html',
  styleUrls: ['./all-salaire.component.scss']
})
export class AllSalaireComponent implements OnInit {
  me: any
  users: any
  employees: any
  salaryRequest: any
  salarie: any
  idToEdit: any
  employeeId: any
  addForm = new Salaire()

  @ViewChild('closeButton') closeButton: any
  @ViewChild('closeButtonEdit') closeButtonEdit: any
  constructor(private userService: UserService, private salaryService: SalaireService) {
    if (sessionStorage.getItem('roles')) {
      this.userService.getUserById(sessionStorage.getItem('id')).subscribe((res: any) => {
        console.log('me', res)
        this.me = res
        // this.userService

      })
    }
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {


      this.users = res
      this.employees = this.users.filter((i: any) => {
        return (i.roles[0].id == 3)
      })
      if (this.me.roles[0].id !== 1) {
        this.employees = this.employees.filter((i: any) => {
          return (this.me.team?.id == i.team?.id)
        })
      }


    })
    this.getAllSalary()

  }

  deleteSalaire(id: any) {
    console.log(id);
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
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  addSlaire() {

    this.addForm.user = this.employeeId
    console.log(this.addForm);
    this.salaryService.addSalary(this.addForm).subscribe(res => {
      console.log(res);
      Swal.fire(
        'Good job!',
        'You added a request!',
        'success'
      ).then(() => {
        this.closeButton.nativeElement.click()
        this.getAllSalary()
        this.addForm = new Salaire()
      })


    })

  }
  putSalaire() {
    delete this.addForm.user
    this.salaryService.editSalaire(this.addForm, this.idToEdit).subscribe(res => {
      console.log(res);
      Swal.fire(
        'Good job!',
        'You added a request!',
        'success'
      ).then(() => {
        this.closeButtonEdit.nativeElement.click()
        this.getAllSalary()
        this.addForm = new Salaire()
      })


    })
  }

  editSalaire(item: any) {
    item.dateFrom = new Date(item.dateFrom)
    item.dateTo = new Date(item.dateTo)
    this.idToEdit = item.user.id


    this.addForm = item
    console.log(this.addForm)
  }

  getAllSalary() {
    this.salaryService.getSalary().subscribe(res => {
      console.log(res)
      this.salarie = res
      var role = sessionStorage.getItem('roles')
      if (this.me.roles[0].id !== 1) {
        this.salarie = this.salarie.filter((i: any) => {
          return this.me.team?.id == i.user.team?.id
        })
      }


    })
  }


}
