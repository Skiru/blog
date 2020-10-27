// import '../css/app.css';
import * as React from "react";
import * as ReactDOM from "react-dom";
import HelloWorld from "./Components/hello-world";

// css
import '../../public/assets/css/mdb.min.css';
import '../../public/assets/css/open-iconic-bootstrap.min.css';
import '../../public/assets/css/animate.css';
import '../../public/assets/css/owl.theme.default.min.css';
import '../../public/assets/css/magnific-popup.css';
import '../../public/assets/css/aos.css';
import '../../public/assets/css/ionicons.min.css';
import '../../public/assets/css/flaticon.css';
import '../../public/assets/css/icomoon.css';
import '../../public/assets/css/style.css';
import '../../public/assets/css/purpleclouds.css';

const $ = require('jquery');
global.$ = $;

ReactDOM.render(<HelloWorld />, document.getElementById('js-react-test'));
ReactDOM.render(<HelloWorld />, document.getElementById('js-react-test2'));
