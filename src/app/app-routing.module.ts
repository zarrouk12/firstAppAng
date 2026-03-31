import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { ToolComponent } from './tool/tool.component';
import { EventComponent } from './event/event.component';
import { ArticleComponent } from './article/article.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateEvtComponent } from './create-evt/create-evt.component';
import { LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'create', component: MemberFormComponent},
  {path: 'edit/:id', component: MemberFormComponent},
  {path: 'create-event', component: CreateEvtComponent},
  {path: 'edit-event/:id', component: CreateEvtComponent},
  {path: 'member', component: MemberComponent},
  {path: 'tools', component: ToolComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'events', component: EventComponent},
  {path: 'articles', component: ArticleComponent},
  {path: '',component:LoginComponent},
  {path: '**', component: MemberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
