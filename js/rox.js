var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

var map,
  layer,
  graphics,
  circle,
  surroundingCircle,
  uiTime,
  player,
  enemy1,
  enemy2,
  enemy3,
  enemy4,
  enemy5,
  enemy6,
  enemy7,
  enemy8,
  enemy9,
  enemy10,
  enemy11,
  enemy12,
  enemy13,
  enemy14,
  enemy15,
  globalScore,
  bg,
  sfx,
  pad1,
  dump,
  cursors,
  leftKey,
  rightKey,
  jumpKey,
  runKey;
var level = 1;
var score = 0;

var menu = function (game) {
};
var credits = function (game) {
};
var lvl = function (game) {
  times = ['past', 'now', 'future'];
  layers = [];
  collisions = [
    [
      10, 11, 12, 13, 14,
      42, 43, 44, 45, 46,
      74, 75, 76, 77, 78,
      106, 107, 108, 109, 110,
      138, 139, 140, 141, 142,
      161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175,
      177,
      193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203,
      207,
      209,
      225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,
      266, 267,
      270, 271, 272, 273
    ],
    [
      10, 11, 12, 13, 14,
      42, 43, 44, 45, 46,
      74, 75, 76, 77, 78,
      106, 107, 108, 109, 110,
      138, 139, 140, 141, 142,
      161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175,
      177,
      193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203,
      207,
      209,
      225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,
      266, 267,
      270, 271, 272, 273
    ]
  ];
  state = 'now';
  facing = 'right';
  scoringCircleRadius = 100;
  surroundingCircleRadius = 100;
  total = 1;
  jumpTimer = 0;
  changeTimer = 0;
  openTimer = 0;
  bumper1Timer = 0;
  bumper2Timer = 0;
  speed = 150;
  gravity = 750;
  //gravity = 50;
  isAggro = false;
  playerCoords = [];
  enemy1Coords = [];
  enemy2Coords = [];
  enemy3Coords = [];
  enemy4Coords = [];
  enemy5Coords = [];
  enemy6Coords = [];
  enemy7Coords = [];
  enemy8Coords = [];
  enemy9Coords = [];
  enemy10Coords = [];
  enemy11Coords = [];
  enemy12Coords = [];
  enemy13Coords = [];
  enemy14Coords = [];
  enemy15Coords = [];
  chest1Coords = [];
  chest2Coords = [];
  chest3Coords = [];
  signCoords = [];
};

// Menu
menu.prototype = {
  preload: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;

    game.load.audio('music', 'wav/music.wav');
    game.load.audio('select', 'wav/select.wav');
    game.load.image('main', 'images/main.png');
  },
  create: function () {
    bg = game.add.tileSprite(0, 0, game.canvas.width, game.canvas.height, 'main');

    sfx = game.add.audio('music');
    sfx.play('');

    // Gamepad
    game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;
    cursors = game.input.keyboard.createCursorKeys();
    startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.onDown.add(dump, this);
  },
  update: function () {
    if (pad1.justPressed(Phaser.Gamepad.XBOX360_A) || jumpKey.isDown || pad1.justPressed(Phaser.Gamepad.XBOX360_START) || startKey.isDown) {
      sfx.stop();
      sfx = game.add.audio('select');
      sfx.play('');
      game.state.start("Level");
    }
  }
};

// Credits
credits.prototype = {
  preload: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;

    game.load.audio('select', 'wav/select.wav');
    game.load.image('credits', 'images/credits.png');
  },
  create: function () {
    bg = game.add.tileSprite(0, 0, game.canvas.width, game.canvas.height, 'credits');

    // Gamepad
    game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;
    cursors = game.input.keyboard.createCursorKeys();
    startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    game.input.onDown.add(dump, this);
  },
  update: function () {
    if (pad1.justPressed(Phaser.Gamepad.XBOX360_A) || jumpKey.isDown || pad1.justPressed(Phaser.Gamepad.XBOX360_START) || startKey.isDown) {
      sfx = game.add.audio('select');
      sfx.play('');
      game.state.start("Menu");
    }
  }
};

// Level
lvl.prototype = {
  preload: function () {
    // Tilemaps
    // Level 1
    for (var lvl = 1; lvl < 3; lvl++) {
      for (var i = 0; i < times.length; i++) {
        if (i == 0) {
          game.load.image('level' + lvl + '-background', 'images/level' + lvl + '/background.png');
          game.load.image('level' + lvl + '-landscape', 'images/level' + lvl + '/landscape.png');
        }
        game.load.tilemap('level' + lvl + '-' + times[i], 'json/level' + lvl + '/' + times[i] + '.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('level' + lvl + '-tiles', 'images/level' + lvl + '/level' + lvl + '-tiles.png');
      }
    }

    game.load.audio('chest', 'wav/chest.wav');
    game.load.audio('death', 'wav/death.wav');
    game.load.audio('finish', 'wav/finish.wav');
    game.load.audio('jump', 'wav/jump.wav');
    game.load.audio('select', 'wav/select.wav');
    game.load.audio('shoot', 'wav/shoot.wav');

    game.load.spritesheet('menu', 'images/pause.png', 800, 600);
    game.load.spritesheet('death', 'images/deathscreen.png', 800, 600);
    game.load.spritesheet('chest', 'images/chest.png', 32, 32);
    game.load.spritesheet('sign', 'images/sign.png', 32, 64);
    game.load.spritesheet('dude', 'images/dude.png', 32, 48);
    game.load.spritesheet('ui_score', 'images/ui/ui_score.png', 100, 100);
    game.load.spritesheet('ui_time', 'images/ui/ui_time2.png', 295, 100);
    game.load.spritesheet('bad_dude', 'images/bad_dude.png', 64, 64);

    score = 0;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
  },

  create: function () {

    this.loadLevel(level);

    // Gamepad
    game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;
    cursors = game.input.keyboard.createCursorKeys();
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    backKey = game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
    startKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    runKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    game.input.onDown.add(dump, this);
  },
  update: function () {

    game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    switch (level) {
      case 1:
        game.physics.arcade.collide(enemy1, layer);
        var enemy1Col = game.physics.arcade.collide(player, enemy1);
        if (enemy1Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy2, layer);
        var enemy2Col = game.physics.arcade.collide(player, enemy2);
        if (enemy2Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(chest1, layer);
        var chest1Col = game.physics.arcade.collide(player, chest1);
        if (chest1Col) {
          this.hitChest(chest1);
        }
        game.physics.arcade.collide(chest2, layer);
        var chest2Col = game.physics.arcade.collide(player, chest2);
        if (chest2Col) {
          this.hitChest(chest2);
        }
        sign.dirty = false;
        game.physics.arcade.collide(sign, layer);
        var signCol = game.physics.arcade.collide(player, sign);
        if (signCol) {
          sfx = game.add.audio('finish');
          sfx.play('');
          level = 2;
          globalScore += score;
          game.state.start("Level");
        }
        break;

      case 2 :
        game.physics.arcade.collide(enemy1, layer);
        var enemy1Col = game.physics.arcade.collide(player, enemy1);
        if (enemy1Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy2, layer);
        var enemy2Col = game.physics.arcade.collide(player, enemy2);
        if (enemy2Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy3, layer);
        var enemy3Col = game.physics.arcade.collide(player, enemy3);
        if (enemy3Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy4, layer);
        var enemy4Col = game.physics.arcade.collide(player, enemy4);
        if (enemy4Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy5, layer);
        var enemy5Col = game.physics.arcade.collide(player, enemy5);
        if (enemy5Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy6, layer);
        var enemy6Col = game.physics.arcade.collide(player, enemy6);
        if (enemy6Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy7, layer);
        var enemy7Col = game.physics.arcade.collide(player, enemy7);
        if (enemy7Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy8, layer);
        var enemy8Col = game.physics.arcade.collide(player, enemy8);
        if (enemy8Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy9, layer);
        var enemy9Col = game.physics.arcade.collide(player, enemy9);
        if (enemy9Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy10, layer);
        var enemy10Col = game.physics.arcade.collide(player, enemy10);
        if (enemy10Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy11, layer);
        var enemy11Col = game.physics.arcade.collide(player, enemy11);
        if (enemy11Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy12, layer);
        var enemy12Col = game.physics.arcade.collide(player, enemy12);
        if (enemy12Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy13, layer);
        var enemy13Col = game.physics.arcade.collide(player, enemy13);
        if (enemy13Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy14, layer);
        var enemy14Col = game.physics.arcade.collide(player, enemy14);
        if (enemy14Col) {
          this.playerDeath();
        }
        game.physics.arcade.collide(enemy15, layer);
        var enemy15Col = game.physics.arcade.collide(player, enemy15);
        if (enemy15Col) {
          this.playerDeath();
        }

        game.physics.arcade.collide(chest1, layer);
        var chest1Col = game.physics.arcade.collide(player, chest1);
        if (chest1Col) {
          this.hitChest(chest1);
        }
        game.physics.arcade.collide(chest2, layer);
        var chest2Col = game.physics.arcade.collide(player, chest2);
        if (chest2Col) {
          this.hitChest(chest2);
        }
        game.physics.arcade.collide(chest3, layer);
        var chest3Col = game.physics.arcade.collide(player, chest3);
        if (chest3Col) {
          this.hitChest(chest3);
        }
        sign.dirty = false;
        game.physics.arcade.collide(sign, layer);
        var signCol = game.physics.arcade.collide(player, sign);
        if (signCol) {
          sfx = game.add.audio('finish');
          sfx.play('');
          level = 2;
          globalScore += score;
          switch (level) {
            case 1:
              game.state.start("Level");
              break;
            case 2:
              game.state.start("Credits");
              break;
          }
        }
        break;

        break;
      default:
        break;
    }

    if (player.alive) {
      if ((pad1.justPressed(Phaser.Gamepad.XBOX360_LEFT_BUMPER) || cursors.left.isDown) && game.time.now > bumper1Timer) {
        this.changeLayer('past', state);

        this.updateScoring();
        bumper1Timer = game.time.now + 500;
      }
      else if ((pad1.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER) || cursors.right.isDown) && game.time.now > bumper2Timer) {
        this.changeLayer('future', state);
        this.updateScoring();
        bumper2Timer = game.time.now + 500;
      }

      if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1 || leftKey.isDown) {
        if (pad1.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER) || runKey.isDown) {
          player.body.velocity.x = -speed * 2;
        }
        else {
          player.body.velocity.x = -speed;
        }

        if (facing != 'left') {
          player.animations.play('left');
          facing = 'left';
        }
      }
      else if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1 || rightKey.isDown) {
        if (pad1.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER) || runKey.isDown) {
          player.body.velocity.x = speed * 2;
        }
        else {
          player.body.velocity.x = speed;
        }

        if (facing != 'right') {
          player.animations.play('right');
          facing = 'right';
        }
      }
      else {
        if (facing != 'idle') {
          player.animations.stop();

          if (facing == 'left') {
            player.frame = 6;
          }
          else {
            player.frame = 7;
          }

          facing = 'idle';
        }
      }

      bg.tilePosition.set(game.camera.x * -0.1, 0);
      bg2.tilePosition.set(game.camera.x * -0.5, 0);

      if ((pad1.justPressed(Phaser.Gamepad.XBOX360_A) || jumpKey.isDown) && player.body.onFloor() && game.time.now > jumpTimer) {
        sfx = game.add.audio('jump');
        sfx.play('', 0, 0.5);
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 100;
      }

      if (pad1.justPressed(Phaser.Gamepad.XBOX360_START) || startKey.isDown) {
        this.pause();
      }

    }
    else {
      if (pad1.justPressed(Phaser.Gamepad.XBOX360_B) || pad1.justPressed(Phaser.Gamepad.XBOX360_START) || startKey.isDown) {
        sfx = game.add.audio('select');
        sfx.play('');
        game.state.start("Menu");
      }
    }
    if (pad1.justPressed(Phaser.Gamepad.XBOX360_BACK) || backKey.isDown) {
      sfx = game.add.audio('death');
      sfx.play('');
      game.state.start("Level");
    }
  },
  loadLevel: function (level) {
    if (map) {
      map = undefined;
      graphics = undefined;
      layers = [];
    }
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#a8e4fc';
    bg = game.add.tileSprite(0, 50, game.world.width, game.canvas.height, 'level' + level + '-background');
    bg.fixedToCamera = true;
    bg2 = game.add.tileSprite(0, 210, game.world.width, game.canvas.height, 'level' + level + '-landscape');
    bg2.fixedToCamera = true;
    var col = collisions[level - 1];
    for (var i = 0; i < times.length; i++) {
      map = game.add.tilemap('level' + level + '-' + times[i]);
      map.addTilesetImage('level' + level + '-tiles');
      map.setCollisionByExclusion(col);
      layers[i] = map.createLayer(times[i].charAt(0).toUpperCase() + times[i].slice(1) + ' Layer');
      layers[i].resizeWorld();
    }

    // Rock death
    //map.setTileIndexCallback([
    //  1, 2, 3, 4, 5,
    //  18, 19, 20, 21, 22, 23, 24, 25,
    //  34, 35, 36, 37, 38,
    //  50, 51, 52, 53, 54, 55, 56, 57,
    //  65, 66, 67, 68, 69,
    //  82, 83, 84, 85, 86, 87, 88, 89,
    //  98, 99, 100, 101, 102,
    //  114, 115, 116, 117, 118, 119, 120, 121,
    //  146, 147, 148, 149, 150, 151, 152, 153,
    //  178, 179, 180, 181, 182, 183, 184, 185,
    //  210, 211, 212, 213, 214, 215, 216, 217,
    //  242, 243, 244, 245, 246, 247, 248, 249
    //], this.playerDeath, this);

    switch (level) {
      case 1 :
        total = 2;

        playerCoords = [150, 800];
        enemy1Coords = [3550, 834];
        enemy2Coords = [5300, 834];
        chest1Coords = [944, 736];
        chest2Coords = [5104, 800];
        signCoords = [6064, 800];

        break;
      case 2 :
        total = 3;

        playerCoords = [96, 384];
        enemy1Coords = [16 * 58, 16 * 22];
        enemy2Coords = [16 * 91, 16 * 20];
        enemy3Coords = [16 * 96, 16 * 20];
        enemy4Coords = [16 * 144, 16 * 19];
        enemy5Coords = [16 * 156, 16 * 19];
        enemy6Coords = [16 * 167, 16 * 19];
        enemy7Coords = [16 * 200, 16 * 16];
        enemy8Coords = [16 * 233, 16 * 23];
        enemy9Coords = [16 * 247, 16 * 24];
        enemy10Coords = [16 * 253, 16 * 24];
        enemy11Coords = [16 * 364, 16 * 22];
        enemy12Coords = [16 * 377, 16 * 22];
        enemy13Coords = [16 * 387, 16 * 22];
        enemy14Coords = [16 * 408, 16 * 22];
        enemy15Coords = [16 * 424, 16 * 28];
        chest1Coords = [16 * 125, 16 * 16];
        chest2Coords = [16 * 273, 16 * 21];
        chest3Coords = [6700, 16 * 23];
        signCoords = [16 * 494, 16 * 28];

        break;
    }

    if (chest1Coords.length) {
      chest1 = game.add.sprite(chest1Coords[0], chest1Coords[1], 'chest');
      game.physics.enable(chest1, Phaser.Physics.ARCADE);
      chest1.body.immovable = true;
      chest1.dirty = false;
    }

    if (chest2Coords.length) {
      chest2 = game.add.sprite(chest2Coords[0], chest2Coords[1], 'chest');
      game.physics.enable(chest2, Phaser.Physics.ARCADE);
      chest2.body.immovable = true;
      chest2.dirty = false;
    }

    if (chest3Coords.length) {
      chest3 = game.add.sprite(chest3Coords[0], chest3Coords[1], 'chest');
      game.physics.enable(chest3, Phaser.Physics.ARCADE);
      chest3.body.immovable = true;
      chest3.dirty = false;
    }

    if (signCoords.length) {
      sign = game.add.sprite(signCoords[0], signCoords[1], 'sign');
      game.physics.enable(sign, Phaser.Physics.ARCADE);
      sign.body.immovable = true;
    }

    this.generatePlayer(level);

    graphics = game.add.graphics(0, 0);
    graphics.fixedToCamera = true;

    circle = game.add.graphics(0, 0);
    circle.fixedToCamera = true;

    surroundingCircle = game.add.sprite(-2, -2, 'ui_score');
    surroundingCircle.fixedToCamera = true;

    uiTime = game.add.sprite(100, 10, 'ui_time');
    uiTime.fixedToCamera = true;

    this.changeLayer('future', 'past');
    this.updateScoring();
  },
  hitChest: function (chest) {
    if (!chest.dirty && game.time.now > openTimer) {
      if (score < total) {
        sfx = game.add.audio('chest');
        sfx.play('');
        score += 1;

        this.updateScoring();
        this.openChest(chest);
      }
      chest.dirty = true;
    }
    openTimer = game.time.now + 250;

    return false;
  },
  openChest: function (chest) {
    chest.frame = 1;
  },
  generatePlayer: function () {
    // Characters
    game.physics.arcade.gravity.y = gravity;
    // Player
    player = game.add.sprite(playerCoords[0], playerCoords[1], 'dude');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.setSize(
      20, //width
      40, //height
      -1, //left
      5 //bottom
    );
    player.alive = true;
    player.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
    player.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
    game.camera.follow(player);
  },
  generateEnemies: function (level, time) {
    switch (level) {
      case 1:
        switch (time) {
          case 'past':
            if (enemy1) {
              enemy1.kill();
            }
            if (enemy2) {
              enemy2.kill();
            }
            break;
          case 'now':
            if (enemy1) {
              enemy1.kill();
            }
            enemy2 = game.add.sprite(enemy2Coords[0], enemy2Coords[1], 'bad_dude');
            game.physics.enable(enemy2, Phaser.Physics.ARCADE);
            enemy2.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy2.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy2.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy2, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy2.x) {
                  enemy2.animations.play('left', 10, true);
                } else {
                  enemy2.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy2, player.x, player.y, 150);
              } else {
                isAggro = false;
                var enemy2mover = game.rnd.integerInRange(1, 3);
                if (enemy2mover == 1) {
                  enemy2.body.velocity.x = 50;
                  enemy2.animations.play('right', 10, true);
                } else if (enemy2mover == 2) {
                  enemy2.body.velocity.x = -50;
                  enemy2.animations.play('left', 10, true);
                } else {
                  enemy2.body.velocity.x = 0;
                  enemy2.animations.stop('right', 10, true);
                }
              }
            }, game);
            break;
          case 'future':
            if (enemy2) {
              enemy2.kill();
            }
            enemy1 = game.add.sprite(enemy1Coords[0], enemy1Coords[1], 'bad_dude');
            enemy1.enableBody = true;
            game.physics.enable(enemy1, Phaser.Physics.ARCADE);
            enemy1.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy1.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy1.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy1, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy1.x) {
                  enemy1.animations.play('left', 10, true);
                } else {
                  enemy1.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy1, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy1mover = game.rnd.integerInRange(1, 3);
                if (enemy1mover == 1) {
                  enemy1.body.velocity.x = 50;
                  enemy1.animations.play('right', 10, true);
                } else if (enemy1mover == 2) {
                  enemy1.body.velocity.x = -50;
                  enemy1.animations.play('left', 10, true);
                } else {
                  enemy1.body.velocity.x = 0;
                  enemy1.animations.stop('right', 10, true);
                }
              }
            }, game);
            break;
          default:
            break;
        }
        break;

      case 2 :
        switch (time) {
          case 'past':
            if (enemy1) {
              enemy1.kill();
            }
            if (enemy3) {
              enemy3.kill();
            }
            if (enemy5) {
              enemy5.kill();
            }
            if (enemy8) {
              enemy8.kill();
            }
            if (enemy9) {
              enemy9.kill();
            }
            if (enemy10) {
              enemy10.kill();
            }
            if (enemy11) {
              enemy11.kill();
            }
            if (enemy12) {
              enemy12.kill();
            }
            if (enemy13) {
              enemy13.kill();
            }
            if (enemy14) {
              enemy14.kill();
            }
            if (enemy15) {
              enemy15.kill();
            }

            enemy2 = game.add.sprite(enemy2Coords[0], enemy2Coords[1], 'bad_dude');
            enemy2.enableBody = true;
            game.physics.enable(enemy2, Phaser.Physics.ARCADE);
            enemy2.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy2.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy2.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy2, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy2.x) {
                  enemy2.animations.play('left', 10, true);
                } else {
                  enemy2.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy2, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy2mover = game.rnd.integerInRange(1, 3);
                if (enemy2mover == 1) {
                  enemy2.body.velocity.x = 50;
                  enemy2.animations.play('right', 10, true);
                } else if (enemy2mover == 2) {
                  enemy2.body.velocity.x = -50;
                  enemy2.animations.play('left', 10, true);
                } else {
                  enemy2.body.velocity.x = 0;
                  enemy2.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy4 = game.add.sprite(enemy4Coords[0], enemy4Coords[1], 'bad_dude');
            enemy4.enableBody = true;
            game.physics.enable(enemy4, Phaser.Physics.ARCADE);
            enemy4.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy4.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy4.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy4, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy4.x) {
                  enemy4.animations.play('left', 10, true);
                } else {
                  enemy4.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy4, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy4mover = game.rnd.integerInRange(1, 3);
                if (enemy4mover == 1) {
                  enemy4.body.velocity.x = 50;
                  enemy4.animations.play('right', 10, true);
                } else if (enemy4mover == 2) {
                  enemy4.body.velocity.x = -50;
                  enemy4.animations.play('left', 10, true);
                } else {
                  enemy4.body.velocity.x = 0;
                  enemy4.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy6 = game.add.sprite(enemy6Coords[0], enemy6Coords[1], 'bad_dude');
            enemy6.enableBody = true;
            game.physics.enable(enemy6, Phaser.Physics.ARCADE);
            enemy6.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy6.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy6.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy6, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy6.x) {
                  enemy6.animations.play('left', 10, true);
                } else {
                  enemy6.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy6, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy6mover = game.rnd.integerInRange(1, 3);
                if (enemy6mover == 1) {
                  enemy6.body.velocity.x = 50;
                  enemy6.animations.play('right', 10, true);
                } else if (enemy6mover == 2) {
                  enemy6.body.velocity.x = -50;
                  enemy6.animations.play('left', 10, true);
                } else {
                  enemy6.body.velocity.x = 0;
                  enemy6.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy7 = game.add.sprite(enemy7Coords[0], enemy7Coords[1], 'bad_dude');
            enemy7.enableBody = true;
            game.physics.enable(enemy7, Phaser.Physics.ARCADE);
            enemy7.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy7.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy7.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy7, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy7.x) {
                  enemy7.animations.play('left', 10, true);
                } else {
                  enemy7.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy7, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy7mover = game.rnd.integerInRange(1, 3);
                if (enemy7mover == 1) {
                  enemy7.body.velocity.x = 50;
                  enemy7.animations.play('right', 10, true);
                } else if (enemy7mover == 2) {
                  enemy7.body.velocity.x = -50;
                  enemy7.animations.play('left', 10, true);
                } else {
                  enemy7.body.velocity.x = 0;
                  enemy7.animations.stop('right', 10, true);
                }
              }
            }, game);


            break;
          case 'now':
            if (enemy2) {
              enemy2.kill();
            }
            if (enemy3) {
              enemy3.kill();
            }
            if (enemy4) {
              enemy4.kill();
            }
            if (enemy5) {
              enemy5.kill();
            }
            if (enemy6) {
              enemy6.kill();
            }
            if (enemy7) {
              enemy7.kill();
            }
            if (enemy9) {
              enemy9.kill();
            }
            if (enemy11) {
              enemy11.kill();
            }
            if (enemy12) {
              enemy12.kill();
            }
            if (enemy13) {
              enemy13.kill();
            }

            enemy1 = game.add.sprite(enemy1Coords[0], enemy1Coords[1], 'bad_dude');
            enemy1.enableBody = true;
            game.physics.enable(enemy1, Phaser.Physics.ARCADE);
            enemy1.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy1.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy1.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy1, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy1.x) {
                  enemy1.animations.play('left', 10, true);
                } else {
                  enemy1.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy1, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy1mover = game.rnd.integerInRange(1, 3);
                if (enemy1mover == 1) {
                  enemy1.body.velocity.x = 50;
                  enemy1.animations.play('right', 10, true);
                } else if (enemy1mover == 2) {
                  enemy1.body.velocity.x = -50;
                  enemy1.animations.play('left', 10, true);
                } else {
                  enemy1.body.velocity.x = 0;
                  enemy1.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy8 = game.add.sprite(enemy8Coords[0], enemy8Coords[1], 'bad_dude');
            enemy8.enableBody = true;
            game.physics.enable(enemy8, Phaser.Physics.ARCADE);
            enemy8.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy8.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy8.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy8, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy8.x) {
                  enemy8.animations.play('left', 10, true);
                } else {
                  enemy8.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy8, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy8mover = game.rnd.integerInRange(1, 3);
                if (enemy8mover == 1) {
                  enemy8.body.velocity.x = 50;
                  enemy8.animations.play('right', 10, true);
                } else if (enemy8mover == 2) {
                  enemy8.body.velocity.x = -50;
                  enemy8.animations.play('left', 10, true);
                } else {
                  enemy8.body.velocity.x = 0;
                  enemy8.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy10 = game.add.sprite(enemy10Coords[0], enemy10Coords[1], 'bad_dude');
            enemy10.enableBody = true;
            game.physics.enable(enemy10, Phaser.Physics.ARCADE);
            enemy10.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy10.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy10.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy10, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy10.x) {
                  enemy10.animations.play('left', 10, true);
                } else {
                  enemy10.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy10, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy10mover = game.rnd.integerInRange(1, 3);
                if (enemy10mover == 1) {
                  enemy10.body.velocity.x = 50;
                  enemy10.animations.play('right', 10, true);
                } else if (enemy10mover == 2) {
                  enemy10.body.velocity.x = -50;
                  enemy10.animations.play('left', 10, true);
                } else {
                  enemy10.body.velocity.x = 0;
                  enemy10.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy14 = game.add.sprite(enemy14Coords[0], enemy14Coords[1], 'bad_dude');
            enemy14.enableBody = true;
            game.physics.enable(enemy14, Phaser.Physics.ARCADE);
            enemy14.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy14.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy14.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy14, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy14.x) {
                  enemy14.animations.play('left', 10, true);
                } else {
                  enemy14.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy14, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy14mover = game.rnd.integerInRange(1, 3);
                if (enemy14mover == 1) {
                  enemy14.body.velocity.x = 50;
                  enemy14.animations.play('right', 10, true);
                } else if (enemy14mover == 2) {
                  enemy14.body.velocity.x = -50;
                  enemy14.animations.play('left', 10, true);
                } else {
                  enemy14.body.velocity.x = 0;
                  enemy14.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy15 = game.add.sprite(enemy15Coords[0], enemy15Coords[1], 'bad_dude');
            enemy15.enableBody = true;
            game.physics.enable(enemy15, Phaser.Physics.ARCADE);
            enemy15.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy15.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy15.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy15, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy15.x) {
                  enemy15.animations.play('left', 10, true);
                } else {
                  enemy15.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy15, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy15mover = game.rnd.integerInRange(1, 3);
                if (enemy15mover == 1) {
                  enemy15.body.velocity.x = 50;
                  enemy15.animations.play('right', 10, true);
                } else if (enemy15mover == 2) {
                  enemy15.body.velocity.x = -50;
                  enemy15.animations.play('left', 10, true);
                } else {
                  enemy15.body.velocity.x = 0;
                  enemy15.animations.stop('right', 10, true);
                }
              }
            }, game);
            break;
          case 'future':
            if (enemy1) {
              enemy1.kill();
            }
            if (enemy2) {
              enemy2.kill();
            }
            if (enemy4) {
              enemy4.kill();
            }
            if (enemy6) {
              enemy6.kill();
            }
            if (enemy7) {
              enemy7.kill();
            }
            if (enemy8) {
              enemy8.kill();
            }
            if (enemy10) {
              enemy10.kill();
            }
            if (enemy14) {
              enemy14.kill();
            }
            if (enemy15) {
              enemy15.kill();
            }

            enemy3 = game.add.sprite(enemy3Coords[0], enemy3Coords[1], 'bad_dude');
            enemy3.enableBody = true;
            game.physics.enable(enemy3, Phaser.Physics.ARCADE);
            enemy3.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy3.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy3.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy3, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy3.x) {
                  enemy3.animations.play('left', 10, true);
                } else {
                  enemy3.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy3, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy3mover = game.rnd.integerInRange(1, 3);
                if (enemy3mover == 1) {
                  enemy3.body.velocity.x = 50;
                  enemy3.animations.play('right', 10, true);
                } else if (enemy3mover == 2) {
                  enemy3.body.velocity.x = -50;
                  enemy3.animations.play('left', 10, true);
                } else {
                  enemy3.body.velocity.x = 0;
                  enemy3.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy5 = game.add.sprite(enemy5Coords[0], enemy5Coords[1], 'bad_dude');
            enemy5.enableBody = true;
            game.physics.enable(enemy5, Phaser.Physics.ARCADE);
            enemy5.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy5.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy5.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy5, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy5.x) {
                  enemy5.animations.play('left', 10, true);
                } else {
                  enemy5.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy5, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy5mover = game.rnd.integerInRange(1, 3);
                if (enemy5mover == 1) {
                  enemy5.body.velocity.x = 50;
                  enemy5.animations.play('right', 10, true);
                } else if (enemy5mover == 2) {
                  enemy5.body.velocity.x = -50;
                  enemy5.animations.play('left', 10, true);
                } else {
                  enemy5.body.velocity.x = 0;
                  enemy5.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy9 = game.add.sprite(enemy9Coords[0], enemy9Coords[1], 'bad_dude');
            enemy9.enableBody = true;
            game.physics.enable(enemy9, Phaser.Physics.ARCADE);
            enemy9.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy9.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy9.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy9, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy9.x) {
                  enemy9.animations.play('left', 10, true);
                } else {
                  enemy9.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy9, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy9mover = game.rnd.integerInRange(1, 3);
                if (enemy9mover == 1) {
                  enemy9.body.velocity.x = 50;
                  enemy9.animations.play('right', 10, true);
                } else if (enemy9mover == 2) {
                  enemy9.body.velocity.x = -50;
                  enemy9.animations.play('left', 10, true);
                } else {
                  enemy9.body.velocity.x = 0;
                  enemy9.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy11 = game.add.sprite(enemy11Coords[0], enemy11Coords[1], 'bad_dude');
            enemy11.enableBody = true;
            game.physics.enable(enemy11, Phaser.Physics.ARCADE);
            enemy11.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy11.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy11.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy11, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy11.x) {
                  enemy11.animations.play('left', 10, true);
                } else {
                  enemy11.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy11, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy11mover = game.rnd.integerInRange(1, 3);
                if (enemy11mover == 1) {
                  enemy11.body.velocity.x = 50;
                  enemy11.animations.play('right', 10, true);
                } else if (enemy11mover == 2) {
                  enemy11.body.velocity.x = -50;
                  enemy11.animations.play('left', 10, true);
                } else {
                  enemy11.body.velocity.x = 0;
                  enemy11.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy12 = game.add.sprite(enemy12Coords[0], enemy12Coords[1], 'bad_dude');
            enemy12.enableBody = true;
            game.physics.enable(enemy12, Phaser.Physics.ARCADE);
            enemy12.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy12.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy12.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy12, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy12.x) {
                  enemy12.animations.play('left', 10, true);
                } else {
                  enemy12.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy12, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy12mover = game.rnd.integerInRange(1, 3);
                if (enemy12mover == 1) {
                  enemy12.body.velocity.x = 50;
                  enemy12.animations.play('right', 10, true);
                } else if (enemy12mover == 2) {
                  enemy12.body.velocity.x = -50;
                  enemy12.animations.play('left', 10, true);
                } else {
                  enemy12.body.velocity.x = 0;
                  enemy12.animations.stop('right', 10, true);
                }
              }
            }, game);

            enemy13 = game.add.sprite(enemy13Coords[0], enemy13Coords[1], 'bad_dude');
            enemy13.enableBody = true;
            game.physics.enable(enemy13, Phaser.Physics.ARCADE);
            enemy13.animations.add('left', [5, 4, 3, 2, 1, 0], 6, true);
            enemy13.animations.add('right', [8, 9, 10, 11, 12, 13], 6, true);
            enemy13.body.setSize(25, 40, 25, 22);
            game.time.events.repeat(Phaser.Timer.SECOND * 2, 1000, function () {
              var distanceToPlayer = game.physics.arcade.distanceBetween(enemy13, player);
              if (distanceToPlayer < 200) {
                isAggro = true;
                if (player.x < enemy13.x) {
                  enemy13.animations.play('left', 10, true);
                } else {
                  enemy13.animations.play('right', 10, true);
                }
                game.physics.arcade.moveToXY(enemy13, player.x, player.y, 100);
              } else {
                isAggro = false;
                var enemy13mover = game.rnd.integerInRange(1, 3);
                if (enemy13mover == 1) {
                  enemy13.body.velocity.x = 50;
                  enemy13.animations.play('right', 10, true);
                } else if (enemy13mover == 2) {
                  enemy13.body.velocity.x = -50;
                  enemy13.animations.play('left', 10, true);
                } else {
                  enemy13.body.velocity.x = 0;
                  enemy13.animations.stop('right', 10, true);
                }
              }
            }, game);
            break;
        }
        break;
    }
  },
  playerDeath: function () {
    if (player.alive) {
      player.kill();
      sfx = game.add.audio('death');
      sfx.play('');

      death = game.add.sprite(game.camera.x, game.camera.y, 'death');
    }
  },
  updateScoring: function () {
    circle.clear();

    if (score / total < 1) {
      circle.beginFill(0xCE6921);
      circle.arc(-2, -2, 0 + ((scoringCircleRadius * score / total)), game.math.degToRad(92.1), game.math.degToRad(0), true);
      circle.endFill();
    }
    else if (score / total == 1) {
      circle.beginFill(0x00FF00);
      circle.arc(-2, -2, scoringCircleRadius, game.math.degToRad(92.1), game.math.degToRad(0), true);
      circle.endFill();
    }
    circle.alpha = 0.9;
    surroundingCircle.alpha = 0.3;
    uiTime.alpha = 0.9;
  },
  changeLayer: function (direction, time) {
    if (direction != time && game.time.now > changeTimer) {
      switch (time) {
        case 'past':
        case 'future':
          sfx = game.add.audio('shoot');
          sfx.play('');
          // Set Now
          if (layers[0].alpha) {
            game.add.tween(layers[0]).to({alpha: 0}, 400, Phaser.Easing.Quadratic.Out, true);
          }
          if (layers[2].alpha) {
            game.add.tween(layers[2]).to({alpha: 0}, 400, Phaser.Easing.Quadratic.Out, true);
          }
          layer = layers[1];
          game.add.tween(layers[1]).to({alpha: 1}, 200, Phaser.Easing.Quadratic.In, true);
          surroundingCircle.frame = 1;
          uiTime.frame = 1;
          state = 'now';
          break;
        case 'now':
          sfx = game.add.audio('shoot');
          sfx.play('');
          if (direction == 'past') {
            // Set past
            if (layers[1].alpha) {
              game.add.tween(layers[1]).to({alpha: 0}, 400, Phaser.Easing.Quadratic.Out, true);
            }
            if (layers[2].alpha) {
              game.add.tween(layers[2]).to({alpha: 0}, 400, Phaser.Easing.Quadratic.Out, true);
            }
            layer = layers[0];
            game.add.tween(layers[0]).to({alpha: 1}, 200, Phaser.Easing.Quadratic.In, true);
            surroundingCircle.frame = 0;
            uiTime.frame = 0;
            state = 'past';
          }
          else {
            // Set Future
            if (layers[0].alpha) {
              game.add.tween(layers[0]).to({alpha: 0}, 400, Phaser.Easing.Quadratic.Out, true);
            }
            if (layers[1].alpha) {
              game.add.tween(layers[1]).to({alpha: 0}, 400, Phaser.Easing.Quadratic.Out, true);
            }
            layer = layers[2];
            game.add.tween(layers[2]).to({alpha: 1}, 200, Phaser.Easing.Quadratic.In, true);
            surroundingCircle.frame = 2;
            uiTime.frame = 2;
            state = 'future';
          }
          break;
        default:
          break;
      }
      this.generateEnemies(level, state);
      surroundingCircle.y = 0;
      uiTime.scale.set(0.8);
      changeTimer = game.time.now + 500;
    }

    if (!layer) {
      layer = layers[1];
    }
  },
  pause: function () {
    if (!game.paused) {
      // When the paus button is pressed, we pause the game
      game.paused = true;

      // Then add the menu
      menu = game.add.sprite(game.camera.x, game.camera.y, 'menu');

      setTimeout(function(){
        menu.destroy();
        game.paused = false;
      }, 7000)
    }
  },
  render: function () {
    //game.debug.body(player);
    //game.debug.body(enemy1);
    //game.debug.body(enemy2);
    //game.debug.text(map.layers, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);
    //layer.debug = true;
    //game.debug.text(player.x);
  }
};

// States
game.state.add("Menu", menu, true);
game.state.add("Level", lvl);
game.state.add("Credits", credits);