const url = 'https://hooks.slack.com/services/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'
const rp = require('request-promise');

function getDateAndHour() {
    const date = new Date();
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const hora = date.getHours();
    const minutos = date.getMinutes();
    return `[${dia}/${mes} - ${hora}:${minutos}]`;
}

function basicMsg(serviceName, text) {
    return `${getDateAndHour()} El Servicio ${serviceName} ${text}`
}

function notifyServiceIsWorking(serviceName) {
    sendMessage({ text: basicMsg(serviceName, 'ha vuelvo a la normalidad') });
}

function notifyServiceIsNotWorking(serviceName) {
    sendMessage({ text: basicMsg(serviceName, 'ha dejado de funcionar') });
}

function sendMessage(msg) {
    rp.post({url: url, body: JSON.stringify(msg)})
    .catch(error => {
        console.log(error.message);
    })     
}

module.exports = {
    notifyServiceIsNotWorking,
    notifyServiceIsWorking,
}