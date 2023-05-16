import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EventBarComponent } from './event-bar.component';
import { IconEvent } from '@shared/models/icon-event';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EventBarComponent', () => {
  let component: EventBarComponent;
  let fixture: ComponentFixture<EventBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatIconModule],
      declarations: [EventBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icons based on input', () => {
    const testIcons: IconEvent[] = [
      { name: 'edit', event: 'onEdit' },
      { name: 'delete', event: 'onDelete' },
    ];
    component.icons = testIcons;
    fixture.detectChanges();

    const iconElements = fixture.debugElement.queryAll(By.css('mat-icon'));
    expect(iconElements.length).toBe(testIcons.length);
    testIcons.forEach((icon, index) => {
      expect(iconElements[index].nativeElement.textContent).toContain(
        icon.name
      );
    });
  });

  it('should emit iconEvent with the correct event name when an icon is clicked', () => {
    spyOn(component.iconEvent, 'emit');
    const testIcons: IconEvent[] = [
      { name: 'edit', event: 'onEdit' },
      { name: 'delete', event: 'onDelete' },
    ];
    component.icons = testIcons;
    fixture.detectChanges();

    const iconElements = fixture.debugElement.queryAll(By.css('mat-icon'));
    iconElements.forEach((iconElement, index) => {
      iconElement.triggerEventHandler('click', null);
      expect(component.iconEvent.emit).toHaveBeenCalledWith(
        testIcons[index].event
      );
    });
  });
});
