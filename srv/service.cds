using {COS as my} from '../db/schema';
 
service ReportIncident @(path: '/browse') {
   entity Incident   as projection on my.Incident;

   @cds.redirection.target
   @readonly
   entity drafts     as projection on my.Incident where isdraft = '1';

   entity Equipment  as projection on my.Equipment;
   entity Witness    as projection on my.Witness;
   entity COS_Emp    as projection on my.COS_Emp;
   entity Contractor as projection on my.Contractor;
   entity Mem_Public as projection on my.Mem_Public;
   entity IncMData as projection on my.IncMasterData;
   entity EmpInfo as projection on my.EMPINFO where empemail = $user;

}