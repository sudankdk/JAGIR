export const get_username_from_url = () => {
  const url_split = window.location.pathname.split("/");
  return url_split[url_split.length - 1]; // Assuming the username is the last segment
};
