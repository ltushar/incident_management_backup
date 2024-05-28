sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/m/MessageBox","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,o,n,i,s){"use strict";return e.extend("cosreportincident.controller.reportincident",{onInit:function(){const e={incident:{},wasIncOnCosloc:1,noncosvehinvol:1,isinvestreq:1,shift:1,wascosvehused:1,wasIncOnCosloc:1,noncosvehinvol:1,isinvestreq:1,shift:1,wascosvehused:1,isdraft:false,maxDate:new Date,COSEmployee:{},dept:"",division:"",empid:"",empname:"",emppos:"",section:"",supid:"",supname:"",worklocation:"",COSEquipment:[{EquipNo:""}],witness:[],addwellness:1,addwellness:1,isCOSEmp:-1,COSEmployee:[],Contractor:[],Member:[],child1:false,child2:false,child3:false,IncidentCategorys:[{CatId:"1",Cattext:"Injury/Illness"},{CatId:"2",Cattext:"Property /Equipment Damage"},{CatId:"3",Cattext:"Near Miss"},{CatId:"4",Cattext:"Dangerous Occurrence"},{CatId:"5",Cattext:"Environment"},{CatId:"6",Cattext:"Security"}],IncidentTypes:[{TypeId:"1",IncText:"Non-Occupational"},{TypeId:"2",IncText:"No Treatment"},{TypeId:"3",IncText:"First Aid"},{TypeId:"4",IncText:"Medical Consultation"},{TypeId:"5",IncText:"Medical Aid"},{TypeId:"6",IncText:"Modified Work"},{TypeId:"7",IncText:"Lost time Incident"},{TypeId:"8",IncText:"Psychological"},{TypeId:"9",IncText:"Fatality"}],TypeofEvents:[{eventId:"1",eventtext:"Corporate"},{eventId:"2",eventtext:"Private"},{eventId:"3",eventtext:"Charity"}],IncSevirity:[{SevId:"1",Sevtext:"Critical"},{SevId:"2",Sevtext:"Major"},{SevId:"3",Sevtext:"Minor"}],EmpSupNames:[{name:"Stephan Lie",id:"1001"},{name:"Fay Van Damme",id:"1002"},{name:"Brevin Dice",id:"1003"},{name:"Regina Oleveria",id:"1004"},{name:"John Mathew",id:"1005"},{name:"Jim Parker",id:"1006"},{name:"Sophia Ran",id:"1007"},{name:"Wendi Blake",id:"1008"},{name:"Lois Lane",id:"1009"},{name:"Mary Magdalene",id:"1010"},{name:"Simon Cyrene",id:"1011"}]};const o=new t(e);this.getView().setModel(o,"oModel");const n=new t(e);this.getView().setModel(n,"oMasterData");var i=sap.ui.core.UIComponent.getRouterFor(this);i.getRoute("Routereportincident").attachMatched(this._onObjectMatched,this)},_onObjectMatched:function(){const e=this.getView().getModel("oModel");const t=this.getOwnerComponent().getModel().getServiceUrl();$.ajax({type:"GET",contentType:"application/json",url:t+"EmpInfo",success:function(t){console.log("Success:",t);e.setProperty("/dept",t.value[0].dept);e.setProperty("/division",t.value[0].division);e.setProperty("/empid",t.value[0].empid);e.setProperty("/empname",t.value[0].empname);e.setProperty("/emppos",t.value[0].emppos);e.setProperty("/section",t.value[0].section);e.setProperty("/supid",t.value[0].supid);e.setProperty("/supname",t.value[0].supname);e.setProperty("/worklocation",t.value[0].worklocation)}})},onSubmit:function(e){const t=this.getView().getModel("oModel");const o=this.getView().getModel();const i=o.getServiceUrl();const s=t.getProperty("/IncNo");const r=t.getProperty("/Title");const a=t.getProperty("/empname");const c=t.getProperty("/empid");const l=t.getProperty("/emppos");const p=t.getProperty("/division");const d=t.getProperty("/dept");const u=t.getProperty("/section");const g=t.getProperty("/incDate");const y=t.getProperty("/inctime");const m=t.getProperty("/incDaterep");const h=t.getProperty("/inctimerep");const I=t.getProperty("/supid");const f=t.getProperty("/supname");const C=t.getProperty("/yearexppos");const v=t.getProperty("/wasIncOnCosloc");const S=t.getProperty("/shift");const P=t.getProperty("/latitude");const w=t.getProperty("/longitude");const M=t.getProperty("/wascosvehused");const O=t.getProperty("/addwellness");const x=t.getProperty("/busno");const A=t.getProperty("/noncosvehinvol");const D=t.getProperty("/policereportno");const V=t.getProperty("/incCategory");const E=t.getProperty("/incType");const N=t.getProperty("/eventtype");const b=t.getProperty("/actincseverity");const T=t.getProperty("/potseverity");const B=t.getProperty("/isinvestreq");let K=t.getProperty("/child1")===true?"1":"0";K+=",";K+=t.getProperty("/child2")===true?"1":"0";K+=",";K+=t.getProperty("/child3")===true?"1":"0";const q=t.getProperty("/incdesc");const j=t.getProperty("/isdraft");const L=t.getProperty("/worklocation");const _=t.getProperty("/COSEquipment");const F=t.getProperty("/witness");const z=t.getProperty("/COSEmployee");const k=t.getProperty("/Contractor");const W=t.getProperty("/Member");const J=this.getView().getModel();t.setProperty("");const R=new Date;var U=new Date(R),H=""+(U.getMonth()+1),G=""+U.getDate(),Y=U.getFullYear();if(H.length<2)H="0"+H;if(G.length<2)G="0"+G;if(!r){this.getView().byId("titleId").setValueState("Error");n.error("Please fill mandatory fields");return}if(!g){this.getView().byId("DP2").setValueState("Error");n.error("Please fill incident date");return}const Q={INCID:t.getProperty("/INCID"),INCID:t.getProperty("/INCID"),IncNo:s,Title:r,empname:a,empid:c,emppos:l,division:p,dept:d,section:u,incDate:g,inctime:y,incDaterep:m,inctimerep:h,supid:I,supname:f,yearexppos:parseInt(C,10)||0,wasIncOnCosloc:v.toString(),shift:S.toString(),latitude:P,longitude:w,wascosvehused:M.toString(),addmentalhealth:O.toString(),addmentalhealth:O.toString(),busno:x,noncosvehinvol:A.toString(),policereportno:D,incCategory:V,incType:E,eventtype:N,actincseverity:b,potseverity:T,isinvestreq:B.toString(),otherpeopinv:K,incdesc:q,isdraft:j,worklocation:L,worklocation:L,CosEquip:_.map(e=>{e.EquipNo=parseInt(e.EquipNo,10);return e}),Witn:F,cos_emp:z,contract:k,public:W};if(e.oSource.mProperties.text==="Submit"){Q.isdraft="0"}else{Q.isdraft="1"}Q.ID=t.getProperty("/ID");if(Q.ID!==undefined&&Q.ID!==null&&Q.ID!==""){$.ajax({type:"PUT",contentType:"application/json",url:i+"Incident(ID="+Q.ID+",INCID="+Q.INCID+")",data:JSON.stringify(Q),success:function(t){if(e.oSource.mProperties.text==="Submit"){n.success("Incident "+t.IncNo+" has been submitted successfully.",{onClose:function(e){if(e==="OK"){window.history.go(-1)}},actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],emphasizedAction:n.Action.OK})}else{n.information("Saved successfully.",{onClose:function(e){if(e==="OK"){}},actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],emphasizedAction:n.Action.OK})}}})}else{$.ajax({type:"POST",contentType:"application/json",url:i+"Incident",data:JSON.stringify(Q),success:function(t,o,i){if(e.oSource.mProperties.text==="Submit"){n.success("Incident "+t.IncNo+" has been submitted successfully.",{onClose:function(e){if(e==="OK"){window.history.go(-1)}},actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],emphasizedAction:n.Action.OK})}else{n.information("Saved successfully.",{onClose:function(e){if(e==="OK"){}},actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],emphasizedAction:n.Action.OK})}}})}},onLiveChange:function(){this.getView().byId("titleId").setValueState("None");this.getView().byId("empnameId").setValueState("None");this.getView().byId("empId").setValueState("None");this.getView().byId("EmpSupId").setValueState("None")},onDateChange:function(e){var t=e.getSource();var o=t.getValue();var n=e.getParameter("valid");if(!o){t.setValueState("Error");t.setValueStateText("Incident date is mandatory.")}else if(!n){t.setValueState("Error");t.setValueStateText("Invalid date format.")}else{t.setValueState("None");t.setValueStateText("")}},onPressCancel:function(){n.warning("Are you sure you want to cancel? Any unsaved changes will be lost.",{onClose:function(e){if(e==="OK"){window.history.go(-1)}},icon:n.Icon.WARNING,title:"Cancel",actions:[n.Action.OK,n.Action.CANCEL],emphasizedAction:n.Action.OK,initialFocus:n.Action.CANCEL});payload.ID=oModel.getProperty("/ID");if(payload.ID!==undefined&&payload.ID!==null&&payload.ID!==""){$.ajax({type:"PUT",contentType:"application/json",url:serviceurl+"Incident(ID="+payload.ID+",INCID="+payload.INCID+")",data:JSON.stringify(payload),success:function(e){if(oEvent.oSource.mProperties.text==="Submit"){n.success("Incident "+e.IncNo+" has been submitted successfully.",{onClose:function(e){if(e==="OK"){window.history.go(-1)}},actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],emphasizedAction:n.Action.OK})}else{n.information("Saved successfully.",{onClose:function(e){if(e==="OK"){oModel.setData({})}},actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],emphasizedAction:n.Action.OK})}}})}else{$.ajax({type:"POST",contentType:"application/json",url:serviceurl+"Incident",data:JSON.stringify(payload),success:function(e,t,o){if(oEvent.oSource.mProperties.text==="Submit"){n.success("Incident "+e.IncNo+" has been submitted successfully.",{onClose:function(e){if(e==="OK"){window.history.go(-1)}},actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],emphasizedAction:n.Action.OK})}else{n.information("Saved successfully..",{onClose:function(e){if(e==="OK"){oModel.setData({})}},actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],emphasizedAction:n.Action.OK})}}})}},onLiveChange:function(){this.getView().byId("titleId").setValueState("None");this.getView().byId("empnameId").setValueState("None");this.getView().byId("empId").setValueState("None");this.getView().byId("EmpSupId").setValueState("None")},onPressCancel:function(){n.warning("Are you sure you want to cancel? Any unsaved changes will be lost.",{onClose:function(e){if(e==="OK"){window.history.go(-1)}},icon:n.Icon.WARNING,title:"Cancel",actions:[n.Action.OK,n.Action.CANCEL],emphasizedAction:n.Action.OK,initialFocus:n.Action.CANCEL})},handleClose:function(e){const t=this.getView().getModel("oModel");const o=this.getView().getModel();const n=o.getServiceUrl();var i=e.getSource();var s=e.getParameters().selectedItem.getBindingContext().getObject().ID;var r=e.getParameters().selectedItem.getBindingContext().getObject().INCID;$.ajax({type:"GET",contentType:"application/json",url:n+"Incident"+"(ID="+s+",INCID="+r+")?$expand=CosEquip,Witn,cos_emp,contract,public",success:function(e){console.log("Success:",e);e.wascosvehused=parseInt(e.wascosvehused);e.wasIncOnCosloc=parseInt(e.wasIncOnCosloc);e.noncosvehinvol=parseInt(e.noncosvehinvol);e.isinvestreq=parseInt(e.isinvestreq);e.yearexppos=parseInt(e.yearexppos);e.shift=parseInt(e.shift);e.COSEmployee=e.cos_emp;e.COSEquipment=e.CosEquip;e.witness=e.Witn;e.Contractor=e.contract;e.Member=e.public;e.addwellness=parseInt(e.addmentalhealth);if(e.otherpeopinv!==undefined&&e.otherpeopinv!==null&&e.otherpeopinv!==""){e.child1=e.otherpeopinv.split(",")[0]==="1"?true:false;e.child2=e.otherpeopinv.split(",")[1]==="1"?true:false;e.child3=e.otherpeopinv.split(",")[2]==="1"?true:false}e.COSEmployee=e.cos_emp;e.COSEquipment=e.CosEquip;e.witness=e.Witn;e.Contractor=e.contract;e.Member=e.public;e.addwellness=parseInt(e.addmentalhealth);if(e.otherpeopinv!==undefined&&e.otherpeopinv!==null&&e.otherpeopinv!==""){e.child1=e.otherpeopinv.split(",")[0]==="1"?true:false;e.child2=e.otherpeopinv.split(",")[1]==="1"?true:false;e.child3=e.otherpeopinv.split(",")[2]==="1"?true:false}t.setData(e)}})},onPressValuHelp:function(e){const t=e.getParameters().selectedItem.getTitle();const o=e.getParameters().selectedItem.getDescription();this.getView().getModel("oModel").setProperty("/supname",t);this.getView().getModel("oModel").setProperty("/supid",o);this.onLiveChange();this.onLiveChange()},handleValueHelp:function(e){var t=e.getSource().getValue(),n=this.getView();this._sInputId=e.getSource().getId();if(!this._pValueHelpDialog){this._pValueHelpDialog=o.load({id:n.getId(),name:"cosreportincident.fragments.EmployeeSupList",controller:this}).then(function(e){n.addDependent(e);return e})}this._pValueHelpDialog.then(function(e){e.open()})},onAddCOSEquip:function(){const e=this.getView().getModel("oModel");const t=e.getProperty("/COSEquipment");t.push({EquipNo:""});e.setProperty("/COSEquipment",t)},onDeleteCOS:function(e){const t=e.getSource().getBindingContext("oModel").getPath().slice(-1);const o=this.getView().getModel("oModel");const n=o.getProperty("/COSEquipment");if(n.length>1){n.splice(t,1)}o.setProperty("/COSEquipment",n)},onAddWitness:function(){const e=this.getView().getModel("oModel");const t=e.getProperty("/witness");t.push({});e.setProperty("/witness",t)},onDelete:function(e){const t=e.getSource().getBindingContext("oModel").getPath().slice(-1);const o=this.getView().getModel("oModel");const n=o.getProperty("/witness");n.splice(t,1);o.setProperty("/witness",n)},onAddCOSEmployee:function(){const e=this.getView().getModel("oModel");const t=e.getProperty("/COSEmployee");t.push({});e.setProperty("/COSEmployee",t)},onDeleteCOSEmp:function(e){const t=e.getSource().getBindingContext("oModel").getPath().slice(-1);const o=this.getView().getModel("oModel");const n=o.getProperty("/COSEmployee");n.splice(t,1);o.setProperty("/COSEmployee",n)},onAddContractor:function(){const e=this.getView().getModel("oModel");const t=e.getProperty("/Contractor");t.push({});e.setProperty("/Contractor",t)},onDeleteContarctor:function(e){const t=e.getSource().getBindingContext("oModel").getPath().slice(-1);const o=this.getView().getModel("oModel");const n=o.getProperty("/Contractor");n.splice(t,1);o.setProperty("/Contractor",n)},onAddMember:function(){const e=this.getView().getModel("oModel");const t=e.getProperty("/Member");t.push({});e.setProperty("/Member",t)},onDeleteMember:function(e){const t=e.getSource().getBindingContext("oModel").getPath().slice(-1);const o=this.getView().getModel("oModel");const n=o.getProperty("/Member");n.splice(t,1);o.setProperty("/Member",n)},onSelectLoadDraft:function(e){var t=e.getSource(),n=this.getView();if(!this._pDialog){this._pDialog=o.load({id:n.getId(),name:"cosreportincident.fragments.loaddraft",controller:this}).then(function(e){e.setModel(n.getModel());return e})}this._pDialog.then(function(e){e.open()})},onDeleteDraft:function(e){const t=e.getSource().getBindingContext().getObject().ID;const o=e.getSource().getBindingContext().getObject().INCID;const i=this.getView().getModel();$.ajax({type:"DELETE",contentType:"application/json",url:"/browse/Incident(ID="+t+",INCID="+o+")",success:function(e){n.success("Deleted Successfully");i.refresh()}})},handleSearch:function(e){var t=e.getParameter("value");var o=new i("IncNo",s.Contains,t);var n=e.getSource().getBinding("items");n.filter([o])},onInputChange:function(e){var t=e.getSource();var o=t.getValue();if(!isNaN(parseFloat(o))&&isFinite(o)){t.setValueState(sap.ui.core.ValueState.None)}else{t.setValueState(sap.ui.core.ValueState.Error);t.setValueStateText("Please enter a valid number")}},handleSearch:function(e){var t=e.getParameter("value");var o=new i("IncNo",s.Contains,t);var n=e.getSource().getBinding("items");n.filter([o])}})});