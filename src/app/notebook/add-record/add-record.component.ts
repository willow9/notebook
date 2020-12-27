import { AuthService } from "./../../authService";
import { Subscription } from "rxjs";
import { Record } from "./../../model/record.model";
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { RecordService } from "src/app/record.service";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "../../store/reducers/app.reducer";
import * as RecordsActions from "../../store/actions/record.actions";
import { Effect } from "@ngrx/effects";

@Component({
  selector: "app-add-record",
  templateUrl: "./add-record.component.html",
  styleUrls: ["./add-record.component.css"],
})
export class AddRecordComponent implements OnInit, OnDestroy {
  aForm: FormGroup;
  editFormToggle = false;
  recordId: string;
  userSub = Subscription;
  userId = null;

  constructor(
    private fb: FormBuilder,
    private recordService: RecordService,
    private store: Store<fromAppReducer.AppState>,
    private authService: AuthService
  ) {
    this.aForm = fb.group({
      phone: [
        null,
        // eslint-disable-next-line prettier/prettier
        [Validators.required, Validators.pattern("[+|8]{1}[0-9]{8,11}")],
      ],
      description: [null, [Validators.required]],
      internal: [null, [Validators.required]],
      external: [null, [Validators.required]],
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
    // this.recordService
    //   .editRecord(
    //     this.recordId,
    //     this.aForm.value.phone,
    //     this.aForm.value.description,
    //     this.aForm.value.internal,
    //     this.aForm.value.external
    //   )
    //   .subscribe(() => {
    //     this.editFormToggle = false;
    //     formDirective.resetForm();
    //     this.aForm.reset();
    //   });
  }

  ngOnInit(): void {
    this.store.select("authReducer").subscribe(state => {
      if (state.user) {
        this.userId = state.user.id;
      }
    });
    // this.authService.user.subscribe(user => {
    //   this.userId = !user ? null : user.id;
    // });

    this.recordService.editRecordEmiter.subscribe(record => {
      this.recordId = record.id;
      this.editFormToggle = true;
      this.aForm = this.fb.group({
        phone: [record.phoneNumber, [Validators.required]],
        description: [record.description, [Validators.required]],
        internal: [record.internalTitle, [Validators.required]],
        external: [record.externalTitle, [Validators.required]],
      });
    });
  }
  ngOnDestroy(): void {}
}
