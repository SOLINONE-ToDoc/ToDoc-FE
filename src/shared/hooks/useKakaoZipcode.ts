import { useCallback } from 'react';

export const useKakaoZipcode = () => {
  const getZipcode = useCallback((lng: number, lat: number) => {
    return new Promise<string>((resolve, reject) => {
      if (!window.kakao?.maps?.services) {
        reject('카카오맵 SDK가 로드되지 않았습니다.');
        return;
      }

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(result[0]?.road_address?.zone_no ?? '');
        } else {
          reject('주소 변환 실패');
        }
      });
    });
  }, []);

  return { getZipcode };
};
