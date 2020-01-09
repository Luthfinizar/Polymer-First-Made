import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import  '@polymer/app-layout/app-header/app-header.js';
import  '@polymer/paper-icon-button/paper-icon-button.js';
import  '@polymer/iron-icons/iron-icons.js';
import  '@polymer/app-layout/app-header-layout/app-header-layout.js';
import  '@polymer/iron-ajax/iron-ajax.js';

class MahasiswaInput extends PolymerElement{
    static get template(){
        return html`
            <!-- CSS untuk halaman ini saja -->
            <style include="shared-styles">
            :host {
                display: 'block',
                padding: 10px,
            }
            </style>
            <iron-ajax
              id="ajax"
              handle-as="json"
              on-response="handleFullResponse"
              on-error="errorResponses">
            </iron-ajax>

            <iron-ajax
              id="ajaxPostPut"
              handle-as="json"
              on-response="handlePostPutResponse"
              on-error="errorResponses">
            </iron-ajax>

            <iron-ajax
              id="ajaxDelete"
              handle-as="json"
              on-response="handleDeleteResponse"
              on-error="errorResponses">
            </iron-ajax>

            <app-header-layout>
                <app-header slot = "header" fuxed condenses effects="waterfall">
                    <app-toolbar>
                        <paper-icon-button icon="close" on-tap="_closeTab"></paper-icon-button>
                        <div main-title>Mahasiswa</div>

                    </app-toolbar>
                </app-header>
                <div class= "card">
                    <h3>Masukkan Data</h3>
                    <paper-input name="npm" class="input-form" label="npm" value="[[data.npm]]"></paper-input>
                    <paper-input name="nama" class="input-form" label="nama" value="[[data.nama]]"></paper-input>
                    <paper-input name="kelas" class="input-form" label="kelas" value="[[data.kelas]]"></paper-input>
                    <paper-button class="button" on-tap="_add">Submit</paper-button>
                    <paper-button class="button" on-tap="_clear">clear</paper-button>
                    <paper-button class="button" on-tap="_delete">delete</paper-button>
                </div>
            </app-header-layout>
        `;
    }

    
    static get properties(){
        return{
            data:{
                type:Object,
                value:[
                ],
            },
            mahasiswa:{
                type:Object,
                notify:true,
                observer:"_checkData"
            },
            page:String,
            route:{
              type: Object,
            },
        };
    }
    static get observers(){
        return [
            '_computeView(route,page)'
        ];
    }
    _computeView(route,page){
        let path = route.path.split("/");
      
        if (path[path.length-1] !== 0) {
          this.shadowRoot.querySelector("#ajax").url = MyAppGlobals.apiPath + '/api/v1/bootcamp/mahasiswa/' + path[path.length-1]
          this.shadowRoot.querySelector("#ajax").method = "GET";
          this.shadowRoot.querySelector("#ajax").generateRequest();
        }
      }

      _add(){
        let dataID = this.route.path.split("/");
        let inputs = this.shadowRoot.querySelectorAll('.input-form');
        let data = {};

        for(let i=0;i<inputs.length;i++){
            if(inputs.value == ""){
                return;
            }
            data[inputs[i].getAttribute("name")] = inputs[i].value;
        
            if (dataID[dataID.length-1] !== "0") { //UPDATE
            this.shadowRoot.querySelector("#ajaxPostPut").url = MyAppGlobals.apiPath + '/api/v1/bootcamp/mahasiswa/' + dataID[dataID.length-1];
            this.shadowRoot.querySelector("#ajaxPostPut").method = "PUT";
            this.shadowRoot.querySelector("#ajaxPostPut").body = JSON.stringify(data)
            inputs[i].value = ""
            }else{ //INSERT
            this.shadowRoot.querySelector("#ajaxPostPut").url = MyAppGlobals.apiPath + '/api/v1/bootcamp/mahasiswa' ;
            this.shadowRoot.querySelector("#ajaxPostPut").method = "POST";
            this.shadowRoot.querySelector("#ajaxPostPut").body = JSON.stringify(data)
            inputs[i].value = ""
            }
        }
        this.shadowRoot.querySelector("#ajaxPostPut").generateRequest();
    }

    // _add(){
    //     // let npm = this.shadowRoot.querySelector("#npm").value;
    //     // let nama = this.shadowRoot.querySelector("#nama").value;
    //     // let kelas = this.shadowRoot.querySelector("#kelas").value;
    //     // var data ={
    //     //     npm : npm,
    //     //     nama: nama,
    //     //     kelas : kelas
    //     // }
    //     // console.log("object data");
    //     // console.log(data);

    //     // console.log('sting JSON');
    //     // console.log(JSON.stringify(data));
    //     let inputs = this.shadowRoot.querySelectorAll('.input-form');
    //     let data = {};
    //      for(let i=0; i<inputs.length;i++){
    //          if(inputs.value == ""){
    //              return;
    //          }
    //          data[inputs[i].getAttribute("name")] = inputs[i].value;
    //      }
    //      console.log(data);
    //      this.set('mahasiswa',data);
    //      let json = JSON.stringify(data);
    //      console.log(json);
    // }

    _delete(e){
        let path = this.route.path.split("/");
      
        if (path[path.length-1] !== 0) {
          this.shadowRoot.querySelector("#ajaxDelete").url = MyAppGlobals.apiPath + '/api/v1/bootcamp/mahasiswa/' + path[path.length-1]
          this.shadowRoot.querySelector("#ajaxDelete").method = "DELETE";
          this.shadowRoot.querySelector("#ajaxDelete").generateRequest();
        }
      }

    _clear(){
        window.history.pushState({}, null, '/inputmahasiswa/0');
        window.dispatchEvent(new CustomEvent('location-changed'));
      }

    _closeTab(){
        window.history.pushState({},null,'/mahasiswalist');
        window.dispatchEvent(new CustomEvent('location-changed'));
    }

    // ajax fuction
    handleFullResponse(e){
        let data = e.detail.response.data;
        this.set('data',data);
    }
  
    handlePostPutResponse(e){
    let data = e.detail.response.data;
    this.set('data',data);
   //window.history.pushState({}, null, '/ubahmahasiswa/'+data['npm']);
    window.history.pushState({}, null, '/mahasiswalist/');
    window.dispatchEvent(new CustomEvent('location-changed'));
    }

    handleDeleteResponse(e){
    let response = e.detail.response || null;
    if (!response){
        return;
    }
    window.history.pushState({}, null, '/mahasiswalist');
    window.dispatchEvent(new CustomEvent('location-changed'));
    }

}

window.customElements.define('mahasiswa-input', MahasiswaInput);