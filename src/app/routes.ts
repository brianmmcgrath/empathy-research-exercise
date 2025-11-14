import { SurveyDetailsComponent } from "./components/survey-details/survey-details.component";
import { SurveyDashboardComponent } from "./components/survey-dashboard/survey-dashboard.component";
import { Routes } from "@angular/router";
import { CommentsComponent } from "./components/comments/comments.component";

const routeConfig: Routes = [
  {
    path: '',
    component: SurveyDashboardComponent,
    title: 'Survey Dashboard',
  },
  {
    path: 'comments',
    component: CommentsComponent,
    title: 'Comments',
  },
  {
    path: 'survey/:id',
    component: SurveyDetailsComponent,
    title: 'Survey details',
  },
];
export default routeConfig;
