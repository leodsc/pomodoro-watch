import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderLink } from './HeaderLink';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  links: HeaderLink[] = [
    new HeaderLink('Início', 'assets/icons/home.png', '/'),
    new HeaderLink('Dados', 'assets/icons/data.png', '/uso'),
    new HeaderLink('Entrar', 'assets/icons/user.png', '/entrar'),
    new HeaderLink('Cadastrar', 'assets/icons/signup.png', '/cadastrar'),
  ];
  showNav = false;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showNav = false;
      }
    });
  }

  ngOnInit(): void {}

  toggleNavigation() {
    this.showNav = !this.showNav;
  }
}
