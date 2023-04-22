import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading$ = this.loaderService.isLoading$;

  constructor(private readonly loaderService: LoaderService) { }

  ngOnInit(): void {
    console.log();
  }

}
