import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/models/Member';
import { MembreService } from 'src/services/membre.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent {
  @Output() saved = new EventEmitter<Member>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private membreService: MembreService,
    private router: Router
  ) {}

  memberForm = this.formBuilder.nonNullable.group({
    cin: ['', Validators.required],
    name: ['', Validators.required],
    type: ['', Validators.required],
    cv: [''],
    createdDate: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }

    const member = this.memberForm.getRawValue();
    this.membreService.AddMember(member).subscribe((created) => {
      this.saved.emit(created);
      this.router.navigate(['/']);
    });
  }

  onCancel(): void {
    this.cancelled.emit();
    this.router.navigate(['/']);
  }

}
