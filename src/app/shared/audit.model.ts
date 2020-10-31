import { AuditDocument } from "./audit-document.model"

export class AuditPortfolio {
    AuditCode : string
    AuditorFirm : string
    ClientFirm : string
    Description : string
    ReleaseDate : string
    Document : AuditDocument
}
