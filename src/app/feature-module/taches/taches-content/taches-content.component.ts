import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { TacheService } from 'src/app/services/tacheService/tache.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-taches-content',
  templateUrl: './taches-content.component.html',
  styleUrls: ['./taches-content.component.scss']
})
export class TachesContentComponent {
  public addTacheForm: FormGroup | any;
  public editTacheForm: FormGroup | any;
  role = sessionStorage.getItem('role')
  @ViewChild('closeModel') closeModel: any
  @ViewChild('closeModelEdit') closeModelEdit: any
  users: any
  managers: any
  employee: any
  emp: any = []
  taches: any
  me :any
  taskStatus: any
  public rows = [];
  public srch = [];
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tacheService: TacheService

  ) {
    this.userService.getUserById(sessionStorage.getItem('id')).subscribe((res: any) => {
      console.log('me', res)
      this.me = res

      


    })
  }
  ngOnInit(): void {
    this.getTaches()
    this.getStatusTache()
    this.getAllUsers()
    this.addTacheForm = this.formBuilder.group({
      description: ["", [Validators.required]],
      title: ["", [Validators.required]],
      dueDate: ["", [Validators.required]],
      users: [{}, [Validators.required]],
      taskStatus: ["OPEN", [Validators.required]],
    });

    //Edit Projects Form
    this.editTacheForm = this.formBuilder.group({
      id: ["", [Validators.required]],
      description: ["", [Validators.required]],
      title: ["", [Validators.required]],
      dueDate: ["", [Validators.required]],
      users: [[], [Validators.required]],
      taskStatus: ["", [Validators.required]],
    });


  }






  getTaches() {
    this.tacheService.getTasks().subscribe(res => {
      this.taches = res
      console.log("get all taches", this.taches)
      
    })
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res
      console.log(this.users)
      this.employee = this.users.filter((i: any) => {
        return (i.roles[0].role == "EMPLOYEE" && this.me.team?.id == i.team?.id)
      })
    })
  }

  getStatusTache() {
    this.tacheService.getTaskStatus().subscribe(res => {
      console.log(res)
      this.taskStatus = res
    })
  }

  deleteProjet(id: any) {
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
        this.tacheService.deleteTask(id).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(() => {
            this.getTaches()
          })
        })

      }
    })
  }

  addTache() {
    console.log(this.addTacheForm.value);
    var id = this.addTacheForm.value.users.id
    delete this.addTacheForm.value.users
    this.tacheService.addTask(this.addTacheForm.value).subscribe(res => {
      console.log(res)
      Swal.fire(
        'Good job!',
        'You added a task!',
        'success'
      ).then(() => {
        this.closeModel.nativeElement.click()
        this.addTacheForm.reset()
        this.getTaches()
      })
    })

  }

  filterName(data: any) {
    console.log(data.target.value)
    if (data.target.value == '') {
      console.log('HERE')
      this.getTaches()

    } else {
      this.tacheService.getTasks().subscribe(response => {
        var fullName = data.target.value
        console.log('response', response)
        this.taches = response;
        this.taches = this.taches.filter((item: any) => {
          return item.title.toLowerCase().includes(fullName.toLowerCase())
        });
      })
    }
  }

  editProject() {
    // console.log(this.editProjectForm.value)
  }

  editTask() {
    console.log(this.editTacheForm.value)
    var id = this.editTacheForm.value.users
    delete this.editTacheForm.value.users
    this.tacheService.editTask(this.editTacheForm.value, id).subscribe(res => {
      console.log(res);
      Swal.fire(
        'Good job!',
        'You added a task!',
        'success'
      ).then(() => {
        this.closeModelEdit.nativeElement.click()
        this.editTacheForm.reset()
        window.location.reload()
      })

    })
  }

  openEdit(data: any) {

    this.editTacheForm.patchValue({
      title: data.title,
      description: data.description,
      taskStatus: data.taskStatus,
      dueDate: data.dueDate,
      id: data.id,
      users: data.users[0].id

    })
    console.log(this.editTacheForm.value)

  }
}
