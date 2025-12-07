const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (page = 1, name = '') => {
  try {
    let url;
    if (name) {
      url = `${BASE_URL}/character/?page=${page}&name=${name}`;
    } else {
      url = `${BASE_URL}/character/?page=${page}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch characters');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCharacter = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch character');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getEpisodes = async (page = 1, name = '') => {
  try {
    let url;
    if (name) {
      url = `${BASE_URL}/episode/?page=${page}&name=${name}`;
    } else {
      url = `${BASE_URL}/episode/?page=${page}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch episodes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getEpisode = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/episode/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch episode');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getLocations = async (page = 1, name = '') => {
  try {
    const url = name 
      ? `${BASE_URL}/location/?page=${page}&name=${name}`
      : `${BASE_URL}/location/?page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getLocation = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/location/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch location');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


