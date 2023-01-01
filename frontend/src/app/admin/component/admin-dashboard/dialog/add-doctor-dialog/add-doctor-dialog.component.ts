import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
  styleUrls: ['./add-doctor-dialog.component.css']
})
export class AddDoctorDialogComponent implements OnInit {

  doctor : FormGroup;
  constructor(private fb : FormBuilder, private dialogRef: MatDialogRef<AddDoctorDialogComponent>) {
    this.doctor = fb.group({
      email: [Validators.required, Validators.email],
      fullName:  [Validators.required],
      password: [Validators.required, Validators.minLength(6)],
      contactNo : [Validators.required]
    });
  }

  ngOnInit(): void {
    this.doctor = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contactNo : new FormControl('', [Validators.required,])
    });
  }

  addDoctor() {
    this.dialogRef.close(this.doctor.value);
  }

}
