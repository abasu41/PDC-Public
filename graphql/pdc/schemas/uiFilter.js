//@@@PDC-533 additional filters
//@@@PDC-566 Add sample_type and acquisition filters
//@@@PDC-774 add downloadable
//@@@PDC-894 add status filters
//@@@PDC-1189 add number of studies per filter value
const UIFilter = `
type UIFilter {
	project_name: [UIFilterElement]
	primary_site: [UIFilterElement]
	program_name: [UIFilterElement]
	disease_type: [UIFilterElement]
	analytical_fraction: [UIFilterElement]
	experiment_type: [UIFilterElement]
	acquisition_type: [UIFilterElement]
	submitter_id_name: [UIFilterElement]
	sample_type: [UIFilterElement]
	ethnicity: [UIFilterElement]
	race: [UIFilterElement]
	gender: [UIFilterElement]
	tumor_grade: [UIFilterElement]
	data_category: [UIFilterElement]
	file_type: [UIFilterElement]
	downloadable: [UIFilterElement]
	access: [UIFilterElement]
	biospecimen_status: [UIFilterElement]
	case_status: [UIFilterElement]
}

type UIFilterElement {
	filterName: String
	filterStudyCount: Int
	filterValue: [String]
}	
`
;

export default UIFilter;