// // const fss = require('fs')
// // import * as htmlToImage from 'html-to-image';
// // import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
// // import path from 'path';
// const headerComp = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
//     <title></title>
// </head>
// <body class="main-content">`;

// const footerComp = `</body>
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"></script>
// </html>`;

// const readFileText = (file) => {
//     var componentHtml = '';
//     var fileReader = new FileReader();
//     fileReader.onload = (res) => {
//         componentHtml = res.target.result;
//         console.log(componentHtml);
//         return componentHtml;
//     };
//     fileReader.onerror = (err) => console.log(err);
//     fileReader.readAsText(file);

    
// }

// const checkFileIfExisAndDelete = async (path) => {
//     console.log(path);
//     // if (fss.existsSync(path)) {
//     //     await fss.promises.unlink(path, (err) => {
//     //         if (err) {
//     //             throw err;
//     //         }
        
//     //         console.log("Delete File successfully.");
//     //     });
//     // }
// }

// const checkFolder = (filePath) => {
//     console.log(filePath);
//     // if (!new File(filePath)){
//     //     fss.mkdirSync(filePath);
//     // }

//     try {
//         let fileName = require(filePath);
//         console.log("file found : ", fileName);
//       } catch (e) {
//         console.log("sorry, file not found");
//       }
// }

// const captureFileHtml = async (htmlComponent, path) => {
//     htmlToImage({
//         output: path,
//         html: htmlComponent,
//       })
//         .then(() => console.log('The image was created successfully!'))
//         .catch((err) => {
//             throw err;
//         })
// }

// const generateImageComponent = async (file, fileTmpName) => {
//     const folderFile =  process.cwd() + '/assets/tmp';

//     var componentHtml = readFileText(file);

//     const htmlContent = headerComp + componentHtml + footerComp;

//     const filePath = path.basename(folderFile + fileTmpName, '.jpg');

//     await checkFileIfExisAndDelete(filePath);

//     checkFolder(folderFile);

//     captureFileHtml(htmlContent, filePath);

//     return filePath;
// }


// const fileHelper = {
//     generateImageComponent,
//     checkFolder,
//     readFileText,
//     captureFileHtml,
// }

// export default fileHelper;