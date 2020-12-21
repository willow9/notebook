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

@Component({
  selector: "app-add-record",
  templateUrl: "./add-record.component.html",
  styleUrls: ["./add-record.component.css"],
})
export class AddRecordComponent implements OnInit, OnDestroy {
  aForm: FormGroup;
  editFormToggle = false;
  recordId: string;

  constructor(private fb: FormBuilder, private recordService: RecordService) {
    this.aForm = fb.group({
      phone: [null, [Validators.required]],
      description: [null, [Validators.required]],
      internal: [null, [Validators.required]],
      external: [null, [Validators.required]],
    });
  }
  addRecord(form: any, formDirective: FormGroupDirective): void {
    if (this.aForm.status == "VALID") {
      this.recordService
        .postRecord(
          this.aForm.value.phone,
          this.aForm.value.description,
          this.aForm.value.internal,
          this.aForm.value.external
        )
        .subscribe(() => {
          formDirective.resetForm();
          this.aForm.reset();
        });
      this.recordService.newRecordEmitter.next(true);
    }
  }

  editRecord(form, formDirective: FormGroupDirective): void {
    this.recordService
      .editRecord(
        this.recordId,
        this.aForm.value.phone,
        this.aForm.value.description,
        this.aForm.value.internal,
        this.aForm.value.external
      )
      .subscribe(() => {
        this.editFormToggle = false;
        formDirective.resetForm();
        this.aForm.reset();
      });
  }

  ngOnInit(): void {
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
