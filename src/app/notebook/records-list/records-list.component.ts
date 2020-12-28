import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { RecordService } from "src/app/services/record.service";
import { Record } from "../../model/record.model";
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
  userSub: Subscription;
  recordSub: Subscription;
  userId = null;
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
    this.userSub = this.store.select("authReducer").subscribe(state => {
      if (state.user) {
        this.userId = state.user.id;
      }
    });

    this.store.dispatch(new RecordsActions.FetchingStarted(this.userId));
    this.recordSub = this.store.select("recordsRecucer").subscribe(state => {
      this.shapeRecordsArray(state.records);
    });
  }

  useForEditing(record: Record): void {
    this.recordService.editRecordEmiter.next(record);
  }
  delete(docId: string): void {
    this.store.dispatch(
      new RecordsActions.Delete({ recordId: docId, userId: this.userId })
    );
  }

  private shapeRecordsArray(recordsData) {
    this.records = [];
    recordsData.forEach(record => {
      this.records.push(
        new Record(
          record.phoneNumber,
          record.description,
          record.internalTitle,
          record.externalTitle,
          record.id
        )
      );
    });
    this.dataSource = new MatTableDataSource(this.records);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.recordSub.unsubscribe();
  }
}
