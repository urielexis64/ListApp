import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListModel } from '../models/list.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private url = 'https://loginapp-e85df.firebaseio.com/';

  constructor(private http: HttpClient) {}

  createList(list: ListModel) {
    return this.http.post(`${this.url}/lists.json`, list).pipe(
      map((response: any) => {
        list.id = response.name;
        return list;
      })
    );
  }

  updateList(list: ListModel) {
    const tempList = {
      ...list,
    };
    delete tempList.id;

    return this.http.put(`${this.url}/lists/${list.id}.json`, tempList);
  }

  getLists() {
    return this.http
      .get(`${this.url}/lists.json`)
      .pipe(map(this.createArrayList));
  }

  private createArrayList(listsObj: object) {
    if (listsObj === null) {
      return [];
    }
    const lists: ListModel[] = [];
    console.log(listsObj);
    Object.keys(listsObj).forEach((key) => {
      const list: ListModel = listsObj[key];
      list.id = key;

      lists.push(list);
    });
    return lists;
  }
}
