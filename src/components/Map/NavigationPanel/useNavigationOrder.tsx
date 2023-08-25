import { NavigationItem } from './NavigationPanel';

type Props = {
  routes: NavigationItem[];
  isCheckedUserPosition: boolean;
};

export const useNavigationOrder = ({ routes, isCheckedUserPosition }: Props) => {
  let orderCount = isCheckedUserPosition ? 1 : 0;

  const checkedMap = routes.reduce((acc, current, index) => {
    if (current.checked) {
      acc[index] = { index, order: orderCount };

      orderCount++;
    }
    return acc;
  }, {} as Record<string, { index: number; order: number }>);

  const getOrder = (index: number) => {
    return checkedMap[index] ? checkedMap[index].order + 1 : undefined;
  };

  return getOrder;
};
