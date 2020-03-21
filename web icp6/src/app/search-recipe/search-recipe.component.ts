// @ts-ignore
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild("recipe", {static:false}) recipes: ElementRef;
  @ViewChild("place",{static:false}) places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];
  formattedAddress = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  recepieApi = 'https://api.edamam.com/search?q=';
  recepieAppid = '&app_id=c860c8e5';
  recepieKey = '&app_key=3831e7c39fd632d4314c3c3a4e4c4f04';

  placesApi = 'https://api.foursquare.com/v2/venues/search?';
  clientdId = 'client_id=XUOI0IF5XY44NCG3ZMD31KIMGCKZIKQZELTWMECJUWKBWJJU';
  clientSecret = '&client_secret=W4PRMABH0LFKXI0WQ4P0G44YN10MWUMSS25OX4JKZRIHMN2Q';
  version = '&v=20180323';
  near = '&near=';
  query = '&query=';
  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      this._http.get( this.recepieApi + this.recipeValue + this.recepieAppid + this.recepieKey).subscribe((res: any) => {
        console.log("reciepe search object from edamam api");
        console.log(res);
        this.recipeList = Object.keys(res.hits).map(function (k) {
          const i = res.hits[k].recipe;
          return {name: i.label, icon: i.image, url: i.url};
        });

      });

    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      this._http.get( this.placesApi  + this.clientdId + this.clientSecret + this.version
        + this.near + this.placeValue).subscribe((res: any) => {
        console.log(res);
        this.venueList = Object.keys(res.response.venues).map(function (k) {
          const i = res.response.venues[k];
          return {name: i.name, location: i.location.formattedAddress, currentLat: '39.0349657', currentLong: '-94.5787524', formattedAddress: i.location.formattedAddress};
        });
      });
    }
  }
}
