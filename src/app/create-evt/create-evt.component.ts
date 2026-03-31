import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/Services/evt.service';
import { Evt } from 'src/Models/Evt';

export interface DialogData {
  event?: Evt;
  viewMode?: boolean;
}

@Component({
  selector: 'app-create-evt',
  templateUrl: './create-evt.component.html',
  styleUrls: ['./create-evt.component.css']
})
export class CreateEvtComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  isViewMode = false;
  eventId?: string;

  constructor(
    private evtService: EventService,
    public dialogRef: MatDialogRef<CreateEvtComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.evtService.getEventById(data).subscribe((E) => {
        this.form = new FormGroup({
          Titre: new FormControl(E.Titre),
          DateDebut: new FormControl(E.DateDebut),
          DateFin: new FormControl(E.DateFin),
          Lieu: new FormControl(E.Lieu)
        });
      });
    } else {
      this.form = new FormGroup({
        Titre: new FormControl(''),
        DateDebut: new FormControl(''),
        DateFin: new FormControl(''),
        Lieu: new FormControl('')
      });
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      Titre: new FormControl(''),
      DateDebut: new FormControl(''),
      DateFin: new FormControl(''),
      Lieu: new FormControl('')
    });

    // If data is passed, populate the form
    if (this.data?.event) {
      this.isEditMode = !this.data.viewMode;
      this.isViewMode = this.data.viewMode || false;
      this.eventId = this.data.event.id;

      this.form.patchValue({
        Titre: this.data.event.Titre,
        DateDebut: this.data.event.DateDebut,
        DateFin: this.data.event.DateFin,
        Lieu: this.data.event.Lieu
      });

      // Disable form in view mode
      if (this.isViewMode) {
        this.form.disable();
      }
    }
  }

  getTitle(): string {
    if (this.isViewMode) return 'View Event';
    if (this.isEditMode) return 'Edit Event';
    return 'Create Event';
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
