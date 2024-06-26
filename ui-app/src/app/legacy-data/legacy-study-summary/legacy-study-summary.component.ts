
import {of as observableOf,  Observable } from 'rxjs';

import {catchError,  take } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef, MatLegacyDialogConfig as MatDialogConfig, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { LegacyStudySummaryService } from './legacy-study-summary.service';
import { AllStudiesData, Filter, WorkflowMetadata, ProtocolData, PublicationData,
		StudyExperimentalDesign, BiospecimenPerStudy, EntityReferencePerStudy, FileCountsForStudyPage,
		QueryLegacyStudies		} from '../../types';
import { AllClinicalData, AllCasesData } from '../../types';
import { CheckboxModule } from 'primeng/checkbox';
import { CaseSummaryComponent } from '../../browse/case-summary/case-summary.component';
import { FilesOverlayComponent } from '../../browse/browse-by-file/files-overlay.component';
import * as _ from 'lodash';
import { ngxCsv } from "ngx-csv/ngx-csv";


//const fileExists = require('file-exists');

import {environment} from '../../../environments/environment';

//@@@PDC-612 display all data categories
enum FileTypes {
	RAW,
	txt,
	'PSM-TSV',
	'PSM-MZID',
	pdf,
	mzML,
	doc,
	mzIdentML
}


@Component({
  selector: 'app-legacy-study-summary',
  templateUrl: './legacy-study-summary.component.html',
  styleUrls: ['../../../assets/css/global.css', './legacy-study-summary.component.scss'],
  providers: [ LegacyStudySummaryService ]
})

export class LegacyStudySummaryComponent implements OnInit {

  study_id: string;
  study_submitter_id_name: string;
  studySummaryData: QueryLegacyStudies;
  publications: PublicationData[] = [];
  fileCountsRaw: FileCountsForStudyPage[];
  suppFileCountsRaw: FileCountsForStudyPage[]; //supplementary data files data
  fileTypesCounts: any;
  totalFilesCount: number = 0;
  totalSuppFilesCount: number = 0; //supplementary data files counts
  loading: boolean = false;
  heatmapAvailable = false;
  mapData: any[];
  responseStatus: any;
	protocol_help_url = environment.dictionary_base_url + 'dictionaryitem.html?eName=Protocol';
	workflow_help_url = environment.dictionary_base_url + 'dictionaryitem.html?eName=Workflow Metadata';
	description_help_url = environment.dictionary_base_url + 'dictionaryitem.html?eName=Study#study_description';
	dua_help_url = "/pdc/data-use-guidelines";
	aliquot_help_url = environment.dictionary_base_url + 'dictionaryitem.html?eName=Aliquot';
	clinical_help_url = environment.dictionary_base_url + 'dictionaryitem.html?eName=Case';
	experimentalDesign_help_url = environment.dictionary_base_url + 'dictionaryitem.html?eName=Study Run Metadata';
	files_download_faq_help_url = "/pdc/faq#Files_Download";
	duaAvailable:boolean = true;
	filteredClinicalData: AllClinicalData[]; //Filtered list of clinical data
	//@@@PDC-1160: Add cases and aliquots to the study summary page
	totalRecordsClinical: number;
	offset: number;
	limit: number;
	pageSize: number;
	sort: string;
	clinicalCols:any[];
	externalCaseMap;
	gdcUrl: string = environment.gdc_case_id_url;
	kidsFirstURL: string = environment.kidsFirst_url;
	iconFolder = 'assets/css/images/externalIcons/';
	filteredCasesData: AllCasesData[]; //Filtered list of cases
	totalRecordsBiospecimens: number;
	biospecimenCols:any[];
	//@@@PDC-1219: Add a new experimental design tab on the study summary page
	studyExperimentalDesign:StudyExperimentalDesign[] = [];
	biospecimenPerStudy:BiospecimenPerStudy[] = [];
	studyExperimentDesignTableCols:any[];
	selectedExperimentalStudies: StudyExperimentalDesign[] = [];
	static urlBase;
	studySubmitterId = "";
	entityReferenceExternalData:EntityReferencePerStudy[] = [];
	entityReferenceInternalData:EntityReferencePerStudy[] = [];
	pdcStudyID:string;
	oldVersionFlag = false;

    constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo, private http: HttpClient,
				private legacyStudySummaryService: LegacyStudySummaryService, private loc:Location,
				private dialogRef: MatDialogRef<LegacyStudySummaryComponent>,
				@Inject(MAT_DIALOG_DATA) public studyData: any,  private dialog: MatDialog,) {

	console.log(studyData);
	this.fileTypesCounts = {RAW: 0, txt_psm: 0, txt: 0, pdf: 0, mzML: 0, doc: 0, mzIdentML: 0};
	this.suppFileCountsRaw = studyData.summaryData.supplementaryFilesCount;
	this.fileCountsRaw = studyData.summaryData.nonSupplementaryFilesCount;
	this.getFilesCountsPerStudy();
	this.study_id = studyData.summaryData.study_id;
	this.study_submitter_id_name = studyData.summaryData.submitter_id_name;
	this.studySummaryData = studyData.summaryData;
	this.studySubmitterId = studyData.summaryData.study_submitter_id;
	//@@@PDC-1888: Standardize the IDs on the study summary and case summary pages
	this.pdcStudyID = studyData.summaryData.pdc_study_id;
	console.log("UUID: "+this.study_id + " PDC ID: " + this.pdcStudyID);
	//this.loc.replaceState("/study/" + this.pdcStudyID);
	if (this.studySummaryData.embargo_date === null || this.studySummaryData.embargo_date === ""){
			this.studySummaryData.embargo_date = "N/A";
	}
	console.log(this.studySummaryData);
	this.publications = this.studySummaryData.publications;
	console.log(this.publications);
	//this.getPublications();
	//this.getFilesCountsPerStudy();
	//@@@PDC-843: Add embargo date and data use statement to CPTAC studies
	this.setDUAWindowForStudySummary();
	this.limit = 10;
	this.totalRecordsClinical = this.totalRecordsBiospecimens = 0;
	this.pageSize = 10;
	// Array which holds filter names. Must be updated when new filters are added to browse page.
	this.sort = '';
	//@@@PDC-1987: Update clinical tab to use new external reference API
	//@@@PDC-1012: Update UI for GDC Case ID becoming External Case ID
	//Array of external file Details. This has to be updated each time a new type of external case iD is added.
	this.externalCaseMap = [{
		'id': "GDC",
		'url': this.gdcUrl,
		'imageUrl': this.iconFolder + "GDC.png",
	}, {
		'id': "KidsFirst",
		'url': this.kidsFirstURL,
		'imageUrl': this.iconFolder + "KidsFirst.png",
	}, {
		'id': "TCIA",
		'imageUrl': this.iconFolder + "Tcia.png",
	}, {
		'id': "CBTTC",
		'url': this.kidsFirstURL,
		'imageUrl': this.iconFolder + "KidsFirst.png",
	}];
	//@@@PDC-1883: Add external references to study summary page
	this.getEntityReferenceExternalData();
	LegacyStudySummaryComponent.urlBase = environment.dictionary_base_url;
  }

	get staticUrlBase() {
		return LegacyStudySummaryComponent.urlBase;
	}

	//If the current date is with in the embargo date, display the DUA with a 'accept' button
	setDUAWindowForStudySummary() {
		setTimeout(() => {
			if (this.studySummaryData.embargo_date) {
				var currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
				//PDC-2744 DUA pops up when embargo date is "N/A"
				//If the current date is with in the embargo date, display the DUA with a 'accept' button
				if (this.studySummaryData.embargo_date != "N/A" && currentDate < this.studySummaryData.embargo_date) {
					// This code is useful for adding overlay window in the future.
					/* else {
						this.studySummaryOverlayWindow.open("DUAForOtherProgramsOverlayWindow");
					} */
				}
				//@@@PDC-2970  all studies with embargo date expired or N/A should have text with Note under DUA tab
				if (this.studySummaryData.embargo_date != "N/A" && currentDate > this.studySummaryData.embargo_date) {
					this.duaAvailable = false;
				}
			}
			//@@@PDC-2970 Studies with Embargo data as N/A are missing Embargo Note in Study Summary DUA tab.
			if (!this.studySummaryData.embargo_date || this.studySummaryData.embargo_date == "N/A" || this.studySummaryData.embargo_date == "")
			{
				this.duaAvailable = false;
			}
		}, 100);
	}

  getManifestFile() {
		//const manifest_file = 'assets/data-folder/' + this.studySummaryData.study_submitter_id + '/manifest.json';
		//@@@PDC-2106 use pdc_study_id in heatmap folder
		//const manifest_file = 'assets/data-folder/' + this.pdcStudyID + '/manifest.json';
		//@@@PDC-3172 use study_id in heatmap folder name
		const manifest_file = 'assets/data-folder/' + this.study_id + '/manifest.json';

		console.log('Getting manifest file from: ' + manifest_file);
		return this.http.get(manifest_file);
  }

  readManifest() {
	this.mapData = [];
	this.getManifestFile()
    .subscribe((data: any) => {
		this.heatmapAvailable = true;
		console.log(data);
		data.heatmaps.map(aMap => {
			this.mapData.push({
				menu_label: aMap['menu-label'],
				file_name: aMap['filename'],
				col_header: aMap['col-header'],
				row_header: aMap['row-header']
			});
		});
	}, error => { this.heatmapAvailable = false; console.log('Error Status:', error.status); });
  }
  isHeatmapAvailable() {
	//@@@PDC-3172 use study_id in heatmap folder name
	const manifest_file = 'assets/data-folder/' + this.study_id + '/manifest.json';
	this.http.head(manifest_file).pipe(
	catchError((error) => observableOf({foo: 'bar'})))
	.subscribe((status) => console.log('status', status))
	;
	}

	//@@@PDC-843: Add embargo date and data use statement to CPTAC studies
	//Decodes HTML entities in a string.
	toHTML(input) : any {
		return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
	}

	//@@@PDC-758: Study summary overlay window opened through search is missing data
	//Update API call to fetch study summary details.
/*	getStudySummaryData(){
	  this.loading = true;
	  this.legacyStudySummaryService.getLegacyStudyData(this.study_submitter_id_name).subscribe((data: any) =>{
			this.studySummaryData = data.getPaginatedUIStudy.uiStudies[0];
			console.log(this.studySummaryData);
			this.study_id = this.studySummaryData.study_id;
			this.suppFileCountsRaw = this.studySummaryData.supplementaryFilesCount;
			this.fileCountsRaw = this.studySummaryData.nonSupplementaryFilesCount;
			this.getFilesCountsPerStudy();
			this.publications = this.studySummaryData.publications;
			console.log(this.publications);
			this.loading = false;
			//@@@PDC-2912 - show "N/A" instead of empty embargo date when opening study summary via search box or direct url
			if (this.studySummaryData.embargo_date === null || this.studySummaryData.embargo_date === ""){
				this.studySummaryData.embargo_date = "N/A";
			}
	   });
  }*/

  getPublications(){
	  this.loading = true;
	  setTimeout(() => {
		  this.legacyStudySummaryService.getPublicationsData(this.study_id).subscribe((data: any) =>{
			this.publications = data.uiPublication;
			console.log(this.publications);
			this.loading = false;
		  });
	  }, 1000);
  }

  //PDC-2378 - This function will calculate total files counts for
  // raw and supplementary data files
	/*
  getFilesCountsPerStudy(){
	this.totalFilesCount = 0;
	if (this.fileCountsRaw != undefined) {
		for (let i = 0; i < this.fileCountsRaw.length; i++) {
			this.totalFilesCount += this.fileCountsRaw[i].files_count;
		}
	}
	this.totalSuppFilesCount = 0;
	if (this.suppFileCountsRaw != undefined) {
		for (let i = 0; i < this.suppFileCountsRaw.length; i++) {
			this.totalSuppFilesCount += this.suppFileCountsRaw[i].files_count;
		}
	}
	*/
	/*  this.loading = true;
    //@@@PDC-1123 call ui wrapper API
	  setTimeout(() => {
		  this.legacyStudySummaryService.getFilesCounts(this.study_id).subscribe((data: any) => {
			this.fileCountsRaw = data.uiFilesCountPerStudy;
			for (let i = 0; i < this.fileCountsRaw.length; i++) {
				this.totalFilesCount += this.fileCountsRaw[i].files_count;
			}
			console.log(this.fileCountsRaw);
			this.loading = false;
		  });
	  }, 1000);
  }
	*/

getFilesCountsPerStudy(){
    this.totalFilesCount = 0;
    if (this.fileCountsRaw != undefined) {
	      for (let i = 0; i < this.fileCountsRaw.length; i++) {
		        this.totalFilesCount += this.fileCountsRaw[i].files_count;
	      }
     }
     this.totalSuppFilesCount = 0;
     if (this.suppFileCountsRaw != undefined) {
	       for (let i = 0; i < this.suppFileCountsRaw.length; i++) {
		         this.totalSuppFilesCount += this.suppFileCountsRaw[i].files_count;
	       }
     }
     if (this.fileCountsRaw != undefined) {
	       this.sortDataCategoriesInOrder();
    }
}

sortDataCategoriesInOrder(){
	var order = ["Raw Mass Spectra","Processed Mass Spectra", "Peptide Spectral Matches", "Peptide Spectral Matches", "Protein Assembly", "Quality Metrics", "Quality Metrics"];
	for (var obj in this.fileCountsRaw) {
		console.log(obj);
		let entityObj = "";
		entityObj = this.fileCountsRaw[obj]["data_category"].toLowerCase();
		//Order elements based on the suggested order
		if (order.some(ele => entityObj.includes(ele))) {
			this.fileCountsRaw[obj]["data_category"] = order.find(ele => entityObj.includes(ele));
		}
	}
	this.fileCountsRaw = this.fileCountsRaw.sort((a, b) => {
		return (
			order.indexOf(a.data_category) - order.indexOf(b.data_category)
		);
	});
}


//PDC-3860 Add related PDC studies to Legacy study summaries
showLegacyStudySummary(study_name:string) {
	console.log("Openining study summary " + study_name);
	setTimeout(() => {
	this.legacyStudySummaryService.getLegacyStudyData(study_name).pipe(take(1)).subscribe((data: any) =>{
		var studyData: QueryLegacyStudies = data.uiLegacyStudies[0];
		console.log(studyData);
		if (studyData) {
			const dialogConfig = new MatDialogConfig();
			dialogConfig.disableClose = true;
			dialogConfig.autoFocus = false;
			dialogConfig.hasBackdrop = true;
			dialogConfig.width = '80%';
			dialogConfig.height = '95%';
			dialogConfig.data = {
				summaryData: studyData,
			};

			this.router.navigate([{outlets: {studySummary: ['legacy-study-summary', study_name]}}], { skipLocationChange: true });
			const dialogRef = this.dialog.open(LegacyStudySummaryComponent, dialogConfig);


				dialogRef.afterClosed().subscribe(
					val => console.log("Dialog output:", val)
				);
		}
	 });
	}, 1000);
}

//PDC-3860, PDC-3859 - add external references and related PDC studies to legacy study summary
getEntityReferenceExternalData() {
	this.loading = true;
	setTimeout(() => {
		this.legacyStudySummaryService.getEntityReferenceData(this.study_id, "external").subscribe((data: any) =>{
			this.entityReferenceExternalData = data.uiLegacyStudyReference;
			this.loading = false;
		});
	}, 1000);
	setTimeout(() => {
		this.legacyStudySummaryService.getEntityReferenceData(this.study_id, "internal").subscribe((internalData: any) =>{
			this.entityReferenceInternalData = internalData.uiLegacyStudyReference;
			console.log(this.entityReferenceInternalData);
			this.loading = false;
		});
	}, 1000);
}

//@@@PDC-1160: Add cases and aliquots to the study summary page
showCaseSummary(case_id: string, module: string){
	const dialogConfig = new MatDialogConfig();
	dialogConfig.disableClose = true;
	dialogConfig.autoFocus = false;
	dialogConfig.hasBackdrop = true;
	//dialogConfig.minWidth = '1000px';
	dialogConfig.width = '80%';
	dialogConfig.height = '95%'
	if (module == "clinical") {
		var case_index = this.findCaseByClinicalID(case_id);
		dialogConfig.data = {
			summaryData: this.filteredClinicalData[case_index],
		};
		//@@@PDC-2610: Case Summary: Not pulling up Program & Project when viewed under Clinical tab
		//create an alias for study summary overlay window URL in the form [base url]/study/study uuid
		this.loc.replaceState("/case/" + this.filteredClinicalData[case_index].case_id);
	} else if (module == "biospecimen") {
		var case_index = this.findCaseByBiospecimenID(case_id);
		dialogConfig.data = {
			summaryData: this.filteredCasesData[case_index],
		};
		//@@@PDC-2610: Case Summary: Not pulling up Program & Project when viewed under Clinical tab
		//create an alias for study summary overlay window URL in the form [base url]/study/study uuid
		this.loc.replaceState("/case/" + this.filteredCasesData[case_index].case_id);
	}
	this.router.navigate([{outlets: {caseSummary: ['case-summary', case_id]}}], { skipLocationChange: true });
	const dialogRef = this.dialog.open(CaseSummaryComponent, dialogConfig);
	dialogRef.afterClosed().subscribe((val:any) => {
			console.log("Dialog output:", val);
			//Generate alias URL to hide auxiliary URL details when the previous overlay window was closed and the focus returned to this one
			//this.loc.replaceState("/legacy-study-summary/" + this.pdcStudyID);
			this.loc.replaceState("/TechnologyAdvancementStudies/");
	});
}

//@@@PDC-3392 open files for a specific study in an overlay window
//@@@PDC-3911 Update UI as result of changed rule for distinguishing supplementary files from non-supplementary
showFilesOverlay(submitter_id_name, study_id, data_category_val, file_type_val, data_source_val) {
	const dialogConfig = new MatDialogConfig();
	dialogConfig.disableClose = true;
	dialogConfig.autoFocus = false;
	dialogConfig.hasBackdrop = true;
	//dialogConfig.minWidth = '1000px';
	dialogConfig.width = '80%';
	dialogConfig.height = '95%';
	dialogConfig.data = {
			summaryData: {study_name: submitter_id_name, study_id: study_id,  data_category: data_category_val, file_type: file_type_val,
							versions: false, acquisition_type: "", experiment_type:"", data_source: data_source_val},
			legacyData: true
	};
	this.router.navigate([{outlets: {filesOverlay: ['files-overlay', this.study_id]}}], { skipLocationChange: true });
	const dialogRef = this.dialog.open(FilesOverlayComponent, dialogConfig);
	dialogRef.afterClosed().subscribe((val:any) => {
			console.log("Dialog output:", val);
			//Generate alias URL to hide auxiliary URL details when the previous overlay window was closed and the focus returned to this one
			//this.loc.replaceState("/legacy-study-summary/" + this.pdcStudyID);
			this.loc.replaceState("/TechnologyAdvancementStudies/");
	});
}

//@@@PDC-1160: Add cases and aliquots to the study summary page
//@@@PDC-739 Add hyperlink to case id on clinical tab to case summary page
//Finds case details for a case id
findCaseByClinicalID(case_id: string) {
for (let idx = 0; idx < this.filteredClinicalData.length; idx++ ){
	if (this.filteredClinicalData[idx].case_submitter_id === case_id) {
		return idx;
	}
}
return -1;
}

//@@@PDC-1160: Add cases and aliquots to the study summary page
//@@@PDC-739 Add hyperlink to case id on clinical tab to case summary page
//Finds case details for a case id
findCaseByBiospecimenID(case_id: string) {
for (let idx = 0; idx < this.filteredCasesData.length; idx++ ){
	if (this.filteredCasesData[idx].case_submitter_id === case_id) {
		return idx;
	}
}
return -1;
}

close(navigateToHeatmap: boolean, study_name: string = '') {
	this.router.navigate([{outlets: {'studySummary': null, 'filesOverlay': null}}], { replaceUrl: true });
	this.loc.replaceState(this.router.url);
	//sessionStorage.removeItem('currentVersion');
	console.log("CLOSE study_name: " + study_name);
	if ( navigateToHeatmap ) {
	// Route to the first heatmap
		const navigationExtras: NavigationExtras = {
		queryParams: {
						'StudyName': study_name,
				}
			};
		  //this.router.navigate(['/analysis/' + this.studySubmitterId], navigationExtras);
		  //@@@PDC-2106 use pdc_study_id in heatmap folder
		  //this.router.navigate(['/analysis/' + this.pdcStudyID], navigationExtras);
		  //@@@PDC-3172 use study_id in heatmap folder name
		  this.router.navigate([]).then( result => { var url= "/pdc/analysis/" + this.study_id +"?StudyName=" + study_name;
		  window.open(url, '_blank'); });
	  }
	this.dialogRef.close();
}

//@@@PDC-2234 - open PDC HeatMap in a separate tab to avoid issues with "back" button
//Will not close study summary upon opening a HeatMap in a separate tab
openHeatMap(study_name: string){
	//@@@PDC-3172 use study_id in heatmap folder name
	this.router.navigate([]).then( result => { var url= "/pdc/analysis/" + this.study_id + "?StudyName=" + study_name;
																	   window.open(url, '_blank'); });
}

	//@@@PDC-2598 conditional styling of Embargo date
	//If the date is in the future the value should be bold and in italics
	getStyleClass(embargo_date: string){
		if (this.isDateLater(embargo_date) )
			return 'future_embargo_date';
		else {
			return '';
		}
	}
	//Show tooltip if the embargo dat is in the future
	getTooltip(embargo_date:string){
		if (this.isDateLater(embargo_date) ){
			return "Data for this study is under an EMBARGO for publication and/or citation";
		} else {
			return "";
		}
	}
	//Help function that returns true if parameter date is in the future, otherwise false
	private isDateLater(embargo_date: string):boolean{
		var now = new Date;
		var target = new Date(embargo_date);
		if (target > now )
			return true;
		else {
			return false;
		}
	}

  ngOnInit() {
	  this.readManifest();
	  //@@@PDC-1160: Add cases and aliquots to the study summary page
	  this.clinicalCols = [
		{field: 'case_submitter_id', header: 'Cases Submitter ID'},
		{field: 'ethnicity', header: 'Ethnicity'},
		{field: 'gender', header: 'Gender'},
		{field: 'race', header: 'Race'},
		{field: 'morphology', header: 'Morphology'},
		{field: 'primary_diagnosis', header: 'Primary Diagnosis'},
		{field: 'site_of_resection_or_biopsy', header: 'Site of Resection or Biopsy'},
		{field: 'tissue_or_organ_of_origin', header: 'Tissue or Organ of Origin'},
		{field: 'tumor_grade', header: 'Tumor Grade'},
		{field: 'tumor_stage', header: 'Tumor Stage'}
	  ];
	  this.biospecimenCols = [
		{field: 'aliquot_submitter_id', header: 'Aliquot'},
		{field: 'sample_submitter_id', header: 'Sample'},
		{field: 'case_submitter_id', header: 'Case'},
		{field: 'project_name', header: 'Project'},
		{field: 'sample_type', header: 'Sample Type'},
		{field: 'primary_site', header: 'Primary Site' },
		{field: 'disease_type', header: 'Disease Type'}
	  ];
  }


  //@@@PDC-1012: Update UI for GDC Case ID becoming External Case ID
  //Return link URL for external case ID
  fetchUrl (externalCaseID: string) {
	if (externalCaseID) {
		let externalCaseIDSplit = externalCaseID.split(':');
		let url = this.externalCaseMap.find(x => (x.id).toUpperCase() == externalCaseIDSplit[0].toUpperCase()).url;
		if (url) return url + externalCaseIDSplit[1].replace(/\s/g, ""); else return '';
	} else {
	  return '';
	}
}

//@@@PDC-1987: Update clinical tab to use new external reference API
//@@@PDC-1160: Add cases and aliquots to the study summary page
//@@@PDC-1012: Update UI for GDC Case ID becoming External Case ID
//Get Image icon for the external Case ID
getIcon(reference_resource_shortname: string) {
	if (reference_resource_shortname) {
		let imageUrl = this.externalCaseMap.find(x => (x.id).toUpperCase() == reference_resource_shortname.toUpperCase()).imageUrl;
		if (imageUrl) return imageUrl; else return '';
	} else {
		return '';
	}
  }

//@@@PDC-1987: Update clinical tab to use new external reference API
//@@@PDC-1160: Add cases and aliquots to the study summary page
//@@@PDC-1012: Update UI for GDC Case ID becoming External Case ID
displayTextforExternalID(externalCaseID: string, locationURL: string) {
	if (locationURL) return ''; else return externalCaseID;
}

//@@@PDC-1219: Add a new experimental design tab on the study summary page
replaceAll(str,replaceWhat,replaceTo){
	replaceWhat = replaceWhat.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	var re = new RegExp(replaceWhat, 'g');
	return str.replace(re,replaceTo);
}

//@@@PDC-1219: Add a new experimental design tab on the study summary page
/* Small helper function to determine whether the download button should be disabled or not */
isDownloadDisabled(){
	if (this.selectedExperimentalStudies) {
		if (this.selectedExperimentalStudies.length > 0) {
			return false;
		}
		else {
			return true;
		}
	}
	else {
		return true;
	}
}

//@@@PDC-1219: Add a new experimental design tab on the study summary page
studyTableExportCSV(dt) {
	let headerCols = [];
	let colValues = [];
	for (var i=0; i< this.studyExperimentDesignTableCols.length; i++) {
		headerCols.push(this.studyExperimentDesignTableCols[i]['header']);
		colValues.push(this.studyExperimentDesignTableCols[i]['field']);
	}
	let exportValues =  _.cloneDeep(this.studyExperimentalDesign);
	for (let exportVal of exportValues) {
		var changedVal = "";
		for (let colValue of colValues) {
			//changedVal = exportVal[colValue].replace(/<[^>]*>/g, '');
			changedVal = exportVal[colValue].replace('<div>', '\r\n');
			changedVal = changedVal.replace('</div>', '');
			exportVal[colValue] = changedVal;
		}
	}
 	let csvOptions = {
		headers: headerCols
	};
	let exportFileObject = JSON.parse(JSON.stringify(exportValues, colValues));
	new ngxCsv(exportFileObject, this.getCsvFileName(), csvOptions);
}

private getCsvFileName(): string {
	let csvFileName = "PDC_study_experimental_";
	const currentDate: Date = new Date();
	let month: string = "" + (currentDate.getMonth() + 1);
	csvFileName += this.convertDateString(month);
	let date: string = "" + currentDate.getDate();
	csvFileName += this.convertDateString(date);
	csvFileName += "" + currentDate.getFullYear();
	let hour: string = "" + currentDate.getHours();
	csvFileName += "_" + this.convertDateString(hour);
	let minute: string = "" + currentDate.getMinutes();
	csvFileName += this.convertDateString(minute);
	let second: string = "" + currentDate.getSeconds();
	csvFileName += this.convertDateString(second);
	return csvFileName;
}

private convertDateString(value: string): string {
	if (value.length === 1) {
	return "0" + value;
	} else {
	return value;
	}
}

}
