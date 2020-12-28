import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { select, Store } from "@ngrx/store";
import * as fromAppReducer from "../../store/reducers/app.reducer";
import * as RecordsActions from "../../store/actions/record.actions";
import { getUserId } from "src/app/store/selectors/auth.selectors";
import { getRecord } from "src/app/store/selectors/records.selectors";

@Component({
  selector: "app-add-record",
  templateUrl: "./add-record.component.html",
  styleUrls: ["./add-record.component.css"],
})
export class AddRecordComponent implements OnInit, OnDestroy {
  aForm: FormGroup;
  editFormToggle = false;
  recordId: string;
  userSub: Subscription;
  userId = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromAppReducer.AppState>
  ) {
    this.aForm = fb.group({
      phone: [
        null,
        [Validators.required, Validators.pattern("[+|8]{1}[0-9]{8,11}")],
      ],
      description: [null, [Validators.required]],
      internal: [null, [Validators.required]],
      external: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userSub = this.store.pipe(select(getUserId)).subscribe(userId => {
      if (userId) {
        this.userId = userId;
      }
    });
    this.store.pipe(select(getRecord)).subscribe(record => {
      if (record) {
        this.recordId = record.id;
        this.editFormToggle = true;
        this.aForm = this.fb.group({
          phone: [record.phoneNumber, [Validators.required]],
          description: [record.description, [Validators.required]],
          internal: [record.internalTitle, [Validators.required]],
          external: [record.externalTitle, [Validators.required]],
        });
      }
    });
  }
  addRecord(form: any, formDirective: FormGroupDirective): void {
    if (this.aForm.status == "VALID" && this.userId) {
      this.store.dispatch(
        new RecordsActions.AdditionStarted({
          record: {
            phoneNumber: this.aForm.value.phone,
            description: this.aForm.value.description,
            internalTitle: this.aForm.value.internal,
            externalTitle: this.aForm.value.external,
          },
          userId: this.userId,
        })
      );
      formDirective.resetForm();
      this.aForm.reset();
    }
  }

  editRecord(form, formDirective: FormGroupDirective): void {
    this.store.dispatch(
      new RecordsActions.EditingStarted({
        record: {
          phoneNumber: this.aForm.value.phone,
          description: this.aForm.value.description,
          internalTitle: this.aForm.value.internal,
          externalTitle: this.aForm.value.external,
          id: this.recordId,
        },
        userId: this.userId,
      })
    );

    formDirective.resetForm();
    this.aForm.reset();
    this.editFormToggle = false;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
