//@@@PDC-332 get file metadata
//@@@PDC-898 new public APIs--fileMetadata
//@@@PDC-1257 replace fraction with fraction_number
const FileMetadata = `
type FileMetadata {
	file_id: String
	file_name: String
	file_location: String
	md5sum: String
	file_size: String
	aliquots: [Aliquot]
	file_submitter_id: String 
	data_category: String
	file_type: String
	file_format: String
	analyte: String 
	instrument: String
	plex_or_dataset_name: String
	fraction_number: String
	experiment_type: String
	study_run_metadata_submitter_id: String 
	study_run_metadata_id: String 
}`
;

export default FileMetadata;