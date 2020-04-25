import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {


  @ViewChild('mySearchInput',null) mySearchInput: IonInput; 
 
  constructor( public keyboard: Keyboard,) { }

  ngOnInit() {
    this.showKeybord();
  }

  showKeybord()
  {
    setTimeout(()=>{
      this.mySearchInput.setFocus()
    },300)
  }
}
