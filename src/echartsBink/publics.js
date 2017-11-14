const getDataByIndexNames = (indexNames, dataModel) => {
  var temp = [];
  $.each(indexNames, function(index, value) {
    temp.push(dataModel[value]);
  });
  return temp;
}
const getLegend = (indexNames, indexChineseNames) => {
  var array = [];
  $.each(indexNames, function(index, value) {
    array.push({
      name: indexChineseNames[index],
      icon: 'rect',
    });
  });

  return array;
}
const getSeries = (indexNames, indexChineseNames, dataModel, lineWidth) => {
  var array = [];
  $.each(indexNames, function(index, value) {
    array.push({
      name: indexChineseNames[index],
      type: 'line',
      data: dataModel[value],
      lineStyle: {
        normal: {
          width: lineWidth,
        }
      }
    });
  });
  return array;
}

const generateIndicator = (indexNames, indexChineseNames, dataModel, maxValue) => {
  var temp = [];
  var max = 0;

  if(null == maxValue) {
    //获取dataModel的最大值
    $.each(indexNames, function(index, value) {
      if(max < dataModel[value]) {
        max = Math.round(dataModel[value]);
      }
    });
    if(max % 5 != 0) {
      max = Math.round(max / 5) * 5;
    }

  } else {
    max = maxValue;
  }

  $.each(indexChineseNames, function(index, value) {
    temp.push({
      name: value,
      max: max
    });
  });

  return temp;
}

export default {
  methods: {
    getDataByIndexNames,
    generateIndicator,
    getLegend,
    getSeries
  }
};
