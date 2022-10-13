/**
 * @license
 * Webix Pivot v.8.0.5
 * This software is covered by Webix Trial License.
 * Usage without proper license is prohibited.
 * (c) XB Software Ltd.
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e():"function"==typeof define&&define.amd?define(e):e()}(0,function(){"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}function isArray(t){return Array.isArray?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t)}function isUndefined(t){return void 0===t}function extend(t,e,n){for(var r in e)t[r]&&!n||(t[r]=e[r]);return t}var seed;function uid(){return seed||(seed=(new Date).valueOf()),++seed}function getTotalColumnId(t,e){return"$webixtotal"+t.$divider+e}function getValues(t,e){var n,r,i=[];for(n=0;n<e.length;n++)r=t[e[n]],isNaN(parseFloat(r))||i.push(r);return i}function addTotalColumns(t,e){var n,r,i,o,a,s,u,l=[];if((s=e[0].header.length)<2)return e;for(i in n=(r=getTotalGroups(t,e)).groups,t._pivotColumnGroups=n){for(o={id:getTotalColumnId(t,i),header:[],sort:"int",width:t.config.columnWidth,format:t.config.format},a=0;a<s-1;a++)a||l.length?o.header.push(""):o.header.push({name:"total",rowspan:s-1,colspan:r.count});u=i.split(t.$divider),o.header.push({name:i,operation:u[0],text:u[1]}),l.push(o)}return e.concat(l)}function getTotalGroups(t,e){var n,r,i,o,a,s={},u=0;for(r=0;r<e.length;r++)i=(a=e[r].id.split(t.$divider)).pop(),"sum"!=(o=a.pop())&&"sumOnly"==t.config.totalColumn||(s[n=o+t.$divider+i]||(u++,s[n]={operation:o,ids:[],format:e.format}),s[n].ids.push(e[r].id));return{groups:s,count:u}}function addTotalData(t,e){var n,r,i,o=t._pivotColumnGroups;if(o)for(i in o)for(r=o[i].ids,n=0;n<e.length;n++){var a=void 0,s=getTotalColumnId(t,i),u="",l=getValues(e[n],r);l.length&&(a=t._pivotOperations.getTotal(i.split(t.$divider)[0]))&&(u=a.call(t,l,s,e[n])),e[n][s]=u,e[n].data&&(e[n].data=addTotalData(t,e[n].data))}return e}var sortConfig={dir:1,as:function(t,e){return isNum(t)&&isNum(e)?sorting["int"](t,e):sorting.string(t,e)}},sorting={date:function(t,e){return(e-=0)<(t-=0)?1:t<e?-1:0},"int":function(t,e){return(e*=1)<(t*=1)?1:t<e?-1:0},string:function(t,e){return e?t?(t=t.toString().toLowerCase(),(e=e.toString().toLowerCase())<t?1:t<e?-1:0):-1:1}};function processHeader(t,e){var n,r,i,o,a=t.config.structure.values;for(e=getHeader(t,e=sortHeader(t.config.structure,e)),n=0;n<e.length;n++){var s=[];for(r=0;r<e[n].length;r++)s.push(e[n][r].name);o=null;var u=s[s.length-1].split(t.$divider);for(r=0;r<a.length&&!o;r++)if(a[r].operation)for(i=0;i<a[r].operation.length;i++)a[r].name==u[1]&&a[r].operation[i]==u[0]&&(o=a[r]);e[n]={id:s.join(t.$divider),header:e[n]},e[n].format=o&&o.format?o.format:"count"!=u[0]?t.config.format:null}return e.length&&t.view&&t.view.callEvent&&t.view.callEvent("onHeaderInit",[e]),t.config.totalColumn&&e.length&&(e=addTotalColumns(t,e)),e.splice(0,0,{id:"name",template:"{common.treetable()} #name#",header:{text:void 0}}),e}function isNum(t){return!isNaN(1*t)}function setSortConfig(t,e){var n=sortConfig;return t&&(t[e]?n=t[e]:t.$default&&(n=t.$default),n.dir&&(n._dir="desc"==n.dir?-1:1),extend(n,sortConfig)),n}function sortHeader(t,e,n){var r,i,o,a,s,u=[];if(Object.keys&&!1!==t.columnSort)for(n=n||0,r=t.columns[n],s=setSortConfig(t.columnSort,r),a=Object.keys(e),n<t.columns.length&&(a=a.sort(function(t,e){return s.as(t,e)*s._dir})),n++,i=0;i<a.length;i++)o=a[i],u.push({key:o,data:sortHeader(t,e[o],n)});else for(o in e)u.push({key:o,data:sortHeader(t,e[o])});return u}function getHeader(t,e){var n,r,i,o,a,s=[];for(r=0;r<e.length;r++)if((i=e[r]).data.length){var u=getHeader(t,i.data);for(n=!1,o=0;o<u.length;o++)(a=u[o]).splice(0,0,{
name:i.key}),n||(a[0].colspan=u.length,n=!0),s.push(a)}else{var l=e[r].key.split(t.$divider);s.push([{name:e[r].key,operation:l[0],text:l[1]}])}return s}function addFooter(t,e,n){var r,i,o,a;for(i=1;i<e.length;i++){r=null,a=(o=e[i].id.split(t.$divider))[o.length-2],"sumOnly"==t.config.footer&&"sum"!=a&&(r=" ");var s=t._pivotOperations.getTotal(a);if(!r&&s){var u=t._pivotOperations.getTotalOptions(a);r={$pivotValue:calculateColumn(n,e[i].id,s,u&&u.leavesOnly),$pivotOperation:a}}else r=" ";e[i].footer=r,"object"==_typeof(t.config.footer)&&extend(e[i].footer,t.config.footer,!0)}}function calculateColumn(t,e,n,r){var i,o,a=[],s=[];for(t=filterItems(t,r),i=0;i<t.length;i++)o=t[i][e],isNaN(parseFloat(o))||(s.push(1*o),a.push(t[i]));return n(s,e,a)}function filterItems(t,e,n){n||(n=[]);for(var r=0;r<t.length;r++)e&&t[r].data?filterItems(t[r].data,e,n):n.push(t[r]);return n}function calculateItem(t,e,n){var r,i,o,a,s,u,l,f=e.header;for(r=0;r<f.length;r++){if(s=(u=(o=f[r]).split(e.divider))[u.length-2],l=t[o],a=e.operations.getOption(s,"leavesOnly"),i=e.operations.getOption(s,"ids"),a&&t.data&&(l=[],getKeyLeaves(t.data,o,l)),l){for(var c=[],p=[],h=0;h<l.length;h++){var d=l[h],v=null;"object"==_typeof(d)&&(d=d.value,v=l[h].id),(d||"0"==d)&&(c.push(d),v&&p.push(v))}c.length?t[o]=e.operations.get(s)(c,o,t,i?p:null):t[o]=""}else t[o]="";n.count++}return t}function getKeyLeaves(t,e,n){var r;for(r=0;r<t.length;r++)t[r].data?getKeyLeaves(t[r].data,e,n):n.push(t[r][e])}function setMinMax(t,e){var n,r,i,o,a,s,u,l,f=e.header,c=e.max,p=e.min,h=e.values;if(!p&&!c)return t;for(t.$cellCss||(t.$cellCss={}),n=0;n<h.length;n++){for(l=h[n],o=[],a=-99999999,s=[],u=99999999,r=0;r<f.length;r++)i=f[r],isNaN(t[i])||-1!==i.indexOf(l.name)&&(c&&t[i]>a?(o=[i],a=t[i]):t[i]==a&&o.push(i),p&&t[i]<u?(s=[i],u=t[i]):t[i]==u&&s.push(i));for(r=0;r<s.length;r++)t.$cellCss[s[r]]="webix_min";for(r=0;r<o.length;r++)t.$cellCss[o[r]]="webix_max"}return t}function numHelper(t,e,n){if("object"==_typeof(t)){for(var r=0;r<t.length;r++)if(t[r]=parseFloat(t[r]),isNaN(t[r]))return!0}else if(t=parseFloat(t),isNaN(t))return!0;return!isNaN(e)&&n(t,e)}var rules={contains:function(t,e){return 0<=e.toLowerCase().indexOf(t.toString().toLowerCase())},equal:function(t,e){return numHelper(t,e,function(t,e){return t==e})},not_equal:function(t,e){return numHelper(t,e,function(t,e){return t!=e})},less:function(t,e){return numHelper(t,e,function(t,e){return e<t})},less_equal:function(t,e){return numHelper(t,e,function(t,e){return e<=t})},more:function(t,e){return numHelper(t,e,function(t,e){return t<e})},more_equal:function(t,e){return numHelper(t,e,function(t,e){return t<=e})},multi:function(t,e){"string"==typeof t&&(t=t.split(","));for(var n=0;n<t.length;n++)if(e==t[n])return!0;return!1},range:function(t,e){return numHelper(t,e,function(t,e){return e<t[1]&&e>=t[0]})},range_inc:function(t,e){return numHelper(t,e,function(t,e){return e<=t[1]&&e>=t[0]})}};function setFilterValues(t){t=t||[];for(var e=0;e<t.length;e++){var n=t[e],r=n.fvalue;"function"==typeof r?n.func=r:"select"==n.type||"richselect"==n.type?(n.func=function(t,e){return t==e},r=r||""):-1<n.type.indexOf("multi")?n.func=rules.multi:"object"===_typeof(r)?n.func=rules.range:"="==r.substr(0,1)?(n.func=rules.equal,r=r.substr(1)):"<>"==r.substr(0,2)?(n.func=rules.not_equal,r=r.substr(2)):">="==r.substr(0,2)?(n.func=rules.more_equal,r=r.substr(2)):">"==r.substr(0,1)?(n.func=rules.more,r=r.substr(1)):"<="==r.substr(0,2)?(n.func=rules.less_equal,r=r.substr(2)):"<"==r.substr(0,1)?(n.func=rules.less,r=r.substr(1)):0<r.indexOf("...")?(n.func=rules.range,r=r.split("...")):0<r.indexOf("..")?(n.func=rules.range_inc,r=r.split("..")):"datepicker"==n.type?n.func=function(t,e){return t==e}:n.func=rules.contains,n.fvalue=r}}function formatFilterValues(t){var e,n;for(t=t||[],e=0;e<t.length;e++)"string"==typeof(n=t[e].fvalue||t[e].value||"")&&n.trim&&(n=n.trim()),t[e].fvalue=n}function filterItem(t,e,n){var r,i;if(t)for(r=0;r<t.length;r++)if((i=t[r]).fvalue){var o=n&&n[i.name]?n[i.name]:i.name;if(isUndefined(e[o]))return!1;var a=e[o];if(0!==!a&&!a
)return!1;var s=a.toString();if(!i.func(i.fvalue,s))return!1}return!0}var Data=function(){function n(t,e){_classCallCheck(this,n),this.master=t,this.config=e,this.count=0}return _createClass(n,[{key:"process",value:function(t,e){var n,r,i,o,a;this.watch=new Date;var s=this.structure;for(s._header=[],s._header_hash={},formatFilterValues(s.filters),setFilterValues(s.filters),o=0;o<s.values.length;o++)s.values[o].operation=s.values[o].operation||[this.config.defaultOperation],isArray(s.values[o].operation)||(s.values[o].operation=[s.values[o].operation]);for(n=[],o=0;o<s.columns.length;o++)n[o]="object"==_typeof(s.columns[o])?s.columns[o].id||o:s.columns[o];return r=s.rows.concat(n),a=this.group(t,e,r),i={},a=0<s.rows.length?this.processRows(a,s.rows,s,i,""):(this.processColumns(a,n,s,i),[]),i=processHeader(this.master,i),a=addTotalData(this.master,a),this.config.footer&&addFooter(this.master,i,a),delete s._header,delete s._header_hash,{header:i,data:a}}},{key:"processColumns",value:function(t,e,n,r,i,o){var a;if(i=i||{$source:[]},0<e.length)for(var s in o=o||"",t)r[s]||(r[s]={}),t[s]=this.processColumns(t[s],e.slice(1),n,r[s],i,(0<o.length?o+this.divider:"")+s);else{var u=n.values;for(var l in t){i.$source.push(l);for(var f=0;f<u.length;f++)for(var c=0;c<u[f].operation.length;c++)a=void 0!==o?o+this.divider+u[f].operation[c]+this.divider+u[f].name:u[f].operation[c]+this.divider+u[f].name,n._header_hash[a]||(n._header.push(a),n._header_hash[a]=!0),isUndefined(i[a])&&(i[a]=[],r[u[f].operation[c]+this.divider+u[f].name]={}),i[a].push({value:t[l][u[f].name],id:l})}}return i}},{key:"processRows",value:function(t,e,n,r,i){var o,a,s,u,l,f=[];if(1<e.length){for(o in t)t[o]=this.processRows(t[o],e.slice(1),n,r,i+"_"+o);var c=n._header;for(o in t){for(a={data:t[o]},s=0;s<a.data.length;s++)for(u=0;u<c.length;u++)isUndefined(a[l=c[u]])&&(a[l]=[]),a[l].push(a.data[s][l]);this.setItemValues(a),this.master.config.stableRowId&&(a.id=i+"_"+o),a.name=o,a.open=!0,f.push(a)}}else for(o in t)(a=this.processColumns(t[o],n.columns,n,r)).name=o,this.master.config.stableRowId&&(a.id=i+"_"+o),this.setItemValues(a),f.push(a);return f}},{key:"setItemValues",value:function(t){return t=setMinMax(t=calculateItem(t,{header:this.structure._header,divider:this.divider,operations:this.operations},this),{header:this.structure._header,max:this.config.max,min:this.config.min,values:this.structure.values}),5e4<this.count&&(this.count=0,this.config.ping&&this.config.ping.call(this,this.watch)),t}},{key:"group",value:function(t,e,n){var r,i,o={};for(r=0;r<e.length;r++)(i=t[e[r]])&&filterItem(this.structure.filters,i,this.config.filterMap)&&this.groupItem(o,i,n);return o}},{key:"groupItem",value:function(t,e,n){if(n.length){var r=e[n[0]];if(void 0===r)return null;isUndefined(t[r])&&(t[r]={}),this.groupItem(t[r],e,n.slice(1))}else t[e.id]=e}},{key:"filterItem",value:function(t){for(var e=this.structure.filters||[],n=0;n<e.length;n++){var r=e[n];if(r.fvalue){if(isUndefined(t[r.name]))return!1;var i=t[r.name].toString().toLowerCase();if(!r.func(r.fvalue,i))return!1}}return!0}},{key:"operations",get:function(){return this.master._pivotOperations}},{key:"divider",get:function(){return this.master.$divider}},{key:"structure",get:function(){return this.config.structure}}]),n}(),operations={sum:function(t){for(var e=0,n=0;n<t.length;n++){var r=t[n];r=parseFloat(r,10),isNaN(r)||(e+=r)}return e},count:function(t,e,n){var r=0;if(n.data)for(var i=0;i<n.data.length;i++)r+=n.data[i][e]||0;else r=t.length;return r},max:function(t){return 1==t.length?t[0]:Math.max.apply(this,t)},min:function(t){return 1==t.length?t[0]:Math.min.apply(this,t)}},totalOperations={sum:function(t){var e,n=0;for(e=0;e<t.length;e++)n+=t[e];return n},min:function(t){return 1==t.length?t[0]:Math.min.apply(null,t)},max:function(t){return 1==t.length?t[0]:Math.max.apply(null,t)},count:function(t){var e=totalOperations.sum.call(this,t);return e?parseInt(e,10):""}},Operations=function(){function Operations(){_classCallCheck(this,Operations),this.pull=extend({},operations),this.options={},this.pullTotal=extend(
{},totalOperations),this.totalOptions={}}return _createClass(Operations,[{key:"serialize",value:function(){var t={};for(var e in this.pull)t[e]=this.pull[e].toString();return t}},{key:"parse",value:function parse(str){for(var key in str)eval("this.temp = "+str[key]),this.pull[key]=this.temp}},{key:"add",value:function(t,e,n){this.pull[t]=e,n&&(this.options[t]=n)}},{key:"addTotal",value:function(t,e,n){this.pullTotal[t]=e,n&&(this.totalOptions[t]=n)}},{key:"get",value:function(t){return this.pull[t]||null}},{key:"getOptions",value:function(t){return this.options[t]||null}},{key:"getOption",value:function(t,e){return this.options[t]?this.options[t][e]:null}},{key:"getTotal",value:function(t){return this.pullTotal[t]||this.pull[t]||null}},{key:"getTotalOptions",value:function(t){return this.pullTotal[t]?this.totalOptions[t]||null:this.options[t]||null}},{key:"getTotalOption",value:function(t,e){var n=this.getTotalOptions(t);return n?n[t][e]:null}}]),Operations}(),divider="_'_",pivot;function _Pivot(t,e){this.$divider=divider,this._initOperations(),this.config=t,this.view=e,t.webWorker&&"undefined"!==!("undefined"==typeof Worker||_typeof(Worker))&&e?this._initWorker(t,e):this._pivotData=new Data(this,this.config),this.config.structure||(this.config.structure={}),extend(this.config.structure,{rows:[],columns:[],values:[],filters:[]})}function WebixPivot(t,e){_Pivot.call(this,t,e)}_Pivot.prototype={_initWorker:function(t,e){this._result=null,this._pivotWorker=new Worker(t.webWorker),this._pivotWorker.onmessage=function(t){"ping"===t.data.type?e._runPing(t.data.watch,e):e._result&&!e.$destructed&&(e.callEvent("onWebWorkerEnd",[]),t.data.id&&t.data.id!==e._result_id||(e._result(t.data.data),e._result=null))}},_runPing:function(t,e){try{this.config.ping(t)}catch(n){this._pivotWorker.terminate(),this._initWorker(this.config,e),e.callEvent("onWebWorkerEnd",[])}},_getPivotData:function(t,e,n){if(!this._pivotWorker){var r=this._pivotData.process(t,e);return n&&n(r),r}var i=this._result_id=webix.uid();this._result=n;var o=[],a=this.config.structure,s=this.config.footer,u=this._pivotOperations.serialize();if(a&&(a.rows.length||a.columns.length))for(var l=e.length-1;0<=l;l--)o[l]=t[e[l]];this.callEvent("onWebWorkerStart",[]);var f=this.config.format;if("function"==typeof f){var c="x"+webix.uid();webix.i18n[c]=f,f=c}var p=!!this.config.ping;this._pivotWorker.postMessage({footer:s,structure:a,data:o,id:i,operations:u,ping:p,format:f})},_initOperations:function(){var t=this._pivotOperations=new Operations;this.operations=t.pull},addOperation:function(t,e,n){this._pivotOperations.add(t,e,n)},addTotalOperation:function(t,e,n){this._pivotOperations.addTotal(t,e,n)}},WebixPivot.prototype=extend({getData:function(t){var e,n,r,i,o=[],a={},s=this.config.structure.filters,u={},l={},f={},c=this.operations,p=[],h={};for(e=0;e<s.length;e++)-1!=s[e].type.indexOf("select")&&(l[s[e].name]=[],f[s[e].name]={});for(e=0;e<t.length;e++){if(u[n=t[e].id=t[e].id||uid()]=t[e],p.push(n),e<5)for(i in t[e])a[i]||(o.push(i),a[i]=uid());for(r in l){var d=t[e][r];isUndefined(d)||f[r][d]||(f[r][d]=1,l[r].push(d))}}for(n in h.options=l,h.fields=o,h.data=this._getPivotData(u,p),h.operations=[],c)h.operations.push(n);return h}},_Pivot.prototype),onmessage=function(t){if(pivot||(pivot=new WebixPivot(t.data.structure)),"error"===t.type)throw t;pivot.config.format=t.data.format,pivot.config.footer=t.data.footer,pivot.config.structure=t.data.structure,t.data.ping&&(pivot.config.ping=function(t){postMessage({type:"ping",watch:t})}),pivot._pivotOperations.parse(t.data.operations);var e=pivot.getData(t.data.data);postMessage({type:"data",data:e.data,id:t.data.id})}});
