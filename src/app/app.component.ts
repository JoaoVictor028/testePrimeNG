import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'primeNGTeste';

  constructor(private config: PrimeNGConfig, private tradutorService: TranslateService) { }

  ngOnInit() {
    this.tradutorService.stream('primeng').subscribe(data => {
      this.config.setTranslation(data);
    })
  }
}


