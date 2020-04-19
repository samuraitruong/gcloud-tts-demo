process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "/home/truong/Projects/gcloud-tts-sample/serviceAccount.json";

// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

// Import other required libraries
const fs = require("fs-extra");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function downloadFile(text, languageCode) {
  // Construct the request
  const request = {
    input: { text },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode, ssmlGender: "NEUTRAL" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const output = `./voices/${text.toLowerCase()}_${languageCode}.mp3`;

  await fs.writeFile(output, response.audioContent, "binary");
  console.log("Audio content written to file:", output);
}
// main function
(async () => {
  const list = await fs.readJson("oxford-500.json");
  for (var word of list) {
    await downloadFile(word, "en-US");
    await downloadFile(word, "en-UK");
  }
})();
