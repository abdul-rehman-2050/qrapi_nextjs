// app/routes/hello.js (or any other desired location)
import { NextResponse } from "next/server";
const { PNG } = require('pngjs');
const jpeg = require('jpeg-js');
import { getSync as getImageDataFromBuffer } from '@andreekeberg/imagedata';
import jsQR from 'jsqr';


function decodePng(buffer) {
    return new Promise((resolve, reject) => {
      const png = new PNG();
      png.parse(buffer, (error, data) => {
        if (error) reject(error);
        else resolve(data);
      });
    });
  }
  
  // Function to decode JPEG
  function decodeJpeg(buffer) {
    const rawImageData = jpeg.decode(buffer, { useTArray: true });
    return {
      width: rawImageData.width,
      height: rawImageData.height,
      data: rawImageData.data,
    };
  }
  

export async function GET(req, res) {
    const name = req.nextUrl.searchParams.get("name") || "World";
  
    return NextResponse.json({ message: `Hello, ${name}!` });
}
  
export async function POST(req) {
    const data = await req.json();
    const base64Image = data.img;
    console.log(base64Image)
    const imageBuffer = Buffer.from(base64Image, 'base64');
    if (imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50) {
        // PNG file header: 0x89 0x50 0x4E 0x47
//        imageData = await decodePng(imageBuffer);
        console.log('png')
      } else if (imageBuffer[0] === 0xFF && imageBuffer[1] === 0xD8) {
        // JPEG file header: 0xFF 0xD8 0xFF
  //      imageData = decodeJpeg(imageBuffer);
        console.log('jpeg')
      } else {
        throw new Error('Unsupported image format');
      }

        // const qrcodeImage= 'base64stringhere';
        // const qrcodeBuffer = Buffer.from(qrcodeImage, 'base64');
        const qrArray = getImageDataFromBuffer(imageBuffer);
        const code = jsQR(qrArray.data, qrArray.width, qrArray.height);

    return NextResponse.json({ message: code.data });
    // Decode base64 image to Uint8Array
    // const buffer = atob(base64Image.split(',')[1]); // Remove data:application/octet-stream;base64, prefix (if present)
    // const byteArray = new Uint8Array(buffer.length);
    // for (let i = 0; i < buffer.length; i++) {
    //   byteArray[i] = buffer.charCodeAt(i);
    // }
  
    // // Decode QR code
    // const decodedData = jsqr(byteArray);
  
    // // Check if data was decoded
    // if (decodedData) {
    //   return NextResponse.json({ message: "QR Code data:", data: decodedData.data });
    // } else {
    //   return NextResponse.json({ message: "Failed to decode QR Code." });
    // }
  }
  