define([], function () {
  return webix
    .ajax("/portal/api/client/v1?action=config.get")
    .then(function (_res) {
      return {
        $ui: {
          template: _res.json().app_name,
        },
        $oninit: function (_view, _scope) {},
      };
    });
});
