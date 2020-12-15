import { Component, OnInit } from '@angular/core';
import { Record } from "../../model/record.model"



@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css']
})
export class RecordsListComponent implements OnInit {
  records: Record[] = [
    new Record(
      "86526587", "phone of CEO",
      "some internaltitle",
      "some external title"),
    new Record(
      "86526587", "phone of Manager",
      "some internaltitle for m",
      "some external title for m")
  ]



  constructor() { }
  ngOnInit(): void {
    console.log(this.records);

  }

}
