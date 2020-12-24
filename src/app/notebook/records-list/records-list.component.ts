import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { RecordService } from "src/app/record.service";
import { Record } from "../../model/record.model";
import { MatTableDataSource } from "@angular/material/table";
import { take } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "../../store/reducers/app.reducer";
import * as RecordsActions from "../../store/actions/record.actions";

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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private recordService: RecordService,
    private store: Store<fromAppReducer.AppState>
  ) {}

  ngOnInit(): void {
    this.recordService.getRecord().subscribe(() => {
      this.store.select("recordsRecucer").subscribe(state => {
        this.shapeRecordsArray(state.records);
      });
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
      this.dataSource.paginator = this.paginator;
    });
  }
  delete(docId: string): void {
    this.recordService.deleteRecord(docId).subscribe(() => {
      this.records = this.records.filter(record => {
        return record.id !== docId;
      });
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.paginator = this.paginator;
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
    this.dataSource.paginator = this.paginator;
  }

  private addNewRecordToTable() {
    this.recordService.newRecord.pipe(take(1)).subscribe(record => {
      this.records.unshift(record);
      this.dataSource = new MatTableDataSource(this.records);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnDestroy(): void {
    this.addRecordSubscription.unsubscribe();
  }
}
