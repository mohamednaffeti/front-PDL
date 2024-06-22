import { Component, OnInit,HostListener, NgZone, ViewChild } from '@angular/core';

@Component({
  selector: 'app-salaire',
  templateUrl: './salaire.component.html',
  styleUrls: ['./salaire.component.scss']
})
export class SalaireComponent implements OnInit {
  public innerHeight: any;
 
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone ) {
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
