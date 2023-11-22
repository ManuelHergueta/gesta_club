require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport ({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: { rejectUnauthorized: false }
});

const cambioContrasenia = (email) => {
    mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: email,
        subject: "Solicitud cambio de contraseña.",
        html: `
            <div class="container">
            <h1>Cambio de contraseña.</h1>
            <p>Hola</p>
            <p>Hemos recibido solicitud de cambio de contraseña de Gesta Club. Para completar el cambio debes hacer clic en el siguiente enlace:</p>
            <a href="http://localhost:4200/auth/cambiocontra/${email}">Cambiar contraseña</a>
            <p>Si tu no solicitaste este cambio, simplemente ignora este correo electrónico.</p>
            <p>Gracias</p>
            </div> `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) throw error;
        else console.log("Email sent: " + info.response);
    });
};

module.exports = {
    cambioContrasenia
};