/**
 * HTMLからFormの内容を取得
 */
const calorieCounter = document.getElementById("calorie-counter");
/** HTMLからID:Budgetのinputに入力された値を取得 */
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;
// todo　この検証をしたいのにできなかった
// console.log({ calorieCounter });
// console.log(budgetNumberInput.value);

/**
 * 文字列を絶対値に直す＆スペースを消す処理
 * @param {string} str
 */
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
}
