import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const ImageUpload = forwardRef((props, ref) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            if (!fileIsValid) {
                setIsValid(false);
                fileIsValid = false;
            }
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    useImperativeHandle(ref, () => ({ pickImageHandler, }));

    return (
        <div className="form-control w-full">
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className="h-full w-full flex flex-col justify-center">
                    {previewUrl && <img src={previewUrl} className="w-full h-full object-fit" alt="Preview" />}
                    {!previewUrl && <p>이미지를 선택해주세요.</p>}
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
});

export default ImageUpload;