function formatFeatures(diseaseType, features) {
  const binaryMap = {
    yes: 1,
    no: 0,
    present: 1,
    notpresent: 0,
    good: 1,
    poor: 0,
    normal: 0,
    abnormal: 1,
  };

  switch (diseaseType) {
    case "diabetes":
      return {
        pregnancies: Number(features.pregnancies),
        glucose: Number(features.glucose),
        bloodPressure: Number(features.bloodPressure),
        skinThickness: Number(features.skinThickness),
        insulin: Number(features.insulin),
        bmi: Number(features.bmi),
        diabetesPedigreeFunction: Number(features.diabetesPedigreeFunction),
        age: Number(features.age),
      };

    case "heart":
      return {
        age: Number(features.age),
        sex: features.sex.toLowerCase() === "male" ? 1 : 0,
        cp: Number(features.cp),
        trestbps: Number(features.trestbps),
        chol: Number(features.chol),
        fbs: binaryMap[features.fbs.toLowerCase()] ?? -1,
        restecg: Number(features.restecg),
        thalach: Number(features.thalach),
        exang: binaryMap[features.exang.toLowerCase()] ?? -1,
        oldpeak: Number(features.oldpeak),
        slope: Number(features.slope),
        ca: Number(features.ca),
        thal: Number(features.thal),
      };

    case "kidney":
      return {
        age: Number(features.age),
        al: Number(features.al),
        ane: binaryMap[features.ane.toLowerCase()] ?? -1,
        appet: binaryMap[features.appet.toLowerCase()] ?? -1,
        ba: binaryMap[features.ba.toLowerCase()] ?? -1,
        bgr: Number(features.bgr),
        bp: Number(features.bp),
        bu: Number(features.bu),
        cad: binaryMap[features.cad.toLowerCase()] ?? -1,
        dm: binaryMap[features.dm.toLowerCase()] ?? -1,
        hemo: Number(features.hemo),
        htn: binaryMap[features.htn.toLowerCase()] ?? -1,
        pc: binaryMap[features.pc.toLowerCase()] ?? -1,
        pcc: binaryMap[features.pcc.toLowerCase()] ?? -1,
        pcv: Number(features.pcv),
        pe: binaryMap[features.pe.toLowerCase()] ?? -1,
        pot: Number(features.pot),
        rbc: binaryMap[features.rbc.toLowerCase()] ?? -1,
        sc: Number(features.sc),
        sg: parseFloat(features.sg),
        sod: Number(features.sod),
        su: Number(features.su),
        wc: Number(features.wc),
      };

    default:
      throw new Error("Invalid disease type");
  }
}
