// app/routes/hello.js (or any other desired location)
//npm install @andreekeberg/imagedata
//https://qrapi-nextjs.vercel.app/api
import { NextResponse } from "next/server";
const { PNG } = require('pngjs');
const jpeg = require('jpeg-js');
import { getSync as getImageDataFromBuffer } from '@andreekeberg/imagedata';
import jsQR from 'jsqr';


function getHealthMetrics() {
    return {
        heart_rate: Math.floor(Math.random() * (100 - 60 + 1)) + 60, // Random heart rate between 60 and 100
        spo2: Math.floor(Math.random() * (100 - 95 + 1)) + 95, // Random SpO2 between 95 and 100
        temperature: (Math.random() * (37.2 - 36.1) + 36.1).toFixed(1), // Random temperature between 36.1 and 37.2
        blood_pressure: `${Math.floor(Math.random() * (120 - 110 + 1)) + 110}/${Math.floor(Math.random() * (80 - 70 + 1)) + 70}` // Random BP between 110/70 and 120/80
    };
}
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
    console.log(data)    
    const base64Image = data.img;
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const qrArray = getImageDataFromBuffer(imageBuffer);
    const code = jsQR(qrArray.data, qrArray.width, qrArray.height);

    let response = { message: code.data };

    if (code.data.includes("table number")) {
        const healthMetrics = getHealthMetrics();
        response = {
            ...response,
            healthMetrics: healthMetrics
        };
    }

    return NextResponse.json(response);

  //  return NextResponse.json({ message: code.data });
  
  }
  