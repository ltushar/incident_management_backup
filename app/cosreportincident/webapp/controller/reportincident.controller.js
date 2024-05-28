sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel , Fragment, MessageBox, Filter, FilterOperator) {
    
        "use strict";

        return Controller.extend("cosreportincident.controller.reportincident", {
            onInit: function () {
                const oData = {
                    incident:{},
                    wasIncOnCosloc:1,
                    noncosvehinvol:1,
                    isinvestreq:1,
                    shift: 1,
                    wascosvehused:1,
                    wasIncOnCosloc:1,
                    noncosvehinvol:1,
                    isinvestreq:1,
                    shift: 1,
                    wascosvehused:1,
                    isdraft: false,
                    maxDate: new Date(),
                    COSEmployee:{},
                    dept: "",
                        division: "",
                        empid: "",
                        empname: "",
                        emppos: "",
                        section: "",
                        supid: "",
                        supname: "",
                        worklocation: "",


                    "COSEquipment": [{
                        EquipNo: ""

                    }],
                    "witness": [],
                    "addwellness": 1,
                    "addwellness": 1,
                    "isCOSEmp": -1,
                    "COSEmployee": [],
                    "Contractor": [],
                    "Member": [],
                    "child1": false,
                    "child2": false,
                    "child3": false,
                    "IncidentCategorys" : [{
                        CatId : "1",
                        Cattext : "Injury/Illness"
                    },
                    {
                        CatId : "2",
                        Cattext : "Property /Equipment Damage"
                    },
                    {
                        CatId : "3",
                        Cattext : "Near Miss"
                    },
                    {
                        CatId : "4",
                        Cattext : "Dangerous Occurrence"
                    },
                    {
                        CatId : "5",
                        Cattext : "Environment"
                    },
                    {
                        CatId : "6",
                        Cattext : "Security"
                    }],
                    "IncidentTypes": [{
                        TypeId : "1",
                        IncText : "Non-Occupational"
                    },
                    {
                        TypeId : "2",
                        IncText : "No Treatment"
                    },
                    {
                        TypeId : "3",
                        IncText : "First Aid"
                    },
                    {
                        TypeId : "4",
                        IncText : "Medical Consultation"
                    },
                    {
                        TypeId : "5",
                        IncText : "Medical Aid"
                    },
                    {
                        TypeId : "6",
                        IncText : "Modified Work"
                    },
                    {
                        TypeId : "7",
                        IncText : "Lost time Incident"
                    },
                    {
                        TypeId : "8",
                        IncText : "Psychological"
                    },
                    {
                        TypeId : "9",
                        IncText : "Fatality"
                    }],
                    "TypeofEvents":[{
                        eventId : "1",
                        eventtext:"Corporate"
                    },
                    {
                        eventId : "2",
                        eventtext:"Private"
                    },
                    {
                        eventId : "3",
                        eventtext:"Charity"
                    }],
                    "IncSevirity":[{
                        SevId : "1",
                        Sevtext:"Critical"
                    },
                    {
                        SevId : "2",
                        Sevtext:"Major"
                    },
                    {
                        SevId : "3",
                        Sevtext:"Minor"
                    }],
                    EmpSupNames: [
                        {
                          name: "Stephan Lie",
                          id:"1001"
                        },
                        {
                          name: "Fay Van Damme",
                          id:"1002"
                        },
                        {
                          name: "Brevin Dice",
                          id:"1003"
                        },
                        {
                          name: "Regina Oleveria",
                          id:"1004"
                        },
                        {
                          name: "John Mathew",
                          id:"1005"
                        },
                        {
                          name: "Jim Parker",
                          id:"1006"
                        },
                        {
                          name: "Sophia Ran",
                          id:"1007"
                        },
                        {
                            name: "Wendi Blake",
                            id:"1008"
                        },
                        {
                            name: "Lois Lane",
                            id:"1009"
                        },
                        {
                            name: "Mary Magdalene",
                            id:"1010"
                        },
                        {
                            name: "Simon Cyrene",
                            id:"1011"
                        },
                      ]

                };

                const oModel = new JSONModel(oData);
                this.getView().setModel(oModel, "oModel");

                const oMasterData = new JSONModel(oData);
                this.getView().setModel(oMasterData, "oMasterData");

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Routereportincident").attachMatched(this._onObjectMatched, this);
 
            },

            _onObjectMatched :function(){
                const oModel = this.getView().getModel("oModel");
               const  url = this.getOwnerComponent().getModel().getServiceUrl();
                 $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    
                    url: url + "EmpInfo",
                    success: function(response) {
                        console.log("Success:", response);
                        //oModel.setData(response);
                        //console.log(response.value);
                        oModel.setProperty("/dept", response.value[0].dept);
                        oModel.setProperty("/division", response.value[0].division);
                        oModel.setProperty("/empid", response.value[0].empid);
                        oModel.setProperty("/empname", response.value[0].empname);
                        oModel.setProperty("/emppos", response.value[0].emppos);
                        oModel.setProperty("/section", response.value[0].section);
                        oModel.setProperty("/supid", response.value[0].supid);
                        oModel.setProperty("/supname", response.value[0].supname);
                        oModel.setProperty("/worklocation", response.value[0].worklocation);
                        //debugger;
                    },
                  }); 
            },

            onSubmit: function(oEvent){
                const oModel = this.getView().getModel("oModel");

                const defaultModel = this.getView().getModel();
                const serviceurl = defaultModel.getServiceUrl(); 

                const IncNo = oModel.getProperty("/IncNo");
                const Title = oModel.getProperty("/Title");
                const empname = oModel.getProperty("/empname");
                const empid = oModel.getProperty("/empid");
                const emppos = oModel.getProperty("/emppos");
                const division = oModel.getProperty("/division");
                const dept = oModel.getProperty("/dept");
                const section = oModel.getProperty("/section");
                const incDate = oModel.getProperty("/incDate");
                const inctime = oModel.getProperty("/inctime");
                const incDaterep = oModel.getProperty("/incDaterep");
                const inctimerep = oModel.getProperty("/inctimerep");
                const supid = oModel.getProperty("/supid");
                const supname = oModel.getProperty("/supname");
                const yearexppos = oModel.getProperty("/yearexppos");
                const wasIncOnCosloc = oModel.getProperty("/wasIncOnCosloc");
                const shift = oModel.getProperty("/shift");
                const latitude = oModel.getProperty("/latitude");
                const longitude = oModel.getProperty("/longitude");
                const wascosvehused = oModel.getProperty("/wascosvehused");
                const addmentalhealth = oModel.getProperty("/addwellness");
               
                const busno = oModel.getProperty("/busno");
                const noncosvehinvol = oModel.getProperty("/noncosvehinvol");
                const policereportno = oModel.getProperty("/policereportno");
                const incCategory = oModel.getProperty("/incCategory");
                const incType = oModel.getProperty("/incType");
                const eventtype = oModel.getProperty("/eventtype");
                const actincseverity = oModel.getProperty("/actincseverity");
                const potseverity = oModel.getProperty("/potseverity");
                const isinvestreq = oModel.getProperty("/isinvestreq");
                let otherpeopinv = oModel.getProperty("/child1") === true ? '1' : '0';
                otherpeopinv += ',';
                otherpeopinv += oModel.getProperty("/child2") === true ? '1' : '0';
                otherpeopinv += ',';
                otherpeopinv += oModel.getProperty("/child3") === true ? '1' : '0';
                
                const incdesc = oModel.getProperty("/incdesc");
                const isdraft = oModel.getProperty("/isdraft");
                const worklocation = oModel.getProperty("/worklocation");

                
                const COSEquipments = oModel.getProperty("/COSEquipment");
                const witness = oModel.getProperty("/witness");
                const COSEmployee = oModel.getProperty("/COSEmployee");
                const Contractor = oModel.getProperty("/Contractor");
                const Member = oModel.getProperty("/Member");

                const model = this.getView().getModel();

                oModel.setProperty("")


                const date = new Date();
                var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();
 
                if (month.length < 2) month = "0" + month;
                if (day.length < 2) day = "0" + day;



                // if(incDaterep >= incDate){
                //     MessageBox.error(
                //         "Reported date should be greater than or equal to incident date"
                //       );
                // }


                // if(incDaterep >= incDate){
                //     MessageBox.error(
                //         "Reported date should be greater than or equal to incident date"
                //       );
                // }
 
                if (!Title) {
                    this.getView().byId("titleId").setValueState("Error");
                    MessageBox.error("Please fill mandatory fields");
                    return;
                    }

                if (!incDate) {
                    this.getView().byId("DP2").setValueState("Error");
                    MessageBox.error("Please fill incident date");
                    return;
                }

                // if (!empid) {
                //     this.getView().byId("empId").setValueState("Error");
                //     MessageBox.error("Please fill mandatory fields");
                //     return;
                // }

                // if (!supname) {
                //     this.getView().byId("EmpSupId").setValueState("Error");
                //     MessageBox.error("Please fill mandatory fields");
                //     return;
                // }else{
                //     this.getView().byId("EmpSupId").setValueState("None");
                // }


                const payload = {
                    INCID           : oModel.getProperty('/INCID'),
                    INCID           : oModel.getProperty('/INCID'),
                    IncNo           : IncNo,
                    Title           : Title,
                    empname         : empname,
                    empid          	: empid,		
                    emppos         	: emppos,
                    division       	: division,
                    dept           	: dept,
                    section         : section,
                    incDate         : incDate,
                    inctime         : inctime,
                    incDaterep      : incDaterep,
                    inctimerep      : inctimerep,
                    supid           : supid,
                    supname         : supname,
                    yearexppos      : parseInt(yearexppos,10) || 0,
                    wasIncOnCosloc  : wasIncOnCosloc.toString(),
                    shift           : shift.toString(),
                    latitude        : latitude,
                    longitude       : longitude,
                    wascosvehused   : wascosvehused.toString(),
                    addmentalhealth : addmentalhealth.toString(),
                    addmentalhealth : addmentalhealth.toString(),
                    busno           : busno,
                    noncosvehinvol  : noncosvehinvol.toString(),
                    policereportno  : policereportno,
                    incCategory     : incCategory,
                    incType         : incType,
                    eventtype       : eventtype,
                    actincseverity  : actincseverity,
                    potseverity     : potseverity,
                    isinvestreq     : isinvestreq.toString(),
                    otherpeopinv    : otherpeopinv,
                    incdesc         : incdesc,
                    isdraft         : isdraft,
                    worklocation    : worklocation,
                    worklocation    : worklocation,
                    CosEquip : COSEquipments.map((item) => {
                        item.EquipNo = parseInt(item.EquipNo, 10);
                        return item;
                      }),
                    Witn: witness,
                    cos_emp: COSEmployee,
                    contract:Contractor,
                    public:Member
                };

                if(oEvent.oSource.mProperties.text === 'Submit'){

                    payload.isdraft = "0";

                }else{

                    payload.isdraft = "1";

                }

                // $.ajax({
                //     type: "POST",
                //     contentType: "application/json",
                //     url: serviceurl + "Incident",
                //     data: JSON.stringify(payload),
                //     success: function (response) {
                //     debugger;
                //     //  defaultModel.refresh();
                //     //window.history.go(-1)
                //     },
                //   });


                payload.ID = oModel.getProperty('/ID');

                if(payload.ID !== undefined && payload.ID !== null && payload.ID !==""){
 
                    $.ajax({
                        type: "PUT",
                        contentType: "application/json",
                        //url: '/odata/v4/union-rep/Grievance('+payload.ID+')',
                        url: serviceurl + 'Incident(ID='+payload.ID+',INCID='+payload.INCID+')',
                        data: JSON.stringify(payload),
                        success: function (response) {
                            if(oEvent.oSource.mProperties.text === 'Submit'){
                                MessageBox.success("Incident "+response.IncNo+" has been submitted successfully.",{
                                    onClose : function(ok){
                                    if(ok === 'OK'){
                                        window.history.go(-1);
                                    }
                                },
                                actions : [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                                emphasizedAction : MessageBox.Action.OK
                            });
                            }else{
                                MessageBox.information("Saved successfully.",{
                                    onClose : function(ok){
                                        if(ok === 'OK'){
                                            //oModel.setData({});
                                        }
                                    }, 
                                    actions : [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    	            emphasizedAction : MessageBox.Action.OK 
                                });
                            }
                            },
                    });
 
                }else{
 
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: serviceurl + 'Incident',
                        data: JSON.stringify(payload),
                        success: function (response, statusText, xhrToken) {
                            if(oEvent.oSource.mProperties.text === 'Submit'){
                                MessageBox.success("Incident "+response.IncNo+" has been submitted successfully.",{
                                onClose : function(ok){
                                if(ok === 'OK'){
                                    window.history.go(-1);
                                }
                            },
                            actions : [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    	    emphasizedAction : MessageBox.Action.OK
                        });
                            }else{
                                MessageBox.information("Saved successfully.",{
                                    onClose : function(ok){
                                        if(ok === 'OK'){
                                           // oModel.setData({});
                                        }
                                    }, 
                                    actions : [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    	            emphasizedAction : MessageBox.Action.OK 
                                });
                            }
                        },
                    });
                }
                  
            },

            onLiveChange: function(){

                this.getView().byId("titleId").setValueState("None");
                this.getView().byId("empnameId").setValueState("None");
                this.getView().byId("empId").setValueState("None");

                this.getView().byId("EmpSupId").setValueState("None");

            },
            onDateChange: function (oEvent) {
                var oDatePicker = oEvent.getSource();
                var sValue = oDatePicker.getValue();
                var bValid = oEvent.getParameter("valid");
   
                if (!sValue) {
                    oDatePicker.setValueState("Error");
                    oDatePicker.setValueStateText("Incident date is mandatory.");
                } else if (!bValid) {
                    oDatePicker.setValueState("Error");
                    oDatePicker.setValueStateText("Invalid date format.");
                } else {
                    oDatePicker.setValueState("None");
                    oDatePicker.setValueStateText("");
                }
            },
            onPressCancel:function(){
                MessageBox.warning(
                    "Are you sure you want to cancel? Any unsaved changes will be lost.",
                    {
                        onClose : function(ok){
                            if(ok === 'OK'){
                                window.history.go(-1);
                            } 
                        },
                        icon: MessageBox.Icon.WARNING,
                        title: "Cancel",
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        initialFocus: MessageBox.Action.CANCEL,
                    }
                );

                // $.ajax({
                //     type: "POST",
                //     contentType: "application/json",
                //     url: serviceurl + "Incident",
                //     data: JSON.stringify(payload),
                //     success: function (response) {
                //     debugger;
                //     //  defaultModel.refresh();
                //     //window.history.go(-1)
                //     },
                //   });


                payload.ID = oModel.getProperty('/ID');

                if(payload.ID !== undefined && payload.ID !== null && payload.ID !==""){
 
                    $.ajax({
                        type: "PUT",
                        contentType: "application/json",
                        //url: '/odata/v4/union-rep/Grievance('+payload.ID+')',
                        url: serviceurl + 'Incident(ID='+payload.ID+',INCID='+payload.INCID+')',
                        data: JSON.stringify(payload),
                        success: function (response) {
                            if(oEvent.oSource.mProperties.text === 'Submit'){
                                MessageBox.success("Incident "+response.IncNo+" has been submitted successfully.",{
                                    onClose : function(ok){
                                    if(ok === 'OK'){
                                        window.history.go(-1);
                                    }
                                },
                                actions : [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                                emphasizedAction : MessageBox.Action.OK
                            });
                            }else{
                                MessageBox.information("Saved successfully.",{
                                    onClose : function(ok){
                                        if(ok === 'OK'){
                                            oModel.setData({});
                                        }
                                    }, 
                                    actions : [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    	            emphasizedAction : MessageBox.Action.OK 
                                });
                            }
                            },
                    });
 
                }else{
 
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        url: serviceurl + 'Incident',
                        data: JSON.stringify(payload),
                        success: function (response, statusText, xhrToken) {
                            if(oEvent.oSource.mProperties.text === 'Submit'){
                                MessageBox.success("Incident "+response.IncNo+" has been submitted successfully.",{
                                onClose : function(ok){
                                if(ok === 'OK'){
                                    window.history.go(-1);
                                }
                            },
                            actions : [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    	    emphasizedAction : MessageBox.Action.OK
                        });
                            }else{
                                MessageBox.information("Saved successfully..",{
                                    onClose : function(ok){
                                        if(ok === 'OK'){
                                            oModel.setData({});
                                        }
                                    }, 
                                    actions : [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    	            emphasizedAction : MessageBox.Action.OK 
                                });
                            }
                        },
                    });
                }
                  
            },

            onLiveChange: function(){

                this.getView().byId("titleId").setValueState("None");
                this.getView().byId("empnameId").setValueState("None");
                this.getView().byId("empId").setValueState("None");

                this.getView().byId("EmpSupId").setValueState("None");

            },
            onPressCancel:function(){
                MessageBox.warning(
                    "Are you sure you want to cancel? Any unsaved changes will be lost.",
                    {
                        onClose : function(ok){
                            if(ok === 'OK'){
                                window.history.go(-1);
                            } 
                        },
                        icon: MessageBox.Icon.WARNING,
                        title: "Cancel",
                        actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                        emphasizedAction: MessageBox.Action.OK,
                        initialFocus: MessageBox.Action.CANCEL,
                    }
                );
            },
            handleClose:function(oEvent){
    
                const oModel = this.getView().getModel("oModel");

                const defaultModel = this.getView().getModel();
                const serviceurl = defaultModel.getServiceUrl(); 

                var oSelectedItem = oEvent.getSource();
               // var incident = oModel.setProperty("/Incident");

               // var draft = oEvent.getSource().getBindindContext().getObject();
                //var draft = oEvent.getParameters().selectedItem.getBindingContext().getObject().INCID;

                var UUID = oEvent.getParameters().selectedItem.getBindingContext().getObject().ID;
                var INCID = oEvent.getParameters().selectedItem.getBindingContext().getObject().INCID;

                $.ajax({
                    type: "GET",
                    contentType: "application/json",
                    
                    url: serviceurl + "Incident" +'(ID='+ UUID+ ',INCID=' + INCID +')?$expand=CosEquip,Witn,cos_emp,contract,public',
                    success: function(response) {
                        console.log("Success:", response);
                        response.wascosvehused = parseInt(response.wascosvehused);
                        response.wasIncOnCosloc = parseInt(response.wasIncOnCosloc);
                        response.noncosvehinvol = parseInt(response.noncosvehinvol);
                        response.isinvestreq = parseInt(response.isinvestreq);
                        response.yearexppos = parseInt(response.yearexppos);
                        response.shift = parseInt(response.shift);
                        response.COSEmployee = response.cos_emp;
                        response.COSEquipment = response.CosEquip;
                        response.witness = response.Witn;
                        response.Contractor = response.contract;
                        response.Member = response.public;
                        response.addwellness = parseInt(response.addmentalhealth);

                        if(response.otherpeopinv !== undefined && response.otherpeopinv !== null && response.otherpeopinv !== ''){

                        response.child1 = response.otherpeopinv.split(',')[0] === '1' ? true : false;
                        response.child2 = response.otherpeopinv.split(',')[1] === '1' ? true : false;
                        response.child3 = response.otherpeopinv.split(',')[2] === '1' ? true : false;

                        }
                        response.COSEmployee = response.cos_emp;
                        response.COSEquipment = response.CosEquip;
                        response.witness = response.Witn;
                        response.Contractor = response.contract;
                        response.Member = response.public;
                        response.addwellness = parseInt(response.addmentalhealth);

                        if(response.otherpeopinv !== undefined && response.otherpeopinv !== null && response.otherpeopinv !== ''){

                        response.child1 = response.otherpeopinv.split(',')[0] === '1' ? true : false;
                        response.child2 = response.otherpeopinv.split(',')[1] === '1' ? true : false;
                        response.child3 = response.otherpeopinv.split(',')[2] === '1' ? true : false;

                        }
                        oModel.setData(response);
                        //console.log(response.value);
                        //debugger;
                        //debugger;
                    },
                  }); 
            },
            onPressValuHelp: function (oEvent) {
                const text = oEvent.getParameters().selectedItem.getTitle();
                const textid = oEvent.getParameters().selectedItem.getDescription();
                this.getView()
                  .getModel("oModel")
                  .setProperty("/supname", text);

                  this.getView()
                  .getModel("oModel")
                  .setProperty("/supid", textid);

                this.onLiveChange();
                this.onLiveChange();
              }, 
            handleValueHelp: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue(),
                oView = this.getView();
                this._sInputId = oEvent.getSource().getId();

                if (!this._pValueHelpDialog) {
                this._pValueHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "cosreportincident.fragments.EmployeeSupList",
                    controller: this,
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
                this._pValueHelpDialog.then(function (oDialog) {
                // Create a filter for the binding
                // Open ValueHelpDialog filtered by the input's value
                oDialog.open();
                });
            },
            onAddCOSEquip: function () {
                const oModel = this.getView().getModel("oModel");
                const COSEquipment = oModel.getProperty("/COSEquipment");

                COSEquipment.push({
                    EquipNo: ""
                });
                oModel.setProperty("/COSEquipment", COSEquipment);
            },
            onDeleteCOS:function(oEvent){
                const index = oEvent
                    .getSource()
                    .getBindingContext("oModel")
                    .getPath()
                    .slice(-1);

                const oModel = this.getView().getModel("oModel");
                const COSEquipment = oModel.getProperty("/COSEquipment");

                if(COSEquipment.length > 1){
                COSEquipment.splice(index, 1);
                }
                oModel.setProperty("/COSEquipment", COSEquipment);

            },
            onAddWitness: function () {
                const oModel = this.getView().getModel("oModel");
                const witness = oModel.getProperty("/witness");

                witness.push({
                });
                oModel.setProperty("/witness", witness);
            },
            onDelete: function (oEvent) {
                const index = oEvent
                    .getSource()
                    .getBindingContext("oModel")
                    .getPath()
                    .slice(-1);

                const oModel = this.getView().getModel("oModel");
                const witness = oModel.getProperty("/witness");

                witness.splice(index, 1);
                oModel.setProperty("/witness", witness);
            },
            onAddCOSEmployee: function () {
                const oModel = this.getView().getModel("oModel");
                const COSEmployee = oModel.getProperty("/COSEmployee");

                COSEmployee.push({
                    
                    
                });
                oModel.setProperty("/COSEmployee", COSEmployee);
            },
            onDeleteCOSEmp: function (oEvent) {
                const index = oEvent
                    .getSource()
                    .getBindingContext("oModel")
                    .getPath()
                    .slice(-1);

                const oModel = this.getView().getModel("oModel");
                const COSEmployee = oModel.getProperty("/COSEmployee");

                COSEmployee.splice(index, 1);
                oModel.setProperty("/COSEmployee", COSEmployee);

            },
            onAddContractor: function () {
                const oModel = this.getView().getModel("oModel");
                const Contractor = oModel.getProperty("/Contractor");

                Contractor.push({
                });
                oModel.setProperty("/Contractor", Contractor);
            },
            onDeleteContarctor: function (oEvent) {
                const index = oEvent
                    .getSource()
                    .getBindingContext("oModel")
                    .getPath()
                    .slice(-1);

                const oModel = this.getView().getModel("oModel");
                const Contractor = oModel.getProperty("/Contractor");

                Contractor.splice(index, 1);
                oModel.setProperty("/Contractor", Contractor);

            },
            onAddMember: function () {
                const oModel = this.getView().getModel("oModel");
                const Member = oModel.getProperty("/Member");

                Member.push({
                });
                oModel.setProperty("/Member", Member);

            },
            onDeleteMember: function (oEvent) {
                const index = oEvent
                    .getSource()
                    .getBindingContext("oModel")
                    .getPath()
                    .slice(-1);

                const oModel = this.getView().getModel("oModel");
                const Member = oModel.getProperty("/Member");

                Member.splice(index, 1);
                oModel.setProperty("/Member", Member);
            },
            onSelectLoadDraft: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();
    
                if (!this._pDialog) {
                    this._pDialog = Fragment.load({
                        id: oView.getId(),
                        name: "cosreportincident.fragments.loaddraft",
                        controller: this
                    }).then(function (oDialog){
                        oDialog.setModel(oView.getModel());
                        return oDialog;
                    });
                }
    
                this._pDialog.then(function(oDialog){
                    oDialog.open();
                });
    
            },
            onDeleteDraft: function(oEvent){
                const ID = oEvent.getSource().getBindingContext().getObject().ID;
                const INCID = oEvent.getSource().getBindingContext().getObject().INCID;
                const model = this.getView().getModel();

                $.ajax({
                    type: "DELETE",
                    contentType: "application/json",
                    //url: '/odata/v4/union-rep/Grievance('+payload.ID+')',
                    url: '/browse/Incident(ID='+ID+',INCID='+INCID+')',
                    success: function (response) {
                        
                            MessageBox.success("Deleted Successfully");
                            model.refresh();

                        
                        },
                });

               // sap.ui.getCore().byId('draftid').getBinding('items').refresh();

            },
            handleSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("IncNo", FilterOperator.Contains, sValue);
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter([oFilter]);
            },
            onInputChange: function(oEvent) {
                var oInput = oEvent.getSource();
                var sValue = oInput.getValue();
            
                // Check if the input is a valid number
                if (!isNaN(parseFloat(sValue)) && isFinite(sValue)) {
                    oInput.setValueState(sap.ui.core.ValueState.None); // Clear error state
                } else {
                    oInput.setValueState(sap.ui.core.ValueState.Error); // Set error state
                    oInput.setValueStateText("Please enter a valid number"); // Set error message
                }
            },
            handleSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("IncNo", FilterOperator.Contains, sValue);
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter([oFilter]);
            }
        });
    });
