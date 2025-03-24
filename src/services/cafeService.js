import {
  getAllCafes as getAllCafesModel,
  getCafesByIds as getCafesByIdsModel,
  getCafeById as getCafeByIdModel,
  findCafesByName,
  getCafeOperatingHoursById as getCafeOperatingHoursByIdModel,
  getCafeOperatingHoursByIds as getCafeOperatingHoursByIdsModel,
  getCafeOperatingHoursByDay as getCafeOperatingHoursByDayModel
} from '../models/cafeModel.js';

// 모든 카페 조회
export const getAllCafes = async () => {
  return await getAllCafesModel();
};

// 특정 ID의 카페 조회
export const getCafeById = async (id) => {
  const cafe = await getCafeByIdModel(id);
  if (!cafe) throw new Error('Cafe not found');
  return cafe;
};

// 특정 ID 목록의 카페 조회
export const getCafesByIds = async (ids) => {
  if (!ids || ids.length === 0) {
    throw new Error('No valid cafe IDs provided');
  }

  const cafes = await getCafesByIdsModel(ids);
  if (!cafes || cafes.length === 0) {
    throw new Error('No cafes found for the given IDs');
  }

  return cafes;
};

// 특정 카페의 운영 시간 조회
export const getCafeHoursById = async (id) => {
  const cafe = await getCafeOperatingHoursByIdModel(id);
  if (!cafe) {
    console.log("No data found for cafe ID:", id);
    return null;
  }

  return formatCafeHours(cafe);
};

// ID 목록에 해당하는 카페의 운영 시간 조회
export const getCafeHoursByIds = async (ids) => {
  const cafes = await getCafeOperatingHoursByIdsModel(ids);
  if (!cafes.length) {
    console.log("No data found for cafe IDs:", ids);
    return [];
  }

  return cafes.map(formatCafeHours);
};

// 특정 이름을 포함하는 카페 조회
export const getCafesByName = async (name) => {
  try {
    if (!name) {
      throw new Error("Search term cannot be empty.");
    }

    // 모든 공백 제거
    const sanitizedSearchTerm = name.replace(/\s/g, "");

    // 한글, 영어, 숫자 이외의 문자가 포함된 경우 검색 불가
    if (!/^[가-힣a-zA-Z0-9]+$/.test(sanitizedSearchTerm)) {
      throw new Error("Search term can only contain Korean, English, and numbers.");
    }

    return await findCafesByName(sanitizedSearchTerm);
  } catch (error) {
    throw new Error(`An error occurred while retrieving cafes: ${error.message}`);
  }
};
// 특정 카페의 특정 요일 운영 시간 조회
export const getCafeHoursByDay = async (id, day) => {
  const dayOpenColumn = `${day}_open`;
  const dayCloseColumn = `${day}_close`;

  return await getCafeOperatingHoursByDayModel(id, dayOpenColumn, dayCloseColumn);
};

// 운영 시간 데이터를 JSON으로 변환하는 함수
const formatCafeHours = (cafe) => ({
  id: cafe.id,
  name: cafe.name,
  open_24h: cafe.open_24h,
  opening_hours: {
    monday: { open: cafe.monday_open, close: cafe.monday_close },
    tuesday: { open: cafe.tuesday_open, close: cafe.tuesday_close },
    wednesday: { open: cafe.wednesday_open, close: cafe.wednesday_close },
    thursday: { open: cafe.thursday_open, close: cafe.thursday_close },
    friday: { open: cafe.friday_open, close: cafe.friday_close },
    saturday: { open: cafe.saturday_open, close: cafe.saturday_close },
    sunday: { open: cafe.sunday_open, close: cafe.sunday_close }
  },
  event: cafe.event
});
