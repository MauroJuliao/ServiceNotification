import AWS from 'aws-sdk';
const ses = new AWS.SES({region: 'eu-west-1'});

async function sendEmail(event, context) {
  const record = event.Records[0]; // pq neste caso so utilizamos 1
  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: 'mauro@fidel.uk',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      }
    }
  };
  try {
    const result = await ses.sendEmail(params).promise();
    return result;
  }catch(error){
    console.log(error);
  }

}

export const handler = sendEmail;


