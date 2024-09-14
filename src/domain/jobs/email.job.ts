import cron from 'node-cron';
import { CaseModel } from '../../data/models/case.model';
import { EmailService } from '../services/email.service';
import { CaseDataSource } from '../datasources/case.datasource';
import { generateCaseEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
  const emailService = new EmailService();
  const caseDataSource = new CaseDataSource();
  cron.schedule('*/10 * * * * *', async () => {
    console.log('Running email job every 10 seconds');
    try {
      const cases = await CaseModel.find({ isSent: false });
      if (!cases.length) return console.log('No cases to send email');

      await Promise.all(
        cases.map(async (data) => {
          const htmlBody = generateCaseEmailTemplate(
            data.lat,
            data.lng,
            data.genre,
            data.age,
          );
          await emailService.sendMail({
            to: 'dcrunneryt1@gmail.com',
            subject: 'Nuevo caso registrado',
            htmlBody: htmlBody
          });
          console.log('Email sent');

          await caseDataSource.updateCase(data._id.toString(), { isSent: true });
        })
      );
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
}