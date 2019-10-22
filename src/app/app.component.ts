import { ServiceService } from './service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SausageEvents';

  constructor(private service : ServiceService) {}

  ngOnInit() {
    this.service.ping().subscribe();
  }
}
