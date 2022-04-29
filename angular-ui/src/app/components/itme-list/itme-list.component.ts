import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { AdoService } from 'src/app/services/ado.service';

@Component({
  selector: 'app-itme-list',
  templateUrl: './itme-list.component.html',
  styleUrls: ['./itme-list.component.scss']
})
export class ItmeListComponent implements OnInit {

  workItems?: Item[];
  currentWorkItem: Item = {};
  currentIndex = -1;
  tag = '';
  loading = false
  constructor(private adoService: AdoService) { }

  ngOnInit(): void {
    this.loading = true
    this.retrieveWorkItems();
  }

  retrieveWorkItems(): void {
    this.adoService.getAll()
      .subscribe(
        data => {
          this.workItems = data;
          console.log(data);
          this.loading = false
        },
        error => {
          console.log(error);
          this.loading = false
        });
  }

  refreshList(): void {
    this.loading = true
    this.retrieveWorkItems();
    this.currentWorkItem = {};
    this.currentIndex = -1;
  }

  setActiveWorkItem(workItem: Item, index: number): void {
    this.currentWorkItem = workItem;
    this.currentIndex = index;
  }
  
  searchByTitle(): void {
    this.currentWorkItem = {};
    this.currentIndex = -1;
    this.workItems =[]
    this.loading = true
    this.adoService.findByTag(this.tag)
      .subscribe(
        data => {
          this.workItems = data;
          console.log(data);
          this.loading = false
        },
        error => {
          console.log(error);
          this.loading = false
        });
  }

}
