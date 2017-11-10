export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    BUCKET: "participant-uploads"
  },
  apiGateway: {
    URL: "https://zfhd0timo5.execute-api.us-east-1.amazonaws.com/prod",
    REGION: "us-east-1"
  },
  cognito: {
    USER_POOL_ID: "us-east-1_zOxMSOtjk",
    APP_CLIENT_ID: "2mpm3ak6j3ev2rdi8huksmf6vd",
    REGION: "us-east-1",
    IDENTITY_POOL_ID: "us-east-1:768cd677-9bff-48e5-9a7e-dbdc847291cb"
  }
};
