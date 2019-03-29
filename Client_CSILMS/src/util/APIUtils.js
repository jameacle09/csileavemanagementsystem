import { fetch as fetchPolyfill } from "whatwg-fetch";
import { API_BASE_URL, ACCESS_TOKEN } from "../constants";

let isIE = /*@cc_on!@*/ false || !!document.documentMode;

const request = options => {
  let headers;

  if (options.hasOwnProperty("custom_no_headers")) {
    headers = new Headers({});
    delete options.custom_no_headers;
  } else
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
  if (isIE) {
    return fetchPolyfill(options.url, options).then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
  } else {
    return fetch(options.url, options).then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
  }
};

const requestFileUnparsed = options => {
  let headers = new Headers();
  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);
  if (isIE) {
    return fetchPolyfill(options.url, options).then(response => response);
  } else {
    return fetch(options.url, options).then(response => response);
  }
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

export function isFirstTimeLogin() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/firstTime",
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

export function fetchFile(options) {
  return requestFileUnparsed(options);
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
  // Returns Date in DD/MM/YYYY Format
  if (!strDate) return;
  var varDate = strDate;
  if (isIE) varDate = strDate.toString().substr(0, 10);

  var date = new Date(varDate),
    month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}

export function formatDateYMD(strDate) {
  // Returns Date in YYYY-MM-DD Format
  if (!strDate) return;
  var varDate = strDate;
  if (isIE) varDate = strDate.toString().substr(0, 10);

  var date = new Date(varDate),
    month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function getWeekDay(strDate) {
  if (!strDate) return;
  var varDate = strDate;
  if (isIE) varDate = strDate.toString().substr(0, 10);

  var date = new Date(varDate),
    weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[date.getDay()];
}

export function addNewDateYMD(strDate) {
  // Returns Date in YYYY-MM-DD Format
  if (!strDate) return;
  var varDate = strDate;
  if (isIE) varDate = strDate.toString().substr(0, 10);

  var date = new Date(varDate),
    month = date.getMonth() + 1,
    day = date.getDate() + 1,
    year = date.getFullYear();

  var newMonth = month,
    newDay = day,
    newYear = year,
    maxDay = 0;

  switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
      maxDay = 30;
      break;
    case 2:
      if (year % 4 === 0) {
        maxDay = 29;
      } else {
        maxDay = 28;
      }
      break;
    default:
      maxDay = 31;
      break;
  }

  if (newDay > maxDay) {
    newDay = 1;
    newMonth = newMonth + 1;

    if (newMonth > 12) {
      newMonth = 1;
      newYear = year + 1;
    }
  }

  if (newMonth < 10) newMonth = "0" + newMonth;
  if (newDay < 10) newDay = "0" + newDay;

  return [newYear, newMonth, newDay].join("-");
}
