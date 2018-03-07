define(function(require, exports, module) {
  'use strict'
  const digit = require('digit')

  var WIDTH = 1024
  var HEIGHT = 768
  var RADIUS = 8
  var MARGIN_LEFT = 30
  var MARGIN_TOP = 30
  const COLORS = [
    '#33B5E5',
    '#0099CC',
    '#AA66CC',
    '#9933CC',
    '#99CC00',
    '#669900',
    '#FFBB33',
    '#FF8800',
    '#FF4444',
    '#CC0000'
  ]
  let currentTime
  let balls = []

  window.addEventListener('load', () => {
    let ctx = document.querySelector('#canvas').getContext('2d')
    ctx.canvas.width = WIDTH
    ctx.canvas.height = HEIGHT
    currentTime = parseTime(new Date())
    setInterval(function() {
      render(ctx)
      update()
    }, 50)
  })

  function render(ctx) {
    let hours = currentTime.hours
    let minutes = currentTime.minutes
    let seconds = currentTime.seconds

    let numberArr = (hours + ':' + minutes + ':' + seconds).split('')
    let positionArr = [0, 7, 14, 18, 25, 32, 36, 43]
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    numberArr.map((value, index) => {
      value = isNaN(Number(value)) ? 10 : +value
      paintNum(
        MARGIN_LEFT + positionArr[index] * 2 * (RADIUS + 1),
        MARGIN_TOP,
        value,
        digit,
        ctx
      )
    })
    balls.map(ball => {
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, RADIUS, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.fillStyle = ball.color
      ctx.fill()
    })
  }

  function parseTime(time) {
    let hours = String.prototype.padStart.call(time.getHours(), 2, '0')
    let minutes = String.prototype.padStart.call(time.getMinutes(), 2, '0')
    let seconds = String.prototype.padStart.call(time.getSeconds(), 2, '0')
    return {
      hours,
      minutes,
      seconds
    }
  }

  function update() {
    let nextTime = parseTime(new Date())
    if (currentTime.seconds !== nextTime.seconds) {
      if (currentTime.seconds % 10 !== nextTime.seconds % 10) {
        addBalls(
          MARGIN_LEFT + 43 * 2 * (RADIUS + 1),
          MARGIN_TOP,
          parseInt(nextTime.seconds % 10)
        )
      }
      if (
        parseInt(currentTime.seconds / 10) !== parseInt(nextTime.seconds / 10)
      ) {
        addBalls(
          MARGIN_LEFT + 36 * 2 * (RADIUS + 1),
          MARGIN_TOP,
          parseInt(nextTime.seconds / 10)
        )
      }

      if (currentTime.minutes % 10 !== nextTime.minutes % 10) {
        addBalls(
          MARGIN_LEFT + 25 * 2 * (RADIUS + 1),
          MARGIN_TOP,
          parseInt(nextTime.minutes % 10)
        )
      }
      if (
        parseInt(currentTime.minutes / 10) !== parseInt(nextTime.minutes / 10)
      ) {
        addBalls(
          MARGIN_LEFT + 18 * 2 * (RADIUS + 1),
          MARGIN_TOP,
          parseInt(nextTime.minutes / 10)
        )
      }

      if (currentTime.hours % 10 !== nextTime.hours % 10) {
        addBalls(
          MARGIN_LEFT + 7 * 2 * (RADIUS + 1),
          MARGIN_TOP,
          parseInt(nextTime.hours % 10)
        )
      }
      if (parseInt(currentTime.hours / 10) !== parseInt(nextTime.hours / 10)) {
        addBalls(
          MARGIN_LEFT + 0 * 2 * (RADIUS + 1),
          MARGIN_TOP,
          parseInt(nextTime.hours / 10)
        )
      }
      currentTime = nextTime
    }
    updateBalls()
  }

  function updateBalls() {
    balls.map(ball => {
      ball.x += ball.vx
      ball.y += ball.vy
      ball.vy += ball.g

      if (ball.y >= HEIGHT - RADIUS) {
        ball.y = HEIGHT - RADIUS
        ball.vy = -ball.vy * 0.75
      }
    })

    let cnt = 0
    for (let i = 0; i < balls.length; i++)
      if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WIDTH)
        balls[cnt++] = balls[i]

    while (balls.length > Math.min(cnt, 300)) {
      balls.pop()
    }

    console.log(balls.length)
  }

  function addBalls(x, y, num) {
    for (let i = 0; i < digit[num].length; i++) {
      for (let j = 0; j < digit[num][i].length; j++) {
        if (digit[num][i][j]) {
          let aball = {
            x: x + MARGIN_LEFT + (2 * j + 1) * (RADIUS + 1),
            y: y + MARGIN_TOP + (2 * i + 1) * (RADIUS + 1),
            g: 1.5 + Math.random(),
            vx: (Math.random() > 0.5 ? -1 : 1) * 4,
            vy: -5,
            color: COLORS[Math.floor(Math.random() * 10)]
          }

          balls.push(aball)
        }
      }
    }
  }

  function paintNum(x, y, num, digit, ctx) {
    let sign = digit[num]
    for (let i = 0; i < sign.length; i++) {
      for (let j = 0; j < sign[i].length; j++) {
        if (sign[i][j]) {
          ctx.beginPath()
          ctx.arc(
            x + MARGIN_LEFT + (2 * j + 1) * (RADIUS + 1),
            y + MARGIN_TOP + (2 * i + 1) * (RADIUS + 1),
            RADIUS,
            0,
            2 * Math.PI
          )
          ctx.closePath()
          ctx.fillStyle = '#345'

          ctx.fill()
        }
      }
    }
  }
})
