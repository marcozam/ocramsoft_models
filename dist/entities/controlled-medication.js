"use strict";
/**
 * Controlled medication (NOM-064 risk groups, COFEPRIS classes): the active
 * ingredient catalog, dispensing rows recorded on a sale, the controlled
 * ledger report and the recipients of a lot.
 *
 * Ids follow the API's conventions: pets, lots, sales, customers and expenses
 * by PublicId; products, locations, branches and health records by their id as
 * a string; users by their numeric id.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CofeprisClass = exports.NomRiskGroup = void 0;
/** Risk group of a medication: Group I requires a prescription folio on every sale. */
var NomRiskGroup;
(function (NomRiskGroup) {
    NomRiskGroup[NomRiskGroup["GroupI"] = 1] = "GroupI";
    NomRiskGroup[NomRiskGroup["GroupII"] = 2] = "GroupII";
    NomRiskGroup[NomRiskGroup["GroupIII"] = 3] = "GroupIII";
})(NomRiskGroup || (exports.NomRiskGroup = NomRiskGroup = {}));
var CofeprisClass;
(function (CofeprisClass) {
    CofeprisClass[CofeprisClass["Estupefaciente"] = 1] = "Estupefaciente";
    CofeprisClass[CofeprisClass["PsicotropicoII"] = 2] = "PsicotropicoII";
    CofeprisClass[CofeprisClass["PsicotropicoIII"] = 3] = "PsicotropicoIII";
})(CofeprisClass || (exports.CofeprisClass = CofeprisClass = {}));
//# sourceMappingURL=controlled-medication.js.map