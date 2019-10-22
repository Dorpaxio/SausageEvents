import { ServiceService } from '../service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  profileForm : FormGroup;
  constructor(private fb: FormBuilder, 
    private service : ServiceService) { }

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
    console.log("register");
    this.service.register({
      pseudo : this.profileForm.value.pseudo,
    }).subscribe((res) => {
      console.log(res);
    });
  }

}
