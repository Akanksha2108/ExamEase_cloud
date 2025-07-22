const REGION = "ap-south-1";
const BUCKET_NAME = "your-s3-bucket-name";
const IDENTITY_POOL_ID = "ap-south-1:xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx";

const {
  S3Client,
  PutObjectCommand
} = window.AwsS3;

const {
  fromCognitoIdentityPool
} = window.AwsCredentialProviderCognitoIdentity;

const s3Client = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    identityPoolId: IDENTITY_POOL_ID,
    clientConfig: { region: REGION }
  }),
});

async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: `papers/${file.name}`,
    Body: file,
    ContentType: file.type
  };

  document.getElementById("status").innerText = "Uploading...";

  try {
    await s3Client.send(new PutObjectCommand(params));
    document.getElementById("status").innerText = "Upload successful!";
  } catch (err) {
    console.error("Upload failed", err);
    document.getElementById("status").innerText = "Upload failed.";
  }
}
