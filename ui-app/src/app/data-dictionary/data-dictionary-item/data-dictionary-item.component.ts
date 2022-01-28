import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataDictionaryItemService } from './data-dictionary-item.service';
import { DataDictionaryService } from '../data-dictionary/data-dictionary.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-data-dictionary-item',
  templateUrl: './data-dictionary-item.component.html',
  styleUrls: ['./data-dictionary-item.component.css']

})
export class DataDictionaryItemComponent implements OnInit {
  /*
  dataDictionaryTable: any;
  curEntity: any;
  dictionaryEntities: any;
  caDSRURL: any;
  NCItURL: any;
  PSIMSURL: any;
  hasExamples: any;
  linkback: any;
  uniqueKeys: any;
  categoriesForDictItem: any;
  catCDEID: any;
  carCDESource: any;
  moreDivOn: any;
  currentCategory: any;
  curEntityData: any;
  uniqueKeyDetails: any;
  keyDetails: any;
  dictItemLinks: any;
  dictItemProperties: any;
  deprecatedProperties: any;
  dictItemDeprecatedProperties: any;
  displayProperties: any;
  displayPropertiesArray: any;
  showDiv: any;
  cdeIdValue: any;
  enumValues:any;
  displayLinks:any;
  */

  curEntity;
  dictionaryEntities;
  caDSRURL;
  NCItURL;
  PSIMSURL;
  hasExamples;
  linkback;
  categoriesForDictItem;
  catCDEID;
  carCDESource;
  moreDivOn; //get rid of
  currentCategory;
  currentDescription;
  curEntityData;
  uniqueKeyDetails;
  dictItemLinks;
  dictItemProperties;
  deprecatedProperties;
  dictItemDeprecatedProperties;
  displayProperties;
  displayPropertiesArray;
  cdeIdValue;
  enumValues;
  descriptionUrlStr;
  descriptionUrl;



  constructor(private dataDictionaryService: DataDictionaryService, private dataDictionaryItemService: DataDictionaryItemService, private _Activatedroute:ActivatedRoute) {
    this.caDSRURL = "https://cdebrowser.nci.nih.gov/cdebrowserClient/cdeBrowser.html#/search?publicId=IDENTITY&version=2.0";
    this.NCItURL = "https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI%20Thesaurus&code=IDENTITY";
    this.PSIMSURL = "http://purl.obolibrary.org/obo/IDENTITY";
    this.hasExamples = false;
    this.linkback = "/pdc/data-dictionary";
    this.curEntity=this._Activatedroute.snapshot.paramMap.get("eName");

    this.dataDictionaryService.getDataDictionary().subscribe((data: any) => {

      for(var i=0; i < data.length; i++){

          var cat = data[i];
          if (cat.entity == this.curEntity) {
              this.carCDESource = cat.cde_source;
              this.catCDEID = cat.cde_id;
          }
      }
      if (this.catCDEID != "" && this.carCDESource != "") {
          var itemURL = this.NCItURL.replace("IDENTITY", this.catCDEID);

          this.descriptionUrl = this.NCItURL.replace("IDENTITY", this.catCDEID);
          //urlStr = " (<a href='" + itemURL + "' target='_blank'>" + this.carCDESource + " - " + this.catCDEID +"</a>)";
          this.descriptionUrlStr = " (<a href='" + itemURL + "' target='_blank'>" + this.carCDESource + " - " + this.catCDEID +"</a>)";
      }
      console.log(data);
    });




    this.dataDictionaryItemService.getDataDictionaryItem(this.curEntity).subscribe((data: any) => {
    this.dictionaryEntities = data;
    this.curEntityData = data;
    this.categoriesForDictItem = data;
    this.cdeIdValue = {};
    this.enumValues = {};



    if (this.curEntityData.category) {
        this.currentCategory = this.capitalizeFirstLetter(this.curEntityData.category);
    }

    console.log(this.curEntityData.category);


    for(let i=0; i < this.categoriesForDictItem.length; i++){
        let cat = this.categoriesForDictItem[i];


        if (cat.entity == this.curEntity) {
            this.carCDESource = cat.cde_source;
            this.catCDEID = cat.cde_id;
        }
    }
    if (this.curEntityData.description) {
        this.currentDescription = this.curEntityData.description;
    }
    //paint the general details
    this.uniqueKeyDetails = this.curEntityData.uniqueKeys[0];

    this.dictItemLinks = this.curEntityData.links;


    //let colRef = 1;

    this.dictItemProperties = this.curEntityData.properties;
    this.displayPropertiesArray = [];

    this.deprecatedProperties = [];
    if (this.curEntityData.deprecated) {
  	    this.dictItemDeprecatedProperties = this.curEntityData.deprecated;
  	    this.deprecatedProperties = Object.values(this.dictItemDeprecatedProperties);
    }

    this.displayProperties = {};

    for (let dictItem in this.dictItemProperties) {

        if((!this.dictItemProperties[dictItem].key && this.deprecatedProperties.length == 0) || (!this.dictItemProperties[dictItem].key && this.deprecatedProperties.length > 0 && !this.deprecatedProperties.includes(dictItem))) {
            //this.dictItemProperties[dictItem]['colRef'] = colRef;
            this.displayProperties[dictItem] = this.dictItemProperties[dictItem];
            this.displayPropertiesArray.push(this.displayProperties[dictItem]);

            let dictItemDesc = "";
            if (this.dictItemProperties[dictItem].description) {
                dictItemDesc = this.dictItemProperties[dictItem].description;
            }
            if (this.dictItemProperties[dictItem].oneOf) {
                let oneOfVals = this.dictItemProperties[dictItem].oneOf;
             } else {
                 if (this.dictItemProperties[dictItem].enum){
                     this.enumValues[dictItem] = {};
                     this.enumValues[dictItem]["initial_load"] = "";
                     this.enumValues[dictItem]["initial_load_too"] = "";
                     this.enumValues[dictItem]["show_load"] = "";
                     let moreDivOn = false;
                     let enumVals = this.dictItemProperties[dictItem].enum;


                     for(let x = 0; x < enumVals.length;x++){
                         //if(x == 6){
                        //     this.enumValues[dictItem]["initial_load"] += "<li>" + enumVals[x]  + "</li>";
                        //     moreDivOn = true;
                         //}
                         if(x < 6){
                             this.enumValues[dictItem]["initial_load"] += "<li>" + enumVals[x]  + "</li>";
                             moreDivOn = true;
                         }
                         if(x >= 6) {
                             this.enumValues[dictItem]["show_load"] += "<li>" + enumVals[x]  + "</li>";
                         }
                      }

                 }
        }

        if (this.dictItemProperties[dictItem].required) {
            let requiredStr = this.capitalizeFirstLetter(this.dictItemProperties[dictItem].required);
        } else {
            //@@PDC 1362: Create an automated script to merge GDC Data Dictionary with PDC DD
            //If there's no property called "Required", set the field value to False
            this.dictItemProperties[dictItem].required = 'False';
        }

        let cdeId = this.dictItemProperties[dictItem].cde_id;

        this.cdeIdValue[cdeId] = [];
        if (cdeId) {
            let cde_id_arr = cdeId.toString().split(",");//this could be a comma separated list
            for (let m=0; m < cde_id_arr.length; m++) {
                let cde_link = "";
                let cde_id = cde_id_arr[m].trim();
                let itemURL = this.dictItemProperties[dictItem].term_url;
                if (this.dictItemProperties[dictItem].source && this.dictItemProperties[dictItem].source == "PSI MS"){
                    itemURL = this.PSIMSURL.replace("IDENTITY", cde_id.replace(":","_"));
                }
                if (this.dictItemProperties[dictItem].cde_id) {
                    cde_link += "<div><a href=" + itemURL + " target='_blank'>" + cde_id + "</a>";
                }
                if (this.dictItemProperties[dictItem].source) {
                    cde_link += " - " + this.dictItemProperties[dictItem].source;
                }
                if (this.dictItemProperties[dictItem].cde_id) {
                    cde_link += "</div>";
                }
                this.cdeIdValue[this.dictItemProperties[dictItem].cde_id].push(cde_link);
             }
        } else {
            let cde_link = " - ";
            this.cdeIdValue[this.dictItemProperties[dictItem].cde_id].push(cde_link);
        }
    }
  }


});

}

ngOnInit() {}


capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

showMoreOrLess(value){

  const dRef = document.getElementById(value);
  let target = event.currentTarget as HTMLElement;

  if (dRef.style.display == 'block') {
        dRef.setAttribute("style", "display:none;");
        target.innerHTML = 'Show more items...';
      } else {
        dRef.setAttribute("style", "display:block;");
        target.innerHTML = 'Show less items...';
      }
  }
}
