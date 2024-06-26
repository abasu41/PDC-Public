import Sequelize from 'sequelize';
import _ from 'lodash';

//@@@PDC-185 UICombo API
//@@@PDC-248 Rename API uiCombo to uiStudy
//@@@PDC-263 Add column of number of cases to study summary page 
//@@@PDC-261 Add study_submitter_id and aliquots count to uiStudy API 
//@@@PDC-657 add study_description
//@@@PDC-857 add embargo date
/**
* ModelUIStudy is used in uiStudy query.
*/

//@@@PDC-962 defnie db models after db is initialized asynchronously 
//@@@PDC-1874 add pdc_study_id to all study-related APIs 
//@@@PDC-3362 handle legacy studies
const defineUiModels = (db) => {

	//@@@PDC-1358 add study_id (uuid) to study summary page
	//@@@PDC-3637 add sort_order column
	const ModelUIStudy = db.getSequelize().define('dummy', {
		study_id: { type: Sequelize.STRING},
		study_submitter_id: { type: Sequelize.STRING},
		pdc_study_id: { type: Sequelize.STRING },
		submitter_id_name: { type: Sequelize.STRING},
		study_description: { type: Sequelize.STRING},
		program_name:  { type: Sequelize.STRING},
		project_name:  { type: Sequelize.STRING},
		project_submitter_id:  { type: Sequelize.STRING},
		disease_type:  { type: Sequelize.STRING},
		primary_site:  { type: Sequelize.STRING},
		analytical_fraction:  { type: Sequelize.STRING},
		experiment_type:  { type: Sequelize.STRING},
		acquisition_type:  { type: Sequelize.STRING},
		sort_order:  { type: Sequelize.INTEGER},
		cptac_phase:  { type: Sequelize.STRING},
		embargo_date: { type: Sequelize.DATE },
		cases_count:  { type: Sequelize.INTEGER},
		aliquots_count:  { type: Sequelize.INTEGER},
		num_raw:  { type: Sequelize.INTEGER},
		num_mzml:  { type: Sequelize.INTEGER},
		num_prot:  { type: Sequelize.INTEGER},
		num_prot_assem:  { type: Sequelize.INTEGER},
		num_psm:  { type: Sequelize.INTEGER},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIStudy.removeAttribute('id');
	
	//@@@PDC-533 UI filters
	//@@@PDC-566 Add sample_type and acquisition_type filters
	/**
	* ModelUIFilter is used in uiFilter query.
	*/
	const ModelUIFilter = db.getSequelize().define('dummy', {
		study_submitter_id: { type: Sequelize.STRING},
		pdc_study_id: { type: Sequelize.STRING },
		submitter_id_name: { type: Sequelize.STRING},
		program_name:  { type: Sequelize.STRING},
		project_name:  { type: Sequelize.STRING},
		disease_type:  { type: Sequelize.STRING},
		primary_site:  { type: Sequelize.STRING},
		analytical_fraction:  { type: Sequelize.STRING},
		experiment_type:  { type: Sequelize.STRING},
		ethnicity:  { type: Sequelize.STRING},
		race:  { type: Sequelize.STRING},
		gender:  { type: Sequelize.STRING},
		morphology:  { type: Sequelize.STRING},
		primary_diagnosis:  { type: Sequelize.STRING},
		site_of_resection_or_biopsy:  { type: Sequelize.STRING},
		tissue_or_organ_of_origin:  { type: Sequelize.STRING},
		tumor_grade:  { type: Sequelize.STRING},
		tumor_stage:  { type: Sequelize.STRING},
		data_category:  { type: Sequelize.STRING},
		file_type: { type: Sequelize.STRING},
		downloadable: { type: Sequelize.STRING },
		access: { type: Sequelize.STRING},
		sample_type:  { type: Sequelize.STRING},
		acquisition_type: { type: Sequelize.STRING},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIFilter.removeAttribute('id');
	
	//@@@PDC-185 UICombo API
	//@@@PDC-533 additional UI filters
	/**
	* ModelUICount is used in uiStudy query.
	*/
	const ModelUICount = db.getSequelize().define('dummy', {
		submitter_id_name: { type: Sequelize.STRING},
		cases_count:  { type: Sequelize.INTEGER},
		aliquots_count:  { type: Sequelize.INTEGER},
		num_raw:  { type: Sequelize.INTEGER},
		num_mzml:  { type: Sequelize.INTEGER},
		num_prot:  { type: Sequelize.INTEGER},
		num_prot_assem:  { type: Sequelize.INTEGER},
		num_psm:  { type: Sequelize.INTEGER},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUICount.removeAttribute('id');
	
	//@@@PDC-198 UI case API
	//@@@PDC-313 add case_submitter_id
	//@@@PDC-337 add program name 
	//@@@PDC-462 add submitter ids
	//@@@PDC-893 add aliquot, case and sample statuses
	//@@@PDC-1127 add pool and taxon
	//@@@PDC-1156 add is_ref
	//@@@PDC-1396 add external_case_id
	//@@@PDC-4968 expose case_is_ref
	//@@@PDC-7899 add biospecimen_laterality
	/**
	* ModelUICase is used in uiCase query.
	*/
	const ModelUICase = db.getSequelize().define('dummy', {
		aliquot_id: { type: Sequelize.STRING},
		sample_id:  { type: Sequelize.STRING},
		case_id:  { type: Sequelize.STRING},
		case_is_ref: { type: Sequelize.STRING },
		aliquot_submitter_id: { type: Sequelize.STRING},
		aliquot_is_ref: { type: Sequelize.STRING },
		aliquot_status:  { type: Sequelize.STRING},
		aliquot_quantity:  { type: Sequelize.STRING},
		aliquot_volume:  { type: Sequelize.STRING},
		amount:  { type: Sequelize.STRING},
		analyte_type:  { type: Sequelize.STRING},
		concentration:  { type: Sequelize.STRING},
		case_status:  { type: Sequelize.STRING},
		sample_status:  { type: Sequelize.STRING},
		sample_submitter_id:  { type: Sequelize.STRING},
		sample_is_ref:  { type: Sequelize.STRING},
		biospecimen_anatomic_site:  { type: Sequelize.STRING},
		biospecimen_laterality:  { type: Sequelize.STRING},
		composition:  { type: Sequelize.STRING},
		current_weight:  { type: Sequelize.STRING},
		days_to_collection:  { type: Sequelize.STRING},
		days_to_sample_procurement:  { type: Sequelize.STRING},
		diagnosis_pathologically_confirmed:  { type: Sequelize.STRING},
		freezing_method:  { type: Sequelize.STRING},
		initial_weight :  { type: Sequelize.STRING},
		intermediate_dimension:  { type: Sequelize.STRING},
		tissue_collection_type :  { type: Sequelize.STRING},
		sample_ordinal:  { type: Sequelize.STRING},
		longest_dimension:  { type: Sequelize.STRING},
		method_of_sample_procurement:  { type: Sequelize.STRING},
		pathology_report_uuid:  { type: Sequelize.STRING},
		preservation_method:  { type: Sequelize.STRING},
		sample_type_id:  { type: Sequelize.STRING},
		shortest_dimension:  { type: Sequelize.STRING},
		time_between_clamping_and_freezing:  { type: Sequelize.STRING},
		time_between_excision_and_freezing:  { type: Sequelize.STRING},
		tissue_type:  { type: Sequelize.STRING},
		tumor_code:  { type: Sequelize.STRING},
		tumor_code_id:  { type: Sequelize.STRING},
		tumor_descriptor:  { type: Sequelize.STRING},
		case_submitter_id:  { type: Sequelize.STRING},
		external_case_id:  { type: Sequelize.STRING},
		program_name:  { type: Sequelize.STRING},
		project_name:  { type: Sequelize.STRING},
		disease_type:  { type: Sequelize.STRING},
		primary_site:  { type: Sequelize.STRING},
		sample_type:  { type: Sequelize.STRING},
		pool:  { type: Sequelize.STRING},
		taxon:  { type: Sequelize.STRING},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUICase.removeAttribute('id');
	
	//@@@PDC-255 API for UI clinical tab 
	//@@@PDC-462 add submitter ids
	//@@@PDC-759 add case summary fields
	//@@@PDC-893 add case status			
	//@@@PDC-1011 replace gdc_case_id with external_case_id
	//@@@PDC-1234 add imaging_resource
	//@@@PDC-1237 add age_at_diagnosis et al
	//@@@PDC-1599 add all demographic and diagnosis data
	//@@@PDC-3266 add icd_10_code and synchronous_malignancy
    //@@@PDC-3428 add tumor_largest_dimension_diameter
	//@@@PDC-4391 add new columns
	//@@@PDC-5205 add auxiliary_data and tumor_cell_content
	/**
	* ModelUIClinical is used in uiClinical query.
	*/
	const ModelUIClinical = db.getSequelize().define('dummy', {
		case_id: { type: Sequelize.STRING},
		case_submitter_id: { type: Sequelize.STRING},
		status: { type: Sequelize.STRING},
		external_case_id: { type: Sequelize.STRING},
		program_name: { type: Sequelize.STRING},
		project_name: { type: Sequelize.STRING},
		disease_type: { type: Sequelize.STRING},
		primary_site: { type: Sequelize.STRING},
		consent_type: { type: Sequelize.STRING },
		days_to_consent: { type: Sequelize.STRING },
		demographic_id: { type: Sequelize.STRING},
		demographic_submitter_id: { type: Sequelize.STRING},   
		ethnicity: { type: Sequelize.STRING},
		gender: { type: Sequelize.STRING},
		race: { type: Sequelize.STRING},
		cause_of_death: { type: Sequelize.STRING}, 
		days_to_birth: { type: Sequelize.STRING}, 
		days_to_death: { type: Sequelize.STRING}, 
		vital_status: { type: Sequelize.STRING}, 
		year_of_birth: { type: Sequelize.STRING}, 
		year_of_death: { type: Sequelize.STRING},
		age_at_index: { type: Sequelize.STRING },
		premature_at_birth: { type: Sequelize.STRING },
		weeks_gestation_at_birth: { type: Sequelize.STRING },
		age_is_obfuscated: { type: Sequelize.STRING },
		cause_of_death_source: { type: Sequelize.STRING },
		occupation_duration_years: { type: Sequelize.STRING },
		country_of_residence_at_enrollment: { type: Sequelize.STRING },	
		diagnosis_id: { type: Sequelize.STRING},
		diagnosis_submitter_id: { type: Sequelize.STRING}, 
		age_at_diagnosis: { type: Sequelize.STRING}, 
		classification_of_tumor: { type: Sequelize.STRING}, 
		days_to_last_follow_up: { type: Sequelize.STRING}, 
		days_to_last_known_disease_status: { type: Sequelize.STRING}, 
		days_to_recurrence: { type: Sequelize.STRING}, 
		last_known_disease_status: { type: Sequelize.STRING}, 
		morphology: { type: Sequelize.STRING}, 
		primary_diagnosis: { type: Sequelize.STRING}, 
		progression_or_recurrence: { type: Sequelize.STRING}, 
		site_of_resection_or_biopsy: { type: Sequelize.STRING}, 
		tissue_or_organ_of_origin: { type: Sequelize.STRING}, 
		tumor_grade: { type: Sequelize.STRING}, 
		tumor_stage: { type: Sequelize.STRING}, 
   	    tumor_largest_dimension_diameter : { type: Sequelize.STRING },
		vital_status: { type: Sequelize.STRING}, 
		tumor_cell_content: { type: Sequelize.STRING}, 
		prior_malignancy: { type: Sequelize.STRING}, 
		ajcc_clinical_m: { type: Sequelize.STRING}, 
		ajcc_clinical_n: { type: Sequelize.STRING}, 
		ajcc_clinical_stage: { type: Sequelize.STRING}, 
		ajcc_clinical_t: { type: Sequelize.STRING}, 
		ajcc_pathologic_m: { type: Sequelize.STRING}, 
		ajcc_pathologic_n: { type: Sequelize.STRING}, 
		ajcc_pathologic_stage: { type: Sequelize.STRING}, 
		ajcc_pathologic_t: { type: Sequelize.STRING}, 
		ajcc_staging_system_edition: { type: Sequelize.STRING },
		ann_arbor_b_symptoms: { type: Sequelize.STRING}, 
		ann_arbor_clinical_stage: { type: Sequelize.STRING}, 
		ann_arbor_extranodal_involvement: { type: Sequelize.STRING}, 
		ann_arbor_pathologic_stage: { type: Sequelize.STRING}, 
		best_overall_response: { type: Sequelize.STRING}, 
		burkitt_lymphoma_clinical_variant: { type: Sequelize.STRING}, 
		cause_of_death: { type: Sequelize.STRING}, 
		circumferential_resection_margin: { type: Sequelize.STRING}, 
		colon_polyps_history: { type: Sequelize.STRING}, 
		days_to_best_overall_response: { type: Sequelize.STRING}, 
		days_to_diagnosis: { type: Sequelize.STRING}, 
		days_to_hiv_diagnosis: { type: Sequelize.STRING}, 
		days_to_new_event: { type: Sequelize.STRING}, 
		figo_stage: { type: Sequelize.STRING}, 
		hiv_positive: { type: Sequelize.STRING}, 
		hpv_positive_type: { type: Sequelize.STRING}, 
		hpv_status: { type: Sequelize.STRING}, 
		iss_stage: { type: Sequelize.STRING}, 
		laterality: { type: Sequelize.STRING}, 
		ldh_level_at_diagnosis: { type: Sequelize.STRING}, 
		ldh_normal_range_upper: { type: Sequelize.STRING}, 
		lymph_nodes_positive: { type: Sequelize.STRING}, 
		lymphatic_invasion_present: { type: Sequelize.STRING}, 
		method_of_diagnosis: { type: Sequelize.STRING}, 
		new_event_anatomic_site: { type: Sequelize.STRING}, 
		new_event_type: { type: Sequelize.STRING}, 
		overall_survival: { type: Sequelize.STRING}, 
		perineural_invasion_present: { type: Sequelize.STRING}, 
		prior_treatment: { type: Sequelize.STRING}, 
		progression_free_survival: { type: Sequelize.STRING}, 
		progression_free_survival_event: { type: Sequelize.STRING}, 
		residual_disease: { type: Sequelize.STRING}, 
		vascular_invasion_present: { type: Sequelize.STRING}, 
		year_of_diagnosis: { type: Sequelize.STRING}, 
    	icd_10_code: { type: Sequelize.STRING },
		synchronous_malignancy: { type: Sequelize.STRING },
		anaplasia_present: { type: Sequelize.STRING },
		anaplasia_present_type: { type: Sequelize.STRING },
		child_pugh_classification: { type: Sequelize.STRING },
		cog_liver_stage: { type: Sequelize.STRING },
		cog_neuroblastoma_risk_group: { type: Sequelize.STRING },
		cog_renal_stage: { type: Sequelize.STRING },
		cog_rhabdomyosarcoma_risk_group: { type: Sequelize.STRING },
		enneking_msts_grade: { type: Sequelize.STRING },
		enneking_msts_metastasis: { type: Sequelize.STRING },
		enneking_msts_stage: { type: Sequelize.STRING },
		enneking_msts_tumor_site: { type: Sequelize.STRING },
		esophageal_columnar_dysplasia_degree: { type: Sequelize.STRING },
		esophageal_columnar_metaplasia_present: { type: Sequelize.STRING },
		first_symptom_prior_to_diagnosis: { type: Sequelize.STRING },
		gastric_esophageal_junction_involvement: { type: Sequelize.STRING },
		goblet_cells_columnar_mucosa_present: { type: Sequelize.STRING },
		gross_tumor_weight: { type: Sequelize.STRING },
		inpc_grade: { type: Sequelize.STRING },
		inpc_histologic_group: { type: Sequelize.STRING },
		inrg_stage: { type: Sequelize.STRING },
		inss_stage: { type: Sequelize.STRING },
		irs_group: { type: Sequelize.STRING },
		irs_stage: { type: Sequelize.STRING },
		ishak_fibrosis_score: { type: Sequelize.STRING },
		lymph_nodes_tested: { type: Sequelize.STRING },
		medulloblastoma_molecular_classification: { type: Sequelize.STRING },
		metastasis_at_diagnosis: { type: Sequelize.STRING },
		metastasis_at_diagnosis_site: { type: Sequelize.STRING },
		mitosis_karyorrhexis_index: { type: Sequelize.STRING },
		peripancreatic_lymph_nodes_positive: { type: Sequelize.STRING },
		peripancreatic_lymph_nodes_tested: { type: Sequelize.STRING },
		supratentorial_localization: { type: Sequelize.STRING },
		tumor_confined_to_organ_of_origin: { type: Sequelize.STRING },
		tumor_focality: { type: Sequelize.STRING },
		tumor_regression_grade: { type: Sequelize.STRING },
		vascular_invasion_type: { type: Sequelize.STRING },
		wilms_tumor_histologic_subtype: { type: Sequelize.STRING },
		breslow_thickness: { type: Sequelize.STRING },
		gleason_grade_group: { type: Sequelize.STRING },
		igcccg_stage: { type: Sequelize.STRING },
		international_prognostic_index: { type: Sequelize.STRING },
		largest_extrapelvic_peritoneal_focus: { type: Sequelize.STRING },
		masaoka_stage: { type: Sequelize.STRING },
		non_nodal_regional_disease: { type: Sequelize.STRING },
		non_nodal_tumor_deposits: { type: Sequelize.STRING },
		ovarian_specimen_status: { type: Sequelize.STRING },
		ovarian_surface_involvement: { type: Sequelize.STRING },
		percent_tumor_invasion: { type: Sequelize.STRING },
		peritoneal_fluid_cytological_status: { type: Sequelize.STRING },
		primary_gleason_grade: { type: Sequelize.STRING },
		secondary_gleason_grade: { type: Sequelize.STRING },
		weiss_assessment_score: { type: Sequelize.STRING },
		adrenal_hormone: { type: Sequelize.STRING },
		ann_arbor_b_symptoms_described: { type: Sequelize.STRING },
		diagnosis_is_primary_disease: { type: Sequelize.STRING },
		eln_risk_classification: { type: Sequelize.STRING },
		figo_staging_edition_year: { type: Sequelize.STRING },
		gleason_grade_tertiary: { type: Sequelize.STRING },
		gleason_patterns_percent: { type: Sequelize.STRING },
		margin_distance: { type: Sequelize.STRING },
		margins_involved_site: { type: Sequelize.STRING },
		pregnant_at_diagnosis: { type: Sequelize.STRING },
		satellite_nodule_present: { type: Sequelize.STRING },
		sites_of_involvement: { type: Sequelize.STRING },
		tumor_depth: { type: Sequelize.STRING },
		who_cns_grade: { type: Sequelize.STRING },
		tumor_cell_content: { type: Sequelize.STRING },
		auxiliary_data: { type: Sequelize.STRING },
		who_nte_grade: { type: Sequelize.STRING },
		diagnosis_uuid: { type: Sequelize.STRING },
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIClinical.removeAttribute('id');
	
	//@@@PDC-199 UI file API
	//@@@PDC-774 add downloadable
	//@@@PDC-827 Add md5sum  and StudyId
	//@@@PDC-2815 add embargo_date to getPaginatedUIFile API
	//@@@PDC-3909 add data_source to getPaginatedUILegacyFile API
	//@@@PDC-6513 API for new pancancer publication page
	/**
	* ModelUIFile is used in uiFile query.
	*/
	const ModelUIFile = db.getSequelize().define('dummy', {
		file_id: { type: Sequelize.STRING},
		study_id: { type: Sequelize.STRING},
		pdc_study_id: { type: Sequelize.STRING },
		submitter_id_name: { type: Sequelize.STRING},
		embargo_date: { type: Sequelize.DATE },
		file_name:  { type: Sequelize.STRING},
		study_run_metadata_submitter_id:  { type: Sequelize.STRING},
		project_name:  { type: Sequelize.STRING},
		data_source: { type: Sequelize.STRING},
		data_category: { type: Sequelize.STRING},
		file_type:  { type: Sequelize.STRING},
		downloadable: { type: Sequelize.STRING },
		access: { type: Sequelize.STRING},
		md5sum: { type: Sequelize.STRING},
		file_size:  { type: Sequelize.STRING},
		annotation:  { type: Sequelize.STRING},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIFile.removeAttribute('id');
	
	//@@@PDC-579 gene tabe pagination
	//@@@PDC-7629 add gene_id and ncbi_gene_id to output
	const ModelUIGene = db.getSequelize().define('dummy', {
		gene_name: { type: Sequelize.STRING},
		gene_id: { type: Sequelize.STRING},
		ncbi_gene_id: { type: Sequelize.STRING},
		chromosome:  { type: Sequelize.STRING},
		locus:  { type: Sequelize.STRING},
		num_study:  { type: Sequelize.INTEGER},
		proteins:  { type: Sequelize.STRING},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIFile.removeAttribute('id');
	
	//@@@PDC-1291 Redesign Browse Page data tabs
	const ModelUIGeneName = db.getSequelize().define('dummy', {
		gene_name:  { type: Sequelize.STRING},
		gene_id: { type: Sequelize.STRING},
		num_study: {type: Sequelize.INTEGER}
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIGeneName.removeAttribute('id');

	//@@@PDC-220 UI experiment type case count API
	//@@@PDC-265 API for UI analytical_fraction case count 
	//@@@PDC-1220 add uiPrimarySiteCaseCount	
	/**
	* ModelUIExperiment is used in uiExperimentBar query.
	*/
	const ModelUIExperiment = db.getSequelize().define('dummy', {
		experiment_type: { type: Sequelize.STRING},
		disease_type:  { type: Sequelize.STRING},
		analytical_fraction: { type: Sequelize.STRING},
		primary_site: { type: Sequelize.STRING},
		cases_count:  { type: Sequelize.INTEGER},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIExperiment.removeAttribute('id');
	
	//@@@PDC-607 Add uiSunburstChart API
	/**
	* ModelUISunburst is used in uiSunburstChart query.
	*/
	const ModelUISunburst = db.getSequelize().define('dummy', {
		project_submitter_id:  { type: Sequelize.STRING},
		tissue_or_organ_of_origin: { type: Sequelize.STRING},
		disease_type:  { type: Sequelize.STRING},
		sample_type: { type: Sequelize.STRING},
		cases_count:  { type: Sequelize.INTEGER},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUISunburst.removeAttribute('id');
	
	//@@@PDC-3162 get current data/software version
	const ModelUIVersion = db.getSequelize().define('dummy', {
		data_release: { type: Sequelize.STRING},
		build_tag:  { type: Sequelize.STRING},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIVersion.removeAttribute('id');

	//@@@PDC-136 server-side pagination 
	/**
	* ModelPagination is used in all paginated queries.
	*/
	const ModelPagination = db.getSequelize().define('dummy', {
		total:  { type: Sequelize.INTEGER},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelPagination.removeAttribute('id');
	
	//@@@PDC-273 API to retrieve publication data for PDC UI
	//@@@PDC-3446 new publication data for PDC UI
	//@@@PDC-3646 add program field for the program filter on PDC UI publication page
	//@@@PDC-5768 add group_name
	/**
	* ModelUIPublication is used in uiPublication query.
	*/
	const ModelUIPublication = db.getSequelize().define('publication', {
		publication_id: { type: Sequelize.STRING},
		program_name: { type: Sequelize.STRING},
		pubmed_id:  { type: Sequelize.STRING},
		group_name:  { type: Sequelize.STRING},
		title: { type: Sequelize.STRING},
		doi: { type: Sequelize.STRING},
		author: { type: Sequelize.STRING},
		title_legacy: { type: Sequelize.STRING},
		journal: { type: Sequelize.STRING},
		journal_url: { type: Sequelize.STRING},
		year: { type: Sequelize.STRING},
		abstract: { type: Sequelize.STRING},
		citation: { type: Sequelize.STRING},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'publication'	
	});
	ModelUIPublication.removeAttribute('id');
	
	//@@@PDC-311 case-level file counts
	//@@@PDC-337 add study name to file count table
	//@@@PDC-759 add data_category to file count group
	/**
	* ModelUIFileCount is a utility and used in 
	*   uiExperimentFileCount and uiDataCategoryFileCount queries.
	*/
	const ModelUIFileCount = db.getSequelize().define('dummy', {
		acquisition_type: { type: Sequelize.STRING },
		submitter_id_name: { type: Sequelize.STRING },
		experiment_type: { type: Sequelize.STRING },
		file_type: { type: Sequelize.STRING },
		data_category: { type: Sequelize.STRING },
		files_count: { type: Sequelize.INTEGER },
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIFileCount.removeAttribute('id');
	
	//@@@PDC-307 APIs for UI gene/protein summary page
	//@@@PDC-415 get aliquot label
	//@@@PDC-564 add gene abundance data
	//@@@PDC-669 gene_abundance table change
	/**
	* ModelUIGeneStudySpectralCount is a utility and used in 
	*   uiGeneStudySpectralCount and uiGeneAliquotSpectralCount queries.
	*/
	const ModelUIGeneStudySpectralCount = db.getSequelize().define('dummy', {
		study_submitter_id: { type: Sequelize.STRING },
		pdc_study_id: { type: Sequelize.STRING },
		submitter_id_name: { type: Sequelize.STRING },
		experiment_type: { type: Sequelize.STRING },
		aliquot_id: { type: Sequelize.STRING },
		plex: { type: Sequelize.STRING },
		label: { type: Sequelize.STRING },
		spectral_count: { type: Sequelize.INTEGER },
		distinct_peptide: { type: Sequelize.INTEGER },
		unshared_peptide: { type: Sequelize.INTEGER },
		precursor_area: { type: Sequelize.STRING },
		log2_ratio: { type: Sequelize.STRING },
		unshared_precursor_area: { type: Sequelize.STRING },
		unshared_log2_ratio: { type: Sequelize.STRING },
		aliquots_count: { type: Sequelize.INTEGER },
		plexes_count: { type: Sequelize.INTEGER },
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelUIGeneStudySpectralCount.removeAttribute('id');
	
	//@@@PDC-681 ui ptm data API
	//@@@PDC-3171 new ptm abundance tables
	/**
	* ModelUIPtm is used in uiPtm query.
	*/
	const ModelUIPtm = db.getSequelize().define('ptm_abundance', {
		gene_name: { type: Sequelize.STRING},
		ptm_type: { type: Sequelize.STRING},
		site:  { type: Sequelize.STRING},
		peptide: { type: Sequelize.STRING},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'ptm_abundance'	
	});
	ModelUIPtm.removeAttribute('id');

	const ModelFilterStudy = db.getSequelize().define('dummy', {
		study_submitter_id:  { type: Sequelize.STRING},
		pdc_study_id: { type: Sequelize.STRING },
		study_id: {type: Sequelize.STRING}
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelFilterStudy.removeAttribute('id');

	const ModelFilterProgProj = db.getSequelize().define('dummy', {
		study_submitter_id: { type: Sequelize.STRING},
		pdc_study_id: { type: Sequelize.STRING },
		submitter_id_name: { type: Sequelize.STRING},
		acquisition_type: { type: Sequelize.STRING},
		analytical_fraction:  { type: Sequelize.STRING},
		experiment_type:  { type: Sequelize.STRING},
		program_name:  { type: Sequelize.STRING},
		project_name:  { type: Sequelize.STRING}
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelFilterProgProj.removeAttribute('id');

	const ModelFilterFile = db.getSequelize().define('dummy', {
		study_submitter_id: { type: Sequelize.STRING},
		pdc_study_id: { type: Sequelize.STRING },
		submitter_id_name: { type: Sequelize.STRING},
		acquisition_type: { type: Sequelize.STRING},
		analytical_fraction:  { type: Sequelize.STRING},
		experiment_type:  { type: Sequelize.STRING},
		data_category:  { type: Sequelize.STRING},
		file_type: { type: Sequelize.STRING},
		downloadable: { type: Sequelize.STRING },
		access: { type: Sequelize.STRING}
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelFilterFile.removeAttribute('id');

	const ModelFilterAlSamCaDemDia = db.getSequelize().define('dummy', {
		study_submitter_id: { type: Sequelize.STRING},
		pdc_study_id: { type: Sequelize.STRING },
		submitter_id_name: { type: Sequelize.STRING},
		acquisition_type: { type: Sequelize.STRING},
		analytical_fraction:  { type: Sequelize.STRING},
		experiment_type:  { type: Sequelize.STRING},
		biospecimen_status: { type: Sequelize.STRING},
		sample_type:  { type: Sequelize.STRING},
		disease_type:  { type: Sequelize.STRING},
		primary_site:  { type: Sequelize.STRING},
		case_status: { type: Sequelize.STRING},
		ethnicity:  { type: Sequelize.STRING},
		race:  { type: Sequelize.STRING},
		gender:  { type: Sequelize.STRING},
		morphology:  { type: Sequelize.STRING},
		primary_diagnosis:  { type: Sequelize.STRING},
		site_of_resection_or_biopsy:  { type: Sequelize.STRING},
		tissue_or_organ_of_origin:  { type: Sequelize.STRING},
		tumor_grade:  { type: Sequelize.STRING},
		tumor_stage:  { type: Sequelize.STRING}
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelFilterAlSamCaDemDia.removeAttribute('id');

	const ModelFilterProgProjAlSamCaDemDia = db.getSequelize().define('dummy', {
		study_submitter_id: { type: Sequelize.STRING},
		pdc_study_id: { type: Sequelize.STRING },
		submitter_id_name: { type: Sequelize.STRING},
		acquisition_type: { type: Sequelize.STRING},
		analytical_fraction:  { type: Sequelize.STRING},
		experiment_type:  { type: Sequelize.STRING},
		program_name:  { type: Sequelize.STRING},
		project_name:  { type: Sequelize.STRING},
		biospecimen_status: { type: Sequelize.STRING},
		sample_type:  { type: Sequelize.STRING},
		disease_type:  { type: Sequelize.STRING},
		primary_site:  { type: Sequelize.STRING},
		case_status: { type: Sequelize.STRING},
		ethnicity:  { type: Sequelize.STRING},
		race:  { type: Sequelize.STRING},
		gender:  { type: Sequelize.STRING},
		morphology:  { type: Sequelize.STRING},
		primary_diagnosis:  { type: Sequelize.STRING},
		site_of_resection_or_biopsy:  { type: Sequelize.STRING},
		tissue_or_organ_of_origin:  { type: Sequelize.STRING},
		tumor_grade:  { type: Sequelize.STRING},
		tumor_stage:  { type: Sequelize.STRING}		
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelFilterProgProjAlSamCaDemDia.removeAttribute('id');

	//@@@PDC-2020 use major primary site
	const ModelHumanBody = db.getSequelize().define('dummy', {
		major_primary_site:  { type: Sequelize.STRING},
		cases_count: { type: Sequelize.INTEGER},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelHumanBody.removeAttribute('id');
	
	//@@@PDC-2167 group files by data source
	//@@@PDC-3839 get current version of study
	const ModelStudyFileSource = db.getSequelize().define('dummy', {
		study_id:  { type: Sequelize.STRING},
		study_submitter_id:  { type: Sequelize.STRING},
		pdc_study_id:  { type: Sequelize.STRING},
		data_source:  { type: Sequelize.STRING},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'dummy'	
	});
	ModelStudyFileSource.removeAttribute('id');

	db['ModelUIStudy'] = ModelUIStudy;
	db['ModelUIFilter'] = ModelUIFilter;
	db['ModelUICount'] = ModelUICount;	
	db['ModelUICase'] = ModelUICase;
	db['ModelUIClinical'] = ModelUIClinical;
	db['ModelUIFile'] = ModelUIFile;	
	db['ModelUIGene'] = ModelUIGene;
	db['ModelUIGeneName'] = ModelUIGeneName;
	db['ModelUIExperiment'] = ModelUIExperiment;
	db['ModelPagination'] = ModelPagination;		
	db['ModelUIPublication'] = ModelUIPublication;	
	db['ModelUIFileCount'] = ModelUIFileCount;
	db['ModelUIGeneStudySpectralCount'] = ModelUIGeneStudySpectralCount;
	db['ModelUISunburst'] = ModelUISunburst;	
	db['ModelUIVersion'] = ModelUIVersion;	
	db['ModelUIPtm'] = ModelUIPtm;		
	db['ModelFilterStudy'] = ModelFilterStudy;		
	db['ModelFilterProgProj'] = ModelFilterProgProj;
	db['ModelFilterFile'] = ModelFilterFile;
	db['ModelFilterAlSamCaDemDia'] = ModelFilterAlSamCaDemDia;
	db['ModelFilterProgProjAlSamCaDemDia'] = ModelFilterProgProjAlSamCaDemDia;
	db['ModelHumanBody'] = ModelHumanBody;
	db['ModelStudyFileSource'] = ModelStudyFileSource;
};

export { defineUiModels };
