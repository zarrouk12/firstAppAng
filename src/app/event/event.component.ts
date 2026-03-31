import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/Services/evt.service';
import { Evt } from 'src/Models/Evt';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreateEvtComponent } from '../create-evt/create-evt.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  dataSource = new MatTableDataSource<Evt>();
  displayedColumns: string[] = ['id', 'Titre', 'DateDebut', 'DateFin', 'Lieu', 'Action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private EX: EventService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.EX.GetAllEvents().subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewEvent(evt: Evt) {
    // Open dialog in view-only mode
    this.dialog.open(CreateEvtComponent, {
      data: { event: evt, viewMode: true }
    });
  }

  OpenEdit(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id; 
    let x = this.dialog.open(CreateEvtComponent, dialogConfig)
    x.afterClosed().subscribe((Newwevt) => {
      if(Newwevt){
      this.EX.updateEvent(id, Newwevt).subscribe(() => {
        this.EX.GetAllEvents().subscribe((res) => {
          this.dataSource.data = res;
        });
      });
  }});
  }

  deleteEvent(evt: Evt) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.EX.deleteEvent(evt.id).subscribe(() => {
          this.loadEvents();
        });
      }
    });
  }

  open() {
    const dialogRef = this.dialog.open(CreateEvtComponent);
    dialogRef.afterClosed().subscribe((Newevt) => {
      if (Newevt) {
        this.EX.postEvent(Newevt).subscribe(() => {
          this.EX.GetAllEvents().subscribe((res) => {
            this.dataSource.data = res;
          });
        });
      }
    });
  }

  affectEvent(evt: Evt) {
    // TODO: implement affect/assign functionality
    console.log('Affect event:', evt);
  }
}
