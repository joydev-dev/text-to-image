const inputText = document.getElementById("input")
const image = document.getElementById("image")
const button = document.getElementById("btn")
const token = "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"
const downloadButton = document.getElementById("downloadBtn");



async function query(data) {
   // document.write("Genarating........")
   image.src = "loader.gif"
   const response = await fetch(
      "https://api-inference.huggingface.co/models/prithivMLmods/Logo-Design-Flux-LoRA",
      {
         headers: {
            Authorization: `Bearer ${token}`

         },
         method: "POST",
         body: JSON.stringify({ "inputs": inputText.value }),
      }
   );
   const result = await response.blob();
   return result;
}
button.addEventListener('click', async function () {
   query().then((response) => {
      const objectURL = URL.createObjectURL(response)
      image.src = objectURL
   });
})

downloadButton.addEventListener('click', function () {
   if (image.src) {
       const link = document.createElement('a');
       link.href = image.src; // Use the image source as the link
       link.download = 'generated-image.png'; // Set the default file name
       document.body.appendChild(link);
       link.click(); // Trigger the download
       document.body.removeChild(link); // Clean up
   } else {
       alert("Please generate an image first!");
   }
});
