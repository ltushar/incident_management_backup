sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/m/MessageBox",
      "sap/m/MessageToast",
      "sap/ui/model/json/JSONModel",
      'sap/ui/model/Filter',
      'sap/ui/model/FilterOperator',
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast, JSONModel, Filter, FilterOperator,) {
      "use strict";
  
      return Controller.extend("cosincidentportalhs.controller.IncidentPortalLandingHS", {
  
  
  
        onInit: function () {
          const model = new JSONModel({
  
            Incident_Details: [
              {
                IncNo: "",
                supname: "",
                incType: "",
                incDate: "",
                incStatus: "",
                incCategory: ""
  
              },
  
            ],
  
          });
  
          this.getView().setModel(model, "localModel");
  
          const oMasterData = new JSONModel(model.getData());
          this.getView().setModel(oMasterData, "oMasterData");
          const url = this.getOwnerComponent().getModel().getServiceUrl()
  
          $.ajax({
            type: "GET",
            contentType: "application/json",
            url: url + "IncMData",
            success: function (response) {
              console.log("Success:", response);
              oMasterData.setProperty("/MasterData", response.value)
              debugger;
            },
          });
  
        },
  
        onSearch: function (oevt) {
          const aFilter = [];
          // var oMasterData = this.getView().getModel("oMasterData");
          // var MyID = oMasterData.getProperty("/IncidentTypes");//selectedKeys
          const sQuery1 = this.byId("Multi5").getSelectedKey();
          const sQuery3 = this.byId("Multi3").getSelectedKey();
          const sQuery4 = this.byId("Multi4").getSelectedKey();
          const sQuery6 = this.byId("Multi6").getSelectedKey();
          const sQuery8 = this.byId("Multi8").getSelectedKey();
         
          if (sQuery1 !== "") aFilter.push(new Filter("incType", "EQ", sQuery1));
          if (sQuery3 !== "") aFilter.push(new Filter("incCategory", "EQ", sQuery3));
          if (sQuery4 !== "") aFilter.push(new Filter("incStatus", "EQ", sQuery4));
          if (sQuery6 !== "") aFilter.push(new Filter("IncNo", "EQ", sQuery6));
          if (sQuery8 !== "") aFilter.push(new Filter("empid", "EQ", sQuery8));
     
  
          // filter binding
          const oList = this.byId("table");
          const oBinding = oList.getBinding("items");
          oBinding.filter(aFilter);
        },
        OnPressIncNo: function (oEvent) {
          var object = oEvent.getSource().getBindingContext().getObject()
            ;
          var globalModel = this.getOwnerComponent().getModel("globalModel");
          this.getOwnerComponent().getRouter(this).navTo("RouteIncidentPortalHS", {
            ID: object.ID,
            INCID: object.INCID
          });
  
          globalModel.setProperty("/keys", {
            ID: object.ID,
            INCID: object.INCID
          })
          //oEvent.getParameters().selectedItem.getBindingContext().getObject()
        },
        formatIncidentType: function (value) {
  
          if (!value) return "";
  
          const oMasterData = this.getView().getModel("oMasterData");
          const IncidentTypes = oMasterData.getProperty("/MasterData"),
            index = IncidentTypes.find(item => item.mid == value);
          return index.text || "";
        },
      
        onClear: function () {
         
                        var oMasterData = this.getView().getModel('oMasterData');
                        const F1 = this.byId("Multi5").setSelectedKey('');
                        const F2 = this.byId("Multi3").setSelectedKey('');
                        const F3 = this.byId("Multi4").setSelectedKey('');
                        const F4 = this.byId("Multi6").setSelectedKey('');
                        const F5 = this.byId("Multi8").setSelectedKey('');
  
                        this.oTable = this.getView().byId("table");
                        this.oTable.getBinding("items").filter([]);
  
                        
         
                    }
      });
    });
  
  
  
  
  