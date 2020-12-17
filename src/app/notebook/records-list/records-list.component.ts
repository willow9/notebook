import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RecordService } from 'src/app/record.service';

import { Record } from "../../model/record.model"



@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.css']
})
export class RecordsListComponent implements OnInit {



  records: Record[] = []
  dataSource = []


  constructor(private recordService: RecordService) {

    this.recordService.getRecord().subscribe(recordsData => {
      recordsData.forEach(record => {
        this.records.push(new Record(record.phone, record.description, record.internal, record.external, record.recordId))
      })
      return this.dataSource = this.records
    })
  }


  ngOnInit(): void {


    // console.log(this.records);

    // console.log(this.dataSource);
    console.log("ping");

  }

  displayedColumns: string[] = ['phoneNumber', 'description', 'internalTitle', 'externalTitle'];



}
