import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Staff } from 'src/app/shared/model/staff';

@Component({
  selector: 'app-view-all-staff',
  templateUrl: './view-all-staff.component.html',
  styleUrls: ['./view-all-staff.component.css']
})
export class ViewAllStaffComponent implements OnInit {
  staffDisplayedColumns: string[] = ['name', 'contact', 'gender','role'];
  staffDataSource !: MatTableDataSource<Staff>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  @Input() allStaffDetails !: Staff[];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.staffDataSource = new MatTableDataSource(this.allStaffDetails);
    this.staffDataSource.paginator = this.paginator;
    this.staffDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.staffDataSource.filter = filterValue.trim().toLowerCase();

    if (this.staffDataSource.paginator) {
      this.staffDataSource.paginator.firstPage();
    }
  }

}
