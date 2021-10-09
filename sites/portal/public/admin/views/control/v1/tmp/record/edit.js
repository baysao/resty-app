define([app_view + "/util"], function($util) {
  var type = "record";
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
      { view: "text", label: "Monitor ID", name: "monitor_id" },
      { view: "text", label: "Datacenter ID", name: "datacenter_id" },
      { view: "text", label: "Map ID", name: "map_id" },
      { view: "text", label: "Name", name: "name" },
      { view: "text", label: "Desc", name: "desc" },
      { view: "checkbox", label: "Status", name: "status" },
      { view: "counter", label: "TTL", name: "ttl" },
      { view: "counter", label: "Priority", name: "priority" },
      {
        view: "select",
        label: "Record Type",
        name: "type",
        options: ["A", "CNAME"]
      },
      {
        view: "select",
        label: "Routing Type",
        name: "routing_type",
        options: ["weighted", "simpleinfo"]
      }
    ]
  };
  var _control = {
    cols: [
      {},
      {
        view: "button",
        label: "Generate",
        css: "webix_primary",
        autowidth: true,
        click: function() {
          var _id = $$(type + "_form_id").getValue();
          _id &&
            webix
              .ajax()
              .post(api_version + "?action=" + type + ".gen", { id: _id }, function(
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
        label: "Remove",
        css: "webix_danger",
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
        css: "webix_primary",
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
