//@@@PDC-1882 add pdcEntityReference api
//@@@PDC-2018 add submitter_id_name of study
const EntityReference =`
type EntityReference {
	reference_id: String
	entity_type: String
	entity_id: String
	reference_type: String
	reference_entity_type: String
	reference_entity_alias: String
	submitter_id_name: String
	reference_resource_name: String
	reference_resource_shortname: String
	reference_entity_location: String
}`
;

export default EntityReference;