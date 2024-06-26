import { Component, OnInit, Inject, HostListener, Renderer2, ElementRef, AfterViewChecked } from "@angular/core";

@Component({
  selector: 'app-submit-data',
  templateUrl: './submit-data.component.html',
  styleUrls: ['./submit-data.component.scss']
})

//@@@PDC-1284: Add the 'how to submit data' under HELP
//@@@PDC-1489: Alignment issues in Submit Data page
export class SubmitDataFAQComponent implements OnInit {
  constructor(private elRef:ElementRef, private _renderer: Renderer2) {}
  ngOnInit() {}

  //@@@PDC-1779: Make the "How to Submit Data" page responsive
  ngAfterViewChecked() {
    // Add or remove CSS classes as per screen port
    if (window.innerWidth < 1024) {
      let matExpansionIndicator = this.elRef.nativeElement.querySelectorAll('.submitDataImg');
      for (var i = 0; i < matExpansionIndicator.length; i++) {
        this._renderer.removeClass(matExpansionIndicator[i], 'fixed-class');
        this._renderer.removeClass(matExpansionIndicator[i], 'sticky-nav');
      }
    } else {
      let matExpansionIndicator = this.elRef.nativeElement.querySelectorAll('.submitDataImg');
      for (var i = 0; i < matExpansionIndicator.length; i++) {
        this._renderer.addClass(matExpansionIndicator[i], 'fixed-class');
        this._renderer.addClass(matExpansionIndicator[i], 'sticky-nav');
      }    
    }
  }

  @HostListener("window:scroll", [])
  //On scroll, if the user reaches bottom of the page, change CSS classes to position the PDC architecture diagram as required.
  onWindowScroll() {
      //Add sticky navigation feature for screen port width > 1024px.
      //Sticky nav dimensions do not work for smaller screens as the submit data image does not fit in the screen port
      if ((window.innerWidth > 1024) && ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
        // you're at the bottom of the page
        let matExpansionIndicator = this.elRef.nativeElement.querySelectorAll('.sticky-nav');
        for (var i = 0; i < matExpansionIndicator.length; i++) {
          this._renderer.removeClass(matExpansionIndicator[i], 'fixed-class');
          this._renderer.addClass(matExpansionIndicator[i], 'absolute-class');
        }
      }  else {
        let matExpansionIndicator = this.elRef.nativeElement.querySelectorAll('.sticky-nav');
        for (var i = 0; i < matExpansionIndicator.length; i++) {
          this._renderer.removeClass(matExpansionIndicator[i], 'absolute-class');
          this._renderer.addClass(matExpansionIndicator[i], 'fixed-class');
        } 
      }  
  }

  //@@@PDC-1489: Alignment issues in Submit Data page
  //Scroll to a particular section of the page.
  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
