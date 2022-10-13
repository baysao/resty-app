local _config = {
    server = {
        nginx = {
            port = "80"
        }
    },
    templates = {},
    apps = {
        client = "apps/client"
    },
    supervisor = [[
    ]]
}
return _config
