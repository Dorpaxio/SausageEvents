import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  helpLabel: string;

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
    }).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']).then(() => window.scrollTo(0, 0));
    },
      err => {
        this.helpLabel = 'Pseudo ou Mot de passe incorrect.';
      });
  }

}
