using {COS as my} from '../db/schema';
using CV_EMPLOYEEDETAILS from '../db/schema';

service Manager @(_requires: 'manager') {
    @require: 'Manager'
    entity Incident        as projection on my.Incident
                              where
                                  isdraft = '0';

    entity Equipment       as projection on my.Equipment;
    entity Witness         as projection on my.Witness;
    entity COS_Emp         as projection on my.COS_Emp;
    entity Contractor      as projection on my.Contractor;
    entity Mem_Public      as projection on my.Mem_Public;
    entity Notes           as projection on my.Notes;
    entity CorrectAction   as projection on my.CorrectAction;
    entity Investigation   as projection on my.Investigation;
    entity IncMData        as projection on my.IncMasterData;
    entity Followup        as projection on my.Followup;
    entity EHSRef          as projection on my.EHSRef;
    entity WCB             as projection on my.WCB;
    entity Injury          as projection on my.Injury;
    entity RTW             as projection on my.RTW;
    entity EmpInfo         as projection on my.EMPINFO;

    @readonly
    entity EmployeeDetails as projection on CV_EMPLOYEEDETAILS;
}
