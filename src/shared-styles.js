/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import '@polymer/polymer/polymer-element.js';

const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      .card {
        margin: 30px;
        margin-right: 60px;
        padding-left: 20px;
        padding-top: 10px;
        color: #000;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }
      .carddata {
        margin: 1px;
        padding-left: 20px;
        border-radius: 5px;
        background-color: #fff;
        color:#000;
        font-size:18px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }
      a{
        text-decoration:none;

      }
      .cardheader {
        margin: 1px;
        padding-left: 20px;
        border-radius: 5px;
        background-color: #87CEFA;
        color:#000;
        font-size:18px;
        font-weight:bold;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }
      .circle {
        display: inline-block;
        width: 64px;
        height: 64px;
        text-align: center;
        color: #555;
        border-radius: 50%;
        background: #ddd;
        font-size: 30px;
        line-height: 64px;
      }
      
      .isidata{
        width:100%;
        border-right:2px solid;
      }
      .borderkiri{
        width:100%;
        border-left:2px solid;
        border-right:2px solid;
      }
      .container-header{
        margin-left: 30px,
       }
      .button{
      background-color: var(--paper-indigo-500);
      color: white;
      margin: 20px
       }
       .label {
        @apply --layout-flex;
        line-height: 24px;
        margin: 8px;
      }
      .rapihs{
        paddingTop: 10,
      }
      h1 {
        margin: 16px;
        color: #212121;
        font-size: 22px;
      }
      app-header {
        color: 	#00FFFF;
        background-color:#00008B;
      } 
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
