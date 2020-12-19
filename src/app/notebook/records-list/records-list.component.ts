import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { RecordService } from "src/app/record.service";

import { Record } from "../../model/record.model";
import { MatTableDataSource } from "@angular/material/table";
import { take } from "rxjs/operators";

@Component({
  selector: "app-records-list",
  templateUrl: "./records-list.component.html",
  styleUrls: ["./records-list.component.css"],
})
export class RecordsListComponent implements OnInit, OnDestroy {
  records: Record[] = [];
  addRecordSubscription: Subscription;
  // eslint-disable-next-line prettier/prettier
  displayedColumns: string[] = [
    "phoneNumber",
    "description",
    "internalTitle",
    "externalTitle",
  ];
  dataSource: MatTableDataSource<Record>;

  constructor(private recordService: RecordService) {}

  ngOnInit(): void {
    this.recordService.getRecord().subscribe(recordsData => {
      this.shapeRecordsArray(recordsData);
    });

    this.addRecordSubscription = this.recordService.newRecordEmitter.subscribe(
      () => {
        this.addNewRecordToTable();
      }
    );
  }

  private shapeRecordsArray(recordsData) {
    recordsData.forEach(record => {
      this.records.push(
        new Record(
          record.phone,
          record.description,
          record.internal,
          record.external,
          record.recordId
        )
      );
    });
    this.dataSource = new MatTableDataSource(this.records);
  }

  private addNewRecordToTable() {
    this.recordService.newRecord.pipe(take(1)).subscribe(record => {
      this.records.unshift(record);
      this.dataSource = new MatTableDataSource(this.records);
    });
  }
  ngOnDestroy(): void {
    this.addRecordSubscription.unsubscribe();
  }
}
