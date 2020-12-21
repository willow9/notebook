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
    "actions",
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

  useForEditing(record: Record): void {
    this.recordService.editRecordEmiter.next(record);
    this.recordService.editedRecord.pipe(take(1)).subscribe(response => {
      this.records = this.records.filter(record => {
        return record.id !== response.id;
      });
      this.records.unshift(response);
      this.dataSource = new MatTableDataSource(this.records);
    });
  }

  private shapeRecordsArray(recordsData) {
    recordsData.forEach(record => {
      this.records.push(
        new Record(
          record.phoneNumber,
          record.description,
          record.internalTitle,
          record.externalTitle,
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
