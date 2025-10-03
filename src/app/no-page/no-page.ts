import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-page',
  imports: [MatButtonModule],
  standalone: true,
  templateUrl: './no-page.html',
  styleUrl: './no-page.scss',
})
export class NoPageComponent {
  constructor(private router: Router) {}

  backButton(): void {
    this.router.navigateByUrl('/task');
  }
}
