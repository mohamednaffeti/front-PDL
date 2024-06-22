import { Component, HostListener, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.scss']
})
@HostListener('window: resize', ['$event'])
export class TachesComponent implements OnInit {
  public innerHeight: any;
  role = sessionStorage.getItem('role')
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
  }

  onResize(event: any) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

}
