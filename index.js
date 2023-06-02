// const express = require('express');

import express from "express";
import fetch from "node-fetch";

// const fetch = require('node-fetch'); (technically illegal)
const app = express();
const port = 8080;



// Serve static files from the public folder
app.use(express.static('public'));

// use json for express server
app.use(express.json());

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// server route to generate images
app.post("/generate-images", async (req, res) => {

    console.log("Preparing to generate image...");

    // get prompt from request
    var prompt = req.body.prompt;

    // we'll store the URLs here
    var image_url;

    // Define the URL
    const url = 'https://umitatoaidev.openai.azure.com/dalle/text-to-image?api-version=2022-08-03-preview';

    // Define the headers
    const headers = {
        "api-key": process.env['OPENAI_API_KEY'],
        "Content-Type": "application/json"
    };

    // Define the body
    const body = {
        "caption": prompt,
        "resolution": "1024x1024"
    };

    // starting the array
    var image_urls = []

    // this for loop runs the image generation code 4 times
    // and adds an image to the image_urls array each time
    for (let i = 1; i < 5; i++) {

        try {
            // Send the request
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
            });

            const operation_location = response.headers.get('Operation-Location');
            const retry_after = response.headers.get('Retry-after');
            let status = "";

            const checkStatus = async () => {
                await new Promise(resolve => setTimeout(resolve, retry_after * 1000));

                const response = await fetch(operation_location, {
                    method: 'GET',
                    headers: headers
                });

                const data = await response.json();
                status = data.status;

                if (status !== "Succeeded") {
                    await checkStatus();
                } else {
                    image_urls[i] = data.result.contentUrl;
                    console.log(`Task succeeded. Image ${i} URL: ${image_urls[i]}\n`);

                }
            };

            await checkStatus();

        } catch (err) {
            console.log('Error: ', err);
        }

    }


    // send the image URLs back to the client in JSON
    console.log("Sending URLs");
    res.json({
        image_url_1: image_urls[1],
        image_url_2: image_urls[2],
        image_url_3: image_urls[3],
        image_url_4: image_urls[4],
    })

});