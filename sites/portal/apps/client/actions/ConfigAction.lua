local gbc = cc.import("#gbc")
local Action = cc.class("PortalClientConfig", gbc.ActionBase)
local env = require "env"
function Action:getAction(args)
    return env
end

return Action
