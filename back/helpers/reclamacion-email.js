require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
});

const correoReclamacionDeCuota = (cuota) => {
    mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: cuota.email, 
        subject: `Reclamación de cuota de ${cuota.mes} de ${cuota.temporada}`,
        html: `<div style="font-family: Arial, sans-serif;background-color: #f4f4f4;color: #333;margin: 0;padding: 0;">
        <div style="text-align: center; margin-bottom: 20px;margin-top: 20px;">
            <img src="https://live.staticflickr.com/65535/53374636136_704e642fc4_n.jpg" alt="Logo" style="max-width: 100px;">
            <h2 style="margin-top: 20px;">Recordatorio de Cuota Pendiente</h2>
        </div>
    
        <div class="container" style="background-color: #ffffff;width: 80%;margin: auto;padding: 20px;border: 1px solid #ddd;box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #444;">Cuota de ${cuota.mes} de ${cuota.temporada} Pendiente</h1>
        <p>Estimado/a ${cuota.nombre} ${cuota.apellidos},</p>
        <p>Nos ponemos en contacto para recordarte que tienes pendiente la cuota de ${cuota.mes} de ${cuota.temporada}.</p>
        <p>Para seguir disfrutando de todas las actividades que ofrecemos, es importante que regularices tu situación a la mayor brevedad posible.</p>
        <p>Puedes realizar el pago en horas de entreno a nuestros monitores o por transferencia indicando nombre del deportista y mes del pago.</p>
        <p>Si ya has efectuado el pago, por favor, ignora este mensaje o ponte en contacto con nosotros para actualizar nuestros registros.</p>
        <p>Gracias por ser parte de este club.</p>
        <p>Saludos cordiales,</p>
        <div class="footer">
            <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
        </div>
        </div>

    </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) throw error;
        else console.log("Email sent: " + info.response);
    });

}

module.exports = {
    correoReclamacionDeCuota
}