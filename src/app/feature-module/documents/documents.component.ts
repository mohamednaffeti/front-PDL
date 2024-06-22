import { Component, OnInit,HostListener, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  public innerHeight: any;
  public addSalaireForm: FormGroup | any;
  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone , public router: Router, private formBuilder: FormBuilder) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  

  ngOnInit() {
    this.addSalaireForm = this.formBuilder.group({
      description: ["", [Validators.required]],
      value: ["", [Validators.required]],
      status: ["", [Validators.required]],
      date: ["", []],
      user: [{}, [Validators.required]],
    });
  }

  onResize(event: any) {
    this.innerHeight = event.target.innerHeight + 'px';
  }
}

