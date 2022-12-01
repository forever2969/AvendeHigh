const canvas = document.querySelector('canvas');
if (canvas.getContext) {
	console.log('캔버스 지원');
}
const canvasSize = 500;
const defaultX = 820;
const defaultY = 20;

const applyRoom = ()=>{
	const roomSize = document.getElementById('roomSize').value;
	console.log(roomSize);
	const checkRoom = new Array(roomSize);
	for(let i=0; i<roomSize; i++){
		checkRoom[i] = 0;
	}
	console.log(window.innerWidth);
	printRoom(roomSize);
}

const printRoom = (roomSize)=>{
	document.getElementById("resultRoom").innerText = '방의크기 = '+roomSize+'*'+roomSize;
	const context = canvas.getContext('2d');

	context.clearRect(0,0,canvasSize,canvasSize);
	//사각형 rendering
	context.beginPath();
	context.strokeRect(0,0,canvasSize,canvasSize);
	context.closePath();

	for(let i=1; i<roomSize; i++){
		//가로선
		context.beginPath();
		context.moveTo(0,(canvasSize/roomSize)*i);
		context.lineTo(canvasSize,(canvasSize/roomSize)*i);
		context.stroke();
		context.closePath();

		//세로선
		context.beginPath();
		context.moveTo((canvasSize/roomSize)*i,0);
		context.lineTo((canvasSize/roomSize)*i,canvasSize);
		context.stroke();
		context.closePath();
	}

	bugLocation(roomSize);
}

const bugLocation = (roomSize)=>{
	let bugPosX = Math.floor(Math.random() * (roomSize)) + 1;
	let bugPosY = Math.floor(Math.random() * (roomSize)) + 1;
	const multiNum = (canvasSize/(2*roomSize));

	if(bugPosX !== 1){
		bugPosX = bugPosX*2 -1;
	}
	if(bugPosY !== 1){
		bugPosY = bugPosY*2 -1;
	}

	const applyBugX = bugPosX*multiNum;
	const applyBugY = bugPosY*multiNum;
	const oneRoomSize = canvasSize/roomSize;

	addImg(applyBugX,applyBugY,oneRoomSize,roomSize);
}
// 좌표는 정보는 구했고, 각 좌표에 맞게 딱정벌레 load해야함

const addImg = (applyBugX,applyBugY,oneRoomSize,roomSize)=>{
	const img = document.getElementById('bug');
	const imgDiv = document.getElementById('bugDiv');
	console.log(roomSize);

	imgDiv.setAttribute('width',`${oneRoomSize}`);
	imgDiv.setAttribute('height',`${oneRoomSize}`);
	img.setAttribute('width',`${(`${oneRoomSize}`*2)/3}`);
	img.setAttribute('height',`${(`${oneRoomSize}`*2)/3}`);	
	console.log((oneRoomSize));
	//img.style.bottom= `${parseInt(applyBugY)+parseInt(defaultY)}px`;
	//img.style.right= `${parseInt(applyBugX)+parseInt(defaultX)}px`;
	//console.log(parseInt(document.getElementById("canvasDiv").offsetHeight)/2+ 145);
	console.log(175+Math.ceil(oneRoomSize*(roomSize/2)));

	((roomSize%2 != 0)?
	img.style.left = `${(window.innerWidth-(oneRoomSize*2)/3)/2}`+'px':
	img.style.left = `${(window.innerWidth-(oneRoomSize*2)/3)/2 + oneRoomSize/2}`+'px'
	);
	((roomSize%2 != 0) ?
	img.style.top = `${175-`${(oneRoomSize*2/3)/2}`+Math.ceil(oneRoomSize*(roomSize/2))}`+'px' :
	img.style.top = `${175+parseInt(`${(oneRoomSize*2/3)/4}`)+Math.ceil(oneRoomSize*(roomSize/2))}`+'px'
	);

	autoMove();
}

// const autoMove = ()=>{

// 	while(checkRoom)
// 	const img = document.getElementById('bug');
// 	let currentImgX = img.style.bottom;
// 	let currentImgY = img.style.right;
// 	//랜덤값 8까지 받아서 if문으로 움직임 처리
// 	let direction = Math.floor(Math.random(8));

// 	if(direction === 0){ //위
// 		img.style.bottom= '' //현재위치 받아와야함
// 	}else if(direction === 1){ //아래

// 	}else if(direction === 2){ //좌

// 	}else if(direction === 3){ //우

// 	}else if(direction === 4){ //왼위

// 	}else if(direction === 5){ //왼아

// 	}else if(direction === 6){ //오위

// 	}else{ //오아

// 	}
// }