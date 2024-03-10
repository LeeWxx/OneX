import React, { useState, useEffect } from 'react';

import { Map, MapMarker, ZoomControl, CustomOverlayMap } from 'react-kakao-maps-sdk';
import './KakaoMap.css';
const { kakao } = window;

const KakaoMap = ({ stores, setData }) => {
    function fillterData(sw, ne) {
        const k_sw = new kakao.maps.LatLng(sw.Ma, sw.La);
        const k_ne = new kakao.maps.LatLng(ne.Ma, ne.La);

        const lb = new kakao.maps.LatLngBounds(k_sw, k_ne);
        const data = stores.filter((item) =>
            lb.contain(new kakao.maps.LatLng(item.location.lat, item.location.lng))
        );
        console.log(data);
        setData(data);
    }

    function boundsChangedHandler(map) {
        const map_bounds = map.getBounds();
        const sw = map_bounds.getSouthWest();
        const ne = map_bounds.getNorthEast();

        setBounds({
            sw: sw.toString(),
            ne: ne.toString(),
        });

        fillterData(sw, ne);
    }

    const [bounds, setBounds] = useState();
    const [selectedMarker, setSeleteMarker] = useState();

    return (
        <div className="z-0">
            <Map
                center={{ lat: 33.450701, lng: 126.570667 }}
                style={{ width: '1150px', height: '100%' }}
                className="size-fit"
                level={3}
                onZoomChanged={(map) => boundsChangedHandler(map)}
                onDragEnd={(map) => boundsChangedHandler(map)}
            >
                {stores.map((item, idx) => (
                    <div>
                        <MapMarker
                            key={`${item.title}-${item.location}`}
                            position={item.location}
                            image={{
                                src: 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png',
                                size: { width: 24, height: 35 },
                            }}
                            title={item.title}
                        />
                        <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                            // 커스텀 오버레이가 표시될 위치입니다
                            position={{
                                lat: item.location.lat,
                                lng: item.location.lng,
                            }}
                            yAnchor={2}
                        >
                            {/* 커스텀 오버레이에 표시할 내용입니다 */}
                            <div
                                className="label"
                                className="speech-bubble flex justify-center"
                            >
                                <div className="flex flex-col justify-start">
                                    <span className="center text-xs font-normal text-gray-800">
                                        {item.title}
                                    </span>
                                </div>
                            </div>
                        </CustomOverlayMap>
                    </div>
                ))}
            </Map>
        </div>
    );
};

export default KakaoMap;