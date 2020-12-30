import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { Record } from "../../model/record.model";
import { AuthFacade } from "./../../store/facades/auth.facade";
import { RecordsFacade } from "./../../store/facades/records.facade";

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
    private authFacade: AuthFacade,
    private recordsFacade: RecordsFacade
  ) {}

  ngOnInit(): void {
    this.userSub = this.authFacade.user$.subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    });

    this.recordsFacade.fetchRecords(this.userId);
    this.recordSub = this.recordsFacade.records$.subscribe(records => {
      this.shapeRecordsArray(records);
    });
  }

  useForEditing(record: Record): void {
    this.recordsFacade.selectForEditing(record);
  }
  delete(docId: string): void {
    this.recordsFacade.deleteRecord({ recordId: docId, userId: this.userId });
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
