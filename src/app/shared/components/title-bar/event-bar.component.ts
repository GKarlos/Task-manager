import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconEvent } from '@shared/models/icon-event';

@Component({
  selector: 'app-event-bar',
  templateUrl: './event-bar.component.html',
  styleUrls: ['./event-bar.component.scss'],
})
export class EventBarComponent {
  @Input() icons: IconEvent[] = [];
  @Output() iconEvent = new EventEmitter<string>();

  onIconClick(event: string) {
    this.iconEvent.emit(event);
  }
}
