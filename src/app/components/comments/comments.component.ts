import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent {}
