function convertStrToFloat(string) {
  const isNumber = !isNaN(string);
  if (!isNumber) {
    throw "Input is not a string";
  }
  let result = parseFloat(string);
  return result;
}

function removeBlankAttr(obj) {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
}

function calculateCarbs(fat, fibre, protein, crudeAsh, wetMatter) {
  const carbs = 100 - fat - fibre - protein - crudeAsh - wetMatter;
  return carbs;
}

function netWetMatter(macroNutrient, wetMatter) {
  const newDivisor = 100 - wetMatter;
  let net = (macroNutrient / newDivisor) * 100;
  net = net.toFixed(2);
  net = parseFloat(net);
  return net;
}

function capitalizeFirstLetter(text) {
  text = text
    .toLowerCase()
    .split(" ")
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
  return text;
}

function convertLanguage(text) {
  const langMap = {
    貓: "Cat",
    狗: "Dog",
    Cat: "Cat",
    Dog: "Dog",
    猫: "Cat",
    犬: "Dog",
    乾糧: "Dry Food",
    濕糧: "Wet Food",
    "Wet Food": "Wet Food",
    "Dry Food": "Dry Food",
    ウェットフード: "Wet Food",
    ドライフード: "Dry Food",
    零食: "Snack",
    スナック: "Snack",
    Snack: "Snack"
  };
  return langMap[text];
}

export function standardizeFormData(form) {
  let cb = calculateCarbs(form.pro, form.f, form.wm, form.cra, form.fi);
  cb = netWetMatter(cb, form.wm);
  const a = convertLanguage(form.a);
  const fc = convertLanguage(form.fc);
  const pro = netWetMatter(form.pro, form.wm);
  const cra = netWetMatter(form.cra, form.wm);
  const f = netWetMatter(form.f, form.wm);
  const fi = netWetMatter(form.fi, form.wm);

  const b = capitalizeFirstLetter(form.b).toString();
  const pr = capitalizeFirstLetter(form.pr).toString();

  let newForm = {
    ...form,
    a,
    fc,
    b,
    pr,
    cb,
    pro,
    cra,
    f,
    fi,
    wm: parseFloat(form.wm),
    l: 0,
    dl: 0
  };
  try {
    delete newForm["b2"]; // there is b2 because CustomAutoSuggestField.js
  } catch {}
  try {
    delete newForm["pr2"];
  } catch {}
  newForm = removeBlankAttr(newForm);
  Object.keys(newForm).forEach(key => {
    if (key !== "b" && key !== "pr") {
      try {
        newForm[key] = convertStrToFloat(newForm[key]);
      } catch {}
    }
  });
  return newForm;
}
