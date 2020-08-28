export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const convertTimestamp = (timestamp) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const timePassed = Math.round((currentTime - timestamp) / 3600);
  return timePassed;
};

export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }

  return str.slice(0, num) + "...";
};
