const cds = require("@sap/cds");
//const SequenceHelper = require("./lib/SequenceHelper");

function lPad(str, size) {
    var s = str.toString();
    while (s.length < size) {  
            s = "0" + s;
    }
    return s; // return new number
}

// module.exports = cds.service.impl(async (service) => {
//     const db = await cds.connect.to("db");
//     const { Incident } = service.entities;
   

//     service.before("CREATE", Incident, async (context) => {
//         const incId = new SequenceHelper({
//             db: db,
//             sequence: "INCIDENT_IID",
//             table: "Incident",
//             field: "INCID"
//         });

//         context.data.INCID = await incId.getNextNumber();
//     });


// })

class ReportIncident extends cds.ApplicationService{
 
    init(){
     
        const { Incident } = this.entities;
        this.before('CREATE', Incident, async (context) => {
            const db = await cds.connect.to("db");
            var x = await db.run('SELECT "INCIDENT_IID".NEXTVAL FROM DUMMY');
            var numberfinal = x[0]["INCIDENT_IID.NEXTVAL"];
            context.data.INCID = numberfinal;
     
            const currentYear = new Date().getFullYear();
     
            var dummy_num = 'INC-' + currentYear + '-' + lPad(numberfinal,5) ;
            context.data.IncNo = dummy_num;
        });
     
        return super.init();
    }
     
    }
     
    module.exports = { ReportIncident };
