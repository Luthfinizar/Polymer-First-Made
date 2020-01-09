import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-media-query/iron-media-query.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-ajax/iron-ajax.js';


class MyMahasiswaList extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-alignment">
        :host {display: block;}
      </style>


      <iron-ajax
        id="ajax"
        handle-as="json"
        on-response="handleFullResponse"
        on-error="errorResponses">
      </iron-ajax>

      <app-header-layout>
        <app-header slot="header" fixed condenses effects="waterfall">
            <app-toolbar>
            <paper-icon-button class="btnAdd" icon="supervisor-account"></paper-icon-button>
             <div main-title>Data Mahasiswa</div>
             <paper-icon-button class="btnAdd" icon="add-circle" on-tap="_addMhs"></paper-icon-button>
            </app-toolbar>
        </app-header> 
        <app-header fixed condenses effects="waterfall">
       <!--    <div class="container-header layout horizontal">
           <div style="width:100%"><center>NPM</center></div>
           <div style="width:100%"><center>Nama</center></div>
           <div style="width:100%"><center>Kelas</center></div>
        </div> -->
       </app-header>
           
        <!-- Menampilkan DATA-->
        <div class="container-body">
          <paper-item class="cardheader layout horizontal">
            <div class="borderkiri"><center>NPM</center></div>
            <div class="isidata"><center>Nama</center></div>
            <div class="isidata"><center>Kelas</center></div>
          </paper-item>

          <template is="dom-repeat" items="[[data]]">
            <a class="anchor" href="/ubahmahasiswa/[[item.npm]]" tabindex="-1">  
              <paper-item class="carddata layout horizontal">
                <div class="borderkiri"><center>[[item.npm]]</center></div>
                <div class="isidata"><center>[[item.nama]]</center></div>
                <div class="isidata"><center>[[item.kelas]]</center></div>
              </paper-item>
            </a>
          </template>
        </div>

    <!-- Mobile develope -->
     
  <!-- end mobile develope -->


    `;
  }

  static get properties(){
      return {
          data:{
              type:Object,
              value:[
                // {npm:"17114444", nama:"Muhammad Nurfilza",kelas:"2KA36"},
                // {npm:"17114445", nama:"Fahtul Abdurahman",kelas:"2KA36"},
                // {npm:"17114446", nama:"Rahmat Syaputra",kelas:"2KA36"},
                // {npm:"17114447", nama:"Faisal Addien",kelas:"2KA36"},
                // {npm:"17114448", nama:"Budi Setiawan",kelas:"2KA36"},
              ],
          },

          page:String,

          route:{
            type: Object,
          },

          mahasiswa:{
              type:Object,
              notify:true,
              observer:"_checkData"
          }
      };
  }

  static get observers(){
      return [
          '_computeView(route,page)'
      ];
  }

  _computeView(route,page){
    //   console.log(route);
    //   console.log(page);
    if (page !== "mahasiswalist"){
        return;
    }
    this.shadowRoot.querySelector("#ajax").url = MyAppGlobals.apiPath + '/api/v1/bootcamp/mahasiswa';
    this.shadowRoot.querySelector("#ajax").method = 'GET';
    this.shadowRoot.querySelector("#ajax").generateRequest();
  }

  _changeIndex(i){
    return i.charAt(0).toUpperCase()        
  }
  
  _menu(){
      let mymenu = document.querySelector('my-app');
      mymenu.shadowRoot.querySelector('#drawer').open();
  }

  _addMhs(){
      window.history.pushState({},null,'inputmahasiswa/0');
      window.dispatchEvent(new CustomEvent('location-changed'));
  }

  _checkData(mahasiswa){
    this.push('data', mahasiswa)
  }

  handleFullResponse(e){
    var data = e.detail.response;
    this.data = data.data;
    console.log(this.data);
    
  }

}

window.customElements.define('mahasiswa-list', MyMahasiswaList);