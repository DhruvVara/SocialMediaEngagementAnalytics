const express = require('express');
const app = express();
const { EventSource } = require('eventsource');
const path = require('path');
const cors = require('cors');
const LangflowClient = require('./langflow');

app.use(cors())
require("dotenv").config({ path: "./.env" });


const applicationToken = process.env.TOKEN;
const langflowClient = new LangflowClient(process.env.LANGFLOW_URL, applicationToken);

app.use(express.json());

app.post('/process', async (req, res) => {
    let { inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false } = req.body;
    const flowIdOrName = '1ed253a4-ac44-476e-898c-429deaa3e93c';
    const langflowId = 'd0350cb2-efb4-47b0-b34d-5f21bb3fa289';

    try {
        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            inputValue,
            inputType,
            outputType,
            tweaks = {},
            stream,
            (data) => {
                console.log("Received:", data.chunk);
            },
            (message) => {
                console.log("Stream Closed:", message);
            },
            (error) => {
                console.log("Stream Error:", error);
            }
        );

        if (!stream && response && response.outputs) {
            const flowOutputs = response.outputs[0];
            const firstComponentOutputs = flowOutputs.outputs[0];
            const output = firstComponentOutputs.outputs.message;
            res.json(output);
        } else {
            console.log("123")
            res.json(response);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'template/index.html'));
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
