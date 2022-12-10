const canvas = document.querySelector('canvas');
if (canvas.getContext) {
	console.log('캔버스 지원');
}
const canvasSize = 500;
const context = canvas.getContext('2d');

const applyRoom = ()=>{
	const roomSize = document.getElementById('roomSize').value;
	localStorage.setItem('roomSize',roomSize);
	printRoom(roomSize);
}

const printRoom = (roomSize)=>{
	document.getElementById("resultRoom").innerText = '방의크기 = '+roomSize+'*'+roomSize;

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

	addImg(oneRoomSize,roomSize);
}
// 좌표는 정보는 구했고, 각 좌표에 맞게 딱정벌레 load해야함

const addImg = (oneRoomSize,roomSize)=>{
	const img = document.getElementById('bug');
	const imgDiv = document.getElementById('bugDiv');

	imgDiv.setAttribute('width',`${oneRoomSize}`);
	imgDiv.setAttribute('height',`${oneRoomSize}`);
	img.setAttribute('width',`${(`${oneRoomSize}`*2)/3}`);
	img.setAttribute('height',`${(`${oneRoomSize}`*2)/3}`);	


	((roomSize%2 != 0)?
	img.style.left = `${(window.innerWidth-(oneRoomSize*2)/3)/2}`+'px':
	img.style.left = `${(window.innerWidth-(oneRoomSize*2)/3)/2 + oneRoomSize/2}`+'px'
	);
	((roomSize%2 != 0) ?
	img.style.top = `${175-`${(oneRoomSize*2/3)/2}`+Math.ceil(oneRoomSize*(roomSize/2))}`+'px' :
	img.style.top = `${175+parseInt(`${(oneRoomSize*2/3)/4}`)+Math.ceil(oneRoomSize*(roomSize/2))}`+'px'
	);

}

const checkVisited = (arr)=>{
	for(let i=0; i<arr.length; i++){
		if(arr[i] == 0){
			return true
		}
	}
	return false;
}

function wait(sec) {
    let start = Date.now(), now = start;
    while (now - start < sec * 1000) {
        now = Date.now();
    }
}

const moveBug = ()=>{
	const img = document.getElementById("bug");
	
	const roomSize = localStorage.getItem('roomSize');
	const oneRoomSize = canvasSize/roomSize;
	let bugPosX = (img.style.left).slice(0,(img.style.left).length-2);
	let bugPosY = (img.style.top).slice(0,(img.style.top).length-2);
	const initRoomLeft = (window.innerWidth-500)/2;
	const initRoomRight = (window.innerWidth-500)/2 + 500;
	const initRoomTop = 180;
	const initRoomBottom = 180+500;
	
	//랜덤값 8까지 받아서 if문으로 움직임 처리
	let direction = Math.floor(Math.random() * 8);
	//여기에 방향에 따라 판을 나가는지 판단해서 예외처리 해야함

		if(direction === 0){ //위
			console.log("위");
			if((bugPosY - oneRoomSize) < initRoomTop){
				return -1;
			}
			img.style.top = (bugPosY - oneRoomSize)+"px";
			//break;
		}else if(direction === 1){ //아래
			console.log("아래");
			if((parseInt(bugPosY) + oneRoomSize) > initRoomBottom){
				return -1;
			}
			img.style.top = (parseInt(bugPosY) + oneRoomSize) + "px";
			//break;
		}else if(direction === 2){ //좌
			console.log("좌");
			if((bugPosX - oneRoomSize) < initRoomLeft){
				return -1;
			}
			img.style.left = (bugPosX - oneRoomSize) + "px";
			//break;
		}else if(direction === 3){ //우
			console.log("우");
			if((parseInt(bugPosX) + oneRoomSize) > initRoomRight){
				return -1;
			}
			img.style.left = (parseInt(bugPosX) + oneRoomSize) + "px";
			//break;
		}else if(direction === 4){ //왼위
			console.log("왼위");
			if((bugPosY - oneRoomSize) < initRoomTop){
				return -1;
			}
			if((bugPosX - oneRoomSize) < initRoomLeft){
				return -1;
			}
			img.style.top = (bugPosY - oneRoomSize) + "px";
			img.style.left = (bugPosX - oneRoomSize) + "px";
			//break;
		}else if(direction === 5){ //왼아
			console.log("왼아");
			if((parseInt(bugPosY) + oneRoomSize) > initRoomBottom){
				return -1;
			}
			if((bugPosX - oneRoomSize) < initRoomLeft){
				return -1;
			}
			img.style.top = (parseInt(bugPosY) + oneRoomSize) + "px";
			img.style.left = (bugPosX - oneRoomSize) + "px";
			//break;
		}else if(direction === 6){ //오위
			console.log("오위");
			if((bugPosY - oneRoomSize) < initRoomTop){
				return -1;
			}
			if((parseInt(bugPosX) + oneRoomSize) > initRoomRight){
				return -1;
			}
			img.style.top = (bugPosY - oneRoomSize) + "px";
			img.style.left = (parseInt(bugPosX) + oneRoomSize) + "px";
			//break;
		}else{ //오아
			console.log("오아");
			if((parseInt(bugPosY) + oneRoomSize) > initRoomBottom){
				return -1;
			}
			if((parseInt(bugPosX) + oneRoomSize) > initRoomRight){
				return -1;
			}
			img.style.top = (parseInt(bugPosY) + oneRoomSize) + "px";
			img.style.left = (parseInt(bugPosX) + oneRoomSize) + "px";
			//break;
		}

	
	return direction;
}

const sketchLine = (direction,checkRoom,idx)=>{
	const img = document.getElementById("bug");
	const inputDiv = document.getElementById("inputRoom");
	const roomSize = Number(localStorage.getItem('roomSize'));
	const oneRoomSize = Number(canvasSize/roomSize);
	const index = idx+1;

	let currentPos;

	for(let i=0; i<roomSize*roomSize; i++){
		if(checkRoom[i] === idx){
			currentPos = i;
		}
	}

	context.beginPath();
	//context.moveTo(bugPosX,bugPosY);

	//context.lineTo(100,100);
	let currentPosX;
	let currentPosY;
	let currentBuffer;

	if(idx === 1){
		((roomSize%2 != 0)?
		currentBuffer = canvasSize/2:
		currentBuffer = canvasSize/2+oneRoomSize
		);

		currentPosX = currentBuffer;
		currentPosY = currentBuffer;

	}else{
		if(currentPos%5 === 0){
			currentPosX = oneRoomSize/2;
		}else if(currentPos%5 === 1){
			currentPosX = oneRoomSize/2 + oneRoomSize;
		}else if(currentPos%5 === 2){
			currentPosX = oneRoomSize/2 + 2*oneRoomSize;
		}
		else if(currentPos%5 === 3){
			currentPosX = oneRoomSize/2 + 3*oneRoomSize;
		}
		else if(currentPos%5 === 4){
			currentPosX = oneRoomSize/2 + 4*oneRoomSize;
		}

		if(currentPos < 5){
			currentPosY = oneRoomSize/2;
		}else if(currentPos < 10){
			currentPosY = oneRoomSize/2 + oneRoomSize;
		}
		else if(currentPos < 15){
			currentPosY = oneRoomSize/2 + 2*oneRoomSize;
		}else if(currentPos < 20){
			currentPosY = oneRoomSize/2 + 3*oneRoomSize;
		}else if(currentPos < 25){
			currentPosY = oneRoomSize/2 + 4*oneRoomSize;
		}

		
	}
	setTimeout(()=>{

		context.moveTo(currentPosX,currentPosY);
	//context.lineTo(canvasSize,(canvasSize/roomSize)*i);
	if(direction === 0){ //위
		console.log("위");
		context.lineTo(currentPosX,currentPosY - oneRoomSize);
		//break;
	}else if(direction === 1){ //아래
		console.log("아래");
		context.lineTo(currentPosX,currentPosY + oneRoomSize);
		//break;
	}else if(direction === 2){ //좌
		console.log("좌");
		context.lineTo(currentPosX - oneRoomSize,currentPosY);
		//break;
	}else if(direction === 3){ //우
		console.log("우");
		context.lineTo(currentPosX + oneRoomSize,currentPosY);
		//break;
	}else if(direction === 4){ //왼위
		console.log("왼위");
		context.lineTo(currentPosX - oneRoomSize,currentPosY - oneRoomSize);
		//break;
	}else if(direction === 5){ //왼아
		console.log("왼아");
		context.lineTo(currentPosX - oneRoomSize,currentPosY + oneRoomSize);
		//break;
	}else if(direction === 6){ //오위
		console.log("오위");
		context.lineTo(currentPosX + oneRoomSize,currentPosY - oneRoomSize);
		//break;
	}else{ //오아
		console.log("오아");
		context.lineTo(currentPosX + oneRoomSize,currentPosY + oneRoomSize);
		//break;
	}
	context.stroke();
	context.closePath();
	},2000);
	
}

const recordRoom = (arr,direction,idx)=>{
	let index;
	const roomSize = Number(localStorage.getItem('roomSize'));
	const length = arr.length;
	for(let i=0; i<arr.length; i++){
		if(arr[i] === idx){
			index = i;
		}
	}
	const tempArr = arr;

	if(direction === 0){ //위
		console.log("위");
		arr[index-roomSize] = idx+1;
		//break;
	}else if(direction === 1){ //아래
		arr[index + roomSize] = idx+1;
		//break;
	}else if(direction === 2){ //좌
		arr[index-1] = idx+1;
		//break;
	}else if(direction === 3){ //우
		arr[index+1] = idx+1;
		//break;
	}else if(direction === 4){ //왼위
		arr[index-roomSize-1] = idx+1;
		//break;
	}else if(direction === 5){ //왼아
		arr[index+roomSize-1] = idx+1;
		//break;
	}else if(direction === 6){ //오위
		arr[index-roomSize+1] = idx+1;
		//break;
	}else{ //오아
		arr[index+roomSize+1] = idx+1;
		//break;
	}
	if(arr.length !== length){
		return tempArr;
	}
	return arr;
}

const autoMove = ()=>{
	const roomSize = localStorage.getItem('roomSize');
	const checkSize = parseInt(roomSize)*parseInt(roomSize)
	let checkRoom = new Array(checkSize);
	
	for(let i=0; i<checkSize; i++){
		checkRoom[i] = 0;
	}
	
	let idx = 0;
	console.log(checkRoom);
	if(roomSize%2 === 0){

	}else{
		checkRoom[Math.floor(checkSize/2)] = 1;
	}
	
	while(checkVisited(checkRoom)){ //checkVisited(checkRoom) 및 checkRoom방문처리 및 범위처리 및 while로 인해 좌표변경이 연속적으로 일어날때 순차적인 이동처리
		idx = idx+1;
		//console.log(idx);
		let direction = moveBug();
		if(direction === -1){
			idx = idx-1;
			continue;
		}
		localStorage.setItem('before_direction',direction);
		checkRoom = recordRoom(checkRoom,direction,idx);
		console.log(checkRoom);
		sketchLine(direction,checkRoom,idx);
		wait(0.1);
	}
	
}
