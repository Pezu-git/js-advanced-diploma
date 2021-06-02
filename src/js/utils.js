/* eslint-disable max-len */
/* eslint-disable no-plusplus */
export function calcTileType(index, boardSize) {
  if (index === 0) {
    return 'top-left';
  }

  if (index === boardSize - 1) {
    return 'top-right';
  }

  if (index === boardSize ** 2 - boardSize) {
    return 'bottom-left';
  }

  if (index === boardSize ** 2 - 1) {
    return 'bottom-right';
  }

  if (index <= boardSize - 1) {
    return 'top';
  }

  if (index >= boardSize ** 2 - boardSize && index <= boardSize ** 2 - 1) {
    return 'bottom';
  }

  if ((index + boardSize) % boardSize === 0) {
    return 'left';
  }

  if ((index + 1) % boardSize === 0) {
    return 'right';
  }

  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

export function calcCanWalk(step) {
  let i = 1;
  const arr = [];
  do {
    arr.push(i);
    i++;
  } while (i <= step);
  console.log(arr);
  return arr;
}

// расчёт длинны шага персонажа
export function calcStep(index, position, boardSize) {
  return Math.abs((index % boardSize) - (position % boardSize));
}


// условия совершения шага по диагонали


function calcStepArr(step) {
  let i = 1;
  const arr = [];
  while (i <= step) {
    arr.push(i);
    i++;
  }
  return arr;
}

function calcStepY(index, position, boardSize, step) {
  const math = Math.abs((position - index) / boardSize);
  return calcStepArr(step).includes(math);
}
function calcStepX(index, position, prevStep) {
  if (index === position - prevStep || index === position + prevStep) {
    return true;
  }
  return false;
}

export function canStep(index, position, boardSize, prevStep, step) {
  if ((boardSize ** 2 - index === boardSize ** 2 - (position + boardSize * prevStep + prevStep)
  || boardSize ** 2 - index === boardSize ** 2 - (position - boardSize * prevStep + prevStep)
  || boardSize ** 2 - index === boardSize ** 2 - (position + boardSize * prevStep - prevStep)
  || boardSize ** 2 - index === boardSize ** 2 - (position - boardSize * prevStep - prevStep))
    || calcStepY(index, position, boardSize, step)
      || calcStepX(index, position, prevStep)) {
    return true;
  }
  return false;
}
