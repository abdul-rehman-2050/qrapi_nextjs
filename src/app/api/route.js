// app/routes/hello.js (or any other desired location)
//npm install @andreekeberg/imagedata
//https://qrapi-nextjs.vercel.app/api
import { NextResponse } from "next/server";
const { PNG } = require('pngjs');
const jpeg = require('jpeg-js');
import { getSync as getImageDataFromBuffer } from '@andreekeberg/imagedata';
import jsQR from 'jsqr';
import { supabase } from "../../../lib/supabaseClient";



/**
 * Fetch the latest health metrics for a specific bed number.
 * @param {number} bed_number - The bed number to fetch metrics for.
 * @returns {object|null} The latest health metrics for the bed number, or null if an error occurred.
 */
async function getHealthMetrics(bed_number) {
    const { data, error } = await supabase
        .from('patient_vitals')
        .select('*')
        .eq('bed_number', bed_number)
        .order('created_at', { ascending: false }) // Assumes you have a 'created_at' column
        .limit(1);

        // console.log(data)
    if (error) {
        console.error('Error fetching data:', error);
        return null;
    }

    // Return the latest entry if available, otherwise return null
    return data ? data[0]: null;
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

    

    // Split the string on whitespace
    const parts = response.message.split(' ');
    const tableNumber = parseInt(parts[parts.length - 1]);




console.log("Extracted number:", tableNumber);



    console.log(response)
    if (code.data.includes("number")) {
      const healthMetrics=await  getHealthMetrics(tableNumber)
      console.log(healthMetrics)
        //const healthMetrics = getHealthMetrics();
        response = {
            ...response,
            healthMetrics: healthMetrics
        };
    }

    return NextResponse.json(response);

  //  return NextResponse.json({ message: code.data });
  
  }
  