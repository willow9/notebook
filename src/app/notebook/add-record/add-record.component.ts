/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RecordService } from "src/app/record.service";

@Component({
  selector: "app-add-record",
  templateUrl: "./add-record.component.html",
  styleUrls: ["./add-record.component.css"],
})
export class AddRecordComponent implements OnInit, OnDestroy {
  aForm: FormGroup;

  constructor(private fb: FormBuilder, private recordService: RecordService) {
    this.aForm = fb.group({
      phone: [null, [Validators.required]],
      description: [null, [Validators.required]],
      internal: [null, [Validators.required]],
      external: [null, [Validators.required]],
    });
  }
  addRecord(form): void {
    if (this.aForm.status == "VALID") {
      this.recordService
        .postRecord(
          this.aForm.value.phone,
          this.aForm.value.description,
          this.aForm.value.internal,
          this.aForm.value.external
        )
        .subscribe(() => {});
      this.recordService.newRecordEmitter.next(true);
    }
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
