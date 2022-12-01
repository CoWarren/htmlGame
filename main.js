import Phaser, { Game, Scene } from 'phaser'
let player
let cursors
let pointer

const config = {
  type: Phaser.AUTO, 
  width: 800,
  height: 600,
  backgroundColor: 0x999999,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

const game = new Phaser.Game(config)

// class GameScene extends Scene {
//   constructor(){
//     super('gameScene')
//   }

// }
function preload() {
  // Code that needs to be run before the game is on the screen
  // things like images and assets 
 this.load.spritesheet('manPistol', 'assets/TDS-Man/pistol_movement_sprite.png', {frameWidth: 258, frameHeight: 220}) 
 this.load.spritesheet('manIdlePistol', 'assets/TDS-Man/IdlePistol_sprite.png', {frameWidth: 255, frameHeight: 220}) 
 this.load.spritesheet('manShootPistol', 'assets/TDS-Man/shootPistol_sprite.png', {frameWidth: 258, frameHeight: 220})
 this.load.audio('pistolShot', 'assets/Sound/9mm-pistol-shoot-short-reverb-7152.mp3')
}

function create() {
  // Code that runs as soon as the game is on the screen 
  player = this.physics.add.sprite(150, 150, 'manPistol')
  player.setSize(160, 185)
  this.pistolShot = this.sound.add('pistolShot')

  //Creating movement for man \
  // Man moves Right
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('manPistol'),
    frameRate: 30,
  })
  
  // //movement to the left 
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('manPistol'),
    frameRate: 30,
  })

  // Movement upwards  
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('manPistol'),
    frameRate: 30,
  })
  // Movement downwards 
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('manPistol'),
    frameRate: 30,
  })
  // Idle Movement 
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('manIdlePistol'),
    frameRate: 10,
    repeat: -1,
  })
  // Shooting pistol animation 
  this.anims.create({
    key: 'ShootPistol',
    frames: this.anims.generateFrameNumbers('manShootPistol', {start: 0, end: 2}),
    frameRate: 15,
    repeat: 0
  })
  // cursors = this.input.keyboard.createCursorKeys()
  cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      })
  pointer = this.input
}

function update() {
  // Code that runs for every frame rendered in the browser
  // //movement right and left 
  // PistolMovement()

  if(this.input.mousePointer.isDown){
    player.anims.play('ShootPistol', true)
    this.pistolShot.play()
  }else{
      PistolMovement()
  }
            
            // Rotating the player to face the mouse
  let angle = Phaser.Math.Angle.Between(player.x, player.y, pointer.x, pointer.y)
  player.setRotation(angle)
}

function PistolMovement() {
  if(cursors.right.isDown){
    player.setVelocityX(160)
    player.anims.play('right', true)
  }else if (cursors.left.isDown){
    player.setVelocityX(-160)
    player.anims.play('left', true)
  } else if(cursors.down.isDown){
    player.setVelocityY(160)
    player.anims.play('down', true)
  }else if (cursors.up.isDown){
    player.setVelocityY(-160)
    player.anims.play('up', true)
  }else {
    player.setVelocity(0)
    player.anims.play('idle', true)
  }
}