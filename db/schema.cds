using {
    cuid,
    managed
} from '@sap/cds/common';

//namespace COS;

context COS {

entity Incident : cuid, managed {
    key ID              : UUID;
    key INCID           : Integer;
        IncNo           : String(20);
        Title           : String(100);
        empname         : String(100);
        empid           : String(20);
        emppos          : String(100);
        division        : String(100);
        dept            : String(100);
        section         : String(100);
        incDate         : Date;
        inctime         : Time;
        incDaterep      : Date;
        inctimerep      : Time;
        supid           : String(20);
        supname         : String(100);
        yearexppos      : Integer;
        wasIncOnCosloc  : String(1);
        shift           : String(10);
        latitude        : String(200);
        longitude       : String(200);
        wascosvehused   : String(30);
        addmentalhealth : String(1);
        busno           : String(10);
        noncosvehinvol  : String(1);
        policereportno  : String(20);
        incCategory     : String(100);
        incType         : String(100);
        eventtype       : String(100);
        actincseverity  : String(100);
        potseverity     : String(100);
        isinvestreq     : String(1);
        otherpeopinv    : String(30);
        incdesc         : String(5000);
        isdraft         : String(1);
        senttoemp       : String(1) default '0';
        finalRTW        : String(1) default '0';
        worklocation    : String(250);
        incStatus       : String(10) default 'Open';
        CosEquip        : Composition of many Equipment
                              on CosEquip.inci = $self;
        Witn            : Composition of many Witness
                              on Witn.inci = $self;
        cos_emp         : Composition of many COS_Emp
                              on cos_emp.inci = $self;
        contract        : Composition of many Contractor
                              on contract.inci = $self;
        public          : Composition of many Mem_Public
                              on public.inci = $self;
// notes           : Composition of many Notes
//                       on notes.inci = $self;
// caction         : Composition of many CorrectAction
                    //   on caction.inci = $self;
}

entity Equipment : cuid, managed {
    key ID      : UUID;
        EquipNo : Integer;
        inci    : Association to Incident;
}

entity Witness : cuid, managed {
    key ID           : UUID;
        witname      : String(100);
        witcontact   : String(20);
        witemail     : String(100);
        witstatement : String(500);
        inci         : Association to Incident;
}

entity COS_Emp : cuid, managed {
    key ID          : UUID;
        empid       : String(20);
        empname     : String(100);
        occupation  : String(100);
        exp         : String(20);
        association : String(50);
        shift       : String(10);
        inci        : Association to Incident;
}

entity Contractor : cuid, managed {
    key ID             : UUID;
        compadd        : String(250);
        contactno      : String(20);
        contractno     : String(10);
        contractname   : String(100);
        cosprojmgrname : String(100);
    
        inci           : Association to Incident;
}

entity Mem_Public : cuid, managed {
    key ID            : UUID;
        name          : String(100);
        address       : String(250);
        phone         : String(20);
        email         : String(20);
        assistedbycos : Integer default -1;
        cosempname    : String(100);
        inci          : Association to Incident;

}

entity Notes : cuid, managed {
    key ID          : UUID;
        addedby     : String(100);
        addedon     : Date;
        IncNotes    : String(5000);
        NotesType   : String(100);
        NotesReview : String(100);
        INCI_ID     : String(36);
        INCI_INCID  : Integer;
//inci        : Association to Incident;
}

entity CorrectAction : cuid, managed {
    key ID         : UUID;
        AssignTo   : String(100);
        DueDate    : Date;
        CAStatus   : String(20);
        Comments   : String(500);
        INCI_ID    : String(36);
        INCI_INCID : Integer;
// inci     : Association to Incident;
}

entity Investigation : cuid, managed {
    key ID              : UUID;
        DateInvest      : Date;
        InvestigationBy : String(100);
        EmpRTW          : String(1);
        InvStatDetails  : String(500);
        INCI_ID         : String(36);
        INCI_INCID      : Integer;
}


entity Followup : cuid, managed {
    key ID             : UUID;
        followcrdate   : Date;
        followupcrby   : String(100);
        folloupduedate : Date;
        followupstat   : String(50);
        followupcrfor  : String(100);
        followupnotes  : String(1000);
        compdate       : Date;
        followupflg    : String(1);
        INCI_ID          : String(36);
        INCI_INCID       : Integer;

}


entity EHSRef : cuid, managed {
    key ID               : UUID;
        ReqAccom         : String(1);
        isaccomgttendays : String(1);
        reasonforref     : String(10);
        Other            : String(1000);
        IssueHistory     : String(1000);
        INCI_ID          : String(36);
        INCI_INCID       : Integer;
}

entity RTW : cuid, managed {
    key ID          : UUID;
        stdate      : Date;
        Antienddate : Date;
        Union       : String(20);
        AccoPosDept : String(100);
        date        : Date;
        INCI_ID     : String(36);
        INCI_INCID  : Integer;
}

entity WCB : cuid, managed {
    key ID               : UUID;
        injdate          : Date;
        WCBInjcat        : String(100);
        WCBInjsubcat     : String(100);
        InjDesc          : String(1000);
        Injstatus        : String(20);
        Comments         : String(1000);
        Datereptosup     : Date;
        Datereptohr      : Date;
        Datereptowcb     : Date;
        firstdaylosttime : Date;
        Datertw          : Date;
        claimstatus      : String(20);
        whydenied        : String(1000);
        Claimno          : String(50);
        letterrecwcb     : Date;
        Notimeloss       : String(1);
        Notes            : String(1000);
        INCI_ID          : String(36);
        INCI_INCID       : Integer;
        wcbflag          : String(1);
        inj              : Composition of many Injury
                               on inj.wcbf = $self;

}

entity Injury : cuid, managed {
    key ID         : UUID;
        primaryinj : String(100);
        bodypart   : String(100);
        side       : String(10);
        wcbf       : Association to WCB;
}

entity IncMasterData : managed {
    key ID   : Integer;
        mid  : Integer;
        text : String(5000);
        type : String(100);
}

entity EMPINFO : managed {
    key empid        : String(20);
        empname      : String(100);
        emppos       : String(100);
        division     : String(100);
        dept         : String(100);
        section      : String(100);
        worklocation : String(100);
        supid        : String(20);
        supname      : String(100);
        empemail     : String(100);
        mgremail     : String(100);

}
}

@cds.persistence.exists
@cds.persistence.calcview
Entity CV_EMPLOYEEDETAILS {
key     EMPID: String(20)  @title: 'EMPID: EMPID' ;
        EMPNAME: String(100)  @title: 'EMPNAME: EMPNAME' ;
}