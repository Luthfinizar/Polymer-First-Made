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

class Nilai extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-alignment">
        :host {
          display: block;
        }
      </style>

      <iron-media-query query="(min-width:600px)" query-matches="{{desktop}}"></iron-media-query>

      <iron-ajax  
        id="ajax"
        handle-as="json"
        on-response="_handleResponse"
        on-error = "errorResponse">
      </iron-ajax>

         <!-- dekstop develope -->
         <template is="dom-if" if="{{desktop}}">
        <app-header-layout>
            <app-header slot = "header" fixed condenses effects="waterfall">
                <app-toolbar>
                <paper-icon-button class="btnAdd" icon="content-paste"></paper-icon-button>
                    <div main-title>Nilai Mahasiswa</div>
                    <paper-icon-button class="btnAdd" icon="add-circle" on-tap="_addNilai"></paper-icon-button>
                </app-toolbar>
            </app-header>
            
            <!-- Menampilkan DATA-->
        <div class="container-body">
        <paper-item class="cardheader layout horizontal">
          <div class="borderkiri"><center>ID_Nilai</center></div>
          <div class="isidata"><center>Kode_MK</center></div>
          <div class="isidata"><center>Matakuliah</center></div>
          <div class="isidata"><center>NPM</center></div>
          <div class="isidata"><center>Nama Mahasiswa</center></div>
          <div class="isidata"><center>Nilai</center></div>
        </paper-item>

        <template is="dom-repeat" items="[[data]]">
          <a class="anchor" href="/ubahnilai/[[item.id]]" tabindex="-1">  
            <paper-item class="carddata layout horizontal">
              <div class="borderkiri"><center>[[item.id]]</center></div>
              <div class="isidata"><center>[[item.id_matkul]]</center></div>
              <div class="isidata"><center>[[item.nama_matkul]]</center></div>
              <div class="isidata"><center>[[item.npm]]</center></div>
              <div class="isidata"><center>[[item.nama_mahasiswa]]</center></div>
              <div class="isidata"><center>[[item.nilai]]</center></div>
            </paper-item>
          </a>
        </template>
      </div>

  <!-- Mobile develope -->
  <template is="dom-if" if="{{!desktop}}">
  <app-header-layout>
    <app-header slot="header" fixed condenses effects="waterfall">
        <app-toolbar>
          <paper-icon-button icon="menu" on-tap="_menu"></paper-icon-button>
          <div main-title>Nilai Mahasiswa</div>
          <paper-icon-button class="btnAdd" icon="add-circle" on-tap="_addNilai"></paper-icon-button>

        </app-toolbar>
    </app-header>
    <template is="dom-repeat" items="[[data]]">
    <a class="anchor" href="/ubahnilai/[[item.id]]" tabindex="-1">
      <paper-item class="card layout vertical">
       <div class="circle">[[_changeIndex(item.id)]]</div> 
          <div>ID Nilai : [[item.id]]</div>
          <div>ID Matkul : [[item.id_matkul]]</div>
          <div>Matakuliah : [[item.nama_matkul]]</div>
          <div>NPM : [[item.npm]]</div>
          <div>Nama Mahasiswa : [[item.nama_mahasiswa]]</div>
          <div>Nilai : [[item.nilai]]</div>
      </paper-item>
      </a>
    </template>
  </app-header-layout>
</template>  
<!-- end mobile develope -->


    `;
  }
  static get properties(){
      return{
          data:{
            type:Object,
            value:[]
          },
          page:{
            type:String
          },

          route:{
              type:Object,
            //  observer:'_computeView'
          },

          nilai:{
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
    if(page !=="listnilai"){
        return;
    }
    this.shadowRoot.querySelector("#ajax").url = MyAppGlobals.apiPath + "/api/v1/bootcamp/nilai";
    this.shadowRoot.querySelector("#ajax").method = 'GET';
    this.shadowRoot.querySelector("#ajax").generateRequest();
}

_changeIndex(i){
    return i.charAt(0).toUpperCase()
}

_checkData(nilai){
    this.push('data', nilai);
}

_handleResponse(e){
    var data = e.detail.response;
    this.data = data.data;
    console.log(this.data);
}

_addNilai(){
    window.history.pushState({},null,'/inputnilai/0')
    window.dispatchEvent(new CustomEvent('location-changed'))
}
_menu(){
    let mymenu = document.querySelector('my-app');
    mymenu.shadowRoot.querySelector('#drawer').open();
}
}
window.customElements.define('nilai-list', Nilai);

