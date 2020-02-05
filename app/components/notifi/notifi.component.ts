import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-notifi",
  templateUrl: "./notifi.component.html",
  styleUrls: ["./notifi.component.css"]
})
export class NotifiComponent implements OnInit {
  options = { autoHide: false, scrollbarMinSize: 100 };
  listPost: any = [];
  constructor(private db: DatabaseService) {
    this.db.getAllPostValues().then(postList => {
      this.listPost = postList;
      console.log(this.listPost);
    });
  }

  ngOnInit() {}
}
