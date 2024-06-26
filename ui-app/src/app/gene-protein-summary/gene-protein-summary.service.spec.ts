import { ApolloTestingModule, ApolloTestingController } from "apollo-angular/testing";
import { TestBed, inject } from "@angular/core/testing";

import { GeneProteinSummaryService } from "./gene-protein-summary.service";

describe("GeneProteinSummaryService", () => {
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneProteinSummaryService],
      imports: [ApolloTestingModule]
    });

    controller = TestBed.get(ApolloTestingController);
  });

  it("should be created", inject(
    [GeneProteinSummaryService],
    (service: GeneProteinSummaryService) => {
      expect(service).toBeTruthy();
    }
  ));

    //@@@PDC-1123 call ui wrapper API
  it("test getProteinDetails", inject(
    [GeneProteinSummaryService],
    (service: GeneProteinSummaryService) => {
      service.getProteinDetails("M0R009").subscribe(data => {
        expect(data).toBeDefined();
        expect(data["uiProtein"].spectral_counts.length).toBe(2);
        expect(data["uiProtein"].gene_name).toBe("A1BG");
      });

      const op = controller.expectOne(service.proteinDetailsQuery);

      op.flush({
        data: {
          uiProtein: {
			gene_id: "2e700669-85b0-43fa-a9c7-3eaf5a_D2",  
            gene_name: "A1BG",
            NCBI_gene_id: 1,
            authority: "HGNC:5",
            description: "alpha-1-B glycoprotein",
            organism: "Homo sapiens",
            chromosome: "19",
            locus: "19q13.43",
            proteins: "M0R009;NP_570602.2;P04217;P04217-2",
            assays: "non-CPTAC-1064\r",
            spectral_counts: [
              {
                project_submitter_id: "CPTAC-2",
                plex: "01_CPTAC_COprospective_Proteome_VU_20150901",
                spectral_count: 7,
                distinct_peptide: 4,
                unshared_peptide: 4
              },
              {
                project_submitter_id: "CPTAC-2",
                plex: "01CPTAC_COprospective_Proteome_PNNL_20170123",
                spectral_count: 37,
                distinct_peptide: 18,
                unshared_peptide: 18
              }
            ]
          }
        }
      });

      controller.verify();
    }
  ));

    //@@@PDC-1123 call ui wrapper API
	//@@@PDC-2450 gene/protein summary missing NCBI gene id
  it("test getGeneDetails", inject(
    [GeneProteinSummaryService],
    (service: GeneProteinSummaryService) => {
      service.getGeneDetails("A1BG").subscribe(data => {
        expect(data).toBeDefined();
        expect(data["uiGeneSpectralCount"].spectral_counts.length).toBe(3);
        expect(data["uiGeneSpectralCount"].authority).toBe("HGNC:5");
      });

      const op = controller.expectOne(service.geneDetailsQuery);

      op.flush({
        data: {
          uiGeneSpectralCount: {
			gene_id: "2e700669-85b0-43fa-a9c7-3eaf5a_D2",  
            gene_name: "A1BG",
            ncbi_gene_id: "1",
            authority: "HGNC:5",
            description: "alpha-1-B glycoprotein",
            organism: "Homo sapiens",
            chromosome: "19",
            locus: "19q13.43",
            proteins: "M0R009;NP_570602.2;P04217;P04217-2",
            assays: "non-CPTAC-1064\r",
            spectral_counts: [
              {
                project_submitter_id: "CPTAC-2",
                study_submitter_id: "S037-1",
                plex: "",
                spectral_count: 648,
                distinct_peptide: 17,
                unshared_peptide: 17
              },
              {
                project_submitter_id: "CPTAC-2",
                study_submitter_id: "S037-2",
                plex: "",
                spectral_count: 865,
                distinct_peptide: 39,
                unshared_peptide: 39
              },
              {
                project_submitter_id: "CPTAC-2",
                study_submitter_id: "S038-3",
                plex: "",
                spectral_count: 23,
                distinct_peptide: 13,
                unshared_peptide: 13
              }
            ]
          }
        }
      });

      controller.verify();
    }
  ));

  it("test getAliquotSpectralCount", inject(
    [GeneProteinSummaryService],
    (service: GeneProteinSummaryService) => {
      service.getAliquotSpectralCount("CDC42EP1", 0, 10).subscribe(data => {
        expect(data).toBeDefined();
        expect(
          data["getPaginatedUIGeneAliquotSpectralCount"].uiGeneAliquotSpectralCounts
            .length
        ).toBe(1);
        expect(data["getPaginatedUIGeneAliquotSpectralCount"].total).toBe(960);
        expect(data["getPaginatedUIGeneAliquotSpectralCount"].pagination).toEqual({
          count: 10,
          sort: "",
          from: 0,
          page: 1,
          total: 960,
          pages: 96,
          size: 10
        });
      });

      const op = controller.expectOne(service.geneAliquotSpectralCountQuery);

      op.flush({
        data: {
          getPaginatedUIGeneAliquotSpectralCount: {
            total: 960,
            uiGeneAliquotSpectralCounts: [
              {
                aliquot_id: "2e700669-85b0-43fa-a9c7-3eaf5a_D2",
                plex: "01CPTAC_BCProspective_Phosphoproteome_BI_20160927",
                label: "TMT10 127C",
                submitter_id_name: "Prospective_Breast_BI_Phosphoproteome",
                experiment_type: "TMT10",
                spectral_count: 26,
                distinct_peptide: 13,
                unshared_peptide: 13,
                precursor_area: "\r",
                log2_ratio: "0.4338",
                unshared_precursor_area: null,
                unshared_log2_ratio: "0.5377"
              }
            ],
            pagination: {
              count: 10,
              sort: "",
              from: 0,
              page: 1,
              total: 960,
              pages: 96,
              size: 10
            }
          }
        }
      });

      controller.verify();
    }
  ));

  it("test getStudySpectralCount", inject(
    [GeneProteinSummaryService],
    (service: GeneProteinSummaryService) => {
      service.getStudySpectralCount("BRAF", 0, 10).subscribe(data => {
        expect(data).toBeDefined();
        expect(
          data["getPaginatedUIGeneStudySpectralCount"].uiGeneStudySpectralCounts.length
        ).toBe(1);
        expect(data["getPaginatedUIGeneStudySpectralCount"].total).toBe(10);
        expect(data["getPaginatedUIGeneAliquotSpectralCount"].pagination).toEqual({
          count: 10,
          sort: "",
          from: 0,
          page: 1,
          total: 10,
          pages: 1,
          size: 10
        });
      });

      const op = controller.expectOne(service.geneStudySpectralCountQuery);

      op.flush({
        data: {
          getPaginatedUIGeneStudySpectralCount: {
            total: 10,
            uiGeneStudySpectralCounts: [
              {
                submitter_id_name: "Prospective_Colon_VU_Proteome",
                experiment_type: "Label Free",
                spectral_count: 110,
                distinct_peptide: 7,
                unshared_peptide: 4,
                aliquots_count: 100,
                plexes_count: 101
              }
            ],
            pagination: {
              count: 10,
              sort: "",
              from: 0,
              page: 1,
              total: 10,
              pages: 1,
              size: 10
            }
          }
        }
      });

      controller.verify();
    }
  ));

  it("test getGenePTMData", inject(
    [GeneProteinSummaryService],
    (service: GeneProteinSummaryService) => {
      service.getGenePTMData("A1BG", 0, 2).subscribe(data => {
        expect(data).toBeDefined();
        expect(
          data["getPaginatedUIPtm"].uiGeneStudySpectralCounts.length
        ).toBe(1);
        expect(data["getPaginatedUIPtm"].total).toBe(8);
        expect(data["getPaginatedUIPtm"].pagination).toEqual({
          count: 2,
          sort: "",
          from: 0,
          page: 1,
          total: 8,
          pages: 4,
          size: 2
        });
      });

      const op = controller.expectOne(service.genePTMDataQuery);

      op.flush({
        data: {
          getPaginatedUIPtm: {
            total: 8,
            uiPtm:  [
              {
                ptm_type: "acetyl",
                site: "NP_570602.2:k134",
                peptide: "SLPAPWLSMAPVSWITPGLk"
              },
              {
                ptm_type: "acetyl",
                site: "NP_570602.2:k248",
                peptide: "RGEkELLVPR"
              }
            ],
            pagination: {
              count: 2,
              sort: "",
              from: 0,
              page: 1,
              total: 8,
              pages: 4,
              size: 2
            }
          }
        }
      });

      controller.verify();
    }
  ));

/*   it("test getGeneStudyCountResults", inject(
    [GeneProteinSummaryService],
    (service: GeneProteinSummaryService) => {
      service.getGeneStudyCountResults("da6f2e6b-da51-4f18-abe5-fbe34f1669c6").subscribe(data => {
        expect(data).toBeDefined();
        expect(data.geneStudyCount).toBe(0);
      });

      const op = controller.expectOne(service.GeneStudyCountQuery);

      op.flush({
        data: {
          geneStudyCount: 0
        }
      });

      controller.verify();
    }
  )); */
});
