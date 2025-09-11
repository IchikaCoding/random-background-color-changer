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
// TODO この検証をしたいのにできなかった
// console.log({ calorieCounter });
// console.log(budgetNumberInput.value);

/**
 * 文字列を絶対値に直す＆スペースを消す処理
 * @param {string} str
 */
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, ""); // スペースや符号を取り除いた文字列を返す
}

/**
 * 指数表記を取り除く処理
 * 数字e数字の並びの文字列を探す
 * iは大文字小文字を区別しないため
 * +は数字が一個以上でも検知できるようにするため
 * @param {string} str
 */
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

/**
 * entryDropdown.valueに＃を追加してIDにする
 * 指定したIDの要素の子要素のinput-containerクラスを指定する
 * その指定先をtargetInputContainer（エレメント）に代入する
 * `#${entryDropdown.value} .input-container`の塊一つが引数
 */
function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  console.log({ targetInputContainer });
  /**
   * entryNumberという配列に、エントリーした食べ物の個数が代入される
   * targetInputContainerには、食材名とカロリーが入っている
   */
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length;
  const HTMLString = ``;
}
