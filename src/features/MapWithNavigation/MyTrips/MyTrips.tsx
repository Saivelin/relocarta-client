import { FC } from 'react';
import style from './MyTrips.module.scss';
import { useGetTripsQuery } from '../../../services/trip';
import cn from 'classnames';
import { IconTrash } from '../../../components/Icons';

type Props = {
  tripId: string;
  onClickTrip: (trip: string) => void;
  onClickDelete: (tripId: string) => void;
};

export const MyTrips: FC<Props> = ({ tripId, onClickTrip, onClickDelete }) => {
  const { data = { items: [] } } = useGetTripsQuery();

  return (
    <div className={style.trips}>
      <div className={style.tripTitle}>Сохраненные маршруты:</div>
      <div className={style.tripList}>
        {data.items.map((trip) => {
          return (
            <div
              key={trip.name}
              className={cn(style.tripItem, {
                [style.isActive]: trip.trip_id === tripId,
              })}
            >
              <div
                onClick={() => {
                  onClickTrip(trip.trip_id);
                }}
              >
                {trip.name}
              </div>
              <div className={style.delete} onClick={() => onClickDelete(trip.trip_id)}>
                <IconTrash />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
