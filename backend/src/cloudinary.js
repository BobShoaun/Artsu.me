import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "artsu-me",
  api_key: "429343491977527",
  api_secret: "-OxXnjpxpA-WAD1x7qrG6ptjnmg",
});

export default cloudinary;

// (async function () {
//   const res = await cloudinary.v2.uploader.upload(
//     "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag2" }
//   );
//   console.log(res);
// })();
