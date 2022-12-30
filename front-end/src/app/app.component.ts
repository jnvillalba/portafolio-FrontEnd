import { Component,ViewEncapsulation} from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'front-end';
  ngOnInit() {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
}
