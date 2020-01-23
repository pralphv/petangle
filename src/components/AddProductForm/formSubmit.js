function convertStrToFloat(string) {
  isNumber = !isNaN(string);
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

export function standardizeFormData(form) {
  let cb = calculateCarbs(form.pro, form.f, form.wm, form.cra, form.fi);
  cb = netWetMatter(cb, form.wm);
  const pro = netWetMatter(form.pro, form.wm);
  const cra = netWetMatter(form.cra, form.wm);
  const f = netWetMatter(form.f, form.wm);
  const fi = netWetMatter(form.fi, form.wm);

  const b = capitalizeFirstLetter(form.b);
  const pr = capitalizeFirstLetter(form.pr);

  let newForm = {
    ...form,
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

  newForm = removeBlankAttr(newForm);
  Object.keys(newForm).forEach(key => {
    try {
      newForm[key] = convertStrToFloat(newForm[key]);
    } catch {}
  });
  return newForm;
}
