echo "------Deploying project: finalyze------"
 
# Variables
BUCKET_NAME="www.finalyze-7cm1.com-dev"
DIRECTORY_PATH="./dist"

echo "------Deleting files in bucket: $BUCKET_NAME------"
aws s3 rm "s3://$BUCKET_NAME" --recursive

echo "------Uploading file: index.html------"
aws s3 cp "$DIRECTORY_PATH" "s3://$BUCKET_NAME" --recursive --exclude "*/"

if [ $? -eq 0 ]; then
  echo "Archivo subido exitosamente a s3://$BUCKET_NAME/$S3_KEY"
else
  echo "Error al subir el archivo"
fi


