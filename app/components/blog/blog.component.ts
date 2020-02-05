import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  options = { autoHide: false, scrollbarMinSize: 100 };
  listPost : any = []; 
  constructor( private breakpointObserver: BreakpointObserver, private db: DatabaseService) { 
    this.db.getAllPostValues().then(postList => {
      this.listPost = postList;
      console.log(this.listPost);
    })

   
  }

  ngOnInit() {

  }

}
