import { Component, OnInit } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { ListModel } from '../../models/list.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  lists: ListModel[] = [];
  loading = false;

  constructor(private listsService: ListsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.listsService.getLists().subscribe((response) => {
      this.lists = response;
      this.loading = false;
    });
  }

  delete(id: string, index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.listsService.deleteList(id).subscribe();
        this.lists.splice(index, 1);
        Swal.fire('Deleted!', 'Your list has been deleted.', 'success');
      }
    });
  }
}
