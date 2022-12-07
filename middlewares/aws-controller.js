const AWS = require('aws-sdk')
const fs = require('fs')
const path = require("path");

let file, fileName;

const bucketName = "chicky"
const bucketRegion = "eu-central-1"

const s3 = new AWS.S3({
    region: bucketRegion,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const createMainBucket = async () => {
    const bucketParams = {Bucket: bucketName};

    await s3.headBucket(bucketParams, function (err, data) {
        if (err) {
            console.log("ErrorHeadBucket", err)
            s3.createBucket(bucketParams, function (err, data) {
                if (err) {
                    console.log("Error", err)
                } else {
                }
            });
        }
    }).promise()
}

const createItemObject = async () => {
    const params = {
        Bucket: bucketName,
        Key: `${fileName}`,
        ACL: 'public-read',
        Body: file
    };
    await s3.putObject(params, function (err) {
        if (err) {
            console.log("Error uploading file: ", err);
        } else {
            console.log("Successfully uploaded file on S3", fileName);
        }
    }).promise()
}

exports.upload = async (tempFile, tempFileName, folder) => {
    file = fs.createReadStream(tempFile.path);
    fileName = tempFileName;

    fs.copyFile(tempFile.path, path.join("./uploads/" + folder + "/" + fileName), (err) => {
        if (err) {
            console.log("Error Found:", err);
        } else {
            console.log("\nFile Contents of copied_file:")
        }
    })

    /*await createMainBucket()
    await createItemObject()*/
}