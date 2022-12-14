import path from "path";
import aws from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config();
// Single file
const s3Upload = async (file) => {
  const s3 = new aws.S3();
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `Category_images/${Date.now()}-category${path.extname(
      file.originalname
    )}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};

// Multi file
const s3UploadMany = async (files) => {
  let count = 0;
  const s3 = new aws.S3();
  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `Product_images/${Date.now()}${count++}-product${path.extname(
        file.originalname
      )}`,
      Body: file.buffer,
    };
  });
  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

// Delte file
const s3DeleteMany = async (files) => {
  const s3 = new aws.S3({ region: process.env.AWS_REGIION });

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.Key,
    };
  });
  return await Promise.all(
    params.map((param) => s3.deleteObject(param).promise())
  );
};

export { s3Upload, s3UploadMany, s3DeleteMany };
