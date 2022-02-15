const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".controls__color"); //배열로 반환
const range = document.getElementById("jsRange");
const clear = document.getElementById("jsClear");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//pixel modifier에 사이즈를 줘야한다.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//저장시에 배경이 투명하게 나오는걸 막으려고
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

//strokeStyle: 선의 색깔
//fillStyle: 도형의 색깔
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //선의 굵기

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  //offsetX인 이유는, 캔버스 안에서의 위치를 파악하고 싶기 때문
  //clientX는 전체 창에서의 위치를 의미한다.
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

//event 인터페이스의 target 속성은 이벤트가 발생한 대상 객체를 가리킨다.
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleClearClick() {
  const before = ctx.fillStyle;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = before;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const img = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = img;
  link.download = "paintJS";
  link.click();
}

//색 변화시키기
colors.forEach((color) => color.addEventListener("click", handleColorClick));

//캔버스가 있는지 확인 (없을수도 있으니까)
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스의 움직임을 감지하고자 한다.
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  //마우스 우클릭하면 뜨는 창을 안 뜨게 한다. 내가 만든 Save버튼을 사용하게 하려고
  canvas.addEventListener("contextmenu", handleCM);
}

//range가 있는지 확인
if (range) {
  range.addEventListener("input", handleRangeChange);
}

//clear가 있는지 확인
if (clear) {
  clear.addEventListener("click", handleClearClick);
}

//mode가 있는지 확인
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

//save가 있는지 확인
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

/*
이 방식으로 할 수도 있음
const colors = document.getElementsByClassName("controls__color");

colors를 배열로 만든 다음에 하나씩 뽑는다.
위에서 사용한 querySelectorAll은 처음부터 배열로 반환해줘서 Array.form()이 필요 없다.
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick)
);

*/
