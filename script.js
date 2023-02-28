const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getCollisionPoint = (circle, rect) => {
	const cx = clamp(circle.x, rect.x, rect.x + rect.width);
	const cy = clamp(circle.y, rect.y, rect.y + rect.height);
	return { x: cx, y: cy };
};

const getDistance = (p1, p2) => {
	const dx = p1.x - p2.x;
	const dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

const checkCollision = (circle, rect) => {
	const collisionPoint = getCollisionPoint(circle, rect);
	const distance = getDistance(collisionPoint, circle);
	return distance < circle.radius;
};

const canvas = document.getElementById("cvs");
const ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
const radiusRange = document.getElementById("radiusRange");
radiusRange.min = 0;
radiusRange.max = Math.min(canvas.width, canvas.height) / 2;
radiusRange.value = 50;

const rect = {
	x: canvas.width / 2 - 150,
	y: canvas.height / 2 - 50,
	width: 300,
	height: 100,
};

const circle = {
	x: 0,
	y: 0,
	radius: 50,
};

const updateRadius = () => {
    circle.radius = radiusRange.value;
};

radiusRange.oninput = updateRadius;

const moveCircle = (e) => {
	circle.x = e.clientX || e.touches[0].clientX;
	circle.y = e.clientY || e.touches[0].clientY;
};

canvas.onmousemove = moveCircle;
canvas.ontouchmove = moveCircle;

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw rect
	ctx.beginPath();
	ctx.rect(rect.x, rect.y, rect.width, rect.height);
	ctx.stroke();
    // draw circle
	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
	ctx.stroke();

    //draw collision point
    const collisionPoint = getCollisionPoint(circle, rect);
    ctx.beginPath();
    ctx.arc(collisionPoint.x, collisionPoint.y, 5, 0, 2 * Math.PI);
    ctx.fill();

    // draw collision line
    const colliding = checkCollision(circle, rect);
    ctx.strokeStyle = colliding ? "red" : "black";
    ctx.beginPath();
    ctx.moveTo(circle.x, circle.y);
    ctx.lineTo(collisionPoint.x, collisionPoint.y);
    ctx.stroke();

	requestAnimationFrame(draw);
};
draw();
