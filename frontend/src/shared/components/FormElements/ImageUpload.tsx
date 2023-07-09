import React, { ChangeEvent, useRef, useState, useEffect } from "react";

import Button from "./Button";
import stylesFE from "./FormElements.module.scss";
import styles from "./ImageUpload.module.scss";

const ImageUpload: React.FC<{
  id: string;
  center?: boolean;
  onInput: (id: string, file: File, valid: boolean) => void;
  errorText: string;
}> = (props) => {
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<any>();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let pickedFile: any;
    let fileIsValid = isValid;
    if (
      event.target.files &&
      event.target.files.length === 1 &&
      (event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/jpg" ||
        event.target.files[0].type === "image/png")
    ) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile!, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current!.click();
  };

  return (
    <div className={stylesFE["form-control"]}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`${styles["image-upload"]} ${props.center && "center"}`}>
        <div className={styles["image-upload__preview"]}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
