define([app_view + "/util"], function($util) {
  var type = "monitor";
  function _update_form_by_id(id) {
    webix
      .ajax()
      .get(api_version + "?action=" + type + ".get&id=" + id, function(text, raw) {
        var _res = raw.json();
        console.log(_res);
        if (_res && _res.result && _res.data) {
          $$(type + "_form").parse(_res.data);
        }
      });
  }
  var _form = {
    view: "form",
    id: type + "_form",
    scroll: true,
    elementsConfig: {
      labelPosition: "left",
      labelWidth: 120
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
      { view: "text", label: "Host Name", name: "vhost" },
      { view: "text", label: "Url Path", name: "url_path" },
      { view: "counter", label: "Port", name: "port" },

      { view: "checkbox", label: "Status", name: "status" },

      {
        view: "select",
        label: "Type",
        name: "monitor_type",
        options: ["http_status", "tcp_connect"]
      },
      { rows: [{ view: "multitext", label: "OK Codes", name: "ok_codes" }] },
      { view: "counter", label: "Up threshold", name: "up_thresh" },
      { view: "counter", label: "Down threshold", name: "down_thresh" },
      { view: "counter", label: "Ok threshold", name: "ok_thresh" },
      { view: "counter", label: "Interval", name: "interval" },
      { view: "counter", label: "Timeout", name: "timeout" }
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
