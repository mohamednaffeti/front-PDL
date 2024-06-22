import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/core.index';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from 'src/app/services/projectService/project.service';
import Swal from 'sweetalert2';
import { TeamService } from 'src/app/services/teamService/team.service';
import { ClientServiceService } from 'src/app/services/clientService/client-service.service';

@Component({
  selector: 'app-project-content',
  templateUrl: './project-content.component.html',
  styleUrls: ['./project-content.component.scss']
})
export class ProjectContentComponent implements OnInit {
  public addProjectForm: FormGroup | any;
  public editProjectForm: FormGroup | any;
  @ViewChild('closeModel') closeModel: any
  role = sessionStorage.getItem('role')
  projects : any
  teams : any
  clients : any
  selectedTeam:any
  public rows = [];
  public srch = [];
  constructor(
    public router: Router, 
    private dataservice: DataService, 
    private formBuilder: FormBuilder, 
    private projectService: ProjectService ,   
    private teamService : TeamService,
    private clientService: ClientServiceService

    ) {
   
  }
  ngOnInit(): void {
    this.getProjects()
    this.getTeams()
    this.getClient()
    this.addProjectForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      team: ["", [Validators.required]],
      client: ["", [Validators.required]],
      // projectDescription: ["", [Validators.required]],
      // projectPriority: ["", [Validators.required]],
      // projectLeader: ["", [Validators.required]],
      // addTeamMembers: ["", [Validators.required]],
      // projectId: ["", [Validators.required]],
      // id: ["", [Validators.required]],
    });

    //Edit Projects Form
    this.editProjectForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      // editProjectDescription: ["", [Validators.required]],
      // editProjectPriority: ["", [Validators.required]],
      // editaddTeamMembers: ["", [Validators.required]],
      // editProjectId: ["", [Validators.required]],
      // editId: ["", [Validators.required]],
    });
    
    
  }

  getTeams(){
    this.teamService.getTeams().subscribe(res=>{
      this.teams = res
    })
  }

  getClient(){
    this.clientService.getClients().subscribe(res=>{
      this.clients = res

    })
  }


  getProjects() {
    this.projectService.getProjects().subscribe(res => {
      console.log(res)
      this.projects = res
      this.projects.map((i:any)=>{
        i.endDate = new Date(i.endDate)
      })
      
    })
  }

  deleteProjet(id : any){
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
        this.projectService.deleteProject(id).subscribe(res=>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          ).then(()=>{
            this.getProjects()
          })
        })
       
      }
    })
  }

  addProject(){
    console.log(this.addProjectForm.value);
    this.projectService.addProject(this.addProjectForm.value ).subscribe(res=>{
      console.log(res)
      Swal.fire(
        'Good job!',
        'You added an user!',
        'success'
      ).then(() => {
        this.closeModel.nativeElement.click()
        this.getProjects()
      })
    })
    
  }

  filterName(data:any){
    console.log(data.target.value )
    if (data.target.value == '') {
      console.log('HERE')
      this.getProjects()
    } else {
      this.projectService.getProjects().subscribe(
        (response) => {
          var fullName = data.target.value
          console.log('response', response)
          this.projects = response;
          this.projects = this.projects.filter((item: any) => {
           return item.name.toLowerCase().includes(fullName.toLowerCase())
          });
        }
      )
    }
  }

  editProject(){
    console.log(this.editProjectForm.value)
  }

  openEdit(data: any) {
    console.log(data)
    this.editProjectForm.value = data
  }

}
