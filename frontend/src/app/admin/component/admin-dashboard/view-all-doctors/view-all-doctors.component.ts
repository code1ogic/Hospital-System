import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/admin/service/data.service';
import { Doctor } from 'src/app/shared/model/doctor';

@Component({
  selector: 'app-view-all-doctors',
  templateUrl: './view-all-doctors.component.html',
  styleUrls: ['./view-all-doctors.component.css']
})
export class ViewAllDoctorsComponent implements OnInit {
  doctorDisplayedColumns: string[] = ['name', 'contact', 'department', 'degree', 'gender'];
  doctorDataSource !: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) doctorPaginator !: MatPaginator;
  @ViewChild(MatSort) doctorSort !: MatSort;

  doctorsList : Doctor[] = [];
  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.dataService.getAllDoctors().subscribe(res => {
      this.doctorsList = res;
      console.log(res);
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
