import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-staff-dialog',
  templateUrl: './add-staff-dialog.component.html',
  styleUrls: ['./add-staff-dialog.component.css']
})
export class AddStaffDialogComponent implements OnInit {
  gender : string[] = ['Male','Female', 'Other']
  roles : string[] = ['Nerse','Receptionist','Ward Boy']
  staff : FormGroup;
  constructor(private fb : FormBuilder, private dialogRef: MatDialogRef<AddStaffDialogComponent>) {
    this.staff = fb.group({
      email: [Validators.required, Validators.email],
      name:  [Validators.required],
      password: [Validators.required, Validators.minLength(6)],
      contact : [Validators.required],
      gender : [Validators.required],
      role : [Validators.required]
    });
  }

  ngOnInit(): void {
    this.staff = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      contact : new FormControl('', [Validators.required,]),
      gender : new FormControl('', [Validators.required,]),
      role : new FormControl('', [Validators.required,])
    });
  }

  addStaff() {
    this.dialogRef.close(this.staff.value);
  }
}
