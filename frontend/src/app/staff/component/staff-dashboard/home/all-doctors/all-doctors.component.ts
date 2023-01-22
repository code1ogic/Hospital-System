import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Doctor } from 'src/app/shared/model/doctor';
import { StaffDataService } from 'src/app/staff/service/staff-data.service';

@Component({
  selector: 'app-all-doctors',
  templateUrl: './all-doctors.component.html',
  styleUrls: ['./all-doctors.component.css']
})
export class AllDoctorsComponent implements OnInit {
  doctorDisplayedColumns: string[] = ['name', 'contact', 'department', 'degree', 'gender'];
  doctorDataSource !: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) doctorPaginator !: MatPaginator;
  @ViewChild(MatSort) doctorSort !: MatSort;

  doctorsList : Doctor[] = [];
  constructor(private staffDataService : StaffDataService) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.staffDataService.getAllDoctors().subscribe(res => {
      this.doctorsList = res;
      this.doctorDataSource = new MatTableDataSource(this.doctorsList);
      this.doctorDataSource.paginator = this.doctorPaginator;
      this.doctorDataSource.sort = this.doctorSort;
    }, err => {
      console.log('')
    })
  }

  applyDoctorFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.doctorDataSource.filter = filterValue.trim().toLowerCase();

    if (this.doctorDataSource.paginator) {
      this.doctorDataSource.paginator.firstPage();
    }
  }

}
