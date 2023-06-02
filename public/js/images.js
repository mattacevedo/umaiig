async function getImages() {

    // show loading icon
    startLoading();

    // get the generation prompt from the user
    const prompt = document.getElementById("textfield").value;

    var image_urls = [];

    // make the request to the server to generate the images
    // get the URLs back as response
    const response = await fetch("/generate-images", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: prompt
        }),
    });

    if (!response.ok) {
        console.error('HTTP error', response.status);
    } else {
        const data = await response.json();

        var image_urls = [];

        // set the image URLs
        image_urls[1] = data.image_url_1;
        image_urls[2] = data.image_url_2;
        image_urls[3] = data.image_url_3;
        image_urls[4] = data.image_url_4;

    }

    // show the image gallery and populate the images
    const imageZone = document.getElementById("image_gallery");
    const image1 = document.getElementById("generated_1");
    const image2 = document.getElementById("generated_2");
    const image3 = document.getElementById("generated_3");
    const image4 = document.getElementById("generated_4");

    image1.src = image_urls[1];
    image2.src = image_urls[2];
    image3.src = image_urls[3];
    image4.src = image_urls[4];

    imageZone.style.visibility = "visible";

    // activate the download buttons  
    const download_1 = document.getElementById("download_1");
    const download_2 = document.getElementById("download_2");
    const download_3 = document.getElementById("download_3");
    const download_4 = document.getElementById("download_4");
    download_1.href = image1.src;
    download_2.href = image2.src;
    download_3.href = image3.src;
    download_4.href = image4.src;

    // stop the loading gif
    stopLoading();
}

function makeBig1() {

    // get element IDs
    const grayout = document.getElementById("grayout");
    const enlarged_image_container = document.getElementById("enlarged_image_container");
    const big_image = document.getElementById("big_image");
    const image1 = document.getElementById("generated_1");

    // show the grayout and the big image
    grayout.style.display = "inline";
    enlarged_image_container.style.display = "inline";

    // set the correct URL to the big image
    big_image.src = image1.src;

}


function makeBig2() {

    const grayout = document.getElementById("grayout");
    const enlarged_image_container = document.getElementById("enlarged_image_container");
    const big_image = document.getElementById("big_image");
    const image2 = document.getElementById("generated_2");

    grayout.style.display = "inline";
    enlarged_image_container.style.display = "inline";

    big_image.src = image2.src;

}

function makeBig3() {

    const grayout = document.getElementById("grayout");
    const enlarged_image_container = document.getElementById("enlarged_image_container");
    const big_image = document.getElementById("big_image");
    const image3 = document.getElementById("generated_3");

    grayout.style.display = "inline";
    enlarged_image_container.style.display = "inline";

    big_image.src = image3.src;

}

function makeBig4() {

    const grayout = document.getElementById("grayout");
    const enlarged_image_container = document.getElementById("enlarged_image_container");
    const big_image = document.getElementById("big_image");
    const image4 = document.getElementById("generated_4");

    grayout.style.display = "inline";
    enlarged_image_container.style.display = "inline";

    big_image.src = image4.src;

}

function closeMakeBig() {
    
    // get element IDs
    const grayout = document.getElementById("grayout");
    const enlarged_image_container = document.getElementById("enlarged_image_container");
    
    // hide the grayout and the big image
    grayout.style.display = "none";
    enlarged_image_container.style.display = "none";

}

function startLoading() {
    
    // get element IDs
    const grayout = document.getElementById("grayout");
    const loading = document.getElementById("loading");

    // show the hidden elements
    grayout.style.display = "inline";
    loading.style.display = "flex";

    // disable the button
    const button = document.getElementById("submit_button");
    button.disabled = true;

    // disable the textfield
    const textfield = document.getElementById("textfield");
    textfield.disabled = true;

}

function stopLoading() {
    
    // get element IDs
    const grayout = document.getElementById("grayout");
    const loading = document.getElementById("loading");

    // hide the grayout and loading gif
    grayout.style.display = "none";
    loading.style.display = "none";

    // enable the button
    const button = document.getElementById("submit_button");
    button.disabled = false;

    // enable the textfield
    const textfield = document.getElementById("textfield");
    textfield.disabled = false;

}



// adds an event listener so that hitting "enter"/"return"
// is the same as clicking submit
var textfield = document.getElementById("textfield");

textfield.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submit_button").click();
    }
});