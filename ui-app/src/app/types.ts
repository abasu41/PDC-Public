//This page provides types definitions for qraphql queries

// @@@PDC-210

export type PortalStats = {
	program: number;
	protein: number;
	project: number;
	peptide: number;
	data_size: number;
	data_label: string;
	data_file: number;
	study: number;
	spectra: number;
};
export type QueryPortalStats = {
	pdcPortalStats: PortalStats[];
};

export type TissueSite = {
  project_submitter_id: string;
  tissue_or_organ_of_origin: string;
  cases_count: number;
}

export type QueryTissueSites = {
	tissueSitesAvailable: TissueSite[];

}

export type Disease = {
	disease_type: string;
    tissue_or_organ_of_origin: string;
	project_submitter_id: string;
	cases_count: number;
}
//@@@PDC-1123 add ui wrappers public APIs
export type QueryDiseases = {
	uiDiseasesAvailable: Disease[];
}

export type Study = {
	study_id: string;
	submitter_id_name: string;
	study_submitter_id: string;
	analytical_fraction: string;
	experiment_type: string;
	acquisition_type: string;
}

export type Project = {
	project_id: string;
	project_submitter_id: string;
	name: string;
	studies: Study[];
}

export type Program = {
	program_id: string;
	program_submiter_id: string;
    name: string;
    sponsor: string;
    start_date: string;
    end_date: string;
    program_manager: string;
    projects: Project[];
}
//@@@PDC-1123 add ui wrappers public APIs
export type QueryPrograms = {
	uiAllPrograms: Program[];
}

export type Case = {
	case_id: string;
	project_submitter_id: string;
	external_case_id: string;
}

export type QueryCases = {
	allCases: Case[];
}

export type CaseCount = {
	disease_type: string;
    count: number;
}
export type DiseaseType = {
	project_submitter_id: string;
    experiment_type: string;
    analytical_fraction: string;
    cases: CaseCount[];
}

export type DiseaseTypeQuery = {
	diseasesTypes: DiseaseType[];
}

export type ExperimentTypeCount = {
	experiment_type: string;
	count: number;
}

export interface AnalyticFractionCount  {
	analytical_fraction: string;
	count: number;
}

//@@@PDC-1358 add study_id (uuid) to study summary page
//@@@PDC-2378 add supplimentary data to study summary
export type AllStudiesData = {
	study_id: string;
	pdc_study_id: string;
	study_submitter_id: string;
	submitter_id_name: string;
	program_name: string;
	project_name: string;
	disease_type: string;
	primary_site: string;
	analytical_fraction: string;
	experiment_type: string;
	cases_count: number;
	aliquots_count: number;
	study_description: string;
	embargo_date: string;
	filesCount: FileCountsForStudyPage[];
	supplementaryFilesCount: FileCountsForStudyPage[];
	nonSupplementaryFilesCount: FileCountsForStudyPage[];
	contacts: ContactDataForStudyPage[];
	versions: studyVersions[];
}

export type FileCountsForStudyPage = {
	file_type: string;
	data_category: string;
	files_count: number
}

//@@@PDC-2436 - Update study summary screen to add contact details
export type ContactDataForStudyPage = {
	name: string;
	institution: string;
	email: string;
	url: string;
}

//@@@PDC-2939 update study summary page to display other versions
export type studyVersions = {
	number: string;
}

//export type QueryAllCasesData = {
export type QueryAllStudiesData = {
	allStudiesData: AllStudiesData[];
}

//@@@PDC-535 New filters for browse page
//@@@PDC-567 add sample_type field
export type FilterData = {
	project_name : FilterElement[];
  primary_site : FilterElement[];
  program_name : FilterElement[];
  disease_type : FilterElement[];
  analytical_fraction : FilterElement[];
  experiment_type : FilterElement[];
  acquisition_type : FilterElement[];
  submitter_id_name : FilterElement[];
  sample_type : FilterElement[];
  ethnicity : FilterElement[];
  race : FilterElement[];
  gender : FilterElement[];
  tumor_grade : FilterElement[];
  data_category : FilterElement[];
  file_type : FilterElement[];
  access : FilterElement[];
  downloadable: FilterElement[];
  biospecimen_status: FilterElement[];
  case_status: FilterElement[];
}

export type FilterElement = {
	filterName : string;
	filterValue : string[];
}

export type QueryAllFiltersData = {
	allFiltersData: FilterData[];
}

//@@@PDC-462 show submitter ids
export type AllCasesData = {
	aliquot_submitter_id: string;
	sample_submitter_id: string;
	case_id: string;
	case_submitter_id: string;
	project_name: string;
	program_name: string;
	sample_type: string;
	disease_type: string;
	primary_site: string;
}

export type QueryAllCasesData = {
	allCasesData: AllCasesData[];
}


//@@@PDC-2795 Add embargo date to Files tab on Browse page and files manifest
export type AllFilesData = {
	file_id: string;
	submitter_id_name: string;
	embargo_date : string;
	file_name: string;
	pdc_study_id: string;
	study_run_metadata_submitter_id: string;
	project_name: string;
	data_category: string;
	file_type: string;
	access: string;
	file_size: string;
	downloadable: string;
	biospecimen_status: string;
	case_status: string;
}
//@@@PDC-232
//@@@PDC-462 show submitter ids
//@@@PDC-2397 Update clinical manifest generation to include additional attributes
export type AllClinicalData = {
	case_submitter_id: string;
	case_id: string;
	external_case_id: string;
	ethnicity: string;
	gender: string;
	race: string;
	morphology: string;
	primary_diagnosis: string;
	site_of_resection_or_biopsy: string;
	tissue_or_organ_of_origin: string;
	tumor_grade: string;
	tumor_stage: string;
	status: string;
	disease_type: string;
	primary_site: string;
	program_name: string;
	project_name: string;
	cause_of_death: string;
	days_to_birth: string;
	days_to_death: string;
	vital_status: string;
	year_of_birth: string;
	year_of_death: string;
	age_at_diagnosis: string;
	classification_of_tumor: string;
	days_to_last_follow_up: string;
	days_to_last_known_disease_status: string;
	days_to_recurrence: string;
	last_known_disease_status: string;
	progression_or_recurrence: string;
	prior_malignancy: string;
	ajcc_clinical_m: string;
	ajcc_clinical_n: string;
	ajcc_clinical_stage: string;
	ajcc_clinical_t: string;
	ajcc_pathologic_m: string;
	ajcc_pathologic_n: string;
	ajcc_pathologic_stage: string;
	ajcc_pathologic_t: string;
	ajcc_staging_system_edition: string;
	ann_arbor_b_symptoms: string;
	ann_arbor_clinical_stage: string;
	ann_arbor_extranodal_involvement: string;
	ann_arbor_pathologic_stage: string;
	best_overall_response: string;
	burkitt_lymphoma_clinical_variant: string;
	circumferential_resection_margin: string;
	colon_polyps_history: string;
	days_to_best_overall_response: string;
	days_to_diagnosis: string;
	days_to_hiv_diagnosis: string;
	days_to_new_event: string;
	figo_stage: string;
	hiv_positive: string;
	hpv_positive_type: string;
	hpv_status: string;
	iss_stage: string;
	laterality: string;
	ldh_level_at_diagnosis: string;
	ldh_normal_range_upper: string;
	lymph_nodes_positive: string;
	lymphatic_invasion_present: string;
	method_of_diagnosis: string;
	new_event_anatomic_site: string;
	new_event_type: string;
	overall_survival: string;
	perineural_invasion_present: string;
	prior_treatment: string;
	progression_free_survival: string;
	progression_free_survival_event: string;
	residual_disease: string;
	vascular_invasion_present: string;
	year_of_diagnosis: string;
	age_at_index: string;
	premature_at_birth: string;
	weeks_gestation_at_birth: string;
	age_is_obfuscated: string;
	cause_of_death_source: string;
	occupation_duration_years: string;
	country_of_residence_at_enrollment: string;
	icd_10_code: string;
	synchronous_malignancy: string;
	anaplasia_present: string;
	anaplasia_present_type: string;
	child_pugh_classification: string;
	cog_liver_stage: string;
	cog_neuroblastoma_risk_group: string;
	cog_renal_stage: string;
	cog_rhabdomyosarcoma_risk_group: string;
	enneking_msts_grade: string;
	enneking_msts_metastasis: string;
	enneking_msts_stage: string;
	enneking_msts_tumor_site: string;
	esophageal_columnar_dysplasia_degree: string;
	esophageal_columnar_metaplasia_present: string;
	first_symptom_prior_to_diagnosis: string;
	gastric_esophageal_junction_involvement: string;
	goblet_cells_columnar_mucosa_present: string;
	gross_tumor_weight: string;
	inpc_grade: string;
	inpc_histologic_group: string;
	inrg_stage: string;
	inss_stage: string;
	irs_group: string;
	irs_stage: string;
	ishak_fibrosis_score: string;
	lymph_nodes_tested: string;
	medulloblastoma_molecular_classification: string;
	metastasis_at_diagnosis: string;
	metastasis_at_diagnosis_site: string;
	mitosis_karyorrhexis_index: string;
	peripancreatic_lymph_nodes_positive: string;
	peripancreatic_lymph_nodes_tested: string;
	supratentorial_localization: string;
	tumor_confined_to_organ_of_origin: string;
	tumor_focality: string;
	tumor_regression_grade: string;
	vascular_invasion_type: string;
	wilms_tumor_histologic_subtype: string;
	breslow_thickness: string;
	gleason_grade_group: string;
	igcccg_stage: string;
	international_prognostic_index: string;
	largest_extrapelvic_peritoneal_focus: string;
	masaoka_stage: string;
	non_nodal_regional_disease: string;
	non_nodal_tumor_deposits: string;
	ovarian_specimen_status: string;
	ovarian_surface_involvement: string;
	percent_tumor_invasion: string;
	peritoneal_fluid_cytological_status: string;
	primary_gleason_grade: string;
	secondary_gleason_grade: string;
	weiss_assessment_score: string;
	adrenal_hormone: string;
	ann_arbor_b_symptoms_described: string;
	diagnosis_is_primary_disease: string;
	eln_risk_classification: string;
	figo_staging_edition_year: string;
	gleason_grade_tertiary: string;
	gleason_patterns_percent: string;
	margin_distance: string;
	margins_involved_site: string;
	pregnant_at_diagnosis: string;
	satellite_nodule_present: string;
	sites_of_involvement: string;
	tumor_depth: string;
	who_cns_grade: string;
	who_nte_grade: string;
	diagnosis_uuid: string;
	externalReferences: ExternalReferences[];
	exposures: Exposures[];
	follow_ups: FollowUps[];
}

export type ExternalReferences = {
	reference_resource_shortname: string;
	reference_entity_location: string;
}

//@@@PDC-4260: Update clinical manifest to include new clinical data fields
export type Exposures = {
	case_id: string;
	case_submitter_id: string;
	exposure_id: string;
	exposure_submitter_id: string;
	alcohol_days_per_week: string;
	alcohol_drinks_per_day: string;
	alcohol_history: string;
	alcohol_intensity: string;
	asbestos_exposure: string;
	bmi: string;
	cigarettes_per_day: string;
	coal_dust_exposure: string;
	environmental_tobacco_smoke_exposure: string;
	height: string;
	pack_years_smoked: string;
	radon_exposure: string;
	respirable_crystalline_silica_exposure: string;
	smoking_frequency: string;
	time_between_waking_and_first_smoke: string;
	tobacco_smoking_onset_year: string;
	tobacco_smoking_quit_year: string;
	tobacco_smoking_status: string;
	type_of_smoke_exposure: string;
	type_of_tobacco_used: string;
	weight: string;
	years_smoked: string;
	age_at_onset: string;
	alcohol_type: string;
	exposure_duration: string;
	exposure_duration_years: string;
	exposure_type: string;
	marijuana_use_per_week: string;
	parent_with_radiation_exposure: string;
	secondhand_smoke_as_child: string;
	smokeless_tobacco_quit_age: string;
	tobacco_use_per_day: string;
}

//@@@PDC-4490: Update Clinical manifest and Case summary pages for GDC Sync
export type FollowUps = {
	follow_up_id: string;
	follow_up_submitter_id: string;
	adverse_event: string;
	barretts_esophagus_goblet_cells_present: string;
	bmi: string;
	cause_of_response: string;
	comorbidity: string;
	comorbidity_method_of_diagnosis: string;
	days_to_adverse_event: string;
	days_to_comorbidity: string;
	days_to_follow_up: string;
	days_to_progression: string;
	days_to_progression_free: string;
	days_to_recurrence: string;
	diabetes_treatment_type: string;
	disease_response: string;
	dlco_ref_predictive_percent: string;
	ecog_performance_status: string;
	fev1_ref_post_bronch_percent: string;
	fev1_ref_pre_bronch_percent: string;
	fev1_fvc_pre_bronch_percent: string;
	fev1_fvc_post_bronch_percent: string;
	height: string;
	hepatitis_sustained_virological_response: string;
	hpv_positive_type: string;
	karnofsky_performance_status: string;
	menopause_status: string;
	pancreatitis_onset_year: string;
	progression_or_recurrence: string;
	progression_or_recurrence_anatomic_site: string;
	progression_or_recurrence_type: string;
	reflux_treatment_type: string;
	risk_factor: string;
	risk_factor_treatment: string;
	viral_hepatitis_serologies: string;
	weight: string;
	adverse_event_grade: string;
	aids_risk_factors: string;
	body_surface_area: string;
	cd4_count: string;
	cdc_hiv_risk_factors: string;
	days_to_imaging: string;
	evidence_of_recurrence_type: string;
	eye_color: string;
	haart_treatment_indicator: string;
	history_of_tumor: string;
	history_of_tumor_type: string;
	hiv_viral_load: string;
	hormonal_contraceptive_type: string;
	hormonal_contraceptive_use: string;
	hormone_replacement_therapy_type: string;
	hysterectomy_margins_involved: string;
	hysterectomy_type: string;
	imaging_result: string;
	imaging_type: string;
	immunosuppressive_treatment_type: string;
	nadir_cd4_count: string;
	pregnancy_outcome: string;
	procedures_performed: string;
	recist_targeted_regions_number: string;
	recist_targeted_regions_sum: string;
	scan_tracer_used: string;
	undescended_testis_corrected: string;
	undescended_testis_corrected_age: string;
	undescended_testis_corrected_laterality: string;
	undescended_testis_corrected_method: string;
	undescended_testis_history: string;
	undescended_testis_history_laterality: string;
}

//@@@PDC-614 add gene data tab to browse page
//@@@PDC-7629 add gene_id and ncbi_gene_id
export type AllGeneData = {
	gene_name: string;
	gene_id: string;
	ncbi_gene_id: string;
    chromosome: string;
    locus: string;
    num_study: number;
	proteins: string;
}

export type QueryAllGeneDataPaginated = {
	allGenesData: AllGeneData[];
	total: number;
	pagination: Pagination;
}

export type QueryAllFilesData = {
	allFilesData: AllFilesData[];
}
//@@@PDC-379 add submitter_id_name
export type Filter = {
	filterName: string;
	filterCount: number;
}

//@@@PDC-237 - Pagination
export type Pagination = {
	count: number;
	sort: string;
	from: number;
	page: number;
	total: number;
	pages: number;
	size: number;
}

//@@@PDC-2399 Update biospecimen manifest generation to include new attributes
export type AllUICasesData = {
	aliquot_submitter_id: string;
	sample_submitter_id: string;
	case_id: string;
	case_submitter_id: string;
	project_name: string;
	program_name: string;
	sample_type: string;
	disease_type: string;
	primary_site: string;
	aliquot_id: string;
	sample_id: string;
	aliquot_is_ref: string;
	aliquot_status: string;
	aliquot_quantity: string;
	aliquot_volume: string;
	amount: string;
	analyte_type: string;
	concentration: string;
	case_status: string;
	sample_status: string;
	sample_is_ref: string;
	biospecimen_anatomic_site: string;
	composition: string;
	current_weight: string;
	days_to_collection: string;
	days_to_sample_procurement: string;
	diagnosis_pathologically_confirmed: string;
	freezing_method: string;
	initial_weight: string;
	intermediate_dimension: string;
	is_ffpe: string;
	longest_dimension: string;
	method_of_sample_procurement: string;
	oct_embedded: string;
	pathology_report_uuid: string;
	preservation_method: string;
	sample_type_id: string;
	shortest_dimension: string;
	time_between_clamping_and_freezing: string;
	time_between_excision_and_freezing: string;
	tissue_type: string;
	tumor_code: string;
	tumor_code_id: string;
	tumor_descriptor: string;
	tissue_collection_type: string;
	sample_ordinal: string;
}

export type QueryAllCasesDataPaginated = {
	total: number;
	allCasesData: AllUICasesData[];
	pagination: Pagination;
}

export type QueryAllFilesDataPaginated = {
	total: number;
	allFilesData: AllFilesData[];
	pagination: Pagination;
}
//@@@PDC-232
export type QueryAllClinicalDataPaginated = {
	total: number;
	allFilesData: AllClinicalData[];
	pagination: Pagination;
}

//@@@PDC-283
export type QueryAllStudyDataPaginated = {
	total: number;
	allStudyData: AllStudiesData[];
	pagination: Pagination;
}

//@@@PDC-230
export type WorkflowMetadata = {
	workflow_metadata_submitter_id: string;
	study_submitter_id: string;
	protocol_submitter_id: string;
	cptac_study_id: string;
	submitter_id_name: string;
	study_submitter_name: string;
	analytical_fraction: string;
	experiment_type: string;
	instrument: string;
	refseq_database_version: string;
	uniport_database_version: string;
	hgnc_version: string;
	raw_data_processing: string;
	raw_data_conversion: string;
	sequence_database_search: string;
	search_database_parameters: string;
	phosphosite_localization: string;
	ms1_data_analysis: string;
	psm_report_generation: string;
	cptac_dcc_mzidentml: string;
	mzidentml_refseq: string;
	mzidentml_uniprot: string;
	gene_to_prot: string;
	cptac_galaxy_workflows: string;
	cptac_galaxy_tools: string;
	cdap_reports: string;
	cptac_dcc_tools: string;
}

//@@@PDC-674 - UI changes to accomodate new protocol structure
export type ProtocolData = {
	protocol_id: string;
	protocol_submitter_id: string;
	program_id: string;
	program_submitter_id: string;
	protocol_name: string;
	protocol_date: string;
	document_name: string;
	quantitation_strategy: string;
	experiment_type: string;
	label_free_quantitation: string;
	labeled_quantitation: string;
	isobaric_labeling_reagent: string;
	reporter_ion_ms_level: string;
	starting_amount: string;
	starting_amount_uom: string;
	digestion_reagent: string;
	alkylation_reagent: string;
	enrichment_strategy: string;
	enrichment: string;
	chromatography_dimensions_count: string;
	one_d_chromatography_type: string;
	two_d_chromatography_type: string;
	fractions_analyzed_count: string;
	column_type: string;
	amount_on_column: string;
	amount_on_column_uom: string;
	column_length: string;
	column_length_uom: string;
	column_inner_diameter: string;
	column_inner_diameter_uom: string;
	particle_size: string;
	particle_size_uom: string;
	particle_type: string;
	gradient_length: string;
	gradient_length_uom: string;
	instrument_make: string;
	instrument_model: string;
	dissociation_type: string;
	ms1_resolution: string;
	ms2_resolution: string;
	dda_topn: string;
	normalized_collision_energy: string;
	acquistion_type: string;
	dia_multiplexing: string;
	dia_ims: string;
	auxiliary_data: string;
	cud_label: string;
}

export type PublicationData = {
	publication_id: string;
	pubmed_id: string;
	title: string;
}

export type QueryPublicationData = {
	publicationsData: PublicationData[];
}

//@@@PDC-3447 Add Publication page
export type publicationsStudyData = {
	study_id: string;
	pdc_study_id: string;
	submitter_id_name: string;
}

//@@@PDC-3646 - add program_name field for the program filter on publications page
export type PublicationsData = {
	publication_id: string;
	program_name: string;
	pubmed_id: string;
	doi: string;
	author: string;
	title: string;
	journal: string;
	journal_url: string;
	year: string;
	//abstract: string;
	citation: string;
	studies: publicationsStudyData[];
	disease_types: string[];
    supplementary_data: string[];
}

export type UIPublicationsData = {
	publication_id: string;
	program_name: string;
	pubmed_id: string;
	doi: string;
	author: string;
	title: string;
	journal: string;
	journal_url: string;
	year: string;
	//abstract: string;
	citation: string;
	studies: publicationsStudyData[];
	disease_types: string[];
    supplementary_data: string[];
	files: string[];
}

export type QueryPublicationsData = {
	total: number;
	uiPublication: PublicationsData;
	pagination: Pagination;
}

export type publicationsFiltersData = {
	disease_types: string[];
	years: string[];
	programs: string[];
}

//PDC-3547 Legacy studies
export type legacyStudyPublications = {
	publication_id: string;
	pubmed_id: string;
	doi: string;
	author: string;
	title: string;
	journal: string;
	journal_url: string;
	year: string;
	abstract: string;
	citation: string;
}
export type QueryLegacyStudies = {
	study_id: string;
	submitter_id_name: string;
	study_submitter_id: string;
	pdc_study_id: string;
	study_description: string;
	project_submitter_id: string;
	analytical_fraction: string;
	experiment_type: string;
	sort_order: number;
	embargo_date: string;
	supplementaryFilesCount: FileCountsForStudyPage[];
	nonSupplementaryFilesCount: FileCountsForStudyPage[];
	publications : legacyStudyPublications[];
}

export type FilesCountsPerStudyData = {
	study_submitter_id: string;
	file_type: string;
	files_count: number;
	data_category:string;
}


//PDC-3629 develop Heatmaps page
export type HeatmapsFiltersData = {
	filterCount: string;
	disease_types: string[];
	primary_sites: string[];
	analytical_fractions: string[];
}

export type QueryHeatmapsData = {
	study_id: string;
	study_submitter_id: string;
	submitter_id_name: string;
	pdc_study_id: string;
	study_description: string;
	program_name: string;
	project_name: string;
	analytical_fraction: string;
	primary_site: string;
	disease_type: string;
	experiment_type: string;
	embargo_date: string;
	heatmapFiles : string;
}

//PDC-288 Case Summary page
export type DemographicsData = {
	ethnicity: string;
    gender: string;
    demographic_submitter_id: string;
    race: string;
    cause_of_death: string;
    days_to_birth: string;
    days_to_death: string;
	vital_status: string;
    year_of_birth: string;
    year_of_death: string;
}

//@@@PDC-2535 Update UI with the changes to Diagnosis table columns
export type DiagnosesData = {
	tissue_or_organ_of_origin: string;
    age_at_diagnosis: string;
    primary_diagnosis: string;
    tumor_grade: string;
    tumor_stage: string;
    diagnosis_submitter_id: string;
    classification_of_tumor: string;
    days_to_last_follow_up: string;
    days_to_last_known_disease_status: string;
    days_to_recurrence: string;
    last_known_disease_status: string;
    morphology: string;
    progression_or_recurrence: string;
    site_of_resection_or_biopsy: string;
    prior_malignancy: string;
    ajcc_clinical_m: string;
    ajcc_clinical_n: string;
    ajcc_clinical_stage: string;
    ajcc_clinical_t: string;
    ajcc_pathologic_m: string;
    ajcc_pathologic_n: string;
    ajcc_pathologic_stage: string;
    ajcc_pathologic_t: string;
	ajcc_staging_system_edition: string;
    ann_arbor_b_symptoms: string;
    ann_arbor_clinical_stage: string;
    ann_arbor_extranodal_involvement: string;
    ann_arbor_pathologic_stage: string;
    best_overall_response: string;
    burkitt_lymphoma_clinical_variant: string;
    circumferential_resection_margin: string;
    colon_polyps_history: string;
    days_to_best_overall_response: string;
    days_to_diagnosis: string;
    days_to_hiv_diagnosis: string;
    days_to_new_event: string;
    figo_stage: string;
    hiv_positive: string;
    hpv_positive_type: string;
    hpv_status: string;
    iss_stage: string;
    laterality: string;
    ldh_level_at_diagnosis: string;
    ldh_normal_range_upper: string;
    lymph_nodes_positive: string;
    lymphatic_invasion_present: string;
    method_of_diagnosis: string;
    new_event_anatomic_site: string;
    new_event_type: string;
    overall_survival: string;
    perineural_invasion_present: string;
    prior_treatment: string;
    progression_free_survival: string;
    progression_free_survival_event: string;
    residual_disease: string;
    vascular_invasion_present: string;
    year_of_diagnosis: string;
    icd_10_code: string;
    synchronous_malignancy: string;
}

//@@@PDC-2691 Add properties to Case Summary view
export type AliquotData = {
	aliquot_submitter_id: string;
    aliquot_quantity: string;
    aliquot_volume: string;
	status: string;
	pool: string;
	aliquot_is_ref: string;
    amount: string;
    analyte_type: string;
    concentration: string;
}

//@@@PDC-2691 Add properties to Case Summary view
//@@@PDC-4615 Sample and Exposure Deprecated Properties should be deleted from the Case Summary modal window
//@@@PDC-4568 Deprecated Properties of Sample and Exposure should not show up in the export manifests.
export type SampleData = {
	gdc_sample_id: string;
    gdc_project_id: string;
    sample_submitter_id: string;
    sample_type: string;
	status: string;
	pool: string;
	sample_is_ref: string;
    biospecimen_anatomic_site: string;
    composition: string;
    current_weight: string;
    days_to_collection: string;
    days_to_sample_procurement: string;
    diagnosis_pathologically_confirmed: string;
    freezing_method: string;
    initial_weight: string;
    Intermediate_dimension: string;
    longest_dimension: string;
    method_of_sample_procurement: string;
    pathology_report_uuid: string;
    preservation_method: string;
    sample_type_id: string;
    shortest_dimension: string;
    time_between_clamping_and_freezing: string;
    time_between_excision_and_freezing: string;
    tissue_type: string;
    tumor_code: string;
    tumor_code_id: string;
    tumor_descriptor: string;
    aliquots: AliquotData[];
}

//@@@PDC-3095 - remove external_case_id field from uiCaseSummary API
export type CaseData = {
	case_id: string;
    case_submitter_id: string;
    project_submitter_id: string;
    disease_type: string;
    tissue_source_site_code: string;
    days_to_lost_to_followup: string;
    index_date: string;
    lost_to_followup: string;
    primary_site: string;
    demographics: DemographicsData[];
	diagnoses: DiagnosesData[];
	samples: SampleData[];
}


export type ExperimentFileByCaseCount = {
	acquisition_type: string;
	submitter_id_name: string;
	experiment_type: string;
    files_count: number;
}

export type DataCategoryFileByCaseCount = {
	file_type: string;
	files_count: number;
}

export type FileMetadata = {
	file_name: string,
	file_location: string,
	sample_id: string,
	sample_submitter_id: string,
	acquisition_file_name: string,
	analyte: string,
	instrument: string,
	folder_name: string,
	fraction: string,
}

export type FilesMetadata = {
	fileMetadata: FileMetadata[];
}

export type GitHubTagResponse = {
  data: {repository: {refs: {edges: [{node:{name: string}}]}}}
};

export type ChorusUserUpdateResponse = {
  error: boolean;
  data: ChorusUser[];
  chorusKey: string;
};

export type ChorusUser = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userLabMemberships: UserLabMembership[];
};

export type ChorusLabResponse = {
  error: boolean;
  data: ChorusLab[];
};

export type ChorusLab = {
  id: number;
  contactEmail: string;
  institutionUrl: string;
  name: string;
  uploadLimitInGb: number;
};

export type UserLabMembership = {
  id: number;
  lab_id:number;
  user_id:number;
}

//@@@PDC-231
export type SpectralCounts = {
	project_submitter_id: string;
	study_submitter_id: string;
	plex: string;
	spectral_count: number;
	distinct_peptide: string;
	unshared_peptide: string;
}

//@@@PDC-2450 gene/protein summary missing NCBI gene id
export type GeneProteinData = {
	gene_name: string;
	ncbi_gene_id: string;
	authority: string;
	description: string;
	organism: string;
	chromosome: string;
	locus: string;
	proteins: string;
	assays: string;
	spectral_counts: SpectralCounts[];
}

//@@@PDC-7688 add gene_id
export type GeneProteinDataWithId = {
	gene_id: string;
	gene_name: string;
	ncbi_gene_id: string;
	authority: string;
	description: string;
	organism: string;
	chromosome: string;
	locus: string;
	proteins: string;
	assays: string;
	spectral_counts: SpectralCounts[];
}

//@@@PDC-3163: Add data release version to the UI
export type ReleaseVersionData = {
	data_release: string;
	build_tag: string;
}

export type QueryReleaseVersionData = {
	uiDataVersionSoftwareVersion: ReleaseVersionData[];
}

export type GeneStudySpectralCountData = {
	pdc_study_id: string;
	submitter_id_name: string;
	experiment_type: string;
	spectral_count: string;
	distinct_peptide: string;
	unshared_peptide: string;
	aliquots_count: string;
	plexes_count: string;
}

export type GeneStudySpectralCountDataPaginated = {
	total: number;
	studySpectralCounts: GeneStudySpectralCountData[];
	pagination: Pagination;
}

export type GeneAliquotSpectralCountData = {
	aliquot_id: string;
	plex: string;
	label: string;
	submitter_id_name: string;
	experiment_type: string;
	spectral_count: string;
	distinct_peptide: string;
	unshared_peptide: string;
	//@@@PDC-557: Add protein abundance data to the Gene Summary screen
	precursor_area: string;
	//@@@PDC-669 gene_abundance table change
	log2_ratio: string;
	unshared_precursor_area: string;
	unshared_log2_ratio: string;
}

export type GeneAliquotSpectralCountDataPaginated = {
	total: number;
	aliquotSpectralCounts: GeneAliquotSpectralCountData[];
	pagination: Pagination;
}

//@@@PDC-357
export type SearchResults = {
	record_type: string;
	name: string;
}

export type SearchResultsStudy = {
	record_type: string;
	name: string;
	submitter_id_name: string;
	study_id: string;
	pdc_study_id: string;
}

export type SearchCaseResults = {
	record_type: string;
	name: string;
	case_id: string;
}

export type SearchResultsForAliquot = {
	aliquot_id: string;
	aliquot_submitter_id: string;
}

export type SearchbyStudyUUID = {
	study_submitter_id: string;
}

export type UUIDForStudy = {
	study_submitter_id: string;
}

export type SearchbyCaseUUID = {
	case_submitter_id: string;
}

export type UUIDForCase = {
	case_id: string;
}

//@@@PDC-440, PDC-438
export type SearchResultsGenesProteins = {
	record_type: string;
	name: string;
	description: string;
}

export type GeneStudyCount = {
	geneStudyCount: number;
}

//@@@PDC-465
export type SearchResultsProteins = {
	record_type: string;
	name: string;
	description: string;
	proteins: string;
}


//@@@PDC-371

export type PDCUserCreateResponse = {
  error: boolean;
  data: ChorusUser[];
}

export type PDCUserResponse = {
  login_username: string;
  user_id_type: string;
  name: string;
  user_type: string;
}

export type PDCUserId = {
	type: string;
	data: number[];
}

export type PDCUserData = {
	user_id: PDCUserId;
	login_username: string;
	email: string; //@@@PDC-421 added email field
	user_id_type: string;
	name: string;
	organization: string;
	user_type: string;
	last_login_date: string;
    create_date: string;
    registered: number;
}

export type LoginUserResponse = {
  error: boolean;
  data: PDCUserData[];
}

export type TableTotalRecordCount = {
	type: string,
	totalRecords: number
}

export type ObjectSearched = {
	type: any;
	parameterType: any;
	parameterValue: any;
}

//@@@PDC-621 sunburst chart
export type SunburstData = {
	project_submitter_id : string;
    tissue_or_organ_of_origin : string;
    disease_type : string;
    sample_type : string;
    cases_count : number;
}

export type QuerySunburstData = {
	allSunburstData: SunburstData[];
}

//@@@PDC-683 - prepopulated genes list
export type GeneNameList = {
	listName: string;
	geneNamesList: string;
}

//@@@PDC-716 - add PTM data to Gene Summary and Gene data tab
export type ptmData = {
	ptm_type: string;
	site: string;
	peptide: string;
}

export type ptmDataPaginated = {
	total: number;
	uiPtm: ptmData[];
	pagination: Pagination;
}

//@@@PDC-2021
export type HumanbodyImageData = {
	major_primary_site: string;
	cases_count: number;
	primarySites: string[];
}

//@@@PDC-1219 - Add a new experimental design tab on the study summary page
export type QueryStudyExperimentalDesign = {
	studyExperimentalDesignData: StudyExperimentalDesign[];
}

export type StudyExperimentalDesign = {
	study_id: string;
	study_submitter_id: string;
	study_run_metadata_id: string;
	study_run_metadata_submitter_id: string;
	experiment_number: string;
	experiment_type: string;
	plex_dataset_name: string;
	acquisition_type: string;
	number_of_fractions: string;
	analyte: string;
    label_free:string;
    itraq_114: string;
    itraq_115: string;
    itraq_116: string;
    itraq_117: string;
    itraq_118: string;
    itraq_119: string;
    itraq_120: string;
    itraq_121: string;
    tmt_126: string;
    tmt_127n: string;
    tmt_127c: string;
    tmt_128n: string;
    tmt_128c: string;
    tmt_129n: string;
    tmt_129c: string;
    tmt_130c: string;
    tmt_130n: string;
    tmt_131: string;
    tmt_131c: string;
}

export type QueryBiospecimenPerStudy = {
	biospecimenPerStudyData: BiospecimenPerStudy [];
}

export type BiospecimenPerStudy = {
	aliquot_id: string;
	sample_id: string;
	case_id: string;
	aliquot_submitter_id: string;
	sample_submitter_id: string;
	case_submitter_id: string;
	aliquot_is_ref: string;
	aliquot_status: string;
	case_status: string;
	sample_status: string;
	project_name: string;
	sample_type: string;
	disease_type: string;
	primary_site: string;
	pool: string;
	taxon: string;
}

//@@@PDC-1883: Add external references to study summary page
export type EntityReferencePerStudy = {
	entityReferenceStudyData: EntityReference [];
}

//@@@PDC-1883: Add external references to study summary page
export type EntityReference = {
	reference_id: string;
	entity_type: string;
	entity_id: string;
	reference_type: string;
	reference_entity_type: string;
	reference_entity_alias: string;
	reference_resource_name: string;
	reference_resource_shortname: string;
	reference_entity_location: string;
}

//@@@PDC-3010 Update ui to start using file type to data category mapping APIs
export type dataCategory2FileTypeMapping = {
	data_category: string;
	file_type: string;
}
