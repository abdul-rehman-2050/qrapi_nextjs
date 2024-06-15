import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";


export async function GET(req, res) {
    

    const { data: vitals } = await supabase
                        .from('patient_vitals')
                        .select('*')
                        .order('bed_number', true);                        
    const name = req.nextUrl.searchParams.get("name") || "World";  

    //convert vitals to json response 
    //const vitalsJson = JSON.stringify(vitals);
    return NextResponse.json(vitals);
}