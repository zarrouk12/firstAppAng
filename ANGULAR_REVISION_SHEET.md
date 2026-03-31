# 🅰️ ANGULAR EXAM REVISION SHEET
### Complete Step-by-Step Guide — Everything You Need to Know

---

## 📌 TABLE OF CONTENTS

1. [Phase 0 — Project Setup](#phase-0--project-setup)
2. [Phase 1 — Create the Model](#phase-1--create-the-model-interface)
3. [Phase 2 — Create the Service](#phase-2--create-the-service-api-communication)
4. [Phase 3 — Module Imports (app.module.ts)](#phase-3--module-imports-appmodulets--critical)
5. [Phase 4 — The Template (Sidebar Layout)](#phase-4--the-template-sidebar--toolbar-layout)
6. [Phase 5 — Routing](#phase-5--routing-app-routingmodulets)
7. [Phase 6 — The List Page (Table + Filter + Paginator + Sort)](#phase-6--the-list-page-read--delete--filter--pagination--sort)
8. [Phase 7 — The Form (Create + Edit with Reactive Forms)](#phase-7--the-form-create--edit-using-reactive-forms)
9. [Phase 8 — Confirm Dialog](#phase-8--confirm-dialog-matdialog-for-delete-confirmation)
10. [Phase 9 — Form Inside a Dialog (with DatePicker)](#phase-9--form-inside-a-dialog-alternative-to-a-separate-page)
11. [CLI Cheat Sheet](#-cli-cheat-sheet)
12. [Top 10 Mistakes to Avoid](#-top-10-exam-mistakes-to-avoid)
13. [Architecture Flow](#-architecture-flow-summary)

---

## PHASE 0 — Project Setup

### Step 1: Create the Angular project
```bash
ng new MyProject
# Choose YES for routing
# Choose CSS for styles
cd MyProject
```

### Step 2: Install Angular Material
```bash
ng add @angular/material
# Pick a theme (e.g. Indigo/Pink)
# Say YES to animations
# Say YES to typography
```

### Step 3: Install JSON Server (fake REST API)
```bash
npm install json-server
```

### Step 4: Create the database file `src/assets/db.json`
```json
{
  "members": [
    {
      "id": "1",
      "CIN": "12345",
      "Name": "Ahmed",
      "Type": "Engineer",
      "CV": "link",
      "CreatedDate": "2026-01-01"
    }
  ],
  "events": [
    {
      "id": "1",
      "Titre": "Angular Workshop",
      "DateDebut": "2026-03-10",
      "DateFin": "2026-03-12",
      "Lieu": "Tunis"
    }
  ]
}
```

### Step 5: Add the json-server script in `package.json`
In the `"scripts"` section add:
```json
"json-server": "json-server --watch src/assets/db.json --port 3000"
```

### Step 6: Run both servers (you need 2 terminals!)
```bash
# Terminal 1 — Angular app
ng serve

# Terminal 2 — Fake API
npm run json-server
```
| Server | URL |
|--------|-----|
| Angular | `http://localhost:4200` |
| JSON Server (API) | `http://localhost:3000` |

---

## PHASE 1 — Create the Model (Interface)

Create a file `src/Models/Member.ts`:
```typescript
export interface Member {
    id?: string;       // optional — json-server auto-generates it
    CIN: string;
    Name: string;
    Type: string;
    CV: string;
    CreatedDate: string;
}
```

> 💡 **Why `id?` with a question mark?**
> Because when **creating** a new member, you don't have an `id` yet — json-server generates it. The `?` makes it optional.

---

## PHASE 2 — Create the Service (API Communication)

### Generate the service:
```bash
ng generate service Services/member
```

### Write the 5 CRUD methods in `member.service.ts`:
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Models/Member';

@Injectable({
  providedIn: 'root'    // available everywhere in the app
})
export class MemberService {

  constructor(private httpClient: HttpClient) { }

  // ✅ READ ALL
  GetAllMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>('http://localhost:3000/members');
  }

  // ✅ CREATE
  postMember(newMember: Member): Observable<Member> {
    return this.httpClient.post<Member>('http://localhost:3000/members', newMember);
  }

  // ✅ DELETE
  deleteMember(id: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/members/${id}`);
  }

  // ✅ READ ONE (for edit mode)
  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`http://localhost:3000/members/${id}`);
  }

  // ✅ UPDATE
  updateMember(member: Member): Observable<Member> {
    return this.httpClient.put<Member>(`http://localhost:3000/members/${member.id}`, member);
  }
}
```

### 🧠 Key Concepts:
| Concept | Explanation |
|---------|-------------|
| `Observable` | Asynchronous data stream — you MUST `.subscribe()` to trigger it |
| `HttpClient` | Injected via the constructor (Dependency Injection) |
| `get<T>()` | HTTP GET → Read |
| `post<T>()` | HTTP POST → Create |
| `put<T>()` | HTTP PUT → Update |
| `delete<T>()` | HTTP DELETE → Delete |
| `` `url/${id}` `` | Template literals (backticks) for dynamic URLs |

---

## PHASE 3 — Module Imports (`app.module.ts`) — CRITICAL!

> ⚠️ **If you forget an import here, things break silently or crash. This is the #1 source of exam errors.**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// ——— Angular Material Imports ———
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

// ——— Components ———
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    MemberFormComponent,
    ConfirmDialogComponent,
    TemplateComponent,
    // ... add all your components here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,           // ← REQUIRED for API calls
    FormsModule,
    ReactiveFormsModule,        // ← REQUIRED for Reactive Forms
    // Material modules:
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,        // ← REQUIRED with DatePicker
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### ⚠️ Common Forgotten Imports:
| If you forget... | What happens |
|---|---|
| `HttpClientModule` | Service calls fail silently — no data loads |
| `ReactiveFormsModule` | `[formGroup]` directive crashes the page |
| `MatNativeDateModule` | Datepicker won't open |
| Component not in `declarations` | "Component is not a known element" error |

---

## PHASE 4 — The Template (Sidebar + Toolbar Layout)

### Generate:
```bash
ng generate component template
```

### `template.component.html`:
```html
<mat-sidenav-container>

  <!-- ===== SIDEBAR ===== -->
  <mat-sidenav #drawer fixedInViewport="true" mode="over" opened="false" style="width: 230px;">
    <mat-toolbar color="primary">
      <mat-icon>school</mat-icon>
      <span> Laboratoire </span>
    </mat-toolbar>
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard">
        <mat-icon>dashboard</mat-icon><span> Dashboard</span>
      </a>
      <a mat-list-item routerLink="/member">
        <mat-icon>supervised_user_circle</mat-icon><span> Members</span>
      </a>
      <a mat-list-item routerLink="/events">
        <mat-icon>event_note</mat-icon><span> Events</span>
      </a>
    </mat-nav-list>
  </mat-sidenav>

  <!-- ===== MAIN CONTENT ===== -->
  <mat-sidenav-content>
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="drawer.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Lab</span>
    </mat-toolbar>

    <div class="content">
      <br>
      <!-- ⭐ This is where routed pages appear -->
      <router-outlet></router-outlet>
    </div>
  </mat-sidenav-content>

</mat-sidenav-container>
```

### Make it the root: Replace everything in `app.component.html` with:
```html
<app-template></app-template>
```

### 🧠 Key Points:
- `#drawer` is a **template reference variable** — used to call `drawer.toggle()`
- `<router-outlet>` is the placeholder where routed components appear
- `routerLink="/member"` navigates **without page reload** (that's SPA!)
- Never use `href` — it causes a full page reload and kills your app state

---

## PHASE 5 — Routing (`app-routing.module.ts`)

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';

const routes: Routes = [
  { path: 'member', component: MemberComponent },
  { path: 'create', component: MemberFormComponent },
  { path: 'edit/:id', component: MemberFormComponent },  // :id = route parameter
  { path: '', pathMatch: 'full', component: MemberComponent },   // default
  { path: '**', component: MemberComponent }   // wildcard (404 fallback)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 🧠 Key Points:
| Concept | Explanation |
|---------|-------------|
| `:id` | Route parameter — retrieved with `ActivatedRoute` |
| `pathMatch: 'full'` | On empty path, prevents matching everything |
| `**` | Wildcard — catches all unknown URLs. Must be **LAST**! |
| Same component for create & edit | The form component checks if `:id` exists to decide mode |

---

## PHASE 6 — The List Page (Read + Delete + Filter + Pagination + Sort)

### Generate:
```bash
ng generate component member
```

### `member.component.ts`:
```typescript
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

  // Column names — MUST match matColumnDef in HTML
  displayedColumns: string[] = ['CIN', 'Name', 'Type', 'CV', 'CreatedDate', 'Action'];

  // MatTableDataSource gives you filtering, sorting, pagination for free
  dataSource = new MatTableDataSource<Member>();

  // ViewChild connects to the HTML elements
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Inject the service and dialog
  constructor(private MS: MemberService, private dialog: MatDialog) { }

  // Runs when component loads
  ngOnInit() {
    this.MS.GetAllMembers().subscribe(members => {
      this.dataSource.data = members;              // fill the table
      this.dataSource.paginator = this.paginator;  // connect paginator
      this.dataSource.sort = this.sort;            // connect sort
    });
  }

  // FILTER — called on every keyup in the search input
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // DELETE — opens confirm dialog first
  deleteMember(member: Member) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.MS.deleteMember(member.id!).subscribe(() => {
          // Reload the table after deletion
          this.MS.GetAllMembers().subscribe((res) => {
            this.dataSource.data = res;
          });
        });
      }
    });
  }
}
```

### `member.component.html`:
```html
<div>
  <h1>Members</h1>

  <!-- CREATE BUTTON — navigates to /create -->
  <button mat-raised-button color="primary" routerLink="/create">
    <mat-icon>add</mat-icon> Create New
  </button>

  <!-- ===== FILTER INPUT ===== -->
  <mat-form-field appearance="outline">
    <mat-label>Search</mat-label>
    <input matInput (keyup)="applyFilter($event)" placeholder="Search...">
    <mat-icon matSuffix>search</mat-icon>
  </mat-form-field>

  <!-- ===== TABLE ===== -->
  <table mat-table [dataSource]="dataSource" matSort>

    <!-- Each column has: ng-container + matColumnDef -->

    <ng-container matColumnDef="CIN">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> CIN </th>
      <td mat-cell *matCellDef="let element"> {{element.CIN}} </td>
    </ng-container>

    <ng-container matColumnDef="Name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let element"> {{element.Name}} </td>
    </ng-container>

    <ng-container matColumnDef="Type">
      <th mat-header-cell *matHeaderCellDef> Type </th>
      <td mat-cell *matCellDef="let element"> {{element.Type}} </td>
    </ng-container>

    <ng-container matColumnDef="CV">
      <th mat-header-cell *matHeaderCellDef> CV </th>
      <td mat-cell *matCellDef="let element"> {{element.CV}} </td>
    </ng-container>

    <ng-container matColumnDef="CreatedDate">
      <th mat-header-cell *matHeaderCellDef> Created Date </th>
      <td mat-cell *matCellDef="let element"> {{element.CreatedDate}} </td>
    </ng-container>

    <!-- ACTION COLUMN — Edit & Delete buttons -->
    <ng-container matColumnDef="Action">
      <th mat-header-cell *matHeaderCellDef> Action </th>
      <td mat-cell *matCellDef="let element">
        <button mat-icon-button color="primary" [routerLink]="'/edit/' + element.id">
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button color="warn" (click)="deleteMember(element)">
          <mat-icon>delete</mat-icon>
        </button>
      </td>
    </ng-container>

    <!-- REQUIRED: header row + data row definitions -->
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>

  <!-- ===== PAGINATOR ===== -->
  <mat-paginator [pageSizeOptions]="[5, 10, 25]" showFirstLastButtons></mat-paginator>
</div>
```

### 🧠 Table Rules:
| Rule | Detail |
|------|--------|
| `matColumnDef="Name"` | Must **exactly match** the string in `displayedColumns` array |
| `*matCellDef="let element"` | Gives access to each row's data object |
| `mat-sort-header` on `<th>` | Enables sorting for that column |
| `[dataSource]="dataSource"` | Connects the table to your data |
| `matSort` on `<table>` | Enables the sorting feature for the whole table |
| `*matHeaderRowDef` | Tells Angular which columns to show |
| `*matRowDef` | Defines the data rows |

---

## PHASE 7 — The Form (Create + Edit using Reactive Forms)

### Generate:
```bash
ng generate component member-form
```

### `member-form.component.ts`:
```typescript
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

  form!: FormGroup;              // The reactive form object
  editId: string | null = null;  // null = create mode, value = edit mode

  constructor(
    private memberService: MemberService,
    private router: Router,         // for navigation after submit
    private route: ActivatedRoute   // to read :id from URL
  ) {}

  ngOnInit() {
    // Step 1: Build the form with FormControls
    this.form = new FormGroup({
      id: new FormControl(''),
      CIN: new FormControl(''),
      Name: new FormControl(''),
      Type: new FormControl(''),
      CV: new FormControl(''),
      CreatedDate: new FormControl('')
    });

    // Step 2: Check if we're editing (URL has :id param)
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      // Fetch the existing member and fill the form
      this.memberService.getMemberById(this.editId).subscribe((member) => {
        this.form.patchValue(member);   // fills form fields with existing data
      });
    }
  }

  submit(): void {
    if (this.editId) {
      // UPDATE mode
      this.memberService.updateMember(this.form.value).subscribe(() => {
        this.router.navigate(['/']);   // navigate back to list
      });
    } else {
      // CREATE mode
      this.memberService.postMember(this.form.value).subscribe(() => {
        this.router.navigate(['/']);   // navigate back to list
      });
    }
  }
}
```

### `member-form.component.html`:
```html
<form [formGroup]="form" (ngSubmit)="submit()">
    <h2>{{ editId ? 'Edit Member' : 'Create Member' }}</h2>

    <mat-form-field appearance="fill">
        <input matInput placeholder="CIN" formControlName="CIN">
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
        <input matInput placeholder="Name" formControlName="Name">
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
        <input matInput placeholder="Type" formControlName="Type">
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
        <input matInput placeholder="CV" formControlName="CV">
    </mat-form-field>
    <br>
    <button mat-raised-button color="primary" type="submit">Submit</button>
</form>
```

### 🧠 Reactive Forms Cheat Sheet:
| Code | What it does |
|------|-------------|
| `form!: FormGroup` | Declares the form object |
| `new FormGroup({...})` | Creates the form with named controls |
| `new FormControl('')` | Creates a single input control (empty default) |
| `[formGroup]="form"` | Binds the HTML `<form>` to the FormGroup |
| `formControlName="CIN"` | Binds an `<input>` to a specific FormControl |
| `(ngSubmit)="submit()"` | Calls the function when form is submitted |
| `this.form.value` | Returns all form data as a JS object |
| `this.form.patchValue(data)` | Fills form with existing data (for edit mode) |
| `{{ editId ? 'Edit' : 'Create' }}` | Ternary operator to change the title |

---

## PHASE 8 — Confirm Dialog (MatDialog for Delete Confirmation)

### Generate:
```bash
ng generate component confirm-dialog
```

### `confirm-dialog.component.ts`:
```typescript
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }
}
```

### `confirm-dialog.component.html`:
```html
<h2 mat-dialog-title>Confirm Delete</h2>
<mat-dialog-content>
  Are you sure you want to delete? This action cannot be undone.
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-button [mat-dialog-close]="true">Delete</button>
</mat-dialog-actions>
```

### 🧠 How Dialogs Work:
```
                    ┌──────────────────────────┐
  dialog.open() ──► │   ConfirmDialogComponent  │
                    │                          │
                    │   Cancel → closes, returns undefined
                    │   Delete → closes, returns true
                    └──────────┬───────────────┘
                               │
              afterClosed().subscribe(result => {
                  if (result) { /* do the delete */ }
              })
```

| Code | Meaning |
|------|---------|
| `mat-dialog-close` (no value) | Closes dialog, returns `undefined` |
| `[mat-dialog-close]="true"` | Closes dialog, returns `true` |
| `this.dialog.open(Component)` | Opens the dialog |
| `dialogRef.afterClosed()` | Observable that fires when dialog closes |

---

## PHASE 9 — Form Inside a Dialog (Alternative to a Separate Page)

> Instead of navigating to a new page, you can open a form in a **popup dialog**.
> This is how the Events create form works in your project.

### `create-evt.component.ts`:
```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EventService } from 'src/Services/evt.service';

@Component({
  selector: 'app-create-evt',
  templateUrl: './create-evt.component.html'
})
export class CreateEvtComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private evtService: EventService,
    public dialogRef: MatDialogRef<CreateEvtComponent>  // controls the dialog
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      Titre: new FormControl(''),
      DateDebut: new FormControl(''),
      DateFin: new FormControl(''),
      Lieu: new FormControl('')
    });
  }

  save() {
    this.evtService.postEvent(this.form.value).subscribe(() => {
      this.dialogRef.close(true);   // close and signal "saved"
    });
  }

  close() {
    this.dialogRef.close();   // close without saving
  }
}
```

### `create-evt.component.html` — With DatePicker!
```html
<h2 mat-dialog-title>Create Event</h2>
<mat-dialog-content>
  <form [formGroup]="form">
    <mat-form-field appearance="fill">
      <input matInput placeholder="Titre" formControlName="Titre">
    </mat-form-field>
    <br>

    <!-- 📅 DATEPICKER — 3 elements needed -->
    <mat-form-field appearance="fill">
      <input matInput [matDatepicker]="pickerDebut" placeholder="Date Début" formControlName="DateDebut">
      <mat-datepicker-toggle matSuffix [for]="pickerDebut"></mat-datepicker-toggle>
      <mat-datepicker #pickerDebut></mat-datepicker>
    </mat-form-field>
    <br>

    <mat-form-field appearance="fill">
      <input matInput [matDatepicker]="pickerFin" placeholder="Date Fin" formControlName="DateFin">
      <mat-datepicker-toggle matSuffix [for]="pickerFin"></mat-datepicker-toggle>
      <mat-datepicker #pickerFin></mat-datepicker>
    </mat-form-field>
    <br>

    <mat-form-field appearance="fill">
      <input matInput placeholder="Lieu" formControlName="Lieu">
    </mat-form-field>
  </form>
</mat-dialog-content>
<mat-dialog-actions>
  <button mat-button (click)="close()">Close</button>
  <button mat-raised-button color="primary" (click)="save()">Save</button>
</mat-dialog-actions>
```

### Opening it from the list component:
```typescript
// In event.component.ts
open() {
  const dialogRef = this.dialog.open(CreateEvtComponent);
  dialogRef.afterClosed().subscribe((saved) => {
    if (saved) this.loadEvents();   // refresh the table
  });
}
```

### 🧠 DatePicker Recipe (3 parts that connect together):
```
Part 1:  <input [matDatepicker]="pickerDebut" ...>        ← links input to the picker
Part 2:  <mat-datepicker-toggle [for]="pickerDebut">      ← the calendar icon button
Part 3:  <mat-datepicker #pickerDebut>                     ← the actual calendar popup
```
- Each datepicker needs a **unique** `#templateRef` name
- Requires **both** `MatDatepickerModule` AND `MatNativeDateModule` in `app.module.ts`!

---

## 🔧 CLI Cheat Sheet

| Command | What it does |
|---------|-------------|
| `ng new ProjectName` | Create a new Angular project |
| `ng add @angular/material` | Install Angular Material |
| `ng generate component name` | Create a new component |
| `ng generate service Services/name` | Create a new service |
| `ng serve` | Start dev server (port 4200) |
| `npm run json-server` | Start fake API (port 3000) |

---

## 🚨 TOP 10 EXAM MISTAKES TO AVOID

| # | Mistake | Consequence |
|---|---------|-------------|
| 1 | Forgot `HttpClientModule` in imports | API calls fail silently — no data loads |
| 2 | Forgot `ReactiveFormsModule` in imports | `[formGroup]` crashes the page |
| 3 | `matColumnDef` doesn't match `displayedColumns` | Column disappears from table |
| 4 | Forgot to `.subscribe()` on Observable | HTTP request **never fires** — nothing happens |
| 5 | Forgot `MatNativeDateModule` | Datepicker crashes |
| 6 | JSON Server not running | All API calls fail with connection error |
| 7 | Wrong URL port | Angular = 4200, API = 3000 — don't mix them up |
| 8 | Component not in `declarations` | "is not a known element" error |
| 9 | Can't read route param | Use `this.route.snapshot.paramMap.get('id')` |
| 10 | Using `href` instead of `routerLink` | Full page reload — breaks SPA behavior |

---

## 🏗️ Architecture Flow Summary

```
┌─────────────────────────────────────────────────────────┐
│                    ANGULAR APP                          │
│                                                         │
│  Model           Service          Component     HTML    │
│  (interface)     (HttpClient)     (logic)      (view)  │
│                                                         │
│  Member.ts  →  member.service.ts → member.ts → member.html
│                                                         │
│  ┌──────┐     ┌────────────┐     ┌────────┐   ┌──────┐│
│  │ id   │     │ getAll()   │     │ ngOnInit│   │table ││
│  │ CIN  │     │ post()     │     │ delete()│   │filter││
│  │ Name │     │ delete()   │     │ filter()│   │paginr││
│  │ Type │     │ getById()  │     │         │   │button││
│  │ CV   │     │ update()   │     │         │   │      ││
│  └──────┘     └─────┬──────┘     └────┬───┘   └──────┘│
│                     │                  │                 │
│                     ▼                  │                 │
│              ┌─────────────┐           │                 │
│              │ JSON Server │ ◄─────────┘                 │
│              │ port 3000   │   .subscribe()              │
│              │ db.json     │                             │
│              └─────────────┘                             │
└─────────────────────────────────────────────────────────┘
```

### For every new entity, repeat this pattern:
1. ✅ Create the **Model** (interface with the fields)
2. ✅ Create the **Service** (5 CRUD methods with HttpClient)
3. ✅ Create the **List Component** (table + filter + paginator + delete)
4. ✅ Create the **Form Component** (reactive form for create + edit)
5. ✅ Add **routes** in `app-routing.module.ts`
6. ✅ Add all **imports** in `app.module.ts`
7. ✅ Add **navigation links** in the template sidebar

---

### 🍀 Good Luck!

> **Remember:** Model → Service → Component → HTML. Don't forget your module imports. Run both servers.
