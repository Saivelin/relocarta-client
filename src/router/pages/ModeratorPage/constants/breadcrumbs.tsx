import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';

export const breadcrumbs = {
  content: {
    attraction: {
      list: [
        {
          title: (
            <>
              <EditOutlined />
              <span>Управление контентом</span>
            </>
          ),
        },
        {
          title: <span>Аттракции</span>,
        },
      ],
      card: [
        {
          title: (
            <>
              <EditOutlined />
              <span>Управление контентом</span>
            </>
          ),
        },
        {
          href: `/moderator/content/attraction`,
          title: (
            <>
              <span>Аттракции</span>
            </>
          ),
        },
        {
          title: <span>Карточка объекта</span>,
        },
      ],
    },
  },
  request: {
    change: {
      list: [
        {
          title: (
            <>
              <ExclamationCircleOutlined />
              <span>Управление заявками</span>
            </>
          ),
        },
        {
          title: <span>Корректировки</span>,
        },
      ],
      card: [
        {
          title: (
            <>
              <ExclamationCircleOutlined />
              <span>Управление заявками</span>
            </>
          ),
        },
        {
          href: `/moderator/request/change`,
          title: (
            <>
              <span>Корректировки</span>
            </>
          ),
        },
        {
          title: <span>Заявка прользователя</span>,
        },
      ],
    },
    mapPoint: {
      list: [
        {
          title: (
            <>
              <ExclamationCircleOutlined />
              <span>Управление заявками</span>
            </>
          ),
        },
        {
          title: <span>Объекты</span>,
        },
      ],
      card: [
        {
          title: (
            <>
              <ExclamationCircleOutlined />
              <span>Управление заявками</span>
            </>
          ),
        },
        {
          href: `/moderator/request/map-point`,
          title: (
            <>
              <span>Объекты</span>
            </>
          ),
        },
        {
          title: <span>Карточка Объекта</span>,
        },
      ],
    },
  },
};
