define([app_view + "/util"], function($util) {
  var type = "datacenter";
  var _labelWidth = 100;
  var _field = "dc_hosts";
  function _addMap(_idx) {
    if (!_idx) _idx = $$(type + "_map_list").getChildViews().length;
    $$(type + "_map_list").addView({
      view: "fieldset",
      label: "Host",
      body: {
        rows: [
          {
            view: "text",
            label: "Name",
            labelWidth: _labelWidth,
            name: _field + "." + _idx + ".name"
          },
          {
            view: "select",
            label: "Record Type",
            labelWidth: _labelWidth,
            name: _field + "." + _idx + ".type",
            options: ["A", "CNAME"]
          },

          {
            view: "text",
            label: "Value",
            labelWidth: _labelWidth,
            name: _field + "." + _idx + ".value"
          },
          {
            view: "select",
            label: "Address Type",
            labelWidth: _labelWidth,
            name: _field + "." + _idx + ".address_type",
            options: ["ipv4", "ipv6"]
          },
          {
            view: "counter",
            label: "Weight",
            labelWidth: _labelWidth,
            name: _field + "." + _idx + ".weight"
          },
          {
            view: "checkbox",
            label: "Master",
            labelWidth: _labelWidth,
            name: _field + "." + _idx + ".master"
          }
        ]
      }
    });
  }
  function _update_form_by_id(id) {
    webix
      .ajax()
      .get(api_version + "?action=" + type + ".get&id=" + id, function(text, raw) {
        var _res = raw.json();
        console.log(_res);
        if (_res && _res.result && _res.data) {
          var _data = _res.data;
          //          var _field = "map_geos";
          if (_data[_field]) {
            if (typeof _data[_field] === "string")
              _data[_field] = JSON.parse(_data[_field]);

            if (
              _data[_field] &&
              _data[_field].length &&
              _data[_field].length > 0
            ) {
              _data[_field].forEach(function(_v, _idx) {
                _addMap(_idx);
              });
            }
            var _data1 = {};
            _data1[_field] = _data[_field];

            var _data2 = $util.flattenObject(_data1);

            if (_data2) {
              Object.assign(_data, _data2);
              delete _data[_field];
            }
          }
          $$(type + "_form").parse(_res.data);
        }
      });
  }
  var _form = {
    view: "form",
    scroll: true,
    id: type + "_form",
    elementsConfig: {
      labelPosition: "left",
      labelWidth: 100
    },
    elements: [
      { view: "text", id: type + "_form_id", label: "ID", name: "id" },
      {
        cols: [
          {},
          {
            view: "button",
            label: "Get",
            autowidth: true,
            click: function() {
              var _id = $$(type + "_form_id").getValue();
              _id && _update_form_by_id(_id);
            }
          }
        ]
      },

      { view: "text", label: "Dns ID", name: "dns_id" },
      { view: "text", label: "Name", name: "name" },
      { view: "text", label: "Desc", name: "desc" },
      { view: "checkbox", label: "Status", name: "status" },
      {
        cols: [
          {},
          {
            view: "button",
            label: "Add Host",
            click: function() {
              _addMap();
            }
          }
        ]
      },
      {
        id: type + "_map_list",
        rows: []
      }
    ]
  };
  var _control = {
    cols: [
      {},
      {
        view: "button",
        label: "Remove",
        autowidth: true,
        click: function() {
          var _id = $$(type + "_form_id").getValue();
          _id &&
            webix
              .ajax()
              .post(api_version + "?action=" + type + ".delete", { id: _id }, function(
                text,
                raw
              ) {
                var _res = raw.json();
                console.log(_res);
              });
        }
      },
      {
        view: "button",
        label: "Save",
        autowidth: true,
        click: function() {
          console.log("save");
          var _values = $$(type + "_form").getValues();
          Object.keys(_values).forEach(function(_k) {
            if (/^dc_hosts\./.test(_k)) {
              objectPath.set(_values, _k, _values[_k]);
              delete _values[_k];
            }
          });
          webix
            .ajax()
            .post(api_version + "?action=" + type + ".update", _values, function(
              text,
              raw
            ) {
              var _res = raw.json();
              console.log(_res);
            });
        }
      }
    ]
  };
  var _layout = {
    rows: [_form, _control]
  };
  return {
    $ui: _layout,
    $oninit: function(view, scope) {
      var _params = $util.params();
      console.log(_params);
      var type1 = type + ".edit";
      if (_params[type1] && _params[type1].id) {
        _update_form_by_id(_params[type1].id);
      }
    }
  };
});
