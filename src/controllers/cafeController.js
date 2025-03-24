import {
  getAllCafes as getAllCafesService,
  getCafeById,
  getCafesByIds,
  getCafesByName as getCafesByNameService,
  getCafeHoursById,
  getCafeHoursByIds,
  getCafeHoursByDay as getCafeHoursByDayService
} from '../services/cafeService.js';

// 모든 카페 조회
export const getAllCafes = async (req, res) => {
  try {
    const cafes = await getAllCafesService(); 
    res.json(cafes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 단일 카페 조회
export const getCafe = async (req, res) => {
  try {
    const cafe = await getCafeById(req.params.id);
    res.json(cafe);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// ID 목록에 해당하는 카페 조회
export const getCafes = async (req, res) => {
  try {
    const ids = req.query.ids;
    
    if (!ids) {
      return res.status(400).json({ error: "IDs are required" });
    }

    const idArray = ids.split(',').map(id => parseInt(id.trim(), 10));
    const cafes = await getCafesByIds(idArray);

    res.json(cafes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 특정 이름을 포함하는 카페 조회
export const getCafesByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Please enter a search term." });
    }

    const cafes = await getCafesByNameService(name);
    res.json(cafes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 특정 카페의 운영 시간 조회
export const getCafeHours = async (req, res) => {
  try {
    const cafeHours = await getCafeHoursById(req.params.id);
    res.json(cafeHours);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// ID 목록에 해당하는 카페의 운영 시간 조회
export const getCafesHours = async (req, res) => {
  try {
    const ids = req.query.ids;

    if (!ids) {
      return res.status(400).json({ error: "IDs are required" });
    }

    const idArray = ids.split(',').map(id => parseInt(id.trim(), 10));
    const cafeHoursList = await getCafeHoursByIds(idArray);

    res.json(cafeHoursList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 특정 카페의 특정 요일 운영 시간 조회
export const getCafeHoursByDay = async (req, res) => {
  try {
    const { id, day } = req.params;
    const cafeHours = await getCafeHoursByDayService(id, day);
    res.json(cafeHours);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};