export interface FontInfo {
  fontId: number;
  fontName: string;
  fontNameEng: string;
  category: string;
  field: string;
  tailwindClass: string;
  src: string;
}

export const FONTS = {
  schoolSafetyRelay: {
    label: '학교안심 이어달리기',
    fontFamily: 'SchoolSafetyRelay',
    tailwindClass: 'font-school-safety-relay',
    src: '../../shared/assets/fonts/HakgyoansimYieodalligiL.woff2',
  },
  galmuri9: {
    id: 19,
    label: '갈무리9',
    fontFamily: 'Galmuri9',
    tailwindClass: 'font-galmuri-9',
    src: '../../shared/assets/fonts/Galmuri9.woff2',
    category: 'RETRO',
  },
  kccSonGigeong: {
    label: 'kcc손기정체',
    fontFamily: 'KccSonGigeong',
    tailwindClass: 'font-kcc-son-gigeong',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/KCC-Sonkeechung.woff2')",
  },
  yunChorokwoosanEoriniMinguk: {
    label: '윤초록우산어린이민국',
    fontFamily: 'YunChorokwoosanEoriniMinguk',
    tailwindClass: 'font-yun-chorokwoosan-eorini-minguk',
    src: "url('../../shared/assets/fonts/YunChorokwoosanEoriniMinguk.woff2')",
  },
  ongleipKonkon: {
    label: '온글잎콘콘체',
    fontFamily: 'OngleipKonkon',
    tailwindClass: 'font-ongleip-konkon',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2412-1@1.0/Ownglyph_corncorn-Rg.woff2')",
  },
  neoDonggeunmo: {
    label: 'Neo둥근모',
    fontFamily: 'NeoDonggeunmo',
    tailwindClass: 'font-neo-donggeunmo',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmo.woff')",
  },
  andolScienceOrbit: {
    label: '온글잎안될과학궤도',
    fontFamily: 'AndolScienceOrbit',
    tailwindClass: 'font-andol-science-orbit',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Unreal_science_orbit.woff2')",
  },
  yuseol: {
    label: '유설체',
    fontFamily: 'Yuseol',
    tailwindClass: 'font-yuseol',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/YooSeol.woff2')",
  },
  ongleipParkDahyeon: {
    label: '온글잎 박다현체',
    fontFamily: 'OngleipParkDahyeon',
    tailwindClass: 'font-ongleip-park-dahyeon',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2')",
  },
  nostalgicDesertYeonwoo: {
    label: '그리운 사막의 연우체',
    fontFamily: 'NostalgicDesertYeonwoo',
    tailwindClass: 'font-nostalgic-desert-yeonwoo',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/Griun_YEONWOO-Rg.woff2')",
  },
  jejuStoneWall: {
    label: '제주돌담체',
    fontFamily: 'JejuStoneWall',
    tailwindClass: 'font-jeju-stone-wall',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-EF@1.0/EF_jejudoldam.woff2')",
  },
  schoolSafetySchedule: {
    label: '학교안심 시간표',
    fontFamily: 'SchoolSafetySchedule',
    tailwindClass: 'font-school-safety-schedule',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimSiganpyoR.woff2')",
  },
  pyeongchangPeace: {
    label: '평창평화체',
    fontFamily: 'PyeongchangPeace',
    tailwindClass: 'font-pyeongchang-peace',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/PyeongChangPeace-Bold.woff2')",
  },
  accChildrenSFall: {
    label: 'ACC어린이 가을담은체',
    fontFamily: 'AccChildrenSFall',
    tailwindClass: 'font-acc-children-s-fall',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112-2@1.0/ACCchildrensky.woff')",
  },
  joseonPalace: {
    label: '조선궁서체',
    fontFamily: 'JoseonPalace',
    tailwindClass: 'font-joseon-palace',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGs.woff')",
  },
  shillaCulture: {
    label: '신라 문화체',
    fontFamily: 'Shilla',
    tailwindClass: 'font-shilla-culture',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/Shilla_CultureM-Medium.woff2')"
  },
  inkLiquid: {
    label: '더페이스샵 잉크립퀴드체',
    fontFamily: 'InkLiquid',
    tailwindClass: 'font-ink-liquid',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/InkLipquid.woff')"
  },
  sejongJaeumiMoeumi: {
    label: '세종자으미모으미',
    fontFamily: 'SejongJaeumiMoeumiBold',
    tailwindClass: 'font-sejong-jaeumi-moeumi',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-3@1.0/SejongJaeumiMoeumi-Bold.woff2')"
  },
  incheonEducation: {
    label: '인천교육자람체',
    fontFamily: 'IncheonEducation',
    tailwindClass: 'font-incheon-education',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/iceJaram-Rg.woff2')"
  },
  sandollSamlipHobbangOutline: {
    label: '산돌삼립호빵체 Outline',
    fontFamily: 'SandollSamlipHobbangOutline',
    tailwindClass: 'font-sandoll-samlip-hobbang-outline',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff')"
  },
  peopleFirstStruggle: {
    label: '피플퍼스트투쟁',
    fontFamily: 'PeopleFirstStruggle',
    tailwindClass: 'font-people-first-struggle',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2406-2@1.0/PeoplefirstFightingTTF.woff2')"
  },
  ongleipEoyeonce: {
    label: '온글잎 의연체',
    fontFamily: 'OngleipEoyeonce',
    tailwindClass: 'font-ongleip-eoyeonce',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105@1.1/Uiyeun.woff')"
  },
  shinDongYeopHandwriting: {
    label: '신동엽 손글씨',
    fontFamily: 'ShinDongYeopHandwriting',
    tailwindClass: 'font-shin-dong-yeop-handwriting',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/ShinDongYupHandwriting-R.woff2')"
  },
  romanticGumi: {
    label: '낭만있구미체',
    fontFamily: 'RomanticGumi',
    tailwindClass: 'font-romantic-gumi',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/GumiRomanceTTF.woff2')"
  },
  nexonMaplestory: {
    label: '넥슨메이플스토리',
    fontFamily: 'NexonMaplestory',
    tailwindClass: 'font-nexon-maplestory',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFLight.woff')"
  },
  phoneLine: {
    label: '전화선체',
    fontFamily: 'PhoneLine',
    tailwindClass: 'font-phone-line',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/JeonHwaseon.woff')"
  },
  hsJibtokiRound: {
    label: 'HS집토끼체',
    fontFamily: 'HsJibtokiRound',
    tailwindClass: 'font-hs-jibtoki-round',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/HSJiptokki-Round.woff2')"
  },
  hangulJaemin: {
    label: '한글재민체',
    fontFamily: 'HangulJaemin',
    tailwindClass: 'font-hangul-jaemin',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jaemin.woff')"
  },
  dosHandwriting: {
    label: '도스필기',
    fontFamily: 'DosHandwriting',
    tailwindClass: 'font-dos-handwriting',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/DOSPilgiMedium.woff2')"
  },
  samlipCreamyWhite: {
    label: '삼립크리미 화이트',
    fontFamily: 'SamlipCreamyWhite',
    tailwindClass: 'font-samlip-creamy-white',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-4@1.0/TTSamlipCreamyWhiteR.woff2')",
  },
  kccAnchangho: {
    label: 'KCC 안창호체',
    fontFamily: 'KccAnchangho',
    tailwindClass: 'font-kcc-anchangho',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/KCC-Ahnchangho.woff2')"
  },
  leeSunShin: {
    label: '이순신',
    fontFamily: 'LeeSunShin',
    tailwindClass: 'font-lee-sun-shin',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/YiSunShinRegular.woff')"
  },
  cafe24ShiningStar: {
    label: '카페24빛나는별',
    fontFamily: 'Cafe24ShiningStar',
    tailwindClass: 'font-cafe24-shining-star',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Shiningstar.woff')"
  },
  joyfulStory: {
    label: 'tvn즐거운이야기',
    fontFamily: 'JoyfulStory',
    tailwindClass: 'font-joyful-story',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/OTEnjoystoriesBA.woff')"
  },
  ogRenaissanceSecret: {
    label: 'OG르네상스비밀',
    fontFamily: 'OgRenaissanceSecret',
    tailwindClass: 'font-og-renaissance-secret',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/OG_Renaissance_Secret-Rg.woff2')"
  },
  baeminHanna: {
    label: '배달의민족 한나체',
    fontFamily: 'BMHANNA',
    tailwindClass: 'font-baemin-hanna',
    src: "url('https://fonts.gstatic.com/ea/hanna/v3/BM-HANNA.woff2')"
  },
  hsSantoki20: {
    label: 'HS산토끼체2.0',
    fontFamily: 'HsSantoki20',
    tailwindClass: 'font-hs-santoki-2-0',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSSanTokki20-Regular.woff2')"
  },
  yleeMemoriesNeverSleep: {
    label: 'ylee추억은잠들지않는다',
    fontFamily: 'YleeMemoriesNeverSleep',
    tailwindClass: 'font-ylee-memories-never-sleep',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/yleeMortalHeartImmortalMemory.woff2')"
  },
  missedGyuwon: {
    label: '그리운 규원체',
    fontFamily: 'MissedGyuwon',
    tailwindClass: 'font-missed-gyuwon',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/Griun_Gyuwon-Rg.woff2')"
  },
  koldiWebtoonMaker: {
    label: '콜디웹툰메이커 온글잎 폰트',
    fontFamily: 'KoldiWebtoonMakerOngleifFont',
    tailwindClass: 'font-koldi-webtoon-maker',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/Ownglyph_Coldywebtoonmaker-Rg.woff2')"
  },
  mapoBackpackTravel: {
    label: '마포배낭여행',
    fontFamily: 'MapoBackpackTravel',
    tailwindClass: 'font-mapo-backpack-travel',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoBackpackingA.woff')"
  },
  kkotsogum: {
    label: '꽃소금체',
    fontFamily: 'Kkotsogum',
    tailwindClass: 'font-kkotsogum',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/FlowerSalt.woff2')"
  },
  sangjuDajeongdagam: {
    label: '상주다정다감체',
    fontFamily: 'SangjuDajeongdagam',
    tailwindClass: 'font-sangju-dajeongdagam',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2112@1.0/SANGJUDajungdagam.woff')"
  },
  hancomHunminjeongeum: {
    label: '한컴훈민정음가로쓰기',
    fontFamily: 'HancomHunminjeongeum',
    tailwindClass: 'font-hancom-hunminjeongeum',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2406-1@1.0/HancomHoonminjeongeumH.woff')"
  },
  ongleipRyuryu: {
    label: '온글잎류류체',
    fontFamily: 'OngleipRyuryu',
    tailwindClass: 'font-ongleip-ryuryu',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/2405-2@1.0/Ownglyph_ryurue-Rg.woff2')"
  },
  schoolSafetyFoundation: {
    label: '학교안심바른바탕',
    fontFamily: 'SchoolSafetyFoundation',
    tailwindClass: 'font-school-safety-foundation',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBareonbatangR.woff2')"
  },
  changwonDanggamAsak: {
    label: '창원단감아삭체',
    fontFamily: 'ChangwonDanggamAsak',
    tailwindClass: 'font-changwon-danggam-asak',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/CWDangamAsac-Bold.woff')"
  },
  daraeHandwriting: {
    label: '다래손글씨',
    fontFamily: 'DaraeHandwriting',
    tailwindClass: 'font-darae-handwriting',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_three@1.0/drfont_daraehand.woff')"
  },
  hsBombaram20: {
    label: 'HS봄바람체 2.0',
    fontFamily: 'HsBombaram20',
    tailwindClass: 'font-hs-bombaram-2-0',
    src: "url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff')"
  },
  pretendard: {
    label: '프리텐다드',
    fontFamily: 'Pretendard',
    tailwindClass: 'font-pretendard',
    src: '../../shared/assets/fonts/PretendardVariable.woff2',
  },
  nanumMyeongjo: {
    label: '나눔명조',
    fontFamily: 'Nanum Myeongjo',
    tailwindClass: 'font-nanum-myeongjo',
    src: "url('https://fonts.gstatic.com/ea/nanummyeongjo/v2/NanumMyeongjo-Regular.woff2')",
  },
  nanumSquareNeo: {
    label: '나눔스퀘어네오',
    fontFamily: 'NanumSquareNeo',
    tailwindClass: 'font-nanum-square-neo',
    src: "url('https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.woff2')"
  },
  nanumSquareNeo: {
    label: '나눔스퀘어네오',
    fontFamily: 'NanumSquareNeo',
    tailwindClass: 'font-nanum-square-neo',
    src: "url('https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.woff2')"
  },
} as const;

export type FontId = keyof typeof FONTS;
