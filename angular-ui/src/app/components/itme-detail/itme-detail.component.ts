import { Component, OnInit } from '@angular/core';
import { AdoService } from 'src/app/services/ado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';


@Component({
  selector: 'app-itme-detail',
  templateUrl: './itme-detail.component.html',
  styleUrls: ['./itme-detail.component.scss']
})

export class ItmeDetailComponent implements OnInit {

  currentWorkItem: Item = {
    title: ''
  };
  message = '';
  updating = false
  constructor(
    private adoService: AdoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getWorkItem(this.route.snapshot.params['id']);
  }

  getWorkItem(id: string): void {
    this.adoService.get(id)
      .subscribe(
        data => {
          this.currentWorkItem = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateWorkItem(): void {
    this.message = '';
    this.updating = true
    this.adoService.update(this.currentWorkItem.id, this.currentWorkItem)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This work item was updated successfully!';
          this.updating = false;
        },
        error => {
          console.log(error);
          this.updating = false
        });
  }

}
