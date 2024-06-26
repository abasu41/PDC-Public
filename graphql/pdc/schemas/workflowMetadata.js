//@@@PDC-1874 add pdc_study_id to study-related APIs
const WorkflowMetadata = `
type WorkflowMetadata {  
  workflow_metadata_submitter_id: String
  study_submitter_id: String
  pdc_study_id: String
  protocol_submitter_id: String
  cptac_study_id: String
  submitter_id_name: String
  study_submitter_name: String
  analytical_fraction: String
  experiment_type: String
  instrument: String
  refseq_database_version: String
  uniport_database_version: String
  hgnc_version: String
  raw_data_processing: String
  raw_data_conversion: String
  sequence_database_search: String
  search_database_parameters: String
  phosphosite_localization: String
  ms1_data_analysis: String
  psm_report_generation: String
  cptac_dcc_mzidentml: String
  mzidentml_refseq: String
  mzidentml_uniprot: String
  gene_to_prot: String
  cptac_galaxy_workflows: String
  cptac_galaxy_tools: String
  cdap_reports: String
  cptac_dcc_tools: String
}`
;

export default WorkflowMetadata;