import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { AuthFacade } from "./../../store/facades/auth.facade";
import { RecordsFacade } from "./../../store/facades/records.facade";

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
  recordSub: Subscription;
  userId = null;

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade,
    private recordsFacade: RecordsFacade
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
    this.userSub = this.authFacade.user$.subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    });
    this.recordSub = this.recordsFacade.selectedRecord$.subscribe(record => {
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
  addRecord(formDirective: FormGroupDirective): void {
    if (this.aForm.status == "VALID" && this.userId) {
      this.recordsFacade.addRecord({
        record: {
          phoneNumber: this.aForm.value.phone,
          description: this.aForm.value.description,
          internalTitle: this.aForm.value.internal,
          externalTitle: this.aForm.value.external,
        },
        userId: this.userId,
      });

      formDirective.resetForm();
    }
  }

  editRecord(formDirective: FormGroupDirective): void {
    this.recordsFacade.editRecord({
      record: {
        phoneNumber: this.aForm.value.phone,
        description: this.aForm.value.description,
        internalTitle: this.aForm.value.internal,
        externalTitle: this.aForm.value.external,
        id: this.recordId,
      },
      userId: this.userId,
    });

    formDirective.resetForm();
    this.editFormToggle = false;
  }
  cancel(formDirective: FormGroupDirective): void {
    this.recordsFacade.selectForEditing(null);
    this.editFormToggle = false;
    formDirective.resetForm();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.recordSub.unsubscribe();
  }
}
