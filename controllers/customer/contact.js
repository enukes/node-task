const apiError = require('../../common/api-errors');
const messages = require('../../common/messages');
const MailerService = require('../../common/mailer');
const ResponseService = require('../../common/response');
const ContactService = require('../../services/contact');

class ContactController {
  async contactRequest(req, res) {
    try {
      const request = { ...req.body };

      if (!request.name) throw new apiError.ValidationError('name', messages.NAME_REQUIRED);
      if (!request.email) throw new apiError.ValidationError('email', messages.EMAIL_REQUIRED);

      const mailSend = await MailerService.sendContactResponse(request.name, request.email);
      if (!mailSend.status) throw new apiError.InternalServerError(mailSend.error);

      const contactRequest = await ContactService.addContactRequest(request);

      return res.status(200).send(ResponseService.success({ contactRequest, mailData: mailSend.data, message: 'Thank you for Contacting Us' }));
    } catch (e) {
      return res.status(e.code || 500).send(ResponseService.failure(e));
    }
  }
}

module.exports = new ContactController();
