import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]',

})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    //     this.isOpen = this.elRef.nativeElement.contains(event.target);
    // }
    @HostListener('mouseenter') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    @HostListener('mouseleave') toggleClose() {
        this.isOpen = !this.isOpen;
    }

    constructor(private elRef: ElementRef) { }
}