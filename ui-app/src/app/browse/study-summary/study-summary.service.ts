import { Injectable } from '@angular/core';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Response, Headers, RequestOptions} from '@angular/http';


import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { TissueSite, QueryTissueSites, QueryDiseases, Disease, Program, QueryPrograms, Project,
		QueryCases, Case, DiseaseType, DiseaseTypeQuery, AllStudiesData, QueryAllStudiesData, WorkflowMetadata, ProtocolData,
		PublicationData, QueryPublicationData, FilesCountsPerStudyData, QueryAllClinicalDataPaginated, QueryAllCasesDataPaginated, QueryStudyExperimentalDesign, QueryBiospecimenPerStudy, EntityReferencePerStudy } from '../../types';

/*This is a service class used for the API queries */

//@@@PDC-674 - UI changes to accomodate new protocol structure
//@@@PDC-758: Study summary overlay window opened through search is missing data
//@@@PDC-1160: Add cases and aliquots to the study summary page
//@@@PDC-1219: Add a new experimental design tab on the study summary page
//@@@PDC-1355: Use uuid as API search parameter
@Injectable()
export class StudySummaryService {

	headers: Headers;
	options: RequestOptions;

//constructor(private http: Http, private apollo: Apollo) {
constructor(private apollo: Apollo) {
	this.headers = new Headers({ 'Content-Type': 'application/json',
                                     'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
	}

	getAllData(){
		return this.apollo.watchQuery<QueryAllStudiesData>({
			query: gql`
				query CasesData{
					uiStudy {
					submitter_id_name
					program_name
					project_name
					disease_type
					primary_site
					analytical_fraction
					experiment_type
					num_raw
					num_mzml
					num_prot
					num_prot_assem
					num_psm
					}
				}`
		})
		.valueChanges
		.pipe(
        map(result => {
				console.log(result.data);
		return result.data;})
      );
	}

	filteredStudiesQuery = gql`
				query FilteredStudiesData($program_name_filter: String!, $project_name_filter: String!, $study_name_filter: String!, $disease_filter: String!, $filterValue: String!, $analytical_frac_filter: String!, $exp_type_filter: String!){
					uiStudy(program_name: $program_name_filter , project_name: $project_name_filter, study_name: $study_name_filter, disease_type: $disease_filter, primary_site: $filterValue, analytical_fraction: $analytical_frac_filter, experiment_type: $exp_type_filter) {
					submitter_id_name
					program_name
					project_name
					disease_type
					primary_site
					analytical_fraction
					experiment_type
					num_raw
					num_mzml
					num_prot
					num_prot_assem
					num_psm
				}
			}`;

	getFilteredStudies(filters:any){
		return this.apollo.watchQuery<QueryAllStudiesData>({
			query: this.filteredStudiesQuery,
			variables: {
				program_name_filter: filters["program_name"],
				project_name_filter: filters["project_name"],
				study_name_filter: filters["study_name"],
				disease_filter: filters["disease_type"],
				filterValue: filters["primary_site"],
				analytical_frac_filter: filters["analytical_fraction"],
				exp_type_filter: filters["experiment_type"]
			}
		})
		.valueChanges
		.pipe(
        map(result => { console.log(result.data); return result.data;})
      );
	}

	//@@@PDC-758: Study summary overlay window opened through search is missing data
	//API call to fetch study summary details from a new API.
	//@@@PDC-1883: Add external references to study summary page
	//@@@PDC-2939 update study summary page to display other versions
	//@@@PDC-2998 - update UI to include API changes for study versions new feature
	getFilteredStudyData(study_name = '', pdc_study_id = '', study_version = '', source = ''){
		console.log("getFilteredStudyData: " + pdc_study_id + " version: " + study_version);
		return this.apollo.watchQuery<QueryAllStudiesData>({
			query: this.filteredStudyDataQuery,
			variables: {
				study_name: study_name,
				pdc_study_id: pdc_study_id,
				study_version: study_version,
				source: source
			}
		})
		.valueChanges
		.pipe(
        map(result => { console.log(result.data); return result.data;})
      );
	}

	//@@@PDC-758: Study summary overlay window opened through search is missing data
	//Query to fetch study summary details from a new API.
	//@@@PDC-1358  add study uuid
	//@@@PDC-1883: Add external references to study summary page
	filteredStudyDataQuery = gql`
		query paginatedUIStudyQuery($study_name: String!, $pdc_study_id: String!, $study_version: String!, $source: String!){
			getPaginatedUIStudy(study_name: $study_name, pdc_study_id: $pdc_study_id, study_version: $study_version, source: $source) {
				total
				uiStudies {
					study_id
					pdc_study_id
					submitter_id_name
					study_description
					program_name
					project_name
					disease_type
					primary_site
					analytical_fraction
					experiment_type
					embargo_date
					aliquots_count
					cases_count
					filesCount {
						file_type
						data_category
						files_count
					}
					supplementaryFilesCount {
						data_category
						file_type
						files_count
					}
					nonSupplementaryFilesCount {
						data_category
						file_type
						files_count
					}
					contacts {
						name
						institution
						email
						url
					}
					versions {
							number
					}
				}
				pagination {
					count
					sort
					from
					page
					total
					pages
					size
				}
			}
	}`;

	//@@@PDC-1123 call ui wrapper API
	workflowMetadataQuery = gql`
					query WorkflowMetadataQery($study_id: String!, $source: String!){
						uiWorkflowMetadata(study_id: $study_id, source: $source) {
						  workflow_metadata_submitter_id
						  study_submitter_id
						  protocol_submitter_id
						  cptac_study_id
						  submitter_id_name
						  study_submitter_name
						  analytical_fraction
						  experiment_type
						  instrument
						  refseq_database_version
						  uniport_database_version
						  hgnc_version
						  raw_data_processing
						  raw_data_conversion
						  sequence_database_search
						  search_database_parameters
						  phosphosite_localization
						  ms1_data_analysis
						  psm_report_generation
						  cptac_dcc_mzidentml
						  mzidentml_refseq
						  mzidentml_uniprot
						  gene_to_prot
						  cptac_galaxy_workflows
						  cptac_galaxy_tools
						  cdap_reports
						  cptac_dcc_tools
						}
				}`;

	getWorkflowMetadata(filters:any, source = ''){
		return this.apollo.watchQuery<WorkflowMetadata>({
			query: this.workflowMetadataQuery,
			variables: {
				study_id: filters,
				source: source
			}
		})
		.valueChanges
		.pipe(
        map(result => { console.log(result.data); return result.data;})
      );
	}

	//PDC-674 - UI changes to accomodate new protocol structure
	//@@@PDC-7248 - additional metabolomic properties
	//@@@PDC-7399 change acquisition_mode to polarity
	protocolQuery = gql`
		query ProtocolQuery($study_id: String!, $source: String!){
		  uiProtocol (study_id: $study_id, source: $source ){
			protocol_id
			protocol_submitter_id
			program_id
			program_submitter_id
			protocol_name
			protocol_date
			document_name
			quantitation_strategy
			experiment_type
			label_free_quantitation
			labeled_quantitation
			isobaric_labeling_reagent
			reporter_ion_ms_level
			starting_amount
			starting_amount_uom
			digestion_reagent
			alkylation_reagent
			enrichment_strategy
			enrichment
			chromatography_dimensions_count
			one_d_chromatography_type
			two_d_chromatography_type
			fractions_analyzed_count
			column_type
			amount_on_column
			amount_on_column_uom
			column_length
			column_length_uom
			column_inner_diameter
			column_inner_diameter_uom
			particle_size
			particle_size_uom
			particle_type
			gradient_length
			gradient_length_uom
			instrument_make
			instrument_model
			dissociation_type
			ms1_resolution
			ms2_resolution
			dda_topn
			normalized_collision_energy
			acquistion_type
			dia_multiplexing
			dia_ims
			auxiliary_data
			cud_label
			analytical_technique
			chromatography_instrument_make
			chromatography_instrument_model
			polarity
			reconstitution_solvent
			reconstitution_volume
			reconstitution_volume_uom
			internal_standards
			extraction_method
			ionization_mode
		}
	}`;

	getProtocolData(filters:any, source = ''){
		return this.apollo.watchQuery<ProtocolData>({
			query: this.protocolQuery,
			variables: {
				study_id: filters,
				source: source
			}
		})
		.valueChanges
		.pipe(
        map(result => { console.log(result.data); return result.data;})
      );
	}

	publicationsQuery = gql`
						query PublicationsQuery($study_id: String!, $source: String!){
							uiPublication (study_id: $study_id, source: $source){
								publication_id
								pubmed_id
								title
							}
						}`;

	getPublicationsData(filters:any, source = ''){
		return this.apollo.watchQuery<QueryPublicationData>({
			query: this.publicationsQuery,
			variables: {
				study_id: filters,
				source: source
			}
		})
		.valueChanges
		.pipe(
        map(result => { console.log(result.data); return result.data;})
      );
	}

    //@@@PDC-1123 call ui wrapper API
	filesCountPerStudyQuery = gql`
						query FilesCountsQuery($study_id: String!, $source: String!){
							uiFilesCountPerStudy (study_id: $study_id, source: $source ){
								study_submitter_id
								file_type
								files_count
								data_category
							}
						}`;
	getFilesCounts(filters:any, source = ''){
		return this.apollo.watchQuery<FilesCountsPerStudyData>({
			query: this.filesCountPerStudyQuery,
			variables: {
				study_id: filters,
				source: source
			}
		})
		.valueChanges
		.pipe(
        map(result => { console.log(result.data); return result.data;})
      );
	}

	//@@@PDC-1160: Add cases and aliquots to the study summary page
	//@@@PDC-1305 add age_at_diagnosis et al
	filteredCinicalDataPaginatedQuery = gql`
	query FilteredClinicalDataPaginated($offset_value: Int, $limit_value: Int, $sort_value: String, $program_name_filter: String!, $project_name_filter: String!, $study_name_filter: String!, $disease_filter: String!, $filterValue: String!, $analytical_frac_filter: String!, $exp_type_filter: String!, $ethnicity_filter: String!, $race_filter: String!, $gender_filter: String!, $tumor_grade_filter: String!, $sample_type_filter: String!, $acquisition_type_filter: String!, $data_category_filter: String!, $file_type_filter: String!, $access_filter: String!, $downloadable_filter: String!, $case_status_filter: String!, $biospecimen_status_filter: String!, $source: String!){
		getPaginatedUIClinical(offset: $offset_value, limit: $limit_value, sort: $sort_value, program_name: $program_name_filter , project_name: $project_name_filter,
								study_name: $study_name_filter, disease_type: $disease_filter, primary_site: $filterValue, analytical_fraction: $analytical_frac_filter,
								experiment_type: $exp_type_filter, ethnicity: $ethnicity_filter, race: $race_filter, gender: $gender_filter,
								tumor_grade: $tumor_grade_filter, sample_type: $sample_type_filter, acquisition_type: $acquisition_type_filter, data_category: $data_category_filter, file_type: $file_type_filter, access: $access_filter, downloadable: $downloadable_filter, case_status: $case_status_filter, biospecimen_status: $biospecimen_status_filter, source: $source) {
			total
			uiClinical{
				case_submitter_id
				external_case_id
				ethnicity
				gender
				race
				morphology
				primary_diagnosis
				site_of_resection_or_biopsy
				tissue_or_organ_of_origin
				tumor_grade
				tumor_stage
				age_at_diagnosis
				classification_of_tumor
				days_to_recurrence
				case_id
				disease_type
				primary_site
				program_name
				project_name
				status
				externalReferences {
					reference_resource_shortname
					reference_entity_location
				}
				samples {
					sample_id
					sample_submitter_id
				}
			}
			pagination {
				count
				sort
				from
				page
				total
				pages
				size
			}
		}
	}`;

	getFilteredClinicalDataPaginated(offset: number, limit:number, sort: string, filters:any, source = ''){
		let filter_ethnicity = filters["ethnicity"];
		if (filter_ethnicity === "Empty value"){
		filter_ethnicity = "";
		}
		let filter_race = filters["race"];
		if (filter_race === "Empty value"){
		filter_race = "";
		}
		return this.apollo.watchQuery<QueryAllClinicalDataPaginated>({
		query: this.filteredCinicalDataPaginatedQuery,
		variables: {
			offset_value: offset,
			limit_value: limit,
			sort_value: sort,
			program_name_filter: filters["program_name"] || "",
			project_name_filter: filters["project_name"] || "" ,
			study_name_filter: filters["study_name"] || "",
			disease_filter: filters["disease_type"]|| "",
			filterValue: filters["primary_site"] || "",
			analytical_frac_filter: filters["analytical_fraction"] || "",
			exp_type_filter: filters["experiment_type"] || "",
			ethnicity_filter: filter_ethnicity || "",
			race_filter: filter_race || "",
			gender_filter: filters["gender"] || "",
			tumor_grade_filter: filters["tumor_grade"] || "",
			sample_type_filter: filters["sample_type"],
			acquisition_type_filter: filters["acquisition_type"],
			data_category_filter: filters["data_category"] || '',
			file_type_filter: filters["file_type"] || '',
			access_filter: filters["access"] || '',
			downloadable_filter: filters["downloadable"] || '',
			case_status_filter: filters["case_status"] || '',
			biospecimen_status_filter: filters["biospecimen_status"] || '',
			source: source
		}
		})
		.valueChanges
		.pipe(
		map(result => { console.log(result.data); return result.data;})
		);
	}

	//@@@PDC-1160: Add cases and aliquots to the study summary page
	filteredCasesPaginatedQuery = gql`
	query FilteredCasesDataPaginated($offset_value: Int, $limit_value: Int, $sort_value: String, $program_name_filter: String!, $project_name_filter: String!, $study_name_filter: String!, $disease_filter: String!, $filterValue: String!, $analytical_frac_filter: String!, $exp_type_filter: String!,  $ethnicity_filter: String!, $race_filter: String!, $gender_filter: String!, $tumor_grade_filter: String!, $sample_type_filter: String!, $acquisition_type_filter: String!, $data_category_filter: String!, $file_type_filter: String!, $access_filter: String!, $downloadable_filter: String!, $biospecimen_status_filter: String!, $case_status_filter: String!, $source: String!){
		getPaginatedUICase(offset: $offset_value, limit: $limit_value, sort: $sort_value, program_name: $program_name_filter ,
							project_name: $project_name_filter, study_name: $study_name_filter, disease_type: $disease_filter,
							primary_site: $filterValue, analytical_fraction: $analytical_frac_filter, experiment_type: $exp_type_filter,
							ethnicity: $ethnicity_filter, race: $race_filter, gender: $gender_filter, tumor_grade: $tumor_grade_filter,
							sample_type: $sample_type_filter, acquisition_type: $acquisition_type_filter, data_category: $data_category_filter, file_type: $file_type_filter, access: $access_filter, downloadable: $downloadable_filter, biospecimen_status: $biospecimen_status_filter, case_status: $case_status_filter, source: $source) {
			total
			uiCases{
				aliquot_id
				sample_id
				case_id
				aliquot_submitter_id
				aliquot_is_ref
				aliquot_status
				aliquot_quantity
				aliquot_volume
				amount
				analyte_type
				concentration
				case_status
				sample_status
				sample_submitter_id
				sample_is_ref
				biospecimen_anatomic_site
				biospecimen_laterality
				composition
				current_weight
				days_to_collection
				days_to_sample_procurement
				diagnosis_pathologically_confirmed
				freezing_method
				initial_weight
				intermediate_dimension
				longest_dimension
				method_of_sample_procurement
				pathology_report_uuid
				preservation_method
				sample_type_id
				shortest_dimension
				time_between_clamping_and_freezing
				time_between_excision_and_freezing
				tissue_type
				tumor_code
				tumor_code_id
				tumor_descriptor
				case_submitter_id
				program_name
				project_name
				sample_type
				disease_type
				primary_site
				tissue_collection_type
				sample_ordinal
			}
			pagination {
				count
				sort
				from
				page
				total
					pages
					size
				}
			}
		}`;

	getFilteredCasesPaginated(offset: number, limit: number, sort: string, filters:any, source = ''){
		let filter_ethnicity = filters["ethnicity"];
		if (filter_ethnicity === "Empty value"){
		filter_ethnicity = "";
		}
		let filter_race = filters["race"];
		if (filter_race === "Empty value"){
		filter_race = "";
		}
		return this.apollo.watchQuery<QueryAllCasesDataPaginated>({
		query: this.filteredCasesPaginatedQuery,
		variables: {
			offset_value: offset,
			limit_value: limit,
			sort_value: sort,
			program_name_filter: filters["program_name"] || "",
			project_name_filter: filters["project_name"] || "" ,
			study_name_filter: filters["study_name"] || "",
			disease_filter: filters["disease_type"]|| "",
			filterValue: filters["primary_site"] || "",
			analytical_frac_filter: filters["analytical_fraction"] || "",
			exp_type_filter: filters["experiment_type"] || "",
			ethnicity_filter: filter_ethnicity || "",
			race_filter: filter_race || "",
			gender_filter: filters["gender"] || "",
			tumor_grade_filter: filters["tumor_grade"] || "",
			sample_type_filter: filters["sample_type"],
			acquisition_type_filter: filters["acquisition_type"],
			data_category_filter: filters["data_category"] || '',
			file_type_filter: filters["file_type"] || '',
			access_filter: filters["access"] || '',
			downloadable_filter: filters["downloadable"] || '',
			biospecimen_status_filter: filters["biospecimen_status"] || '',
			case_status_filter: filters["case_status"] || '',
			source: source
		}
		})
		.valueChanges
		.pipe(
		map(result => { console.log(result.data); return result.data;})
		);
	}

	//@@@PDC-1219: Add a new experimental design tab on the study summary page
	//@@@PDC-3253 call api with acceptDUA
	//@@@PDC-3900 new studyExperimentalDesign API
	//@@@PDC-7399 change acquisition_mode to polarity
	studyExperimentalDesignQuery = gql`
	query StudyExperimentalDesign($study_id_value: String, $source: String!) {
		uiStudyExperimentalDesign(study_id: $study_id_value, source: $source) {
			study_id
			study_submitter_id
			study_run_metadata_id
			study_run_metadata_submitter_id
			experiment_number
			experiment_type
			plex_dataset_name
			acquisition_type
			number_of_fractions
			analyte
			polarity
			label_free {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			itraq_113 {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			itraq_114 {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			itraq_115 {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			itraq_116 {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			itraq_117 {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			itraq_118 {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			itraq_119 {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			itraq_121 {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_126{
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_127n {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_127c {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_128n {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_128c {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_129n {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_129c {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_130c {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_130n {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_131 {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_131c {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_132n {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_132c {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_133n {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_133c {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			},
			tmt_134n {
				aliquot_id,
				aliquot_run_metadata_id,
				aliquot_submitter_id
			}
		}
	}`;

	getStudyExperimentalDesign(study_id:any, source = ''){
		return this.apollo.watchQuery<QueryStudyExperimentalDesign>({
		query: this.studyExperimentalDesignQuery,
		variables: {
			study_id_value: study_id,
			source: source
		}
		})
		.valueChanges
		.pipe(
		map(result => { console.log(result.data); return result.data;})
		);
	}

	//@@@PDC-3253 call ui wrapper api
	biospecimenPerStudyQuery = gql`
	query BiospecimenPerStudy($study_id_value: String, $source: String!) {
		uiBiospecimenPerStudy(study_id: $study_id_value, source: $source) {
			aliquot_id
			sample_id
			case_id
			aliquot_submitter_id
			sample_submitter_id
			case_submitter_id
			aliquot_is_ref
			aliquot_status
			case_status
			sample_status
			project_name
			sample_type
			disease_type
			primary_site
			pool
			taxon
		}
	}`;

	getBiospecimenPerStudy(study_id:any, source = ''){
		return this.apollo.watchQuery<QueryBiospecimenPerStudy>({
		query: this.biospecimenPerStudyQuery,
		variables: {
			study_id_value: study_id,
			source: source
		}
		})
		.valueChanges
		.pipe(
		map(result => {console.log(result.data); return result.data;
		})
		);
	}

	//@@@PDC-1883: Add external references to study summary page
	//@@@PDC-3253 call ui wrapper api
	entityReferenceQuery = gql`
	query EntityReferenceQueryData($entity_type_filter: String!, $entity_id_filter: String!, $reference_type_filter: String!, $source: String!){
		uiPdcEntityReference(entity_type: $entity_type_filter , entity_id: $entity_id_filter, reference_type: $reference_type_filter, source: $source) {
			reference_id
			entity_type
			entity_id
			reference_type
			reference_entity_type
			reference_entity_alias
			reference_resource_name
			reference_resource_shortname
			reference_entity_location
			submitter_id_name
		}
	}`;

	//@@@PDC-1883: Add external references to study summary page
	getEntityReferenceData(entity_type, entity_id, reference_type, source = ''){
		return this.apollo.watchQuery<EntityReferencePerStudy>({
		query: this.entityReferenceQuery,
		variables: {
			entity_type_filter: entity_type,
			entity_id_filter: entity_id,
			reference_type_filter: reference_type,
			source: source
		}
		})
		.valueChanges
		.pipe(
		map(result => { console.log(result.data); return result.data;})
		);
	}

	//@@@PDC-8282 add treatment to manifest
	filteredCinicalDataPaginatedPostQuery = gql`
	query FilteredClinicalDataPaginated($offset_value: Int, $limit_value: Int, $sort_value: String, $program_name_filter: String!, $project_name_filter: String!, $study_name_filter: String!, $disease_filter: String!, $filterValue: String!, $analytical_frac_filter: String!, $exp_type_filter: String!, $ethnicity_filter: String!, $race_filter: String!, $gender_filter: String!, $tumor_grade_filter: String!, $sample_type_filter: String!, $acquisition_type_filter: String!, $data_category_filter: String!, $file_type_filter: String!, $access_filter: String!, $downloadable_filter: String!, $case_status_filter: String!, $biospecimen_status_filter: String!, $source: String!){
		getPaginatedUIClinical(offset: $offset_value, limit: $limit_value, sort: $sort_value, program_name: $program_name_filter , project_name: $project_name_filter,
								study_name: $study_name_filter, disease_type: $disease_filter, primary_site: $filterValue, analytical_fraction: $analytical_frac_filter,
								experiment_type: $exp_type_filter, ethnicity: $ethnicity_filter, race: $race_filter, gender: $gender_filter,
								tumor_grade: $tumor_grade_filter, sample_type: $sample_type_filter, acquisition_type: $acquisition_type_filter, data_category: $data_category_filter, file_type: $file_type_filter, access: $access_filter, downloadable: $downloadable_filter, case_status: $case_status_filter, biospecimen_status: $biospecimen_status_filter, source: $source) {
			total
			uiClinical{
				case_submitter_id
				external_case_id
				ethnicity
				gender
				race
				morphology
				primary_diagnosis
				site_of_resection_or_biopsy
				tissue_or_organ_of_origin
				tumor_grade
				tumor_stage
				age_at_diagnosis
				classification_of_tumor
				days_to_recurrence
				case_id
				disease_type
				primary_site
				program_name
				project_name
				status
				cause_of_death
				days_to_birth
				days_to_death
				vital_status
				year_of_birth
				year_of_death
				age_at_index
				premature_at_birth
				weeks_gestation_at_birth
				age_is_obfuscated
				cause_of_death_source
				occupation_duration_years
				country_of_residence_at_enrollment
				days_to_last_follow_up
				days_to_last_known_disease_status
				last_known_disease_status
				progression_or_recurrence
				prior_malignancy
				ajcc_clinical_m
				ajcc_clinical_n
				ajcc_clinical_stage
				ajcc_clinical_t
				ajcc_pathologic_m
				ajcc_pathologic_n
				ajcc_pathologic_stage
				ajcc_pathologic_t
				ajcc_staging_system_edition
				ann_arbor_b_symptoms
				ann_arbor_clinical_stage
				ann_arbor_extranodal_involvement
				ann_arbor_pathologic_stage
				best_overall_response
				burkitt_lymphoma_clinical_variant
				circumferential_resection_margin
				colon_polyps_history
				days_to_best_overall_response
				days_to_diagnosis
				days_to_hiv_diagnosis
				days_to_new_event
				figo_stage
				hiv_positive
				hpv_positive_type
				hpv_status
				iss_stage
				laterality
				ldh_level_at_diagnosis
				ldh_normal_range_upper
				lymph_nodes_positive
				lymphatic_invasion_present
				method_of_diagnosis
				peripancreatic_lymph_nodes_positive
				peripancreatic_lymph_nodes_tested
				supratentorial_localization
				tumor_confined_to_organ_of_origin
				tumor_focality
				tumor_regression_grade
				vascular_invasion_type
				wilms_tumor_histologic_subtype
				breslow_thickness
				gleason_grade_group
				igcccg_stage
				international_prognostic_index
				largest_extrapelvic_peritoneal_focus
				masaoka_stage
				new_event_anatomic_site
				new_event_type
				overall_survival
				perineural_invasion_present
				prior_treatment
				progression_free_survival
				progression_free_survival_event
				residual_disease
				vascular_invasion_present
				year_of_diagnosis
				icd_10_code
				synchronous_malignancy
				metastasis_at_diagnosis
				metastasis_at_diagnosis_site
				mitosis_karyorrhexis_index
				non_nodal_regional_disease
				non_nodal_tumor_deposits
				ovarian_specimen_status
				ovarian_surface_involvement
				percent_tumor_invasion
				peritoneal_fluid_cytological_status
				primary_gleason_grade
				secondary_gleason_grade
				weiss_assessment_score
				adrenal_hormone
				ann_arbor_b_symptoms_described
				diagnosis_is_primary_disease
				eln_risk_classification
				figo_staging_edition_year
				gleason_grade_tertiary
				gleason_patterns_percent
				margin_distance
				margins_involved_site
				pregnant_at_diagnosis
				satellite_nodule_present
				sites_of_involvement
				tumor_depth
				who_cns_grade
				who_nte_grade
				diagnosis_uuid
				anaplasia_present
				anaplasia_present_type
				child_pugh_classification
				cog_liver_stage
				cog_neuroblastoma_risk_group
				cog_renal_stage
				cog_rhabdomyosarcoma_risk_group
				enneking_msts_grade
				enneking_msts_metastasis
				enneking_msts_stage
				enneking_msts_tumor_site
				esophageal_columnar_dysplasia_degree
				esophageal_columnar_metaplasia_present
				first_symptom_prior_to_diagnosis
				gastric_esophageal_junction_involvement
				goblet_cells_columnar_mucosa_present
				gross_tumor_weight
				inpc_grade
				inpc_histologic_group
				inrg_stage
				inss_stage
				irs_group
				irs_stage
				ishak_fibrosis_score
				lymph_nodes_tested
				medulloblastoma_molecular_classification
				externalReferences {
					reference_resource_shortname
					reference_entity_location
				}
				exposures {
					exposure_id
					exposure_submitter_id
					alcohol_days_per_week
					alcohol_drinks_per_day
					alcohol_history
					alcohol_intensity
					asbestos_exposure
					cigarettes_per_day
					coal_dust_exposure
					environmental_tobacco_smoke_exposure
					pack_years_smoked
					radon_exposure
					respirable_crystalline_silica_exposure
					smoking_frequency
					time_between_waking_and_first_smoke
					tobacco_smoking_onset_year
					tobacco_smoking_quit_year
					tobacco_smoking_status
					type_of_smoke_exposure
					type_of_tobacco_used
					years_smoked
					age_at_onset
					alcohol_type
					exposure_duration
					exposure_duration_years
					exposure_type
					marijuana_use_per_week
					parent_with_radiation_exposure
					secondhand_smoke_as_child
					smokeless_tobacco_quit_age
					tobacco_use_per_day
				}
				follow_ups {
					follow_up_id
					follow_up_submitter_id
					adverse_event
					adverse_event_grade
					aids_risk_factors
					barretts_esophagus_goblet_cells_present
					bmi
					body_surface_area
					cause_of_response
					cd4_count
					cdc_hiv_risk_factors
					comorbidity
					comorbidity_method_of_diagnosis
					days_to_adverse_event
					days_to_comorbidity
					days_to_follow_up
					days_to_imaging
					days_to_progression
					days_to_progression_free
					days_to_recurrence
					diabetes_treatment_type
					disease_response
					dlco_ref_predictive_percent
					ecog_performance_status
					evidence_of_recurrence_type
					eye_color
					fev1_ref_post_bronch_percent
					fev1_ref_pre_bronch_percent
					fev1_fvc_pre_bronch_percent
					fev1_fvc_post_bronch_percent
					haart_treatment_indicator
					height
					hepatitis_sustained_virological_response
					history_of_tumor
					history_of_tumor_type
					hiv_viral_load
					hormonal_contraceptive_type
					hormonal_contraceptive_use
					hormone_replacement_therapy_type
					hpv_positive_type
					hysterectomy_margins_involved
					hysterectomy_type
					imaging_result
					imaging_type
					immunosuppressive_treatment_type
					karnofsky_performance_status
					menopause_status
					nadir_cd4_count
					pancreatitis_onset_year
					pregnancy_outcome
					procedures_performed
					progression_or_recurrence
					progression_or_recurrence_anatomic_site
					progression_or_recurrence_type
					recist_targeted_regions_number
					recist_targeted_regions_sum
					reflux_treatment_type
					risk_factor
					risk_factor_treatment
					scan_tracer_used
					undescended_testis_corrected
					undescended_testis_corrected_age
					undescended_testis_corrected_laterality
					undescended_testis_corrected_method
					undescended_testis_history
					undescended_testis_history_laterality
					viral_hepatitis_serologies
					weight
				}
				treatments {
					treatment_id
					treatment_submitter_id
					days_to_treatment_end
					days_to_treatment_start
					initial_disease_status
					regimen_or_line_of_therapy
					therapeutic_agents
					treatment_anatomic_site
					treatment_effect
					treatment_intent_type
					treatment_or_therapy
					treatment_outcome
					treatment_type			
					chemo_concurrent_to_radiation
					number_of_cycles
					reason_treatment_ended
					route_of_administration
					treatment_arm
					treatment_dose
					treatment_dose_units
					treatment_effect_indicator
					treatment_frequency
				}
				samples {
					sample_id
					sample_submitter_id
					annotation
				}
			}
			pagination {
				count
				sort
				from
				page
				total
				pages
				size
			}
		}
	}`;

	//@@@PDC-1940: File manifest download is very slow
	//@@@PDC-5045: Convert the GET requests to the getPaginatedUIClinical API of "Clinical" tab to POST
	getFilteredClinicalDataPaginatedPost(offset: number, limit: number, sort: string, filters:any, source = '') {
	let filter_ethnicity = filters["ethnicity"];
	if (filter_ethnicity === "Empty value"){
		filter_ethnicity = "";
	}
	let filter_race = filters["race"];
	if (filter_race === "Empty value"){
		filter_race = "";
	}

	return this.apollo.watchQuery<QueryAllClinicalDataPaginated>({
		query: this.filteredCinicalDataPaginatedPostQuery,
		variables: {
			offset_value: offset,
			limit_value: limit,
			sort_value: sort,
			program_name_filter: filters["program_name"] || "",
			project_name_filter: filters["project_name"] || "" ,
			study_name_filter: filters["study_name"] || "",
			disease_filter: filters["disease_type"]|| "",
			filterValue: filters["primary_site"] || "",
			analytical_frac_filter: filters["analytical_fraction"] || "",
			exp_type_filter: filters["experiment_type"] || "",
			ethnicity_filter: filter_ethnicity || "",
			race_filter: filter_race || "",
			gender_filter: filters["gender"] || "",
			tumor_grade_filter: filters["tumor_grade"] || "",
			sample_type_filter: filters["sample_type"],
			acquisition_type_filter: filters["acquisition_type"],
			data_category_filter: filters["data_category"] || '',
			file_type_filter: filters["file_type"] || '',
			access_filter: filters["access"] || '',
			downloadable_filter: filters["downloadable"] || '',
			case_status_filter: filters["case_status"] || '',
			biospecimen_status_filter: filters["biospecimen_status"] || '',
			source: source
		},
		context: {
			method: 'POST'
		}
	})
	.valueChanges
	.pipe(
	map(result => { console.log(result.data); return result.data;})
	);
	}

}
