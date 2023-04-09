import { Component, EventEmitter, Inject, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from 'src/app/core/models/modal/modalData';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
  content?: TemplateRef<any>;
  primaryButton?: string;
  secondaryButton?: string;
  border?: boolean;
  permiso?: boolean;

  @Output() primaryEvent: EventEmitter<void>;
  @Output() secondaryEvent: EventEmitter<void>;

  constructor(public dialogRef: MatDialogRef<ModalContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData) {
    this.content = data?.content;
    this.primaryButton = data?.primaryButton
    this.secondaryButton = data?.secondaryButton
    this.border = data?.border;
    this.primaryEvent = new EventEmitter<void>();
    this.secondaryEvent = new EventEmitter<void>();
  }

  ngOnInit(): void {
    console.log();
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
  }

  second() {
    this.secondaryEvent?.emit();
  }

  primary() {
    this.primaryEvent?.emit();
  }
}
