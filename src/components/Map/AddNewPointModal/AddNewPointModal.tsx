import { FC, useState } from 'react';
import styles from './AddNewPointModal.module.scss';
import { Checkbox, Image, Input, message, Modal, Upload } from 'antd';
import { FiUpload } from 'react-icons/fi';
import { UploadProps } from 'antd/es/upload';
import { NTButton } from '../../Button/NTButton';
import { DeleteOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { toBase64 } from '../../../helpers/toBase64';
import {
  CreateAttractionRequestBody,
  useCreateNewAttractionRequestQuery,
} from '../../../services/attraction';

const { Dragger } = Upload;

interface Props {
  onClose: () => void;
  lng: number;
  lat: number;
  regionName: string;
  cityName: string;
}

export const AddNewPointModal: FC<Props> = ({
  onClose,
  lng,
  lat,
  regionName,
  cityName,
}) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [formData, setFormData] = useState<CreateAttractionRequestBody>({
    email: '',
    description: '',
    cityName,
    regionName,
    lat,
    lng,
    haveCopyright: true,
    media: [],
    name: '',
  });
  const [createNewAttraction] = useCreateNewAttractionRequestQuery();

  const props: UploadProps = {
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

  const onChangeInput = (field: string, e: any) => {
    setFormData((data) => ({ ...data, [field]: e.target.value }));
  };

  const deleteFile = (uid: string | number) => {
    const files = fileList.filter((f) => f.uid !== uid);
    setFileList(files);
  };

  const onSubmit = () => {
    const mediaFiles = fileList.map((file) => {
      return {
        type: 'video',
        data: file.url.split(',')[1],
      };
    });
    const data = { ...formData, media: mediaFiles };

    createNewAttraction(data);

    onClose();
  };

  return (
    <Modal
      open
      centered
      footer={[]}
      onCancel={onClose}
      className={styles.modal}
      width={500}
    >
      <div className="flex flex-col font-montserrat">
        <div className="font-medium">Новое место</div>
        <div className="border-bottom-gray -mx-6 pt-4" />

        <div className="mt-6">
          <span>Название:</span>
          <Input
            placeholder="Введите название объекта"
            className="mt-2"
            value={formData.name}
            onChange={(e) => onChangeInput('name', e)}
          />
        </div>

        <div className="pt-4">
          <span>Описание:</span>
          <Input.TextArea
            rows={5}
            placeholder="Добавьте описание здесь"
            className="mt-2"
            value={formData.description}
            onChange={(e) => onChangeInput('description', e)}
          />
        </div>

        <div className="pt-4 flex flex-col gap-2">
          <span>Фотографии:</span>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <FiUpload className="text-[#3056D3] text-[20px] mt-5" />
            </p>
            <p className="ant-upload-hint mb-5">
              Переместите фотографии в область
              <br /> или <u>загрузите</u>
            </p>
          </Dragger>
          <div className="flex flex-col">
            {fileList.map((file) => (
              <div
                key={file.uid}
                className={cn(
                  'mt-2 rounded-sm flex flex-row justify-between items-center',
                  styles.image,
                )}
              >
                <div className="grid grid-cols-[48px_1fr] gap-2 items-center">
                  <Image src={file.url} className="w-[48px] h-[48px]" />
                  <span className="text-primary">{file.name}</span>
                </div>

                <DeleteOutlined
                  className="ml-2.5 cursor-pointer hover:text-red-500"
                  onClick={() => deleteFile(file.uid)}
                />
              </div>
            ))}
            <span className="text-[12px] text-gray-400">
              Рекомендованный размер фото: 3х4
            </span>
          </div>

          <Checkbox
            checked={formData.haveCopyright}
            onChange={(e) =>
              setFormData((data) => ({ ...data, haveCopyright: e.target.checked }))
            }
            className="mt-2 text-[12px] leading-[120%]"
          >
            Согласен на использование изображений в рамках платформы
          </Checkbox>
        </div>

        <div className="mt-6">
          <span>Email</span>
          <Input
            placeholder="Укажите email для обратной связи"
            className="mt-2"
            value={formData.email}
            onChange={(e) => onChangeInput('email', e)}
          />
        </div>

        <div className="border-bottom-gray -mx-6 pt-6" />

        <div className="flex justify-end gap-2 mt-3 -mb-4">
          <NTButton onClick={onClose}>Отменить</NTButton>
          <NTButton theme="filled" color="primary" onClick={onSubmit}>
            Сохранить
          </NTButton>
        </div>
      </div>
    </Modal>
  );
};
