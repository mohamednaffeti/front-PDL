import { Component, OnInit, ViewChild  , AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/core.index';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from 'src/app/services/projectService/project.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/userService/user.service';
import { TeamService } from 'src/app/services/teamService/team.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-teams-content',
  templateUrl: './teams-content.component.html',
  styleUrls: ['./teams-content.component.scss']
})
export class TeamsContentComponent implements AfterViewInit {
  public addTeamForm: FormGroup | any;
  public editTeamForm: FormGroup | any;
  @ViewChild('closeModel') closeModel: any
  @ViewChild('affectModel') affectModel: any

  @ViewChild('closeModelAddEmpl') closeModelAddEmpl: any
  role = sessionStorage.getItem('role')
  @ViewChild('closeModeledit') closeModeledit: any
  teams: any = []
  users: any
  employees: any = []
  managers: any = []
  addEmployee: any
  manager : any = []
  public rows = [];
  public srch = [];
  selectManger: any
  nameTeam: any
  me: any
  usersList: any = []
  fruits: any[] = [
    { value: 'apple', viewValue: 'Apple' },
    { value: 'banana', viewValue: 'Banana' },
    { value: 'orange', viewValue: 'Orange' },
    { value: 'strawberry', viewValue: 'Strawberry' },
    { value: 'grape', viewValue: 'Grape' }
  ];
  constructor(
    public router: Router,
    private dataservice: DataService,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private teamService: TeamService,
  ) {
    if (sessionStorage.getItem('roles') && !sessionStorage.getItem('roles')?.includes('ADMIN')) {
      this.getMe()
    }
    this.getAllUsers()

    this.getAllTeams()
  }
  ngAfterViewInit(): void {
    if (sessionStorage.getItem('roles') && !sessionStorage.getItem('roles')?.includes('ADMIN')) {
      this.getMe()
    }
  }
  ngOnInit(): void {

    this.addTeamForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      users: [[], [Validators.required]],

    });

    //Edit Projects Form
    this.editTeamForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      id: ["", [Validators.required]],
      users: [[], [Validators.required]],
      manager: [{}]

    });


  }

  getMe() {
    this.userService.getUserById(sessionStorage.getItem('id')).subscribe(res => {
      console.log('me', res)
      this.me = res
      this.manager.push(this.me)
    })
  }

  addEmployeeTeam() {
    console.log(this.addEmployee);
    this.userService.affectUserToTeam(this.nameTeam.id, this.addEmployee.id, "affect").subscribe(res => {
      console.log(res)
      Swal.fire(
        'Good job!',
        'You added a employee!',
        'success'
      ).then(() => {

        this.affectModel.nativeElement.click()
        this.getUserForTeams(this.nameTeam.id)
        window.location.reload()
      })
    })


  }

  deleteEmployeTeam(id: any) {
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
        this.userService.affectUserToTeam(this.nameTeam.id, id, "delete").subscribe(res => {
          console.log(res)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.getUserForTeams(this.nameTeam.id)
            window.location.reload()
          })
        })
      }
    })
    
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(res => {


      this.users = res
      this.employees = this.users.filter((i: any) => {
        return (i.roles[0].id == 3 && !i.team)
      })
      console.log('users', this.users);
      console.log('employees', this.employees);

      this.managers = this.users.filter((i: any) => {
        return i.roles[0].id == 2
      })
      console.log('managers', this.managers);
    })
  }

  onManagerChange(event: any) {

    this.addTeamForm.value.users = this.addTeamForm.value.users.filter((i: any) => {
      return i.designation !== "MANAGER"
    })
    this.addTeamForm.value.users.push(event.value)
    console.log(this.addTeamForm.value.users)
  }

  getAllTeams() {
    this.teamService.getTeams().subscribe(res => {
      console.log(res)
      this.teams = res
     
    })
  }

  showTeam(data: any) {
    this.nameTeam = data
    this.getUserForTeams(data.id)

  }
  getUserForTeams(id: any) {
    this.userService.getUsersByTeam(id).subscribe(res => {
      this.usersList = res
    })
   
  }


  deleteTeam(data: any) {
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
        this.teamService.deleteTeam(data).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(() => {
            this.getAllTeams()
          })
        })

      }
    })
  }





  addTeam() {

    // const obj = {
    //   "name" : 
    // }
    this.addTeamForm.value.users.push(this.me)
    console.log(this.addTeamForm.value);
    this.teamService.addTeams(this.addTeamForm.value ).subscribe(res => {
      console.log(res)
      Swal.fire(
        'Good job!',
        'You added a team!',
        'success'
      ).then(() => {

        this.closeModel.nativeElement.click()
        window.location.reload()
      })
    })

  }

  filterName(data: any) {
    console.log(data.target.value)
    if (data.target.value == '') {
      console.log('HERE')
      this.getAllTeams()
    } else {
      this.teamService.getTeams().subscribe(
        (response) => {
          var fullName = data.target.value
          console.log('response', response)
          this.teams = response;
          this.teams = this.teams.filter((item: any) => {
            return (item.name.toLowerCase().includes(fullName.toLowerCase()))
          });
        }
      )
    }
  }

  editTeam() {






    this.teamService.editTeam(this.editTeamForm.value).subscribe(res => {
      
      console.log(res)
      Swal.fire(
        'Good job!',
        'You updated a team!',
        'success'
      ).then(() => {
        this.teams = []
        this.getMe()
        this.getAllTeams()
        if (sessionStorage.getItem('roles')?.includes('MANAGER') || sessionStorage.getItem('roles')?.includes('EMPLOYEE')) {
          this.me.team = res
        }

        this.closeModeledit.nativeElement.click()
      })
    })
  }

  openEdit(data: any) {
    console.log("data", data)




    this.editTeamForm.patchValue({
      name: data.name,
      id: data.id,

    })
    console.log(this.editTeamForm)
  }


}
