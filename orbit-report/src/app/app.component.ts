import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  sourceList: Satellite [];
  displayList: Satellite [];
  value: string = '';

  constructor() {
    this.sourceList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {

          let fetchedSatellites = data.satellites;
          for(let i = 0; i < fetchedSatellites.length; i++){
            this.sourceList.push(new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational));
          }
          this.displayList = this.sourceList.slice(0);
      }.bind(this));
    }.bind(this));
  }

  // https://www.youtube.com/watch?v=Wo9nfK2fEyw  radioChangeHandler video
 radioChangeHandler(event: any){
   this.value = event.target.value;
 }

  search(searchTerm: string, searchColumn: string): void {

    // console.log(searchColumn);
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
       let name = this.sourceList[i][searchColumn].toLowerCase();
       if (name.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
       }
    }
    // assign this.displayList to be the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
 }
}