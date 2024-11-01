import nodeMailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const _filename = path.resolve(import.meta.url);
const _dirname = path.dirname(_filename);


const sendEmail = async (
    subjet,
    send_to,
    reply_to,
    template,
    send_from,
    name,
    link
) => {
    const transporter = nodeMailer.createTransport({
        service:"Outlook365",
        host: "smtp.office365.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASSWORD
        }
    })
 };
