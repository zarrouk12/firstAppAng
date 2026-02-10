import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/Member';
import { MembreService } from 'src/services/membre.service';

@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit {
  constructor(private MS: MembreService) {
    //inj de dependances
  }
  //declarer le tab des membres
  dataSource: Member[] = [];

  ngOnInit() {
    //fonc se lance automatiquement
    this.refreshMembers();
  }

  refreshMembers(): void {
    this.MS.GetAllMembers().subscribe((x) => {
      this.dataSource = x;
    });
  }

  // //saisir un tableau de membres
  // dataSource: Member[] = [
  //   {
  //     id: '1234',
  //     cin: '123144155',
  //     name: 'mawen',
  //     type: 'student',
  //     createdDate: '12/1/2026',
  //   },
  // ];
  displayedColumns: string[] = [
    'id',
    'name',
    'cin',
    'type',
    'cv',
    'createdDate',
    'actions',
  ];
}