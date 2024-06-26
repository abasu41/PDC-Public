const Program = `
type Program {
  program_id: String
  program_submitter_id: String
  name: String
  sponsor: String
  start_date: Date
  end_date: Date
  program_manager: String
  projects: [Project]
}`
;

export default Program;