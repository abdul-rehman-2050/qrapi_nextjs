import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

/*create a post route to submit patient vitals where the table is CREATE TABLE patient_vitals (
  id SERIAL PRIMARY KEY,
  bed_number INTEGER NOT NULL,
  heart_rate INTEGER,
  spo2 INTEGER,
  temperature FLOAT,
  blood_pressure_upper INTEGER,
  blood_pressure_lower INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

export async function POST(req, res) {

    //parse the input body paramters for bed_number INTEGER NOT NULL,heart_rate INTEGER,spo2 INTEGER,temperature FLOAT,blood_pressure_upper INTEGER,blood_pressure_lower INTEGER,
    const { bed_number, heart_rate, spo2, temperature, blood_pressure_upper, blood_pressure_lower } = await req.json();
    console.log(bed_number, heart_rate, spo2, temperature, blood_pressure_upper, blood_pressure_lower);

    //create example json object to pass via post pam to this route 
    const vitals = {
        bed_number: bed_number,
        heart_rate: heart_rate,
        spo2: spo2,
        temperature: temperature,
        blood_pressure_upper: blood_pressure_upper,
        blood_pressure_lower: blood_pressure_lower
    }


    //insert vitals to patient_vitals table in supabase
    const { error } = await supabase
                               .from('patient_vitals')
                               .insert([
                                    vitals
                                ])
    


    // const { error } = await supabase
    //                     .from('patient_vitals')
    //                     .insert([
    //                         { id: 15, name: 'Nepal' },
    //                         { id: 16, name: 'Vietnam' },
    //                     ])
    const name = req.nextUrl.searchParams.get("name") || "World";  
    return NextResponse.json({ message: `Hello, ${vitals.blood_pressure_lower}!` });
}


export async function GET(req, res) {
    const { error } = await supabase
                        .from('countries')
                        .insert([
                            { id: 15, name: 'Nepal' },
                            { id: 16, name: 'Vietnam' },
                        ])
    const name = req.nextUrl.searchParams.get("name") || "World";  
    return NextResponse.json({ message: `Hello, ${name}!` });
}