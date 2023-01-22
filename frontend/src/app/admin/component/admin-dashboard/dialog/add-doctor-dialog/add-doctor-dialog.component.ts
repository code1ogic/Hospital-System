import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
  styleUrls: ['./add-doctor-dialog.component.css']
})
export class AddDoctorDialogComponent implements OnInit {
  gender : string[] = ['Male','Female', 'Other']
  departments : string[] = ['Cardiology','Radiology','Neurology','Orthopedic','OPD']
  degree : string[] = ['MBBS','MD','BDS','MDS']
  doctor : FormGroup;
  constructor(private fb : FormBuilder, private dialogRef: MatDialogRef<AddDoctorDialogComponent>) {
    this.doctor = fb.group({
      email: [Validators.required, Validators.email],
      name:  [Validators.required],
      password: [Validators.required, Validators.minLength(6)],
      contact : [Validators.required],
      gender : [Validators.required],
      department : [Validators.required],
      degree : [Validators.required],
    });
  }

  ngOnInit(): void {
    this.doctor = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contact : new FormControl('', [Validators.required,]),
      gender : new FormControl('', [Validators.required,]),
      department : new FormControl('', [Validators.required,]),
      degree : new FormControl('', [Validators.required,])
    });
  }

  addDoctor() {
    this.dialogRef.close(this.doctor.value);
  }

}
