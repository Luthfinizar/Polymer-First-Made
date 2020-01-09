import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button.js';
import './my-icons.js';
import './shared-styles.js';
import '@polymer/iron-image/iron-image.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }
        app-toolbar{
          background-color:"##FF69B4";
        } 

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 30px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: "#6495ED";
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar><center><iron-icon icon="card-membership"></iron-icon> Campus Website <iron-icon icon="card-membership"></iron-icon></center></app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
         
          <center><img src="../images/a.png" alt="icon" width="130" height="auto" padding-bottom="50"></center>
            <a name="mahasiswalist" href="[[rootPath]]mahasiswalist"><iron-icon icon="supervisor-account"></iron-icon>Data Mahasiswa</a>
            <a name="matakuliahlist" href="[[rootPath]]matakuliahlist"><iron-icon icon="book"></iron-icon>Data Matakuliah</a>
            <a name="listnilai" href="[[rootPath]]listnilai"><iron-icon icon="content-paste"></iron-icon>Nilai Mahasiswa</a>
            <a name="listdosen" href="[[rootPath]]listdosen"><iron-icon icon="perm-identity"></iron-icon>Data Dosen </a>
            <a name="listmatkuldosen" href="[[rootPath]]listdosenmatkul"><iron-icon icon="work"></iron-icon>Data Ajar Dosen</a>
            <a name="listuser" href="[[rootPath]]listuser"><iron-icon icon="assignment-ind"></iron-icon>pengguna Akun</a>
       <!-- <paper-button name="listdosen" href="[[rootPath]]listdosen" toggles raised><iron-icon icon="favorite"></iron-icon>toggles</paper-button> -->
    
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

        <!--
          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <div main-title="">My App</div>
            </app-toolbar>
          </app-header> -->

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <!-- <my-view1 name="view1"></my-view1>
            <my-view2 name="view2"></my-view2>
            <my-view3 name="view3"></my-view3> -->
            
            <!-- Tabel Mahasiswa -->
            <mahasiswa-input mahasiswa="{{mahasiwa}}" name ="inputmahasiswa" route="[[route]]" page="[[page]]"></mahasiswa-input>
            <mahasiswa-input mahasiswa="{{mahasiwa}}" name ="ubahmahasiswa" route="[[route]]" page="[[page]]"></mahasiswa-input>
            <mahasiswa-list mahasiswa="{{mahasiwa}}" name ="mahasiswalist" route="[[route]]" page="[[page]]"></mahasiswa-list>
            <!-- Tabel Matakuliah -->
            <matakuliah-input matakuliah="{{matakuliah}}" name="inputmatakuliah" route="[[route]]" page="[[page]]"></matakuliah-input>
            <matakuliah-list matakuliah="{{matakuliah}}" name ="matakuliahlist" route="[[route]]" page="[[page]]"></matakuliah-list>
            <matakuliah-input matakuliah="{{matakuliah}}" name ="ubahmatakuliah" route="[[route]]" page="[[page]]"></matakuliah-input>
            <!-- Tabel Nilai -->
            <nilai-list nilai="{{nilai}}" name ="listnilai" route="[[route]]" page="[[page]]"></nilai-list>
            <nilai-input nilai="{{nilai}}" name="inputnilai" route="[[route]]" page="[[page]]"></nilai-input>
            <nilai-input nilai="{{nilai}}" name="ubahnilai" route="[[route]]" page="[[page]]"></nilai-input>
            <!-- Tabel Dosen -->
            <dosen-list dosen="{{dosen}}" name ="listdosen" route="[[route]]" page="[[page]]"></dosen-list>
            <dosen-input dosen="{{dosen}}" name="inputdosen" route="[[route]]" page="[[page]]"></dosen-input>
            <dosen-input dosen="{{dosen}}" name="ubahdosen" route="[[route]]" page="[[page]]"></dosen-input>
            <!-- Tabel Dosen Ajar-->
            <dosenmatkul-list dosenmatkul="{{dosenmatkul}}" name ="listdosenmatkul" route="[[route]]" page="[[page]]"></dosenmatkul-list>
            <dosenmatkul-input dosenmatkul="{{dosenmatkul}}" name="inputdosenmatkul" route="[[route]]" page="[[page]]"></dosenmatkul-input>
            <dosenmatkul-input dosenmatkul="{{dosenmatkul}}" name="ubahdosenmatkul" route="[[route]]" page="[[page]]"></dosenmatkul-input>
             <!-- Tabel USER-->
             <user-list user="{{user}}" name ="listuser" route="[[route]]" page="[[page]]"></user-list>
             <user-input user="{{user}}" name="inputuser" route="[[route]]" page="[[page]]"></user-input>
             <user-input user="{{user}}" name="ubahuser" route="[[route]]" page="[[page]]"></user-input>
            
             <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'mahasiswalist';
    // } else if (['view1', 'view2', 'view3','mahasiswainput','mahasiswalist','matakuliahlist','nilailist','matakuliahinput','nilaiinput'].indexOf(page) !== -1) {
    //   this.page = page;
    } else if (['inputmahasiswa', 'ubahmahasiswa','mahasiswalist',
                'matakuliahlist', 'inputmatakuliah', 'ubahmatakuliah',
                'listnilai','inputnilai','ubahnilai',
                'listdosen','inputdosen','ubahdosen',
                'listdosenmatkul','inputdosenmatkul','ubahdosenmatkul',
                'listuser','inputuser','ubahuser',
              ].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
   
    switch (page) {
      case 'inputmahasiswa':
        import('./mahasiswa-input.js');
        break;
      case 'ubahmahasiswa':
        import('./mahasiswa-input.js');
        break;
      case 'mahasiswalist':
        import('./mahasiswa-list.js');
        break;

      case 'matakuliahlist':
        import('./matakuliah-list.js');
        break;  
      case 'ubahmatakuliah':
        import('./matakuliah-input.js');
        break;  
      case 'inputmatakuliah':
        import('./matakuliah-input.js');
        break; 

      case 'listnilai':
        import('./nilai-list.js');
        break; 
      case 'inputnilai':
        import('./nilai-input.js');
        break;   
      case 'ubahnilai':
        import('./nilai-input.js');
        break;   

      case 'listdosen':
        import('./dosen-list.js');
        break; 
      case 'inputdosen':
        import('./dosen-input.js');
        break;   
      case 'ubahdosen':
        import('./dosen-input.js');
        break;   

      case 'listdosenmatkul':
        import('./dosenmatkul-list.js');
        break; 
      case 'inputdosenmatkul':
        import('./dosenmatkul-input.js');
        break;   
      case 'ubahdosenmatkul':
        import('./dosenmatkul-input.js');
        break;   

        case 'listuser':
        import('./user-list.js');
        break; 
      case 'inputuser':
        import('./user-input.js');
        break;   
      case 'ubahuser':
        import('./user-input.js');
        break;   
        
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);