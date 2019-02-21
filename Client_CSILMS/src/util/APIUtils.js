import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

const request = options => {

  let headers;

  if(options.hasOwnProperty("custom_no_headers"))
      headers = new Headers({ });
  else 
      headers = new Headers({
        "Content-Type": "application/json"
      });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }
  
  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/auth/user/me",
    method: "GET"
  });
}

export function login(loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function fetchData(options) {
  return request(options);
}

export function displayByRole(props, roleName) {
  if (!props) return;
  const roles = props.roles;
  const currRole = roles.filter(function(role) {
    return role.roleName === roleName;
  });

  if (currRole.length > 0) {
    return { display: "inline" };
  } else {
    return { display: "none" };
  }
}

export function isHrRole(props) {
  if (!props) return;
  const roles = props.roles;
  const currRole = roles.filter(function(role) {
    return role.roleName === "HR";
  });

  return currRole.length > 0 ? true : false;
}

export function isManagerRole(props) {
  if (!props) return;
  const roles = props.roles;
  const currRole = roles.filter(function(role) {
    return role.roleName === "MANAGER";
  });

  return currRole.length > 0 ? true : false;
}

export function formatDateDMY(strDate) {
  // Returns DD/MM/YYYY Date Format
  var date = new Date(strDate),
    month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

export function formatDateYMD(strDate) {
  // Returns YYYY-MM-DD Date Format
  var date = new Date(strDate),
    month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
