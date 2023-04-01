import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from './shared/services/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tienda';
  constructor(
    private translate: TranslateService,
    public configService: ConfigService
  ) {
    this.configService.getListOfSystemSupportedLanguages();
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', environment.client.language.default);
    }
    translate.addLangs([...environment.client.language.array]);
    translate.setDefaultLang(localStorage.getItem('lang')+"");
    translate.use(localStorage.getItem('lang')+"");
  }
}
