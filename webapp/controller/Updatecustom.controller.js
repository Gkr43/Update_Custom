sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
	"sap/ui/model/Filter",
    "sap/m/MessageBox"
],
function (Controller,FilterOperator,Filter,MessageBox) {
    "use strict";

  return Controller.extend("updatecustom.controller.Updatecustom", {
        onInit: function () {
            debugger;
            this.oModel = this.getOwnerComponent().getModel();
            this.oModel2 = this.getOwnerComponent().getModel('SD_PRICING_CONDITIONRECORD_SRV');
           var oJSONModel = new sap.ui.model.json.JSONModel();
          // this.OnExcellFileReadTable();

        },
        
        // readConditionPricing:function(aResults){
        //     var oParams={"$select":[ConditionType,ConditionTypeName,ConditionTable,Customer,Division,SalesOrganization,DistributionChannel,Material,SalesDocumentType,ConditionValidityStartDate,ConditionValidityEndDate,ConditionReleaseStatus,ConditionReleaseStatusText,ConditionRecord,ConditionType_fc,ConditionTable_fc,ConditionRateRatio,ConditionCurrency,ConditionRateAmount_fc,ConditionRateAmount,ConditionQuantity,ConditionQuantity_fc,ConditionQuantityUnit,Criticality,ConditionLowerLimitRatio_fc,ConditionLowerLimitRatio,ConditionLowerLimitAmount_fc,ConditionLowerLimitAmount,ConditionUpperLimitRatio_fc,ConditionUpperLimitRatio,ConditionUpperLimitAmount_fc,ConditionUpperLimitAmount,ConditionText,ConditionText_fc,PaymentTerms,PaymentTerms_fc,PaymentTermsName,FixedValueDate,FixedValueDate_fc,AdditionalValueDays,AdditionalValueDays_fc,ConditionToBaseQtyNmrtr,ConditionToBaseQtyNmrtr_fc,ConditionToBaseQtyDnmntr,ConditionToBaseQtyDnmntr_fc,BaseUnit,BaseUnit_fc,ConditionCalculationType,ConditionCalculationType_fc,ConditionCalculationTypeName,PrevApprovedConditionRecord,SalesPriceApprovalRequest,Status,ConditionRecordUUID,IsActiveEntity,DraftEntityLastChangeDateTime,ConditionRecordIsDraft,ConditionQuantityUnit_fc,PricingScaleType,PricingScaleType_fc,ConditionRateValueIsAmount,ConditionRateValueIsRatio,ConditionFioriID]}
           
        //     if(aResults.length>0){
        //         var oFilters= [];
        //         oFilters.push(new Filter("ConditionType", "EQ", "ZR00"));
        //         oFilters.push(new Filter("ConditionTable", "EQ", "904")); 
        //         for(var i=0;i<aResults.length;i++){
        //             new Filter("Material", "EQ", aResults[i].material),
        //             new Filter("SalesOrganization", "EQ", aResults[i].salesorganization),
        //             new Filter("Customer", "EQ", aResults[i].materialbycustomer),
        //             new Filter("DistributionChannel", "EQ", aResults[i].distributionchannel),
        //             new Filter("Division", "EQ", aResults[i].organizationdivision)
        //         }    
                    
        //     this.oModel2.read("/C_SlsPricingConditionRecordTP",{
        //             filters:oFilters,
        //             urlParameters: oParams,
        //             success:function(oData){
        //                 return oData;
        //         },error:function(oErr){
    
        //         }
        //     });
        //     }
            
        // },
        OnExcellFileReadTable: function(fil){
            debugger;
            var oModel = this.getOwnerComponent().getModel();
            var oJSONModel = new sap.ui.model.json.JSONModel();
            var that=this;
            //  /ZCPR_UPDT
            
             oModel.read("/ZCPR_RESULTS",{
                        filters:fil,
                         success: function(response)
                         {
                             debugger;
                           //  oJSONModel.setData(oresponse);
                        //  var oData1= that.readConditionPricing(response.results);
                           oJSONModel.setSizeLimit(response.results.length);
                             oJSONModel.setData(response.results);
                             that.getView().setModel(oJSONModel,"localModel");
                            // that.getView().setModel(oJSONModel);
                             sap.m.MessageToast.show("Excell file Record Display Successfully");
                         }.bind(that),
                         error: function(error){
                            sap.m.MessageToast.show("Excell file Data Found");
                        }
                    });
                },
        
        onValueHelpPOAMNo:function(){
            debugger;
           var oModel = this.getOwnerComponent().getModel();
            var oJSONModel = new sap.ui.model.json.JSONModel();
            var that = this;
         //   this.oModel.read("/ZCPR_UPLOAD", /ZCPR_UPDT" {
                this.oModel.read("/ZCPR_RESULTS", {
            
              success: function(response) {
               // sap.m.MessageToast.show("Record Display Successfully");
               
                if(! that.fragment){
                that.fragment = new sap.ui.xmlfragment("updatecustom.fragments.poamno", that);  
            }
                that.getView().addDependent(that.fragment);
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.setSizeLimit(response.results.length);
                oJSONModel.setData(response.results);
                that.fragment.setModel(oJSONModel);
                that.fragment.open();
              },
              error: function(oErr) {
                sap.m.MessageToast.show("No Data Found");
              }
            });
        },
        
        onSearchPoamNo:function(oEvent){
            debugger;
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("amdno", FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        onGo:function(){
            var POAMNumber = this.byId("POAMNumber").getValue();
            if(POAMNumber){
                var fil = [new sap.ui.model.Filter("amdno", "EQ", POAMNumber)];
                this.OnExcellFileReadTable(fil);
            }else{
                this.OnExcellFileReadTable([]);
            }
        },
        onConfirmPoamNo:function(oEvent){
            debugger;
            var selectedItem = oEvent.getParameter("selectedItem").getTitle();
            // var oTable = this.byId("uiTable");
             //var oBinding = oTable.getBinding("rows").oList;
            if (selectedItem !== "") {
                            //var fil = [new sap.ui.model.Filter("amdno", "Contains", selectedItem)];
                            //oTable.getBinding('rows').filter(new sap.ui.model.Filter(fil, false));
                        //    this.OnExcellFileReadTable(fil);
                      } else {
                            //oTable.getBinding("rows").filter([]);
                          //  this.OnExcellFileReadTable([]);
                      }
                      this.byId("POAMNumber").setValue(selectedItem);
    },

    
    onSubmitPOAMNO: function(oEvent){
        debugger;
        //var selectedItem = oEvent.getParameter("selectedItem").getTitle();
        var value = oEvent.getSource().getValue();
        var oTable = this.byId("uiTable");
        var oBinding = oTable.getBinding("rows").oList;
       if (value !== "") {
                    var fil = [new sap.ui.model.Filter("amdno", "Contains", value)];
                    // oTable.getBinding('rows').filter(new sap.ui.model.Filter(fil, false));
                    this.OnExcellFileReadTable(fil);
                 } else {
                    this.OnExcellFileReadTable([]);
                    //oTable.getBinding("rows").filter([]);
                 }


    },

        onLiveChangePoamNO:function(Evt){
            debugger;
            var val = Evt.getParameter('value');
            if (val !== "") {
     var fil = [new sap.ui.model.Filter("amdno", "Contains", val)];
      this.fragment.getBinding('items').filter(new sap.ui.model.Filter(fil, false));
            } else {
            this.fragment.getBinding("items").filter([]);
            }

        },


        formatID: function(sStatus) {
            if (sStatus === "Pending") {
                return new sap.ui.core.Icon({
                    src: "sap-icon://status-in-process",
                    color: "yellow"
                }).addStyleClass("sapUiTinyMarginBeginEnd");
            } else if (sStatus === "Approved") {
                return new sap.ui.core.Icon({
                    src: "sap-icon://status-completed",
                    color: "green"
                }).addStyleClass("sapUiTinyMarginBeginEnd");
            } else {
                return sStatus;
            }
        },
        onPostDocument:function(){
            var that=this;
            var items = that.getView().getModel("localModel").getData();
            var indices = that.byId("uiTable").getSelectedIndices();
            var TableoModel = this.getOwnerComponent().getModel('ZAPI_CPR_ITEM');
            if(indices.length===0){
                sap.m.MessageToast.show('Select Atleast One Record');
                return;
            }
            for(var i=0;i<indices.length;i++){
                var payload ={
                    AmdID:items[indices[i]]['amdid'],
                    Amdno:items[indices[i]]['amdno'],
                    ID:items[indices[i]]['id'],
                    Lifnr:items[indices[i]]['lifnr'],
                    Bstnk:items[indices[i]]['bstnk'],
                    Posex:items[indices[i]]['posex'],
                    Kdmat:items[indices[i]]['kdmat'],
                    Txz01:items[indices[i]]['txz01'],
                    Ablad:items[indices[i]]['ablad'],
                    Pcond:items[indices[i]]['pcond'],
                    Oldfr:items[indices[i]]['oldfr'],
                    Oldpr:items[indices[i]]['oldpr'],
                    Newfr:items[indices[i]]['newfr'],
                    Newpr:items[indices[i]]['newpr'],
                    Waers:items[indices[i]]['waers'],
                    Meins:items[indices[i]]['meins'],
                    Etrac:items[indices[i]]['etrac'],
                    Ntrac:items[indices[i]]['ntrac'],
                    Newto:items[indices[i]]['newto'],
                    Knumh:items[indices[i]]['knumh'],
                    Refno:items[indices[i]]['salesdocument'],
                    Ritem:items[indices[i]]['salesdocumentitem'],
                    Aubel:items[indices[i]]['aubel'],
                    Aupos:items[indices[i]]['aupos'],
                    Vkorg:items[indices[i]]['salesorganization'],
                    Vtweg:items[indices[i]]['distributionchannel'],
                    Spart:items[indices[i]]['organizationdivision'],
                    Kunnr:items[indices[i]]['materialbycustomer'],
                    Matnr:items[indices[i]]['material'],
                    Werks:items[indices[i]]['plant'],
                    Lgort:items[indices[i]]['storagelocation'],
                    Vstel:items[indices[i]]['vstel'],
                    Kmein:items[indices[i]]['kmein'],
                    Kunwe:items[indices[i]]['purchaseorderbyshiptoparty'],
                    Kpein:items[indices[i]]['kpein'],
                    Kschl:items[indices[i]]['kschl'],
                    Auart:items[indices[i]]['auart'],
                    Usnam:items[indices[i]]['usnam'],
                    Chusr:items[indices[i]]['chusr'],
                    Mwskz:items[indices[i]]['mwskz'],
                    
                }
               
                TableoModel.update("/ZC_CPR_ITEM_DB_01000(AmdID='"+payload.AmdID+"',Amdno='"+payload.Amdno+"')",payload, {
                                eTag:"*",
                                success: function(response) {
                                    that.onGo();
                                  sap.m.MessageToast.show("Record Updated Successfully");
                                 
                                },
                                error: function(oErr) {
                                  sap.m.MessageToast.show("No Data Found");
                                }
                              });
            }
            

        
        }


    });
});

    
