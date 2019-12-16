import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({
        opacity: 1
      })),
      state('false', style({
        opacity: 0
      })),
      transition('true => false', [
        animate('0.5s 5s')
      ]),
      transition('false => true', [
        animate('0.5s')
      ])
    ])
  ]
})
export class ConnexionComponent implements OnInit {

  helpLabel: string;
  showLabel: boolean = false;

  connexionForm: FormGroup = this.fb.group({
    pseudo: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login({
      pseudo: this.connexionForm.value.pseudo,
      password: this.connexionForm.value.password,
    }).pipe(
      catchError(err => {
        this.showHelpLabel('Pseudo ou Mot de passe incorrect.');

        return of(null);
      })
    ).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['/']).then(() => window.scrollTo(0, 0));
    });
  }

  showHelpLabel(content: string) {
    this.helpLabel = content;
    this.showLabel = true;
  }

  hideHelpLabel() {
    this.showLabel = false;
  }

}
