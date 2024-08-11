const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const lambda = new AWS.Lambda();

// Environment Variables for Configuration
const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE;
const DLQ_NAME = process.env.DLQ_NAME;

exports.handler = async (event) => {
  // Logging request information
  console.log('Event:', JSON.stringify(event, null, 2));

  // Extracting device type from the event
  const deviceType = event.deviceType || 'unknown';

  let imageKey;
  switch (deviceType.toLowerCase()) {
    case 'android':
      imageKey = 'android_image.png';
      break;
    case 'ios':
      imageKey = 'ios_image.png';
      break;
    case 'web':
      imageKey = 'laptop_image.png';
      break;
    default:
      imageKey = 'default_image.png';
  }

  try {
    // Fetch image URL from S3
    const imageUrl = await getSignedUrl(imageKey);

    // Capture the invocation to DynamoDB
    await logToDynamoDB(event, imageKey);

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl }),
    };
  } catch (error) {
    console.error('Error fetching image URL:', error);

    // Send failure details to Dead Letter Queue
    await sendToDLQ(event, error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request.' }),
    };
  }
};

// Function to get a signed URL for an image in S3
async function getSignedUrl(key) {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: 60 // URL expires in 60 seconds
  };
  return s3.getSignedUrlPromise('getObject', params);
}

// Function to log request details to DynamoDB
async function logToDynamoDB(event, imageKey) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: DYNAMODB_TABLE,
    Item: {
      RequestId: event.requestId || 'unknown',
      Timestamp: new Date().toISOString(),
      DeviceType: event.deviceType || 'unknown',
      ImageKey: imageKey,
    }
  };
  return dynamoDb.put(params).promise();
}

// Function to send failed requests to Dead Letter Queue
async function sendToDLQ(event, errorMessage) {
  const sns = new AWS.SNS();
  const params = {
    Message: JSON.stringify({ event, errorMessage }),
    TopicArn: process.env.DLQ_ARN,
  };
  return sns.publish(params).promise();
}
