import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { ThemeService } from './services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { LogService } from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private log: LogService,
  ) {}

  public async ngOnInit() {
    this.route.queryParamMap.subscribe(map => {
      const success = map.get('success');
      const error = map.get('error');
      if (success)
        this.log.success(success);
      else if (error)
        this.log.error(error);
    });

    this.themeService.updateTheme();
    await this.userService.updateUser();
  } 
}
