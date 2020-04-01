// jQuery
window.$ = window.jQuery = require('jquery');
// const API from import('./constants/api.js');
import * as SYSTEMCONST from './constants/api';
import { http} from './core/http-service/http-service';
// require('./core/http-service/http-service.js');

require('nicescroll');
require('admin-lte/plugins/jQueryUI/jquery-ui.js');

// // Bootstrap 4
require('bootstrap/dist/js/bootstrap.js');
require('raphael/raphael.min');
require('morris.js/morris');

require('jquery-sparkline/jquery.sparkline.js');

require('admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js');
require('admin-lte/plugins/iCheck/icheck.min.js');
require('admin-lte/plugins/jvectormap/jquery-jvectormap-world-mill-en.js');
require('jquery-knob/js/jquery.knob.js');
require('moment/min/moment.min.js');
require('bootstrap-daterangepicker/daterangepicker.js');
require('bootstrap-datepicker/dist/js/bootstrap-datepicker.js');
//require('admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.js');
//require('~admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js');
require('jquery-slimscroll/jquery.slimscroll.min.js');
require('fastclick/lib/fastclick.js');
require('select2/dist/js/select2.full.min.js');
require('admin-lte/dist/js/adminlte.js');
require('./dashboard');
// require('./demo.js');

// perso
require('admin-lte/plugins/timepicker/bootstrap-timepicker.min.js');
require('admin-lte/plugins/input-mask/jquery.inputmask.js');
require('admin-lte/plugins/input-mask/jquery.inputmask.date.extensions.js');
require('admin-lte/plugins/input-mask/jquery.inputmask.extensions.js');
// require('admin-lte/plugins/jqvmap/jquery.vmap');
// require('admin-lte/plugins/jqvmap/maps/jquery.vmap.world');
// require('admin-lte/plugins/jquery-knob/jquery.knob.min');

require('admin-lte/bower_components/moment/min/moment.min.js');
require('admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker.js');
require('admin-lte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js');
require('admin-lte/bower_components/moment/min/moment.min.js');
require('admin-lte/bower_components/jquery/dist/jquery.min.js');

// require('moment/moment');
// require('admin-lte/plugins/daterangepicker/daterangepicker');
require('admin-lte/plugins/summernote/summernote-bs4');
// require('admin-lte/plugins/overlayScrollbars/js/jquery.overlayScrollbars');
// require('admin-lte/plugins/fastclick/fastclick');
// require('admin-lte/dist/js/adminlte');
// require('admin-lte/dist/js/pages/dashboard2');
// require('admin-lte/dist/js/demo');
require('admin-lte/plugins/iCheck/icheck.min.js');
require('./components/user/manage/index');

import '../style/app.scss';
