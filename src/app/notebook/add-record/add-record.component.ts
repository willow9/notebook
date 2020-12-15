import { Component, OnInit } from '@angular/core';
import { Record } from "../../model/record.model"

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {
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
  }

}
