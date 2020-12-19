export class Record {
  id?: string;
  phoneNumber: string;
  description: string;
  internalTitle: string;
  externalTitle: string;

  constructor(
    phone: string,
    description: string,
    internalTitle: string,
    externalTitle: string,
    id?: string
  ) {
    (this.phoneNumber = phone),
      (this.description = description),
      (this.internalTitle = internalTitle),
      (this.externalTitle = externalTitle),
      (this.id = id);
  }
}
