import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FileUploadService} from "../file-upload.service";

interface User {
  pseudo: string;
  mail: string;
  address;
  city;
  postal;
  img;
}

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.scss']
})
export class MonCompteComponent implements OnInit {
  user: User;
  imgToUpload: File;

  constructor(private auth: AuthService,
              private uploadService: FileUploadService) {
  }

  ngOnInit() {
    this.auth.getUser().subscribe(
      res => {
        this.user = res;
      });
  }

  handleFileUpload(files: FileList) {
    this.imgToUpload = files.item(0);
  }

  uploadFile() {
    this.uploadService.postFile('users/profilePicture', this.imgToUpload).subscribe(data => {
      if(!!data.imageUrl)
        this.user.img = data.imageUrl;
      else
        console.error("L'image de profil n'a pas bien été renvoyée.");
    });
  }

}
