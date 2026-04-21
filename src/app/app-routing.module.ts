import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { ToolComponent } from './tool/tool.component';
import { EventComponent } from './event/event.component';
import { ArticleComponent } from './article/article.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateEvtComponent } from './create-evt/create-evt.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'create', component: MemberFormComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: MemberFormComponent, canActivate: [AuthGuard]},
  {path: 'create-event', component: CreateEvtComponent, canActivate: [AuthGuard]},
  {path: 'edit-event/:id', component: CreateEvtComponent, canActivate: [AuthGuard]},
  {path: 'member', component: MemberComponent, canActivate: [AuthGuard]},
  {path: 'tools', component: ToolComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'events', component: EventComponent, canActivate: [AuthGuard]},
  {path: 'articles', component: ArticleComponent, canActivate: [AuthGuard]},
  {path: '',component:LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
