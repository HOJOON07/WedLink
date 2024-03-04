import { getWedding } from '@/api/wedding';
import { Wedding } from '@/models/wedding';

import { useSuspenseQuery } from '@tanstack/react-query';

function useWedding() {
  const { data, isLoading, error } = useSuspenseQuery<Wedding>({
    queryKey: ['wedding'],
    queryFn: () =>
      getWedding().then((res) => {
        if (res.ok === false) {
          throw new Error('청첩장 정보를 불러오지 못했습니다.');
        }
        return res.json();
      }),
  });

  return { wedding: data, isLoading, error };
}

export default useWedding;
