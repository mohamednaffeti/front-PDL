import { Component, OnInit } from '@angular/core';

import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { WebStorage } from 'src/app/core/services/storage/web.storage';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  public base ='';
  public page ='';
  public miniSidebar: boolean = false;
  role : any
  public baricon: boolean = false;
  constructor( private sideBar: SideBarService, private router : Router, private web : WebStorage) {
    this.sideBar.toggleSideBar.subscribe((res: any) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.role = sessionStorage.getItem('role')
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        let splitVal = event.url.split('/');
        this.base = splitVal[1];
        this.page = splitVal[2];
        if (this.base === 'components' || this.page === 'tasks' || this.page === 'email') {
          this.baricon = false
          localStorage.setItem('baricon', 'false');
        }
        else {
          this.baricon = true
          localStorage.setItem('baricon', 'true');
        }
      }
    });
    if(localStorage.getItem('baricon')== 'true') {
      this.baricon = true;
    }
    else {
      this.baricon = false
    }
  }
  

  ngOnInit(): void {
  }
  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }


  public togglesMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }

  logout() {
    localStorage.removeItem("LoginData");
    this.router.navigate(["/login"]);
  }




}
