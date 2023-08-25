import {
  Checkbox,
  Image,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Typography,
  Upload,
} from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { CARD_TYPE } from './enum/cardType';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import {
  useCreateAttractionMediaQuery,
  useCreateNewAttractionRequestQuery,
  useGetAttractionScalesQuery,
  useUploadAttractionMediaQuery,
} from '../../../services/attraction';
import { toBase64 } from "../../../helpers/toBase64";

const { Title } = Typography;
const { Dragger } = Upload;

type TabPosition = 'photos' | 'icons';

interface MediaProps {
  type: string;
}

interface File extends UploadFile {
  main?: boolean;
  access?: boolean;
}

export const CardMedia = ({ type }: MediaProps) => {
  const [mediaType, setMediaType] = useState<TabPosition>('photos');
  const [hasIcons, setHasIcons] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const [createMedia] = useCreateAttractionMediaQuery();
  const [uploadMedia] = useUploadAttractionMediaQuery();

  const isEditable = type !== CARD_TYPE.VIEW;

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => {
      return false;
    },
    async onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        const file = {
          ...info.file,
          url: await toBase64(info.file),
          name: info.file.name,
          type: info.file.type,
        };
        if (file.type === 'image/heic') file.url = '/images/empty.jpg';
        setFileList((files) => [file, ...files]);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const onChangeMainPhoto = (uid: string | number) => {
    const files = fileList.map((f) => {
      if (f.uid !== uid) return { ...f, main: false };
      return { ...f, main: true };
    });
    setFileList(files);
  };

  const onChangePhotoAccess = (uid: string | number) => {
    const files = fileList.map((f) => {
      if (f.uid === uid) return { ...f, access: true };
      return f;
    });
    setFileList(files);
  };

  const deleteFile = (uid: string | number) => {
    const files = fileList.filter((f) => f.uid !== uid);
    setFileList(files);
  };

  const handleMediaTypeChange = (e: RadioChangeEvent) => {
    setMediaType(e.target.value);
  };

  return (
    <div>
      <Title level={5}>Медиа-файлы</Title>
      <Radio.Group
        onChange={handleMediaTypeChange}
        value={mediaType}
        className="mb-2 mt-2.5"
      >
        <Radio.Button value="photos">Фотографии</Radio.Button>
        {hasIcons && <Radio.Button value="icons">Иконка</Radio.Button>}
      </Radio.Group>
      <div className="flex flex-col gap-5 mt-2.5">
        {isEditable && (
          <>
            <span>Новые фото:</span>

            <Dragger {...uploadProps} className="mt-2.5">
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-hint">
                Переместите фотографии в область
                <br /> или <u>загрузите</u>
              </p>
            </Dragger>
          </>
        )}

        <div className="flex flex-col">
          {fileList.map((file) => (
            <div key={file.uid} className="mt-5">
              <div
                className="hover:text-red-500 cursor-pointer flex justify-between"
                onClick={() => deleteFile(file.uid)}
              >
                <span>{file.name}</span>
                <DeleteOutlined className="ml-2.5 cursor-pointer" />
              </div>
              <div className="flex mt-2.5">
                <div className="rounded overflow-hidden min-w-[160px] min-h-[120px]">
                  <Image src={file.url} className="rounded max-w-[160px] max-h-[120px]" />
                </div>
                <div className="flex flex-col justify-around ml-2.5 w-full">
                  <Checkbox
                    onChange={() => onChangeMainPhoto(file.uid)}
                    disabled={!isEditable}
                    checked={file?.main}
                  >
                    {' '}
                    Основное фото
                  </Checkbox>
                  <Checkbox
                    onChange={() => onChangePhotoAccess(file.uid)}
                    disabled={!isEditable}
                  >
                    {' '}
                    Есть права на изображение
                  </Checkbox>
                  <Input placeholder="Автор: moderator@mail.ru" disabled={!isEditable} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
