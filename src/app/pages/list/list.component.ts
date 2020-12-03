import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListModel } from '../../models/list.model';
import { ListsService } from '../../services/lists.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  list = new ListModel();

  constructor(
    private listsService: ListsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.listsService.getListByID(id).subscribe((response: ListModel) => {
        this.list = response;
        this.list.id = id;
      });
    }
  }

  save(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: 'Wait please',
      text: 'Saving...',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    let petition: Observable<any>;

    if (this.list.id) {
      petition = this.listsService.updateList(this.list);
    } else {
      petition = this.listsService.createList(this.list);
    }
    petition.subscribe((response) => {
      Swal.fire({
        title: 'Nice!',
        text: `${this.list.name} was updated correctly`,
        icon: 'success',
      });
    });
  }
}
