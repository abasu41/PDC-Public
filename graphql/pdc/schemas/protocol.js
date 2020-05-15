//@@@PDC-652 new protocol structure
//@@@PDC-1154 column name correction: fractions_analyzed_count
//@@@PDC-1874 add pdc_study_id to study-related APIs
const Protocol = `
type Protocol {
	protocol_id: String
	protocol_submitter_id: String
	project_submitter_id: String
	study_id: String
	study_submitter_id: String
	pdc_study_id: String
	program_id: String
	program_submitter_id: String
	protocol_name: String
	protocol_date: String
	document_name: String
	quantitation_strategy: String
	experiment_type: String
	label_free_quantitation: String
	labeled_quantitation: String
	isobaric_labeling_reagent: String
	reporter_ion_ms_level: String
	starting_amount: String
	starting_amount_uom: String
	digestion_reagent: String
	alkylation_reagent: String
	enrichment_strategy: String
	enrichment: String
	chromatography_dimensions_count: String
	one_d_chromatography_type: String
	two_d_chromatography_type: String
	fractions_analyzed_count: String
	column_type: String
	amount_on_column: String
	amount_on_column_uom: String
	column_length: String
	column_length_uom: String
	column_inner_diameter: String
	column_inner_diameter_uom: String
	particle_size: String
	particle_size_uom: String
	particle_type: String
	gradient_length: String
	gradient_length_uom: String
	instrument_make: String
	instrument_model: String
	dissociation_type: String
	ms1_resolution: String
	ms2_resolution: String
	dda_topn: String
	normalized_collision_energy: String
	acquistion_type: String
	dia_multiplexing: String
	dia_ims: String
	auxiliary_data: String
	cud_label: String
	study: Study
}`
;

export default Protocol;