import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  profileForm: FormGroup;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public router: Router) {
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      pseudo: ['', Validators.required],
      mail: ['', Validators.required],
      address: ['', Validators.required],
      ville: ['', Validators.required],
      postal: ['', Validators.required],
      mdp: ['', Validators.required],
      mdp2: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.register({
      pseudo: this.profileForm.value.pseudo,
      mail: this.profileForm.value.mail,
      password: this.profileForm.value.mdp,
      address: this.profileForm.value.address,
      city: this.profileForm.value.ville,
      postal: this.profileForm.value.postal
    }).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']).then(() => window.scrollTo(0, 0));
      },
      (err) => {
        console.log(err);
      });
  }

}
