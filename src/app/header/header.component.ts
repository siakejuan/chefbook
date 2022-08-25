import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'

})

export class HeaderComponent implements OnInit, OnDestroy{
    
    private userSub: Subscription;
    isAuthenticated = false;
    // @Output() featureSelected=new EventEmitter<string>();
    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }
    constructor (
        private dataStorageService : DataStorageService,
        private router: Router,
        private authService: AuthService
        ) {}

    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        });
    }
    
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.loadRecipes().subscribe();
    }

    logout() {
        this.authService.logout();
    }
}