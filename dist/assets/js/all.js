"use strict";

var bmiKataApi = "https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json";
var mebList = document.querySelector(".meb-list");
var gpList = document.querySelector(".gp-list");
var gpCardNum = document.querySelector(".group-num");
var gpFilterBtn = document.querySelector("#gp-filter-btn");
var gpFilterCard = document.querySelector("#gp-filter-card");
var gpFilterList = document.querySelector(".group-filter-list");
var avgTime = document.querySelector(".avg-time");
var fullMebData = []; // 全部資料

var sortData = []; // 由 -時間- 快到慢排列資料

var newData = []; // 整理後資料

var gpData = []; // 各組人員資料
// 取的資料

axios.get(bmiKataApi).then(function (response) {
  fullMebData = response.data;
  getNewData();
  getgpData();
  dataSort();
  addGpFilterList();
  renderGpList(1);
  renderMebList();
}); // 新資料

function getNewData() {
  var arr = [];
  fullMebData.forEach(function (item) {
    // console.log(item)
    var obj = {};
    obj.timestamp = item.timestamp;
    obj.slackName = item.slackName;
    obj.jsGroup = item.jsGroup;
    obj.youtubeUrl = item.youtubeUrl;
    obj.haveTen = item.haveTen;
    obj.codepenUrl = item.codepenUrl;
    obj.practiceMinute = item.practiceMinute;
    obj.practiceSecond = item.practiceSecond;
    obj.totalTime = parseInt(item.practiceMinute * 60) + parseInt(item.practiceSecond);
    arr.push(obj);
  });
  newData = arr;
}

; // 分類組別名單    

function getgpData() {
  var sortGroupData = newData.reduce(function (acc, el) {
    var groupNum = el.jsGroup;
    if (!acc[groupNum]) acc[groupNum] = {
      groupNum: groupNum,
      groupPeople: [el]
    };else acc[groupNum].groupPeople.push(el);
    return acc;
  }, {});
  gpData = Object.values(sortGroupData);
}

; // 完成速度排名

function dataSort() {
  // 以時間快慢排序
  sortData = fullMebData.sort(function (a, b) {
    var timeA = parseInt(a.practiceMinute) * 60 + parseInt(a.practiceSecond);
    var timeB = parseInt(b.practiceMinute) * 60 + parseInt(b.practiceSecond);
    return timeA - timeB;
  });
}

; // toggle 清單 加上 class

gpFilterBtn.addEventListener('click', function (e) {
  if (gpFilterCard.className == "card p-0 hide-card") {
    gpFilterCard.setAttribute('class', "card p-0");
  } else {
    gpFilterCard.setAttribute('class', "card p-0 hide-card");
  }

  ;
}); // 渲染組別號碼選單

function addGpFilterList() {
  var str = "";
  gpData.forEach(function (item, index) {
    // console.log(item)
    if (index == 0) {
      str += "\n            <a class=\"nav-link selected\" href=\"#\">".concat(item.groupNum, "</a>\n            ");
    } else if (index > 0 && index < 27) {
      str += "\n            <a class=\"nav-link\" href=\"#\">".concat(item.groupNum, "</a>\n            ");
    } else if (index == 27) {
      str += "\n            <a class=\"nav-link\" href=\"#\">".concat(item.groupNum, "</a>\n            ");
    }

    ;
  });
  gpFilterList.innerHTML = str;
}

; // 渲染分組人員 & 平均時間

function renderGpList(gpNumber) {
  var str = "";
  var arr = [];
  var gpAvgTime = 0;
  newData.forEach(function (item) {
    if (gpNumber == item.jsGroup) {
      str += "\n            <tr>\n                <td id=\"self-rank\"></td>\n                <td id=\"slack-id\">".concat(item.slackName, "</td>\n                <td id=\"ten-times\">").concat(item.haveTen !== "是" ? "".concat(item.haveTen) : "<span class=\"material-icons-outlined\">check_circle</span>", "</td>\n                <td id=\"codepen-url\"><a href=\"").concat(item.codepenUrl, "\"><i class=\"fab fa-codepen h3 mb-0\"></i></a></td>\n                <td id=\"mins\">").concat(item.practiceMinute, "</td>\n                <td id=\"secs\">").concat(item.practiceSecond, "</td>\n            </tr>\n            ");
      gpCardNum.innerHTML = "GROUP <br> ".concat(item.jsGroup);
      gpAvgTime += parseInt(item.practiceMinute) * 60 + parseInt(item.practiceSecond);
      arr.push(item);
    }

    ;
  });
  gpList.innerHTML = str;
  avgTime.innerHTML = "AVARAGE TIME: ".concat((gpAvgTime / arr.length).toFixed(0), "s");
}

; // 篩選出對應的組別號碼

gpFilterList.addEventListener("click", function (e) {
  renderGpList(e.target.firstChild.nodeValue);
}); // 渲染全部表單人員

function renderMebList() {
  var str = "";
  newData.forEach(function (item) {
    str += "\n        <tr>\n            <td id=\"self-rank\"></td>\n            <td id=\"date\">".concat(item.timestamp, "</td>\n            <td id=\"slack-id\">").concat(item.slackName, "</td>\n            <td id=\"group\" class=\"text-align-center\">").concat(item.jsGroup, "</td>\n            <td id=\"youtube-url\" class=\"text-align-center\">").concat(item.youtubeUrl !== "" ? "<a href=\"".concat(item.youtubeUrl, "\"><i class=\"fab fa-youtube h3 mb-0\"></i></a>") : "<span class=\"material-icons-round\">play_disabled</span>", "</td>\n            <td id=\"ten-times\" class=\"text-align-center\">").concat(item.haveTen !== "是" ? "".concat(item.haveTen) : "<span class=\"material-icons-outlined\">check_circle</span>", "</td>\n            <td id=\"codepen-url\" class=\"text-align-center\"><a href=\"").concat(item.codepenUrl, "\"><i class=\"fab fa-codepen h3 mb-0\"></i></a></td>\n            <td id=\"mins\" class=\"text-align-center\">").concat(item.practiceMinute, "</td>\n            <td id=\"secs\" class=\"text-align-center\">").concat(item.practiceSecond, "</td>\n        </tr>\n        ");
  });
  mebList.innerHTML = str;
}

;
//# sourceMappingURL=all.js.map
