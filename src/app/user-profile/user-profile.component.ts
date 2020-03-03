import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() valorSidebar: any;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.valorSidebar) {
     console.log(this.valorSidebar); 
    }
    
  }
  ngOnInit() {
  }

}
