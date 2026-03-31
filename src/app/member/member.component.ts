import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/Models/Member';
import { MemberService } from 'src/Services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  // Saisir un tableau de membres
  displayedColumns: string[] = ['ID', 'CIN', 'Name', 'Type', 'CV', 'CreatedDate', 'Action'];

  // Utiliser MatTableDataSource pour le filtrage et la pagination
  dataSource = new MatTableDataSource<Member>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private MS: MemberService, private dialog: MatDialog) { }

  // Methode appelee au demarrage du composant
  ngOnInit() {
    this.MS.GetAllMembers().subscribe(members => {
      this.dataSource.data = members;
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

  deleteMember(member: Member) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.MS.deleteMember(member.id!).subscribe(() => {
          this.MS.GetAllMembers().subscribe((res) => {
            this.dataSource.data = res;
          });
        });
      }
    });
  }

  editMember(member: any) {
    console.log('Edit member:', member);
    // TODO: Implémenter la navigation vers un formulaire d'édition
    alert('Fonctionnalité d\'édition à implémenter');
  }
}