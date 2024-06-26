//@@@PDC-898 new public API--StudyExperimentalDesign
//@@@PDC-1120 StudyRunMetadata table change
//@@@PDC-1156 add is_ref
//@@@PDC-1316 remove itraq_120
//@@@PDC-1874 add pdc_study_id to study-related APIs
const StudyExperimentalDesign = `
type StudyExperimentalDesign {
	study_run_metadata_id: String
	study_run_metadata_submitter_id: String
	study_id: String
	study_submitter_id: String
	pdc_study_id: String
	aliquot_is_ref: String
	experiment_number: Int
	experiment_type: String
	plex_dataset_name: String
	acquisition_type: String
	number_of_fractions: String
	analyte: String
	label_free: String
	itraq_113: String
	itraq_114: String
	itraq_115: String
	itraq_116: String
	itraq_117: String
	itraq_118: String
	itraq_119: String
	itraq_121: String
	tmt_126: String
	tmt_127n: String
	tmt_127c: String
	tmt_128n: String
	tmt_128c: String
	tmt_129n: String
	tmt_129c: String
	tmt_130c: String
	tmt_130n: String
	tmt_131: String
	tmt_131c: String
}`
;

export default StudyExperimentalDesign;