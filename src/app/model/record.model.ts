export class Record {
    phoneNumber: string;
    description: string;
    internalTitle: string;
    externalTitle: string

    constructor(phone: string, description: string, internalTitle: string, externalTitle: string) {
        this.phoneNumber = phone,
            this.description = description,
            this.internalTitle = internalTitle,
            this.externalTitle = externalTitle
    }
}