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


class Dosen extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles iron-flex iron-flex-alignment">
        :host {display: block;}
      </style>

      <iron-media-query query="(min-width:600px)" query-matches="{{desktop}}"></iron-media-query>

      <iron-ajax
        id="ajax"
        handle-as="json"
        on-response="handleFullResponse"
        on-error="errorResponses">
      </iron-ajax>

      <template is="dom-if" if="{{desktop}}">
      <app-header-layout>
        <app-header slot="header" fixed condenses effects="waterfall">
            <app-toolbar>
            <paper-icon-button class="btnAdd" icon="supervisor-account"></paper-icon-button>
             <div main-title>Data dosen</div>
             <paper-icon-button class="btnAdd" icon="add-circle" on-tap="_addDosen"></paper-icon-button>
            </app-toolbar>
        </app-header> 
     
        <!-- Menampilkan DATA-->
        <div class="container-body">
          <paper-item class="cardheader layout horizontal">
            <div class="borderkiri"><center>NIK</center></div>
            <div class="isidata"><center>Nama Dosen</center></div>
          </paper-item>

          <template is="dom-repeat" items="[[data]]">
          <a class="anchor" href="/ubahdosen/[[item.id]]" tabindex="-1">
            <paper-item class="carddata layout horizontal">
              <div class="borderkiri"><center>[[item.id]]</center></div>
              <div class="isidata"><center>[[item.nama]]</center></div>
            </paper-item>
           </a>
          </template>
        </div>
      </app-header-layout>
    </template>  
    

    <!-- Mobile develope -->
    <template is="dom-if" if="{{!desktop}}">
    <app-header-layout>
      <app-header slot="header" fixed condenses effects="waterfall">
          <app-toolbar>
            <paper-icon-button icon="menu" on-tap="_menu"></paper-icon-button>
            <div main-title>dosen</div>
            <paper-icon-button class="btnAdd" icon="add-circle" on-tap="_addDosen"></paper-icon-button>

          </app-toolbar>
      </app-header>
      <template is="dom-repeat" items="[[data]]">
      <a class="anchor" href="/ubahdosen/[[item.id]]" tabindex="-1">
        <paper-item class="card layout vertical">
         <div class="circle">[[_changeIndex(item.id)]]</div> 
            <div>[[item.id]]</div>
            <div>[[item.nama]]</div>
        </paper-item>
        </a>
      </template>
    </app-header-layout>
  </template>  
  <!-- end mobile develope -->


    `;
  }

  static get properties(){
      return {
          data:{
              type:Object,
              value:[],
          },

          page:String,

          route:{
            type: Object,
          },

          dosen:{
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
    if (page !== "listdosen"){
        return;
    }
    this.shadowRoot.querySelector("#ajax").url = MyAppGlobals.apiPath + '/api/v1/bootcamp/dosen';
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

  _addDosen(){
      window.history.pushState({},null,'inputdosen/0');
      window.dispatchEvent(new CustomEvent('location-changed'));
  }

  _checkData(dosen){
    this.push('data', dosen)
  }

  handleFullResponse(e){
    var data = e.detail.response;
    this.data = data.data;
    console.log(this.data);
    
  }

}

window.customElements.define('dosen-list', Dosen);