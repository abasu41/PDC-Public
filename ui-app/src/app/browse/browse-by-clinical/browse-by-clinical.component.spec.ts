import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog";
import { Apollo } from "apollo-angular";
import { Observable, of } from "rxjs";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { BrowseByClinicalComponent } from "./browse-by-clinical.component";
import { BrowseByClinicalService } from "./browse-by-clinical.service";

class MockDialog {
  open(): any {
    return { afterClosed: () => of("closed") };
  }
}

//@@@PDC-1305 add age_at_diagnosis et al 	
//@@@PDC-2397 Update clinical manifest generation to include additional attributes
class MockBrowseByClinicalService {
  getFilteredClinicalDataPaginated(): Observable<any> {
    return of({
      getPaginatedUIClinical: {
        total: 1414,
        uiClinical: [
          {
            case_submitter_id: "PDAC018",
            external_case_id: null,
            ethnicity: "Not Reported",
            gender: "Female",
            race: "Asian",
            morphology: "8500/3",
            primary_diagnosis: "Pancreatic endocrine tumor, malignant",
            site_of_resection_or_biopsy: "Not Reported",
            tissue_or_organ_of_origin: "Pancreas, NOS",
            tumor_grade: "Not Reported",
            tumor_stage: "Stage I",
            age_at_diagnosis: "13505",
            classification_of_tumor: null,
            days_to_recurrence: "1041.00",
            case_id: "5dbe6168-33b6-48f8-a6bb-364e5b0f52d1",
            disease_type: "Pancreatic Adenocarcinoma",
            primary_site: "Pancreas",
            program_name: "Korea University",
            project_name: "Proteogenomics Analysis and Mechanism Study to Develop Precision Medicine for Treatment-Resistant Pa",
            status: "Qualified",
            cause_of_death: null,
            days_to_birth: null,
            days_to_death: null,
            vital_status: "Dead",
            year_of_birth: null,
            year_of_death: null,
            age_at_index: null,
            premature_at_birth: null,
            weeks_gestation_at_birth: null,
            age_is_obfuscated: null,
            cause_of_death_source: null,
            occupation_duration_years: null,
            country_of_residence_at_enrollment: null,
            days_to_last_follow_up: "1118.00",
            days_to_last_known_disease_status: "1118.00",
            last_known_disease_status: "Distant met recurrence/progression",
            progression_or_recurrence: "Yes",
            prior_malignancy: null,
            ajcc_clinical_m: null,
            ajcc_clinical_n: null,
            ajcc_clinical_stage: null,
            ajcc_clinical_t: null,
            ajcc_pathologic_m: null,
            ajcc_pathologic_n: null,
            ajcc_pathologic_stage: null,
            ajcc_pathologic_t: null,
            ajcc_staging_system_edition: null,
            ann_arbor_b_symptoms: null,
            ann_arbor_clinical_stage: null,
            ann_arbor_extranodal_involvement: null,
            ann_arbor_pathologic_stage: null,
            best_overall_response: null,
            burkitt_lymphoma_clinical_variant: null,
            circumferential_resection_margin: null,
            colon_polyps_history: null,
            days_to_best_overall_response: null,
            days_to_diagnosis: null,
            days_to_hiv_diagnosis: null,
            days_to_new_event: null,
            figo_stage: null,
            hiv_positive: null,
            hpv_positive_type: null,
            hpv_status: null,
            iss_stage: null,
            laterality: null,
            ldh_level_at_diagnosis: null,
            ldh_normal_range_upper: null,
            lymph_nodes_positive: null,
            lymphatic_invasion_present: null,
            method_of_diagnosis: null,
            peripancreatic_lymph_nodes_positive: null,
            peripancreatic_lymph_nodes_tested: null,
            supratentorial_localization: null,
            tumor_confined_to_organ_of_origin: null,
            tumor_focality: null,
            tumor_regression_grade: null,
            vascular_invasion_type: null,
            wilms_tumor_histologic_subtype: null,
            breslow_thickness: null,
            gleason_grade_group: null,
            igcccg_stage: null,
            international_prognostic_index: null,
            largest_extrapelvic_peritoneal_focus: null,
            masaoka_stage: null,
            externalReferences: []
          },
          {
            case_submitter_id: "PDAC063",
            external_case_id: null,
            ethnicity: "Not Reported",
            gender: "Female",
            race: "Asian",
            morphology: "8500/3",
            primary_diagnosis: "Pancreatic endocrine tumor, malignant",
            site_of_resection_or_biopsy: "Not Reported",
            tissue_or_organ_of_origin: "Pancreas, NOS",
            tumor_grade: "Not Reported",
            tumor_stage: "Stage III",
            age_at_diagnosis: "27375",
            classification_of_tumor: null,
            days_to_recurrence: "125.00",
            case_id: "f998e351-96b1-4f92-9b0d-ccc02fdaa29d",
            disease_type: "Pancreatic Adenocarcinoma",
            primary_site: "Pancreas",
            program_name: "Korea University",
            project_name: "Proteogenomics Analysis and Mechanism Study to Develop Precision Medicine for Treatment-Resistant Pa",
            status: "Qualified",
            cause_of_death: null,
            days_to_birth: null,
            days_to_death: null,
            vital_status: "Dead",
            year_of_birth: null,
            year_of_death: null,
            age_at_index: null,
            premature_at_birth: null,
            weeks_gestation_at_birth: null,
            age_is_obfuscated: null,
            cause_of_death_source: null,
            occupation_duration_years: null,
            country_of_residence_at_enrollment: null,
            days_to_last_follow_up: "226.00",
            days_to_last_known_disease_status: "226.00",
            last_known_disease_status: "Distant met recurrence/progression",
            progression_or_recurrence: "Yes",
            prior_malignancy: null,
            ajcc_clinical_m: null,
            ajcc_clinical_n: null,
            ajcc_clinical_stage: null,
            ajcc_clinical_t: null,
            ajcc_pathologic_m: null,
            ajcc_pathologic_n: null,
            ajcc_pathologic_stage: null,
            ajcc_pathologic_t: null,
            ajcc_staging_system_edition: null,
            ann_arbor_b_symptoms: null,
            ann_arbor_clinical_stage: null,
            ann_arbor_extranodal_involvement: null,
            ann_arbor_pathologic_stage: null,
            best_overall_response: null,
            burkitt_lymphoma_clinical_variant: null,
            circumferential_resection_margin: null,
            colon_polyps_history: null,
            days_to_best_overall_response: null,
            days_to_diagnosis: null,
            days_to_hiv_diagnosis: null,
            days_to_new_event: null,
            figo_stage: null,
            hiv_positive: null,
            hpv_positive_type: null,
            hpv_status: null,
            iss_stage: null,
            laterality: null,
            ldh_level_at_diagnosis: null,
            ldh_normal_range_upper: null,
            lymph_nodes_positive: null,
            lymphatic_invasion_present: null,
            method_of_diagnosis: null,
            peripancreatic_lymph_nodes_positive: null,
            peripancreatic_lymph_nodes_tested: null,
            supratentorial_localization: null,
            tumor_confined_to_organ_of_origin: null,
            tumor_focality: null,
            tumor_regression_grade: null,
            vascular_invasion_type: null,
            wilms_tumor_histologic_subtype: null,
            breslow_thickness: null,
            gleason_grade_group: null,
            igcccg_stage: null,
            international_prognostic_index: null,
            largest_extrapelvic_peritoneal_focus: null,
            masaoka_stage: null,
            externalReferences: []
          }
        ],
        pagination: {
          count: 2,
          sort: "gender asc",
          from: 0,
          page: 1,
          total: 1414,
          pages: 707,
          size: 2
        }
      }
    });
  }
  getFilteredClinicalExposureDataPaginated(): Observable<any> {
    return of({
      getPaginatedUIClinical: {
        total: 1414,
        uiClinical: [
          {
            case_submitter_id: "PDAC018",
            anaplasia_present: null,
            anaplasia_present_type: null,
            child_pugh_classification: null,
            cog_liver_stage: null,
            cog_neuroblastoma_risk_group: null,
            cog_renal_stage: null,
            cog_rhabdomyosarcoma_risk_group: null,
            enneking_msts_grade: null,
            enneking_msts_metastasis: null,
            enneking_msts_stage: null,
            enneking_msts_tumor_site: null,
            esophageal_columnar_dysplasia_degree: null,
            esophageal_columnar_metaplasia_present: null,
            first_symptom_prior_to_diagnosis: null,
            gastric_esophageal_junction_involvement: null,
            goblet_cells_columnar_mucosa_present: null,
            gross_tumor_weight: null,
            inpc_grade: null,
            inpc_histologic_group: null,
            inrg_stage: null,
            inss_stage: null,
            irs_group: null,
            irs_stage: null,
            ishak_fibrosis_score: null,
            lymph_nodes_tested: null,
            medulloblastoma_molecular_classification: null,
            exposures: []
          },
          {
            case_submitter_id: "PDAC063",
            anaplasia_present: null,
            anaplasia_present_type: null,
            child_pugh_classification: null,
            cog_liver_stage: null,
            cog_neuroblastoma_risk_group: null,
            cog_renal_stage: null,
            cog_rhabdomyosarcoma_risk_group: null,
            enneking_msts_grade: null,
            enneking_msts_metastasis: null,
            enneking_msts_stage: null,
            enneking_msts_tumor_site: null,
            esophageal_columnar_dysplasia_degree: null,
            esophageal_columnar_metaplasia_present: null,
            first_symptom_prior_to_diagnosis: null,
            gastric_esophageal_junction_involvement: null,
            goblet_cells_columnar_mucosa_present: null,
            gross_tumor_weight: null,
            inpc_grade: null,
            inpc_histologic_group: null,
            inrg_stage: null,
            inss_stage: null,
            irs_group: null,
            irs_stage: null,
            ishak_fibrosis_score: null,
            lymph_nodes_tested: null,
            medulloblastoma_molecular_classification: null,
            exposures: []
          }
        ]
      }
	});
  };

  getFilteredClinicalAdditionalDataPaginated(): Observable<any> {
    return of({
      getPaginatedUIClinical: {
        total: 1414,
        uiClinical: [
          {
            case_submitter_id: "PDAC018",
            new_event_anatomic_site: null,
            new_event_type: null,
            overall_survival: null,
            perineural_invasion_present: null,
            prior_treatment: null,
            progression_free_survival: null,
            progression_free_survival_event: null,
            residual_disease: null,
            vascular_invasion_present: null,
            year_of_diagnosis: null,
            icd_10_code: null,
            synchronous_malignancy: null,
            metastasis_at_diagnosis: null,
            metastasis_at_diagnosis_site: null,
            mitosis_karyorrhexis_index: null,
            non_nodal_regional_disease: null,
            non_nodal_tumor_deposits: null,
            ovarian_specimen_status: null,
            ovarian_surface_involvement: null,
            percent_tumor_invasion: null,
            peritoneal_fluid_cytological_status: null,
            primary_gleason_grade: null,
            secondary_gleason_grade: null,
            weiss_assessment_score: null,
            adrenal_hormone: null,
            ann_arbor_b_symptoms_described: null,
            diagnosis_is_primary_disease: null,
            eln_risk_classification: null,
            figo_staging_edition_year: null,
            gleason_grade_tertiary: null,
            gleason_patterns_percent: null,
            margin_distance: null,
            margins_involved_site: null,
            pregnant_at_diagnosis: null,
            satellite_nodule_present: null,
            sites_of_involvement: null,
            tumor_depth: null,
            who_cns_grade: null,
            who_nte_grade: null,
            diagnosis_uuid: null
          },
          {
            case_submitter_id: "PDAC063",
            new_event_anatomic_site: null,
            new_event_type: null,
            overall_survival: null,
            perineural_invasion_present: null,
            prior_treatment: null,
            progression_free_survival: null,
            progression_free_survival_event: null,
            residual_disease: null,
            vascular_invasion_present: null,
            year_of_diagnosis: null,
            icd_10_code: null,
            synchronous_malignancy: null,
            metastasis_at_diagnosis: null,
            metastasis_at_diagnosis_site: null,
            mitosis_karyorrhexis_index: null,
            non_nodal_regional_disease: null,
            non_nodal_tumor_deposits: null,
            ovarian_specimen_status: null,
            ovarian_surface_involvement: null,
            percent_tumor_invasion: null,
            peritoneal_fluid_cytological_status: null,
            primary_gleason_grade: null,
            secondary_gleason_grade: null,
            weiss_assessment_score: null,
            adrenal_hormone: null,
            ann_arbor_b_symptoms_described: null,
            diagnosis_is_primary_disease: null,
            eln_risk_classification: null,
            figo_staging_edition_year: null,
            gleason_grade_tertiary: null,
            gleason_patterns_percent: null,
            margin_distance: null,
            margins_involved_site: null,
            pregnant_at_diagnosis: null,
            satellite_nodule_present: null,
            sites_of_involvement: null,
            tumor_depth: null,
            who_cns_grade: null,
            who_nte_grade: null,
            diagnosis_uuid: null
          }
        ]
      },
	});
  };

  getFilteredClinicalFollowUpDataPaginated(): Observable<any> {
    return of({
      getPaginatedUIClinical: {
        uiClinical: [
          {
            case_submitter_id: "PDAC018",
            follow_ups: []
          }
        ]
      },
	});
  };

  getFilteredClinicalDataPaginatedPost(): Observable<any> {
    return of({
      getPaginatedUIClinical: {
        total: 1414,
        uiClinical: [
          {
            case_submitter_id: "PDAC018",
            external_case_id: null,
            ethnicity: "Not Reported",
            gender: "Female",
            race: "Asian",
            morphology: "8500/3",
            primary_diagnosis: "Pancreatic endocrine tumor, malignant",
            site_of_resection_or_biopsy: "Not Reported",
            tissue_or_organ_of_origin: "Pancreas, NOS",
            tumor_grade: "Not Reported",
            tumor_stage: "Stage I",
            age_at_diagnosis: "13505",
            classification_of_tumor: null,
            days_to_recurrence: "1041.00",
            case_id: "5dbe6168-33b6-48f8-a6bb-364e5b0f52d1",
            disease_type: "Pancreatic Adenocarcinoma",
            primary_site: "Pancreas",
            program_name: "Korea University",
            project_name: "Proteogenomics Analysis and Mechanism Study to Develop Precision Medicine for Treatment-Resistant Pa",
            status: "Qualified",
            cause_of_death: null,
            days_to_birth: null,
            days_to_death: null,
            vital_status: "Dead",
            year_of_birth: null,
            year_of_death: null,
            age_at_index: null,
            premature_at_birth: null,
            weeks_gestation_at_birth: null,
            age_is_obfuscated: null,
            cause_of_death_source: null,
            occupation_duration_years: null,
            country_of_residence_at_enrollment: null,
            days_to_last_follow_up: "1118.00",
            days_to_last_known_disease_status: "1118.00",
            last_known_disease_status: "Distant met recurrence/progression",
            progression_or_recurrence: "Yes",
            prior_malignancy: null,
            ajcc_clinical_m: null,
            ajcc_clinical_n: null,
            ajcc_clinical_stage: null,
            ajcc_clinical_t: null,
            ajcc_pathologic_m: null,
            ajcc_pathologic_n: null,
            ajcc_pathologic_stage: null,
            ajcc_pathologic_t: null,
            ajcc_staging_system_edition: null,
            ann_arbor_b_symptoms: null,
            ann_arbor_clinical_stage: null,
            ann_arbor_extranodal_involvement: null,
            ann_arbor_pathologic_stage: null,
            best_overall_response: null,
            burkitt_lymphoma_clinical_variant: null,
            circumferential_resection_margin: null,
            colon_polyps_history: null,
            days_to_best_overall_response: null,
            days_to_diagnosis: null,
            days_to_hiv_diagnosis: null,
            days_to_new_event: null,
            figo_stage: null,
            hiv_positive: null,
            hpv_positive_type: null,
            hpv_status: null,
            iss_stage: null,
            laterality: null,
            ldh_level_at_diagnosis: null,
            ldh_normal_range_upper: null,
            lymph_nodes_positive: null,
            lymphatic_invasion_present: null,
            method_of_diagnosis: null,
            peripancreatic_lymph_nodes_positive: null,
            peripancreatic_lymph_nodes_tested: null,
            supratentorial_localization: null,
            tumor_confined_to_organ_of_origin: null,
            tumor_focality: null,
            tumor_regression_grade: null,
            vascular_invasion_type: null,
            wilms_tumor_histologic_subtype: null,
            breslow_thickness: null,
            gleason_grade_group: null,
            igcccg_stage: null,
            international_prognostic_index: null,
            largest_extrapelvic_peritoneal_focus: null,
            masaoka_stage: null,
            new_event_anatomic_site: null,
            new_event_type: null,
            overall_survival: null,
            perineural_invasion_present: null,
            prior_treatment: null,
            progression_free_survival: null,
            progression_free_survival_event: null,
            residual_disease: null,
            vascular_invasion_present: null,
            year_of_diagnosis: null,
            icd_10_code: null,
            synchronous_malignancy: null,
            metastasis_at_diagnosis: null,
            metastasis_at_diagnosis_site: null,
            mitosis_karyorrhexis_index: null,
            non_nodal_regional_disease: null,
            non_nodal_tumor_deposits: null,
            ovarian_specimen_status: null,
            ovarian_surface_involvement: null,
            percent_tumor_invasion: null,
            peritoneal_fluid_cytological_status: null,
            primary_gleason_grade: null,
            secondary_gleason_grade: null,
            weiss_assessment_score: null,
            adrenal_hormone: null,
            ann_arbor_b_symptoms_described: null,
            diagnosis_is_primary_disease: null,
            eln_risk_classification: null,
            figo_staging_edition_year: null,
            gleason_grade_tertiary: null,
            gleason_patterns_percent: null,
            margin_distance: null,
            margins_involved_site: null,
            pregnant_at_diagnosis: null,
            satellite_nodule_present: null,
            sites_of_involvement: null,
            tumor_depth: null,
            who_cns_grade: null,
            who_nte_grade: null,
            diagnosis_uuid: null,
            anaplasia_present: null,
            anaplasia_present_type: null,
            child_pugh_classification: null,
            cog_liver_stage: null,
            cog_neuroblastoma_risk_group: null,
            cog_renal_stage: null,
            cog_rhabdomyosarcoma_risk_group: null,
            enneking_msts_grade: null,
            enneking_msts_metastasis: null,
            enneking_msts_stage: null,
            enneking_msts_tumor_site: null,
            esophageal_columnar_dysplasia_degree: null,
            esophageal_columnar_metaplasia_present: null,
            first_symptom_prior_to_diagnosis: null,
            gastric_esophageal_junction_involvement: null,
            goblet_cells_columnar_mucosa_present: null,
            gross_tumor_weight: null,
            inpc_grade: null,
            inpc_histologic_group: null,
            inrg_stage: null,
            inss_stage: null,
            irs_group: null,
            irs_stage: null,
            ishak_fibrosis_score: null,
            lymph_nodes_tested: null,
            medulloblastoma_molecular_classification: null,
            externalReferences: [],
            exposures: [],
            follow_ups: []
          },
          {
            case_submitter_id: "PDAC063",
            external_case_id: null,
            ethnicity: "Not Reported",
            gender: "Female",
            race: "Asian",
            morphology: "8500/3",
            primary_diagnosis: "Pancreatic endocrine tumor, malignant",
            site_of_resection_or_biopsy: "Not Reported",
            tissue_or_organ_of_origin: "Pancreas, NOS",
            tumor_grade: "Not Reported",
            tumor_stage: "Stage III",
            age_at_diagnosis: "27375",
            classification_of_tumor: null,
            days_to_recurrence: "125.00",
            case_id: "f998e351-96b1-4f92-9b0d-ccc02fdaa29d",
            disease_type: "Pancreatic Adenocarcinoma",
            primary_site: "Pancreas",
            program_name: "Korea University",
            project_name: "Proteogenomics Analysis and Mechanism Study to Develop Precision Medicine for Treatment-Resistant Pa",
            status: "Qualified",
            cause_of_death: null,
            days_to_birth: null,
            days_to_death: null,
            vital_status: "Dead",
            year_of_birth: null,
            year_of_death: null,
            age_at_index: null,
            premature_at_birth: null,
            weeks_gestation_at_birth: null,
            age_is_obfuscated: null,
            cause_of_death_source: null,
            occupation_duration_years: null,
            country_of_residence_at_enrollment: null,
            days_to_last_follow_up: "226.00",
            days_to_last_known_disease_status: "226.00",
            last_known_disease_status: "Distant met recurrence/progression",
            progression_or_recurrence: "Yes",
            prior_malignancy: null,
            ajcc_clinical_m: null,
            ajcc_clinical_n: null,
            ajcc_clinical_stage: null,
            ajcc_clinical_t: null,
            ajcc_pathologic_m: null,
            ajcc_pathologic_n: null,
            ajcc_pathologic_stage: null,
            ajcc_pathologic_t: null,
            ajcc_staging_system_edition: null,
            ann_arbor_b_symptoms: null,
            ann_arbor_clinical_stage: null,
            ann_arbor_extranodal_involvement: null,
            ann_arbor_pathologic_stage: null,
            best_overall_response: null,
            burkitt_lymphoma_clinical_variant: null,
            circumferential_resection_margin: null,
            colon_polyps_history: null,
            days_to_best_overall_response: null,
            days_to_diagnosis: null,
            days_to_hiv_diagnosis: null,
            days_to_new_event: null,
            figo_stage: null,
            hiv_positive: null,
            hpv_positive_type: null,
            hpv_status: null,
            iss_stage: null,
            laterality: null,
            ldh_level_at_diagnosis: null,
            ldh_normal_range_upper: null,
            lymph_nodes_positive: null,
            lymphatic_invasion_present: null,
            method_of_diagnosis: null,
            peripancreatic_lymph_nodes_positive: null,
            peripancreatic_lymph_nodes_tested: null,
            supratentorial_localization: null,
            tumor_confined_to_organ_of_origin: null,
            tumor_focality: null,
            tumor_regression_grade: null,
            vascular_invasion_type: null,
            wilms_tumor_histologic_subtype: null,
            breslow_thickness: null,
            gleason_grade_group: null,
            igcccg_stage: null,
            international_prognostic_index: null,
            largest_extrapelvic_peritoneal_focus: null,
            masaoka_stage: null,
            new_event_anatomic_site: null,
            new_event_type: null,
            overall_survival: null,
            perineural_invasion_present: null,
            prior_treatment: null,
            progression_free_survival: null,
            progression_free_survival_event: null,
            residual_disease: null,
            vascular_invasion_present: null,
            year_of_diagnosis: null,
            icd_10_code: null,
            synchronous_malignancy: null,
            metastasis_at_diagnosis: null,
            metastasis_at_diagnosis_site: null,
            mitosis_karyorrhexis_index: null,
            non_nodal_regional_disease: null,
            non_nodal_tumor_deposits: null,
            ovarian_specimen_status: null,
            ovarian_surface_involvement: null,
            percent_tumor_invasion: null,
            peritoneal_fluid_cytological_status: null,
            primary_gleason_grade: null,
            secondary_gleason_grade: null,
            weiss_assessment_score: null,
            adrenal_hormone: null,
            ann_arbor_b_symptoms_described: null,
            diagnosis_is_primary_disease: null,
            eln_risk_classification: null,
            figo_staging_edition_year: null,
            gleason_grade_tertiary: null,
            gleason_patterns_percent: null,
            margin_distance: null,
            margins_involved_site: null,
            pregnant_at_diagnosis: null,
            satellite_nodule_present: null,
            sites_of_involvement: null,
            tumor_depth: null,
            who_cns_grade: null,
            who_nte_grade: null,
            diagnosis_uuid: null,
            anaplasia_present: null,
            anaplasia_present_type: null,
            child_pugh_classification: null,
            cog_liver_stage: null,
            cog_neuroblastoma_risk_group: null,
            cog_renal_stage: null,
            cog_rhabdomyosarcoma_risk_group: null,
            enneking_msts_grade: null,
            enneking_msts_metastasis: null,
            enneking_msts_stage: null,
            enneking_msts_tumor_site: null,
            esophageal_columnar_dysplasia_degree: null,
            esophageal_columnar_metaplasia_present: null,
            first_symptom_prior_to_diagnosis: null,
            gastric_esophageal_junction_involvement: null,
            goblet_cells_columnar_mucosa_present: null,
            gross_tumor_weight: null,
            inpc_grade: null,
            inpc_histologic_group: null,
            inrg_stage: null,
            inss_stage: null,
            irs_group: null,
            irs_stage: null,
            ishak_fibrosis_score: null,
            lymph_nodes_tested: null,
            medulloblastoma_molecular_classification: null,
            externalReferences: [],
            exposures: [],
            follow_ups: []
          }
        ],
        pagination: {
          count: 2,
          sort: "gender asc",
          from: 0,
          page: 1,
          total: 1414,
          pages: 707,
          size: 2
        }
      }
    });
  }
}

describe("BrowseByClinicalComponent", () => {
  let component: BrowseByClinicalComponent;
  let fixture: ComponentFixture<BrowseByClinicalComponent>;
  let serviceSpy: jasmine.Spy;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseByClinicalComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    TestBed.overrideComponent(BrowseByClinicalComponent, {
      set: {
        providers: [
          { provide: Apollo, useValue: {} },
          {
            provide: BrowseByClinicalService,
            useClass: MockBrowseByClinicalService
          },
          { provide: MatDialog, useClass: MockDialog }
        ]
      }
    });

     TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(BrowseByClinicalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }); 

     TestBed.compileComponents().then(() => {
      serviceSpy = spyOn(
        MockBrowseByClinicalService.prototype,
        "getFilteredClinicalDataPaginatedPost"
      ).and.callThrough();
      fixture = TestBed.createComponent(BrowseByClinicalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it("should create and set data correctly", async () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      expect(component.filteredClinicalData.length).toBe(2);
      expect(component.totalRecords).toBe(1414);
      expect(component.offset).toBe(0);
      expect(component.pageSize).toBe(2);
      expect(component.limit).toBe(2);
      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  it("test ngOnChanges with new filter", () => {
    let simpleChange = {};
    let newFilterValue = "Disease_Types:Renal_Cell_Carcinoma";
    component.newFilterValue = newFilterValue;
    component.ngOnChanges(simpleChange);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it("test ngOnChanges with clear all selections", () => {
    let simpleChange = {};
    let newFilterValue = "Clear all selections: ";
    component.newFilterSelected = ["Primary_Sites", "Projects"];
    component.newFilterValue = newFilterValue;
    component.ngOnChanges(simpleChange);
    expect(serviceSpy).toHaveBeenCalled();
  });

  it("test download disable", () => {
    expect(component.isDownloadDisabled()).toBeTruthy();
    let selectedData = [];
    component.selectedClinicalData = selectedData;
    expect(component.isDownloadDisabled()).toBeTruthy();
    selectedData.push("");
    expect(component.isDownloadDisabled()).toBeFalsy();
  });

  it("test load new page", () => {
    let event = {
      sortField: "case_submitter_id",
      sortOrder: 1,
      first: 0,
      rows: 10
    };
    component.loadNewPage(event);
    expect(serviceSpy).toHaveBeenCalled();
  });
  
  it("test getIcon", () => {
	  expect(component.getIcon("")).toBe('');
  });
  
  it("test displayTextforExternalID", () => {
	  expect(component.displayTextforExternalID("","")).toBe('');
  });
  
  it("test findCaseByID", () => {
	  expect(component.findCaseByID("")).toBe(-1);
  });
  
  it("Test download complete manifest", () => {
	let simpleChange = {};
	let newFilterValue = "sample_type:Xenograft";
	component.newFilterValue = newFilterValue;
    component.ngOnChanges(simpleChange);
	component.downloadCompleteManifest(true);
    expect(serviceSpy).toHaveBeenCalled();	
  });
  
});
