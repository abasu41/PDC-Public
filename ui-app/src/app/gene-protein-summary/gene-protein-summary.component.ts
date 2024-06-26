import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule} from 'primeng/dropdown';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { GeneProteinSummaryService } from "./gene-protein-summary.service";
import { Filter, GeneProteinDataWithId, GeneStudySpectralCountData, GeneAliquotSpectralCountData,
		GeneStudySpectralCountDataPaginated, GeneAliquotSpectralCountDataPaginated, ptmData } from '../types';


@Component({
  selector: 'app-gene-protein-summary',
  templateUrl: './gene-protein-summary.component.html',
  styleUrls: ['../../assets/css/global.css', './gene-protein-summary.component.scss'],
  providers: [ GeneProteinSummaryService ]
})

//@@@PDC-374 - adding url to overlay windows
//@@@PDC-648 - add spinning wheel when wating for data to load
//@@@PDC-670 - loading gene summary aliquot counts takes too long
//@@@PDC-716 - add PTM data
//@@@PDC-772 - remove study and aliquot counts table, add button to gene full page
//@@@PDC-2450 gene/protein summary missing NCBI gene id
//@@@PDC-2665 show N/A if Assay data is not available
//@@@PDC-7657 use ncbi_gene_id in getting gene
export class GeneProteinSummaryComponent implements OnInit {

  gene_id: string;
  uuid: string;
  ncbi_gene_id: string
  loading: boolean = false; //data is loaded from 3 different APIs asynchroniosly, so need 3 different flags for when data is finished loading
  loadingAliquotRecords: boolean = false;
  loadingGeneSummary: boolean = false;
  lodingPTMData: boolean = false;
  geneSummaryData: GeneProteinDataWithId;
  studySpectralCountsList: GeneStudySpectralCountData[];
  aliquotSpectralCountsList: GeneAliquotSpectralCountData[];
  aliquotSpectralCountLoadError: string = '';
  genePTMData: ptmData[];
  //Pagination variables
  studyTotalRecords: number;
  studyOffset: number;
  studyLimit: number;
  studyPageSize: number;
  aliquotTotalRecords: number;
  aliquotOffset: number;
  aliquotLimit: number;
  aliquotPageSize: number;
  ptmTotalRecords: number;
  ptmOffset: number;
  ptmLimit: number;
  ptmPageSize: number;
  source = "";
  frozenColumns = [];
  displayGeneNotFoundInStudyMsg = false;

  constructor(private activeRoute: ActivatedRoute, private router:Router, private apollo: Apollo,
				private geneProteinSummaryService: GeneProteinSummaryService,
				private dialogRef: MatDialogRef<GeneProteinSummaryComponent>,
				@Inject(MAT_DIALOG_DATA) public geneProteinData: any) {

	console.log(geneProteinData);

	this.gene_id = geneProteinData.summaryData;
	this.ncbi_gene_id = geneProteinData.ncbi;
	this.uuid = geneProteinData.uuid;
	console.log("ncbi: "+this.ncbi_gene_id);
	console.log("uuid: "+this.uuid);
	//@@@PDC-7786: UI change to report error for genes not used in studies
	this.geneProteinSummaryService.getGeneStudyCountResults(this.uuid).subscribe((geneData: any) => {
        let geneStudyCount = geneData.geneStudyCount;
        if (geneStudyCount == 0) {
			this.displayGeneNotFoundInStudyMsg = true;
		}
	});
	//@@@PDC-4725: Set the source parameter in the UI calls to fetch details of a search result
	if (geneProteinData && geneProteinData.source) {
		this.source = geneProteinData.source;
	}
	//Initialize values for pagination
	this.studyOffset = 0;
	this.studyLimit = 10;
	this.studyTotalRecords = 0;
	this.studyPageSize = 10;
	this.aliquotTotalRecords = 0;
	this.aliquotOffset = 0;
	this.aliquotLimit = 10;
	this.aliquotPageSize = 10;
	this.ptmTotalRecords = 0;
    this.ptmOffset = 0;
    this.ptmLimit = 10;
    this.ptmPageSize = 10;
	//Initializing gene summary data structure
	this.geneSummaryData = {
		gene_id: "",
		gene_name: "",
		ncbi_gene_id: "",
		authority: "",
		description: "",
		organism: "",
		chromosome: "",
		locus: "",
		proteins: "",
		assays: "",
		spectral_counts: []
	}
	this.getGeneSummaryData();
	this.getGeneAliquotSpectralCounts();
	this.getGeneStudySpectralCounts();
	this.getPTMData();
  }

  getGeneSummaryData(){
	  this.loadingGeneSummary = true;
    //@@@PDC-1123 call ui wrapper API
	//@@@PDC-7657 use ncbi_gene_id to get gene detail
	  setTimeout(() => {
		  this.geneProteinSummaryService.getGeneDetailsNcbi(this.gene_id, this.uuid, this.source).subscribe((data: any) =>{
		  //this.geneProteinSummaryService.getGeneDetails(this.gene_id, this.source).subscribe((data: any) =>{
			this.geneSummaryData = data.uiGeneSpectralCount;
			console.log("gene detail: "+ this.geneSummaryData);
			this.uuid = this.geneSummaryData.gene_id;
			console.log("gene uuid: "+ this.uuid);
			this.loadingGeneSummary = false;
		  });
	  }, 1000);
  }

  //PDC-772 no need to make API query for aliquot counts table
  getGeneAliquotSpectralCounts(){
	  /* this.loadingAliquotRecords = true;
	  this.aliquotSpectralCountLoadError = '';
		  //removed timout settings since this query sometimes takes a lot of time
		  this.geneProteinSummaryService.getAliquotSpectralCount(this.gene_id, this.aliquotOffset, this.aliquotLimit, this.source).subscribe((data: any) =>{
			this.aliquotSpectralCountsList = data.getPaginatedUIGeneAliquotSpectralCount.uiGeneAliquotSpectralCounts;
			this.aliquotTotalRecords = data.getPaginatedUIGeneAliquotSpectralCount.total;
			this.aliquotOffset = data.getPaginatedUIGeneAliquotSpectralCount.pagination.from;
			this.aliquotLimit = data.getPaginatedUIGeneAliquotSpectralCount.pagination.size;
			this.aliquotPageSize = data.getPaginatedUIGeneAliquotSpectralCount.pagination.size;
			this.loadingAliquotRecords = false;
		  },
		  err => {
			  console.log("ERROR!!!!Loading data took too long");
			  this.aliquotSpectralCountLoadError = "Loading data took too long, please, close the overlay gene summary window and open it again.";
			  this.loadingAliquotRecords = false; //If loading data takes too much time and fails, need to stop spinning wheel
		  });
	 */
  }

  //PDC-772 no need to make API query for study table
  getGeneStudySpectralCounts(){
	 /* this.loading = true;
	  setTimeout(() => {
		  this.geneProteinSummaryService.getStudySpectralCount(this.gene_id, this.studyOffset, this.studyLimit, this.source).subscribe((data: any) =>{
			this.studySpectralCountsList = data.getPaginatedUIGeneStudySpectralCount.uiGeneStudySpectralCounts;
			this.studyTotalRecords = data.getPaginatedUIGeneStudySpectralCount.total;
			this.studyOffset = data.getPaginatedUIGeneStudySpectralCount.pagination.from;
			this.studyPageSize = data.getPaginatedUIGeneStudySpectralCount.pagination.size;
			this.studyLimit = data.getPaginatedUIGeneStudySpectralCount.pagination.size;
			this.loading = false;
		  });
	  }, 1000);*/
  }

  getPTMData(){
	  this.lodingPTMData = true;
	  setTimeout(() => {
		  //this.geneProteinSummaryService.getGenePTMData(this.gene_id, this.ptmOffset, this.ptmLimit, this.source).subscribe((data: any) =>{
		  this.geneProteinSummaryService.getGeneUuidPTMData(this.gene_id, this.uuid, this.ptmOffset, this.ptmLimit, this.source).subscribe((data: any) =>{
			this.genePTMData = data.getPaginatedUIPtm.uiPtm;
			this.ptmTotalRecords = data.getPaginatedUIPtm.total;
			this.ptmOffset = data.getPaginatedUIPtm.pagination.from;
			this.ptmPageSize = data.getPaginatedUIPtm.pagination.size;
			this.ptmLimit = data.getPaginatedUIPtm.pagination.size;
			this.lodingPTMData = false;
		  });
	  }, 1000);
  }

  loadNewPageAliquotSpectralCounts(event: any){
	  this.aliquotOffset = event.first;
	  this.aliquotLimit = event.rows;
	  this.loadingAliquotRecords = true;
	  this.geneProteinSummaryService.getAliquotSpectralCount(this.gene_id, this.aliquotOffset, this.aliquotLimit, this.source).subscribe((data: any) =>{
			this.aliquotSpectralCountsList = data.getPaginatedUIGeneAliquotSpectralCount.uiGeneAliquotSpectralCounts;
			if (this.aliquotOffset == 0) {
				this.aliquotTotalRecords = data.getPaginatedUIGeneAliquotSpectralCount.total;
				this.aliquotOffset = data.getPaginatedUIGeneAliquotSpectralCount.pagination.from;
				this.aliquotPageSize = data.getPaginatedUIGeneAliquotSpectralCount.pagination.size;
				this.aliquotLimit = data.getPaginatedUIGeneAliquotSpectralCount.pagination.size;
			}
			this.loadingAliquotRecords = false;
		});
  }

  loadNewPageStudySpectralCounts(event: any){
	  this.studyOffset = event.first;
	  this.studyLimit = event.rows;
	  this.loading = true;
	  this.geneProteinSummaryService.getStudySpectralCount(this.gene_id, this.studyOffset, this.studyLimit, this.source).subscribe((data: any) =>{
			this.studySpectralCountsList = data.getPaginatedUIGeneStudySpectralCount.uiGeneStudySpectralCounts;;
			if (this.studyOffset == 0) {
				this.studyTotalRecords = data.getPaginatedUIGeneStudySpectralCount.total;
				this.studyOffset = data.getPaginatedUIGeneStudySpectralCount.pagination.from;
				this.studyPageSize = data.getPaginatedUIGeneStudySpectralCount.pagination.size;
				this.studyLimit = data.getPaginatedUIGeneStudySpectralCount.pagination.size;
			}
			this.loading = false;
		});
  }

  loadPTMData(event: any){
	  this.ptmOffset = event.first;
	  //this.ptmLimit = event.rows;
	  this.lodingPTMData = true;
	  //this.geneProteinSummaryService.getGenePTMData(this.gene_id, this.ptmOffset, this.ptmLimit, this.source).subscribe((data: any) =>{
	  console.log("loadPTM: "+ this.uuid);	  
	  this.geneProteinSummaryService.getGeneUuidPTMData(this.gene_id, this.uuid, this.ptmOffset, this.ptmLimit, this.source).subscribe((data: any) =>{
			this.genePTMData = data.getPaginatedUIPtm.uiPtm;
			if (this.ptmOffset == 0) {
				this.ptmTotalRecords = data.getPaginatedUIPtm.total;
				this.ptmOffset = data.getPaginatedUIPtm.pagination.from;
				this.ptmPageSize = data.getPaginatedUIPtm.pagination.size;
				this.ptmLimit = data.getPaginatedUIPtm.total;
			}
			this.lodingPTMData = false;
		});
  }


  //Helper function checking whether Assay data is available
  //checking for length > 1 since occasionally assays field seem to have an invisible character
  isAssaysEmpty():boolean{
	  var result = true;
	  if (this.geneSummaryData.assays && this.geneSummaryData.assays != "" && this.geneSummaryData.assays.length > 1) {
		  result = false;
	  }
	  return result;
  }

  close() {
		this.router.navigate([{outlets: {'geneSummary': null}}]);
        this.dialogRef.close();
  }

  navigateFullPage(){
	  //@@@PDC-7690 pass gene_id together with gene_name
	  var geneFullPageRoute = 'gene/' + this.geneSummaryData.gene_name + '#' + this.uuid;
	  this.router.navigate([{outlets: {'primary': geneFullPageRoute, 'geneSummary': null}}]);
	  this.dialogRef.close();
  }

  ngOnInit() {
	this.frozenColumns = [
		{field: "ptm_type", header: "PTM Type"}
	];
  }

  makeRowsSameHeight() {
	setTimeout(() => {
		if (document.getElementsByClassName('ui-table-scrollable-wrapper').length) {
			let wrapper = document.getElementsByClassName('ui-table-scrollable-wrapper');
			for (var i = 0; i < wrapper.length; i++) {
				let w = wrapper.item(i) as HTMLElement;
				let frozen_rows: any = w.querySelectorAll('.ui-table-frozen-view .ui-table-tbody tr');
				let unfrozen_rows: any = w.querySelectorAll('.ui-table-unfrozen-view .ui-table-tbody tr');
				let frozen_header_row: any = w.querySelectorAll('.ui-table-frozen-view .ui-table-thead tr');
				let unfrozen_header_row: any = w.querySelectorAll('.ui-table-unfrozen-view .ui-table-thead');
				   if (frozen_header_row[0].clientHeight > unfrozen_header_row[0].clientHeight) {
					unfrozen_header_row[0].style.height = frozen_header_row[0].clientHeight+"px";
				  }
				else if (frozen_header_row[0].clientHeight < unfrozen_header_row[0].clientHeight) {
					frozen_header_row[0].style.height = unfrozen_header_row[0].clientHeight+"px";
				}
				for (let i = 0; i < frozen_rows.length; i++) {
					if (frozen_rows[i].clientHeight > unfrozen_rows[i].clientHeight) {
						unfrozen_rows[i].style.height = frozen_rows[i].clientHeight+"px";
					}
					else if (frozen_rows[i].clientHeight < unfrozen_rows[i].clientHeight)
					{
						frozen_rows[i].style.height = unfrozen_rows[i].clientHeight+"px";
					}
				}
				let frozen_header_div: any = w.querySelectorAll('.ui-table-unfrozen-view .ui-table-scrollable-header-box');
				frozen_header_div[0].setAttribute('style', 'margin-right: 0px !important');
			}
		}
	});
}

}
