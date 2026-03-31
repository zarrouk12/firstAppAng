import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/Models/Member';
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
// declaration de la variable form
form!: FormGroup;
editId: string | null = null;

constructor(
  private memberService: MemberService,
  private router: Router,
  private route: ActivatedRoute
) {}

// initialisation de la formulaire
ngOnInit() {
  this.form = new FormGroup({
    id: new FormControl(''),
    ID: new FormControl(''),
    CIN: new FormControl(''),
    Name: new FormControl(''),
    Type: new FormControl(''),
    CV: new FormControl(''),
    CreatedDate: new FormControl('')
  });

  // Check if we are in edit mode
  this.editId = this.route.snapshot.paramMap.get('id');
  if (this.editId) {
    this.memberService.getMemberById(this.editId).subscribe((member) => {
      this.form.patchValue(member);
    });
  }
}

submit(): void {
  if (this.editId) {
    this.memberService.updateMember(this.form.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  } else {
    this.memberService.postMember(this.form.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
}