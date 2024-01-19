import axios from "axios";
import { Request, Response } from "express";

const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
const SERVICE_SID = process.env.SERVICE_SID;
const client = require('twilio')(TWILIO_SID, TWILIO_TOKEN);


const telefono = {
  validacion: async function (req: Request, res: Response) {
    const { phone } = req.body;
    try {
      if ( phone ){
        client.verify.v2.services(SERVICE_SID)
                .verifications
                .create({to: phone, channel: 'sms'})
                .then((verification: { sid: any; }) => {
                  return res.status(200).send(verification)})
                
              
      } else {
        return res.status(400).send("Ingrese un número de teléfono válido")
      }
      
    } catch (error: any) {
      return res.status(500).send(error.message)
    }
  },
  verificacion : async function (req: Request, res: Response) {
    const { code, phone } = req.body;
    try {
      if ( code ){
        console.log(code)
        client.verify.v2.services(SERVICE_SID)
      .verificationChecks
      .create({to: phone, code})
      .then((verification_check: { status: any; }) =>{
        return res.status(200).send(verification_check.status)
      });
      } else {
        res.status(400).send("Debe ingresar el código que recibio por SMS")
      }
    } catch (error: any) {
      return res.status(500).send(error.message)
    }
  }

}
export default telefono





