//@@@PDC-191 experimental metadata API
//@@@PDC-1120 StudyRunMetadata table change
//@@@PDC-1316 remove itraq_120
const StudyRunMetadata = `
type StudyRunMetadata {
	study_run_metadata_id: String
	study_run_metadata_submitter_id: String
	experiment_number: Int
	experiment_type: String
	folder_name: String
	fraction: String
	analyte: String
	date: Date
	alias: String
	replicate_number: String
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
	tmt_129cc: String
	tmt_130n: String
	tmt_131: String
	tmt_131c: String
	study: Study
	protocol: Protocol
	aliquot_run_metadata: [AliquotRunMetadata]	
	files: [File]
}`
;

//export default [StudyRunMetadata, Study, Protocol, Date];
export default StudyRunMetadata;