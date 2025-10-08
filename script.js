/**
 * HTMLからFormの内容を取得
 */
const calorieCounter = document.getElementById("calorie-counter");
/** HTMLからID:Budgetのinputに入力された値を取得 */
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const btn1 = document.getElementById("btn1");
const output = document.getElementById("output");
let isError = false;

/** ーーここからモーダル用ーー */
const entryModal = document.getElementById("entry-modal");
const modalAddBtn = document.getElementById("modal-add-or-update-btn");
const modalCancelBtn = document.getElementById("modal-cancel-btn");
const modalEntryName = document.getElementById("modal-entry-name");
const modalEntryCalorie = document.getElementById("modal-entry-calorie");
/** ーーここまでーー */

// TODO 摂取と消費ごとにクラス名を付与
document.getElementById("breakfast").classList.add("consumed");
document.getElementById("lunch").classList.add("consumed");
document.getElementById("dinner").classList.add("consumed");
document.getElementById("snacks").classList.add("consumed");
document.getElementById("exercise").classList.add("burned");
// TODO この検証をしたいのにできなかった
// console.log({ calorieCounter });
console.log(budgetNumberInput.value);

/**
 * 文字列を絶対値に直す＆スペースを消す処理
 * @param {string} str
 */
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, ""); // スペースや符号を取り除いた文字列を返す
}

/**
 * 入力値に指数表記と一致する部分があったらその値を配列で返す処理
 * 配列の中身は文字列となる
 * 「数字e数字」の並びの文字列を探す
 * \dは[0-9] と同等
 * iは大文字小文字を区別しないため
 * +は数字が一個以上でも検知できるようにするため
 * 指数表記がなかったらnullを返す
 * @param {string} str
 */
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

/**
 * 入力欄を追加する関数
 * entryDropdown.valueに＃を追加してIDにする
 * 指定したIDの要素の子要素のinput-containerクラスを指定する
 * その指定先をtargetInputContainer（エレメント）に代入する
 * `#${entryDropdown.value} .input-container`の塊一つが引数
 */
// function addEntry() {
//   const targetInputContainer = document.querySelector(
//     `#${entryDropdown.value} .input-container`
//   );
//   console.log({ targetInputContainer });
//   /**
//    * entryNumberという配列に、エントリーした食べ物の個数が代入される
//    * targetInputContainerには、食材名とカロリーが入っている
//    * 1個目の入力のときは，まだtargetInputContainerに追加されていない→長さに+ 1をする！
//    */
//   const entryNumber =
//     targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
//   console.log({ entryNumber });
// TODO 直接文字列でHTMLを追加する以外の方法がないのか調べる→createElementメソッドでHTML要素を作ることができる

// const HTMLString = `<span data-type=></span>`;

/**
 * HTMLStringは，addEntry関数が実行されたらdivタグのinput-containerクラスのなかに入る
 */
// const HTMLString = `<label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
// <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name" />
// <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
// <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories" />
// `;
console.log({ HTMLString });
// TODO createElementでできるか考える
/**新しく入力された食べ物とカロリーを後ろに追加する処理 */
// targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);

/**
 * 入力内容の無効・有効を判定してカロリ－を返す関数
 * @param {Text} list
 * listにはinput要素からクエリセレクタオールで取ってきたNodelistが入る
 */
function getCaloriesFromInputs(list) {
  let calories = 0;
  for (const item of list) {
    const currVal = cleanInputString(item.value);
    // TODO invalidInputMatchの使い方をチェックする
    /**
     * 指数表記があったらinvalidInputMatchに代入される
     */
    const invalidInputMatch = isInvalidInput(currVal);
    console.log(invalidInputMatch);

    // `invalidInputMatch`がtruthyかどうかを判断するためのif文
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true; // これでcalculateCalories関数のときにエラーで早期リターンができるようにしている
      return null; // これをやる理由は値がない事を明示するため
    }
    /** 文字列currValをNumber関数で数値に戻して計算する */
    calories += Number(currVal);
  }
  return calories;
}
/** ここからモーダルのエントリー画面 */
function showEntryModal() {
  entryModal.classList.remove("hide");
}

function hideEntryModal() {
  entryModal.classList.add("hide");
}
/**
 * span要素をinnerHTMLで追加→入力結果が画面に表示される
 * appendChildで追加
 */
// TODO 2025-10-09やるところ
function addEntryForModal() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  console.log({ targetInputContainer });
  /**
   * entryNumberという配列に、エントリーした食べ物の個数が代入される
   * targetInputContainerには、食材名とカロリーが入っている
   * 1個目の入力のときは，まだtargetInputContainerに追加されていない→長さに+ 1をする！
   */
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  console.log({ entryNumber });

  // TODO 直接文字列でHTMLを追加する以外の方法がないのか調べる→createElementメソッドでHTML要素を作ることができる
  // 2025-10-08ここ👇️
  const entryType = entryDropdown.value === "exercise" ? "burned" : "consumed";

  // const nameValue =

  const entryHTML = `<span class="entryHtml" data-type="${entryType}" data-name="${nameValue}" data-calorie="${calorieValue}">${nameValue}: ${calorieValue} Calories</span>`;

  targetInputContainer.insertAdjacentHTML("beforeend", entryHTML);
  console.log(modalEntryName.value);
  console.log(modalEntryCalorie.value);
  // const foodName = document.querySelectorAll(
  //   "#modal-entry-name input[type='text']"
  // );
}

modalAddBtn.addEventListener("click", addEntryForModal);

// TODO getCaloriesFromInput関数の後に書くほうが良い
function calculateCalories(e) {
  e.preventDefault(); // リロードを防いで入力内容を保持するため
  isError = false;
  const consumedNumberInputs = document.querySelectorAll(
    ".consumed input[type='number']"
  );
  const burnedNumberInputs = document.querySelectorAll(
    ".burned input[type='number']"
  );
  const consumedCalories = getCaloriesFromInputs(consumedNumberInputs);
  const burnCalories = getCaloriesFromInputs(burnedNumberInputs);
  // const breakfastNumberInputs = document.querySelectorAll(
  //   "#breakfast input[type='number']"
  // );
  // const lunchNumberInputs = document.querySelectorAll(
  //   "#lunch input[type='number']"
  // );
  // const dinnerNumberInputs = document.querySelectorAll(
  //   "#dinner input[type='number']"
  // );
  // const snacksNumberInputs = document.querySelectorAll(
  //   "#snacks input[type='number']"
  // );
  // const exerciseNumberInputs = document.querySelectorAll(
  //   "#exercise input[type='number']"
  // );
  // const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  // const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  // const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  // const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  // const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  /**
   * Budgetは計算する必要はあるのか？
   */
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  console.log(budgetNumberInput.value);
  // TODO どうしてisErrorはここで判定するの？宣言する前で良くないか？
  if (isError) {
    return; // 早期リターン
  }
  /** 摂取カロリー */
  // const consumedCalories =
  //   breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + burnCalories;
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <hr>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${burnCalories} Calories Burned</p>
  `;
  output.classList.remove("hide");
}

/** inputContainersにはNodeListが入る
 * div.input-containerが5つNodeListに入る
 * NodeListを配列に変換してinputContainersに代入
 */
function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );
  /** div.input-container要素を削除するためのループ処理 */
  for (const container of inputContainers) {
    container.innerHTML = "";
  }
  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");

  // console.log(inputContainers);
}

// getCaloriesFromInputs([{ value: "100" }, { value: "300" }, { value: "1e2" }]);

// addEntryButton.addEventListener("click", addEntry);
addEntryButton.addEventListener("click", showEntryModal);
modalCancelBtn.addEventListener("click", hideEntryModal);

calorieCounter.addEventListener("submit", calculateCalories);

clearButton.addEventListener("click", clearForm);
// function callFunction(ev) {
//   console.log(ev);
// }

// btn1.addEventListener("click", callFunction);
// btn1.addEventListener("click", callFunction);
