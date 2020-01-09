import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import  '@polymer/app-layout/app-header/app-header.js';
import  '@polymer/app-layout/app-header-layout/app-header-layout.js';
import  '@polymer/paper-item/paper-item.js';
import  '@polymer/iron-media-query/iron-media-query.js'
import  '@polymer/paper-icon-button/paper-icon-button.js'
import  '@polymer/iron-icon/iron-icon.js';
import  '@polymer/iron-icons/iron-icons.js';
import  '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-ajax/iron-ajax.js';

class MataKuliah extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-alignment">
        :host {
          display: block;
        }

      </style>


      <iron-ajax  
        id="ajax"
        handle-as="json"
        on-response="_handleResponse"
        on-error = "errorResponse">
      </iron-ajax>

         <!-- dekstop develope -->
        <app-header-layout>
            <app-header slot = "header" fixed condenses effects="waterfall">
                <app-toolbar>
                <paper-icon-button class="btnAdd" icon="book"></paper-icon-button>
                    <div main-title>Matakuliah</div>
                    <paper-icon-button class="btnAdd" icon="add-circle" on-tap="_addMK"></paper-icon-button>
                </app-toolbar>
            </app-header>

             <!-- Nampilin DATA-->
          <div class="container">
            <paper-item class="cardheader layout horizontal">
              <div class="borderkiri"><center>Kode_MK</center></div>
              <div class="isidata"><center>Matakuliah</center></div>
              <div class="isidata"><center>SKS</center></div>
            </paper-item>
            
            <template is="dom-repeat" items="[[data]]">
            <a class="anchor" href="/ubahmatakuliah/[[item.id]]" tabindex="-1">
            <paper-item class="carddata layout horizontal">
            <div class="borderkiri"><center>[[item.id]]</center></div>
            <div class="isidata"><center>[[item.nama]]</center></div>
            <div class="isidata"><center>[[item.sks]]</center></div>
            </paper-item>
            </a>
            </template>
          </div>
        </app-header-layout>

      <!-- mobile develope 
      <template is="dom-if" if="{{!desktop}}">
      <app-header-layout>
        <app-header slot="header" fixed condenses effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="menu" on-tap="_menu"></paper-icon-button>
              <div main-title>Matakuliah</div>
              <paper-icon-button class="btnAdd" icon="add-circle" on-tap="_addMK"></paper-icon-button>
  
            </app-toolbar>
        </app-header>
        <template is="dom-repeat" items="[[data]]">
        <a class="anchor" href="/ubahMatakuliah/[[item.id]]" tabindex="-1">
          <paper-item class="card layout vertical">
           <div class="circle">[[_changeIndex(item.nama)]]</div> 
              <div>[[item.nama]]</div>
              <div>[[item.sks]]</div>
          </paper-item>
          </a>
        </template>
      </app-header-layout>
    </template> 
-->
    `;
  }
  static get properties(){
      return{
          data:{
            type:Object,
            value:[
                // {namaMK:"Bahasa Inggris 2",sks:"1"},
                // {namaMK:"Struktur Data",sks:"3"},
                // {namaMK:"Algoritma Pemrograman",sks:"2"},
                // {namaMK:"Kompleksitas Algoritma",sks:"2"},
                // {namaMK:"Pemrograman Web",sks:"3"},
            ]
          },
          page:{
            type:String
          },

          route:{
              type:Object,
            //  observer:'_computeView'
          },

          matakuliah:{
              type:Object,
              notify:true,
              observer:"_checkData"
          }
      };
  }

static get observers(){
    return[
        '_computeView(route,page)'
    ];
}

_computeView(route,page){
    // console.log(route);
   // console.log(page);
    if(page !=="matakuliahlist"){
        return;
    }
    this.shadowRoot.querySelector("#ajax").url = MyAppGlobals.apiPath + "/api/v1/bootcamp/matakuliah";
    this.shadowRoot.querySelector("#ajax").method = 'GET';
    this.shadowRoot.querySelector("#ajax").generateRequest();
}

_changeIndex(i){
    return i.charAt(0).toUpperCase()
}

_checkData(matakuliah){
    this.push('data', matakuliah);
}

_handleResponse(e){
    var data = e.detail.response;
    this.data = data.data;
    console.log(this.data);
}

_addMK(){
    window.history.pushState({},null,'/inputmatakuliah/0')
    window.dispatchEvent(new CustomEvent('location-changed'))
}
_menu(){
    let mymenu = document.querySelector('my-app');
    mymenu.shadowRoot.querySelector('#drawer').open();
}
}
window.customElements.define('matakuliah-list', MataKuliah);

