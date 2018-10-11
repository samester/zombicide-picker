import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router) {
    router.events.subscribe(( _: NavigationEnd) => this.currentUrl= this.router.url);
   }

  ngOnInit() {
  }

  onClick(type: string) {
    switch(type) {
      case 'user': this.router.navigate(['/']);
      break;

      case 'createChar': this.router.navigate(['/newchar']);
      break;

      case 'posts': this.router.navigate(['/posts']);
      break;

      default: this.router.navigate(['/']);
      break;
    }
  }
}
