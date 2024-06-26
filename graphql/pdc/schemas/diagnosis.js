//@@@PDC-1011 replace gdc_case_id with external_case_id
//@@@PDC-2038 add ajcc_staging_system_edition
const Diagnosis = `
type Diagnosis {
	diagnosis_id:  String
	diagnosis_submitter_id:  String
	case_id:  String
	case_submitter_id:  String
	external_case_id:  String
	project_id:  String
	project_submitter_id:  String
	age_at_diagnosis:  String
	classification_of_tumor:  String
	days_to_last_follow_up:  String
	days_to_last_known_disease_status:  String
	days_to_recurrence:  String
	last_known_disease_status:  String
	morphology:  String
	primary_diagnosis:  String
	progression_or_recurrence:  String
	site_of_resection_or_biopsy:  String
	tissue_or_organ_of_origin:  String
	tumor_grade:  String
	tumor_stage:  String
	vital_status:  String
	days_to_birth:  String
	days_to_death:  String
	prior_malignancy:  String
	ajcc_clinical_m:  String
	ajcc_clinical_n:  String
	ajcc_clinical_stage:  String
	ajcc_clinical_t:  String
	ajcc_pathologic_m:  String
	ajcc_pathologic_n:  String
	ajcc_pathologic_stage:  String
	ajcc_pathologic_t:  String
	ajcc_staging_system_edition: String
	ann_arbor_b_symptoms:  String
	ann_arbor_clinical_stage:  String
	ann_arbor_extranodal_involvement:  String
	ann_arbor_pathologic_stage:  String
	best_overall_response:  String
	burkitt_lymphoma_clinical_variant:  String
	cause_of_death:  String
	circumferential_resection_margin:  String
	colon_polyps_history:  String
	days_to_best_overall_response:  String
	days_to_diagnosis:  String
	days_to_hiv_diagnosis:  String
	days_to_new_event:  String
	figo_stage:  String
	hiv_positive:  String
	hpv_positive_type:  String
	hpv_status:  String
	iss_stage:  String
	laterality:  String
	ldh_level_at_diagnosis:  String
	ldh_normal_range_upper:  String
	lymph_nodes_positive:  String
	lymphatic_invasion_present:  String
	method_of_diagnosis:  String
	new_event_anatomic_site:  String
	new_event_type:  String
	overall_survival:  String
	perineural_invasion_present:  String
	prior_treatment:  String
	progression_free_survival:  String
	progression_free_survival_event:  String
	residual_disease:  String
	vascular_invasion_present:  String
	year_of_diagnosis:  String
	disease_type: String
	cases_count: Int
	case: Case
	project: Project
	studies: [Study]  
}`
;


//export default [Diagnosis, Case, Study, Project];
export default Diagnosis;