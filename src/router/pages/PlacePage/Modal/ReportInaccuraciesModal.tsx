import { Checkbox, Image, Input, message, Modal, Upload } from 'antd';
import { FC, useState } from 'react';
import styles from './Modal.module.scss';
import { FiUpload } from 'react-icons/fi';
import { NTButton } from '../../../../components/Button/NTButton';
import { UploadProps } from 'antd/es/upload';
import { toBase64 } from '../../../../helpers/toBase64';
import {
  CreateAttractionMistakeRequestBody,
  useAttractionMistakeRequestQuery,
} from '../../../../services/attraction';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import cn from 'classnames';
import { DeleteOutlined } from '@ant-design/icons';

const CheckboxGroup = Checkbox.Group;
const { Dragger } = Upload;

const typesOptions = ['Название', 'Рейтинг', 'Фото', 'Описание', 'Координаты', 'Другое'];

interface Props {
  onClose: () => void;
  data: any;
}

export const ReportInaccuraciesModal: FC<Props> = ({ onClose, data }) => {
  const [formData, setFormData] = useState<CreateAttractionMistakeRequestBody>({
    attractionId: data.id,
    types: [],
    email: '',
    description: '',
    cityName: data.city,
    regionName: data.region,
    lat: data.lat,
    lng: data.lng,
    media: [],
    haveCopyright: true,
  });

  const [fileList, setFileList] = useState<any[]>([]);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [indeterminate, setIndeterminate] = useState(true);

  const [createMistake] = useAttractionMistakeRequestQuery();

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

  const onChangeTypes = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < typesOptions.length);
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
    const types = checkedList.map((i) => {
      if (i === 'Название') return 'name';
      if (i === 'Рейтинг') return 'rate';
      if (i === 'Фото') return 'photo';
      if (i === 'Описание') return 'description';
      if (i === 'Координаты') return 'location';
      if (i === 'Другое') return 'other';
    });
    const data = { ...formData, media: mediaFiles, types };

    // @ts-ignore
    createMistake(data);

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
        <div className="font-medium">Сообщите о неточности</div>
        <div className="border-bottom-gray -mx-6 pt-4" />

        <div className="mt-6">
          <span>В чем неточность?</span>
          <div>
            <CheckboxGroup
              options={typesOptions}
              value={checkedList}
              onChange={onChangeTypes}
              className="grid grid-cols-2 gap-2 mt-2"
            />
          </div>
          <div className="pt-4">
            <span>Комментарий:</span>
            <Input.TextArea
              rows={5}
              placeholder="Добавьте комментарий здесь"
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
                    <Image src={file.url} className="max-w-[48px] max-h-[48px]" />
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
              Отправить
            </NTButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
