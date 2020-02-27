export const getTitlecaseText = (str = "") => {
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export function getTimeNow() {
  const time = new Date();
  return time.getTime();
}

export function getTop5Objs(obj) {
  // const example = {
  //   "-LpcffWlQpzMxuNavRkh": 2,
  //   "-LpvECOVTb2KaCJfwb-t": 2,
  //   "-Lp3zN5dCw0I7jfEGs7x": 1,
  //   "-Lp4-6-_vh0Fv6axpYDV": 1,
  //   "-Lp4-7gpoDouj4Uh7XeQ": 1
  // };
  if (!obj) {
    return [];
  }
  let props = [];
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value !== 0) {
      props.push({ key: key, value: value });
    }
  });

  props.sort(function(p1, p2) {
    return p2.value - p1.value;
  });
  const topFive = props.slice(0, 5).reduce(function(obj, prop) {
    obj[prop.key] = prop.value;
    return obj;
  }, {});
  return topFive;
}
export function getTop5Keys(obj) {
  // const example = {
  //   "-LpcffWlQpzMxuNavRkh": 2,
  //   "-LpvECOVTb2KaCJfwb-t": 2,
  //   "-Lp3zN5dCw0I7jfEGs7x": 1,
  //   "-Lp4-6-_vh0Fv6axpYDV": 1,
  //   "-Lp4-7gpoDouj4Uh7XeQ": 1
  // };
  const top5Objs = getTop5Objs(obj);
  return Object.keys(top5Objs);
}

export function validateEmail(value) {
  const regExRequirement = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const correct = regExRequirement.test(value);
  let error;
  if (!correct) {
    error = "Invalid email";
  }
  return error;
}

export function sendSlackMsg(msg) {
  const url = `https://slack.com/api/chat.postMessage?token=xoxp-193876967781-194587282198-201614410755-9513c0a9f4b234e9e2be003f2c43e8e5&channel=test&text=${msg}&username=pet-sharing`;
  fetch(url);
}

export function convertUrlToLanguageUrl(path, language) {
  let splitted = path.split("/");
  splitted = splitted.slice(2, splitted.length); // cut out domain name and language
  const pathWithoutLang = splitted.join("/");
  const isHomePage = pathWithoutLang.length == 2; // zh, jp etc...
  const newPath = isHomePage
    ? `/${language}`
    : `/${language}/${pathWithoutLang}`;
  return newPath;
}
