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

const correoReciboDePago = (recibo) => {
    mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: recibo.email,
        subject: `Recibo del pago de la cuota de ${recibo.mes} de ${recibo.temporada}`,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://live.staticflickr.com/65535/53374636136_704e642fc4_n.jpg" alt="Logo" style="max-width: 100px;">
            <h2 style="margin-top: 20px;">Recibo de Pago de Cuota</h2>
        </div>
    
        <div style="margin-bottom: 20px;">
            <p><strong>Fecha de Pago:</strong> ${recibo.fecha_pago}</p>
            <p><strong>Deportista:</strong> ${recibo.nombre_completo}</p>
            <p><strong>Mensualidad:</strong> ${recibo.mes} de ${recibo.temporada}</p>
            <p><strong>Importe Pagado:</strong> ${recibo.importe}</p>
            <p><strong>Método de Pago:</strong> ${recibo.tipo_pago}</p>
            <p><strong>Código de verificación:</strong> ${recibo.codigo_verificacion}</p>
            <div style="text-align: center; font-size: 0.8em; color: #555;">
                <p>Gracias por su pago.</p>
                <p></p>
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
    correoReciboDePago,
}