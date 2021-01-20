import React from 'react'
import { NodeEditor } from "flume";
import config from "../NodeConfig";

function NodePage()
{
    return (
        <div>
            <NodeEditor
                portTypes={config.portTypes}
                nodeTypes={config.nodeTypes}
            />

        </div>
    )
}

export default NodePage;