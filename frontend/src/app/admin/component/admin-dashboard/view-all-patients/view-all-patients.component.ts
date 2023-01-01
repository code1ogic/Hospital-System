import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/shared/model/patient';
import { StaffDataService } from 'src/app/staff/service/staff-data.service';

@Component({
  selector: 'app-view-all-patients',
  templateUrl: './view-all-patients.component.html',
  styleUrls: ['./view-all-patients.component.css']
})
export class ViewAllPatientsComponent implements OnInit {
  patientDisplayedColumns : string[] = ['name', 'contact','gender' ]
  patientDataSource !: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) patientPaginator !: MatPaginator;
  @ViewChild(MatSort) patientSort !: MatSort;

  patientList : Patient[] = [];

  constructor(private staffDataService : StaffDataService) { }

  ngOnInit(): void {
    this.getAllPatients();
  }

  applyPatientFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patientDataSource.filter = filterValue.trim().toLowerCase();

    if (this.patientDataSource.paginator) {
      this.patientDataSource.paginator.firstPage();
    }
  }

  getAllPatients() {
    this.staffDataService.getAllPatients().subscribe(res => {
      this.patientList = res;
      this.patientDataSource = new MatTableDataSource(this.patientList);
      this.patientDataSource.paginator = this.patientPaginator;
      this.patientDataSource.sort = this.patientSort;
    }, err => {
      console.log('')
    })
  }
}
