import { OverlayRef } from '@angular/cdk/overlay';
import {
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import {
  AppOverlayConfig,
  OverlayService,
} from '../services/overlay/overlay.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
})
export class ProgressSpinnerComponent {
  @Input() color?: ThemePalette = 'accent';
  @Input() diameter?: number = 60;
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() strokeWidth?: number = 10;
  @Input() value?: number;
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displayProgressSpinner: boolean = true;

  @ViewChild('progressSpinnerRef', { static: true })
  private progressSpinnerRef!: TemplateRef<any>;
  private progressSpinnerOverlayConfig!: AppOverlayConfig;
  private overlayRef!: OverlayRef;

  constructor(
    private vcRef: ViewContainerRef,
    private overlayService: OverlayService
  ) {}

  ngOnInit() {
    // Config for Overlay Service
    this.progressSpinnerOverlayConfig = { hasBackdrop: this.backdropEnabled };
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig['positionStrategy'] =
        this.overlayService.positionGloballyCenter();
    }
    // Create Overlay for progress spinner
    this.overlayRef = this.overlayService.createOverlay(
      this.progressSpinnerOverlayConfig
    );
  }

  ngDoCheck() {
    // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
    if (this.displayProgressSpinner && !this.overlayRef.hasAttached()) {
      this.overlayService.attachTemplatePortal(
        this.overlayRef,
        this.progressSpinnerRef,
        this.vcRef
      );
    } else if (!this.displayProgressSpinner && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}
