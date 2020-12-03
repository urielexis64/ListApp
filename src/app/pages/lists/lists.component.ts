import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ListModel } from '../../models/list.model';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  lists: ListModel[] = [];
  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    this.listsService
      .getLists()
      .subscribe((response) => (this.lists = response));
  }
}
